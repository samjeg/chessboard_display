var chessMech = null;
$(document).ready(function(){

	var chess_piece_ids = [ 
	"comp_pawn1", "comp_pawn2", "comp_pawn3", "comp_pawn4", "comp_pawn5", "comp_pawn6", "comp_pawn7", "comp_pawn8", 
	"comp_rook1", "comp_horse1", "comp_bishop1", "comp_queen", "comp_king", "comp_bishop2", "comp_horse2", "comp_rook2",
	"player_pawn1", "player_pawn2", "player_pawn3", "player_pawn4", "player_pawn5", "player_pawn6", "player_pawn7", "player_pawn8",
	"player_rook1", "player_horse1", "player_bishop1", "player_queen", "player_king", "player_bishop2", "player_horse2", "player_rook2",
	];

	var new_chessboard_matrix = [
	["comp_rook1", "comp_horse1", "comp_bishop1", "comp_queen", "comp_king", "comp_bishop2", "comp_horse2", "comp_rook2"],
	[ "comp_pawn1", "", "comp_pawn3", "comp_pawn4", "comp_pawn5", "comp_pawn6", "comp_pawn7", "comp_pawn8" ],
	[ "", "", "", "", "", "", "", ""],
	[ "", "comp_pawn2", "", "", "", "", "", ""],
	[ "", "", "", "", "", "", "", ""],
	[ "player_horse1", "", "", "", "", "", "", ""],
	[ "player_pawn1", "player_pawn2", "player_pawn3", "player_pawn4", "player_pawn5", "player_pawn6", "player_pawn7", "player_pawn8" ],
	["player_rook1", "", "player_bishop1", "player_queen", "player_king", "player_bishop2", "player_horse2", "player_rook2"]
	];

	chessMech = new ChessMechanics();	

	chessMech.playerPawnStartingPositions = ["2A", "2B", "2C", "2D", "2E", "2F", "2G", "2H"];
	chessMech.compPawnStartingPositions = ["7A", "7B", "7C", "7D", "7E", "7F", "7G", "7H"];
	
	var chess_place_ids = chessMech.chessPiece.get_chess_place_ids(chess_piece_ids);
	chessMech.chessPiece.live_chessboard_matrix = chessMech.chessPiece.live_chessboard_matrix_gen(chess_place_ids, chess_piece_ids);
	var matrixIsSame = chessMech.chessPiece.matrixSame(chessMech.chessPiece.live_chessboard_matrix, new_chessboard_matrix);
	var diffPiece = chessMech.chessPiece.findDiffentPiece(chessMech.chessPiece.live_chessboard_matrix, new_chessboard_matrix);
	var diffPieceCoor = chessMech.chessPiece.findBoardCoordinates(new_chessboard_matrix, diffPiece);
	var diffPiecePlaceId = chessMech.chessPiece.id_gen(diffPieceCoor[0], diffPieceCoor[1]); 
	
	var diffElement = document.getElementById(diffPiece);
	var diffPlaceElement = document.getElementById(diffPiecePlaceId).appendChild(diffElement);
	
	var players = document.getElementsByClassName("player");
	var comp_players = document.getElementsByClassName("comp-player");
});

function displayAttackingPlaces(){
	console.log("Attacking Places: "+getAttackingPlaces());
}

class ChessMechanics{
	
	constructor(){

		this.current_colour = "White"
		this.current_selected_piece = undefined;
		this.current_selected_coordinates = [];
		this.current_selected_movable_ids = [];
		this.king_piece = undefined;
		this.king_coordinates = [];
		this.kingInCheck = false;
		this.movedPieces = [];
		this.kingMovedRight = false;
		this.kingMovedLeft = false;
		this.playerPawnStartingPositions = [];
		this.compPawnStartingPositions = [];
		this.playerPawnsHasMoved = [];
		this.compPawnsHasMoved = [];
		this.enPassantOpponentLeft = "";
		this.enPassantOpponentRight = "";
		this.currentEnPassantOpponentPlaceId = "";
		this.currentEnPassantPlaceId = "";
		this.selectedHighlights = [];
		this.selectedHighlightMovableIds = [];
		this.canMovePawn = false;
		this.isEnPassant = false;
		this.chessPiece = new ChessPiece();
		this.rook = new Rook();
		this.bishop = new Bishop();
		this.queen = new Queen();
		this.king = new King();
		this.pawn = new Pawn();
		this.horse = new Horse();
	}

	select(pieceId){
		this.prevSelectedHighlightIds = this.current_selected_movable_ids;
		this.current_selected_piece = document.getElementById(pieceId);
		this.current_selected_coordinates = this.chessPiece.findPieceCoordinates(this.current_selected_piece);
		this.currentEnPassantOpponentPlaceId = "";
		this.current_selected_movable_ids = this.getMovable(
			this.current_selected_piece.id,
			this.current_selected_coordinates[1],
			this.current_selected_coordinates[0]
		);

		console.log("Movable "+this.current_selected_movable_ids);
		var current_king_place_id = document.getElementById("player_king").parentElement.id;
		this.selectedHightlightMovableIds = this.current_selected_movable_ids;
		this.highlightMovable(this.selectedHightlightMovableIds);
		this.selectedHightlightMovableIds = [];
	}

	moveTo(placeId){
		var selectedId = "";
		if(this.current_selected_piece!=undefined){
			if(this.current_selected_movable_ids.length!=0){
				for(var i=0; i<this.current_selected_movable_ids.length; i++){
					if(placeId==this.current_selected_movable_ids[i]){
						var current_place = document.getElementById(placeId);
						current_place.appendChild(this.current_selected_piece);
						selectedId = this.current_selected_piece.id;
						this.movedPieces.push(selectedId);
						this.removeHighlights();
						if(selectedId=="player_king"&&placeId=="1G"){
							this.kingMovedRight = true;
						}
						if(selectedId=="player_king"&&placeId=="1C"){
							this.kingMovedLeft = true;
						}
						if(this.chessPiece.isType(selectedId, "player_rook")){
							this.kingMovedRight = false;
							this.kingMovedLeft = false;
						}
						if(this.currentEnPassantPlaceId!=""||this.currentEnPassantPlaceId!=null){
							if(placeId==this.currentEnPassantPlaceId){
								this.removeEnPassantOpponent(placeId);	
							}
						}
						this.setPlayerPawnsHasMoved(selectedId);
					}
				}
			}
		}
	}

	highlightMovable(movableElements){
		for (var i = 0; i < movableElements.length; i++ ) {
			var next = document.getElementById(movableElements[i]);
			next.style.backgroundColor = "#FDC757";
			this.selectedHighlights.push(next);
		}
	}

	removeHighlights(){
		for (var i = 0; i < this.selectedHighlights.length; i++ ) {
			var next = this.selectedHighlights[i];
			next.style.backgroundColor = "";
		}
	}

	enPassantMovement(rookArray, x, y){
		var newArray = [];
		var pawnHasLeft = false;
		var pawnHasRight = false;
		var leftOfPawn = this.chessPiece.id_gen(y, x-1);
		var rightOfPawn = this.chessPiece.id_gen(y, x+1);
		var leftOfPawnElement = document.getElementById(leftOfPawn);
		var rightOfPawnElement = document.getElementById(rightOfPawn);
		if(leftOfPawnElement!=null){
			if(leftOfPawnElement.firstElementChild!=null){
				var enPassantSpace = this.pawnReadyEnPassant(leftOfPawnElement.firstElementChild.id, leftOfPawn);
				console.log("Pawn ready: "+enPassantSpace);
				if(enPassantSpace!=""){
					rookArray.push(enPassantSpace);
					this.enPassantOpponentLeft = leftOfPawnElement.firstElementChild.id;
					this.currentEnPassantOpponentPlaceId = leftOfPawn;
					this.isEnPassant = true;
					console.log("En Passant left: "+enPassantSpace);
				}
			}
		}
		if(rightOfPawnElement!=null){
			if(rightOfPawnElement.firstElementChild!=null){
				var enPassantSpace = this.pawnReadyEnPassant(rightOfPawnElement.firstElementChild.id, rightOfPawn)
				if(enPassantSpace!=""){
					rookArray.push(enPassantSpace);
					this.enPassantOpponentRight = rightOfPawnElement.firstElementChild.id;
					this.currentEnPassantOpponentPlaceId = rightOfPawn;
					this.isEnPassant = true;
					console.log("En Passant right: "+enPassantSpace);
				}
			}
		}
		return rookArray;
	}

	pawnReadyEnPassant(pieceId, placeId){
		var newPlaceId = "";
		if(this.chessPiece.isType(pieceId, "comp_pawn")){
			for(var i=0; i<this.compPawnStartingPositions.length; i++){
				if(this.chessPiece.isType(pieceId, String(i+1))){
					var posBefore = this.chessPiece.findPlaceCoordinates(this.compPawnStartingPositions[i]);
					var y = posBefore[0] + 1;
					var x = posBefore[1];
					var posNow = this.chessPiece.findPlaceCoordinates(placeId);
					var nY = posNow[0] - 1;
					var nX = posNow[1];
					var placeIdWithPosBefore = this.chessPiece.id_gen(y, x);
					var placeIdWithPosNow = this.chessPiece.id_gen(nY, nX);
					if(placeIdWithPosBefore==placeIdWithPosNow){
						newPlaceId = placeIdWithPosNow;
						this.currentEnPassantPlaceId = placeIdWithPosNow;
					}
				}
			}
		}
		return newPlaceId;
	}

	removeEnPassantOpponent(placeId){
		var currentCoordinates = this.chessPiece.findPlaceCoordinates(placeId);
		var enPassantOpponentPlaceId = this.chessPiece.id_gen(currentCoordinates[0] + 1, currentCoordinates[1]);
		var enPassantOpponentPlace = document.getElementById(enPassantOpponentPlaceId);
		if(enPassantOpponentPlace!=null){
			var enPassantOpponent = enPassantOpponentPlace.firstElementChild;
			if(enPassantOpponent!=null){
				this.removeEnPassantOpponentHelper(enPassantOpponent.id);
			}
		}
		currentEnPassantPlaceId = "";
	}

	setPlayerPawnsHasMoved(pieceId){
		if(this.chessPiece.isType(pieceId, "player_pawn")){
			for(var i=0; i<this.playerPawnsHasMoved.length; i++){
				if(this.chessPiece.isType(pieceId, String(i+1))){
					this.playerPawnsHasMoved[i] = true;
				}
			}
		}
	}

	setCompPawnsHasMoved(pieceId){
		if(this.chessPiece.isType(pieceId, "comp_pawn")){
			for(var i=0; i<this.compPawnsHasMoved.length; i++){
				if(this.chessPiece.isType(pieceId, String(i+1))){
					this.compPawnsHasMoved[i] = true;
				}
			}
		}
	}

	remove(pieceId){
		var current_element = document.getElementById(pieceId);
		var parent_id = current_element.parentElement.id;
		var parent_element = document.getElementById(parent_id);
		if(this.current_selected_piece!=undefined){
			if(this.current_selected_movable_ids.length!=0){
				for(var i=0; i<this.current_selected_movable_ids.length; i++){
					var current_element = document.getElementById(pieceId);
					var parent_id = current_element.parentElement.id;
					var parent_element = document.getElementById(parent_id);
					if(parent_id==this.current_selected_movable_ids[i]){
						parent_element.removeChild(current_element);
						var current_place = document.getElementById(parent_id);
						current_place.appendChild(this.current_selected_piece);
					}
				}
			}
		}
	}

	removeEnPassantOpponentHelper(pieceId){
		var current_element = document.getElementById(pieceId);
		var parent_id = current_element.parentElement.id;
		var parent_element = document.getElementById(parent_id);
		if(current_element!=null){
			if(parent_element!=null){
				if(this.currentEnPassantOpponentPlaceId!=""||this.currentEnPassantOpponentPlaceId!=null){
					if(parent_id==this.currentEnPassantOpponentPlaceId){
						parent_element.removeChild(current_element);
					}
				}
			}
		}
	}

	kingExtraMoves(kingArray){
		if(this.canCastleRight()){
			kingArray.push("1G")
			console.log("can castle right");
		}
		if(this.canCastleLeft()){
			kingArray.push("1C");
		}
		return kingArray;
	}

	rookExtraMoves(rookArray){
		if(this.kingMovedRight){
			rookArray.push("1F")
		}
		if(this.kingMovedLeft){
			rookArray.push("1D");
		}
		return rookArray;
	}

	carefullKing(kingArray){
		var newArray = []; 
		for(var i=0; i<kingArray.length; i++){
			var next = kingArray[i];
			if(!this.placeHasCheck(next)){
				newArray.push(next);
			} 
		}
		return newArray;
	}

	getMovable(pieceId, x, y){
		var movablePlaces = [];
		if(this.chessPiece.isType(pieceId, "pawn")){
			movablePlaces = this.enPassantMovement(this.shrinkPawnArray(this.pawn.getPawnMovablePlaces(x, y), "playing"), x, y);
		}
		else if(this.chessPiece.isType(pieceId, "rook")){
			movablePlaces = this.rookExtraMoves(this.chessPiece.shrinkContinuosArray(this.rook.movablePlaces(x, y)));
		}
		else if(this.chessPiece.isType(pieceId, "bishop")){
			movablePlaces = this.chessPiece.shrinkContinuosArray(this.bishop.getBishopMovablePlaces(x, y));
		}
		else if(this.chessPiece.isType(pieceId, "queen")){
			movablePlaces = this.chessPiece.shrinkContinuosArray(this.queen.getQueenMovablePlaces(x, y));
		}
		else if(this.chessPiece.isType(pieceId, "horse")){
			movablePlaces = this.horse.getHorseMovablePlaces(x, y);
		}
		else if(this.chessPiece.isType(pieceId, "king")){
			movablePlaces = this.carefullKing(this.kingExtraMoves(this.king.getKingMovablePlaces(x, y)));
		}
		return movablePlaces;
	}

	canCastleRight(){
		if(
			!this.kingHasMoved()&&
			!this.kingHasCheck()&&
			!this.rightRookHasMoved()&&
			!this.toRightRookHasCheck()&&
			!this.toRightRookHasPieces()
		){
			return true;
		}
		return false;
	}
	canCastleLeft(){
		if(
			!this.kingHasMoved()&&
			!this.kingHasCheck()&&
			!this.leftRookHasMoved()&&
			!this.toLeftRookHasCheck()&&
			!this.toLeftRookHasPieces()
		){
			return true;
		}
		return false;
	}

	toRightRookHasPieces(){
		var toRightRookPlaces = ["1F", "1G"];
		var first = document.getElementById(toRightRookPlaces[0]);
		if(first!=null){
			if(first.firstElementChild!=null){
				return true;
			}
		}
		var second = document.getElementById(toRightRookPlaces[1]);
		if(second!=null){
			if(second.firstElementChild!=null){
				return true;
			}
		}
		return false;
	}

	toLeftRookHasPieces(){
		var toLeftRookPlaces = ["1D", "1C", "1B"];
		var first = document.getElementById(toLeftRookPlaces[0]);
		if(first!=null){
			if(first.firstElementChild!=null){
				return true;
			}
		}
		var second = document.getElementById(toLeftRookPlaces[1]);
		if(second!=null){
			if(second.firstElementChild!=null){
				return true;
			}
		}
		var third = document.getElementById(toLeftRookPlaces[2]);
		if(third!=null){
			if(third.firstElementChild!=null){
				return true;
			}
		}
		return false;
	}

	leftRookHasMoved(){
		for(var i=0; i<this.movedPieces.length; i++){
			next = this.movedPieces[i];
			if(this.chessPiece.isType(next, "player_rook1")){
				return true;
			}
		}
		return false;
	}

	rightRookHasMoved(){
		for(var i=0; i<this.movedPieces.length; i++){
			next = this.movedPieces[i];
			if(this.chessPiece.isType(next, "player_rook2")){
				return true;
			}
		}
		return false;
	}

	kingHasMoved(){
		for(var i=0; i<this.movedPieces.length; i++){
			next = this.movedPieces[i];
			if(this.chessPiece.isType(next, "player_king")){
				return true;
			}
		}
		return false;
	}

	kingHasCheck(){
		var attackingPlaces = this.getAttackingPlaces();
		if(attackingPlaces.length>0){
			return true;
		}
		return false;
	}

	placeHasCheck(placeId){
		var attackingPlaces = this.getAttackingPlacesFromPos(placeId);
		if(attackingPlaces.length>0){
			return true;
		}
		return false;
	}

	toRightRookHasCheck(){
		var toRightRookPlaces = ["1F", "1G"];
		if(this.placeHasCheck(toRightRookPlaces[0])){
			return true;
		}
		if(this.placeHasCheck(toRightRookPlaces[1])){
			return true;
		}
		return false;
	}

	toLeftRookHasCheck(){
		var toLeftRookPlaces = ["1D", "1C", "1B"];
		if(this.placeHasCheck(toLeftRookPlaces[0])){
			console.log("1D: "+toLeftRookPlaces[0]);
			return true;
		}
		if(this.placeHasCheck(toLeftRookPlaces[1])){
			console.log("1C: "+toLeftRookPlaces[1]);
			return true;
		}
		if(this.placeHasCheck(toLeftRookPlaces[2])){
			console.log("1B: "+toLeftRookPlaces[2]);
			return true;
		}
		return false;
	}

	leftRookHasCheck(){
		if(this.placeHasCheck("1A")){
			return true;
		}
		return false;
	}

	rightRookHasCheck(){
		if(this.placeHasCheck("1H")){
			return true;
		}
		return false;
	}

	getAttackingPlaces(){
		var king_piece = document.getElementById("player_king");
		var king_coordinates = this.chessPiece.findPieceCoordinates(king_piece);
		var x = king_coordinates[1];
		var y = king_coordinates[0]
		var attackingPawnPlaces = this.getAttackingPawnPlaces(x, y);
		var attackingHorsePlaces = this.getAttackingHorsePlaces(x, y);
		var attackingRookPlaces = this.getAttackingRookPlaces(true, x, y);
		var attackingBishopPlaces = this.getAttackingBishopPlaces(true, x, y);
		var queen1 = this.getAttackingRookPlaces(false, x, y);
		var queen2 = this.getAttackingBishopPlaces(false, x, y);
		var attackingQueenPlaces = queen1.concat(queen2);
		var attackingPlaces = attackingPawnPlaces.concat(attackingHorsePlaces)
		.concat(attackingRookPlaces)
		.concat(attackingBishopPlaces)
		.concat(attackingQueenPlaces);
		return attackingPlaces;
	}

	getAttackingPlacesFromPos(placeId){
		var attackingPlaces = [];
		var placeCoordinates = this.chessPiece.findPlaceCoordinates(placeId);
		var x = placeCoordinates[1];
		var y = placeCoordinates[0]
		var attackingPawnPlaces = this.getAttackingPawnPlaces(x, y);
		var attackingHorsePlaces = this.getAttackingHorsePlaces(x, y);
		var attackingRookPlaces = this.getAttackingRookPlaces(true, x, y);
		var attackingBishopPlaces = this.getAttackingBishopPlaces(true, x, y);
		var queen1 = this.getAttackingRookPlaces(false, x, y);
		var queen2 = this.getAttackingBishopPlaces(false, x, y);
		var attackingQueenPlaces = queen1.concat(queen2);
		var attackingPlaces = attackingPawnPlaces.concat(attackingHorsePlaces)
		.concat(attackingRookPlaces)
		.concat(attackingBishopPlaces)
		.concat(attackingQueenPlaces);
		return attackingPlaces;
	}

	getAttackingPawnPlaces(x, y){
		var attackingPawnPlaces = this.shrinkPawnArray(getPawnMovablePlaces(x, y), "checking");
		var new_array = [];
		var first = document.getElementById(attackingPawnPlaces[0]);
		if(first!=null){
			if(first.firstElementChild!=null){
				if(this.placeHasCheck(attackingPawnPlaces[0])){
					new_array.push(attackingPawnPlaces[0]);
				}		
			}
		}
		var second = document.getElementById(attackingPawnPlaces[1]);
		if(second!=null){
			if(second.firstElementChild!=null){
				if(this.placeHasCheck(attackingPawnPlaces[1])){
					new_array.push(attackingPawnPlaces[0]);
				}		
			}
		}
		return new_array;
	}

	getAttackingPiecesPlaces(placeId, array, type1, type2){
		var type = type1;
		if(type1==""){
			type = type2;
		}
		if(type=="comp_rook"){
		}
		if(placeId!=""){
			var nextPlace = document.getElementById(placeId);
			if(nextPlace.childElementCount!=0){
				var nextPiece = nextPlace.firstElementChild.id;
				if(this.chessPiece.isType(nextPiece, type)){
					array.push(placeId);
				}
			}
		}
	}

	getAttackingRookPlaces(isRook, x, y){
		var attackingRookPlaces = this.getRookMovablePlaces(x, y);
		var rookFwdAttacking = attackingRookPlaces[23];
		var rookBkwdAttacking = attackingRookPlaces[31];
		var rookRightAttacking = attackingRookPlaces[7];
		var rookLeftAttacking = attackingRookPlaces[15];
		var newAttackingRookPlaces = [];
		if(isRook==true){
			this.getAttackingPiecesPlaces(rookFwdAttacking, newAttackingRookPlaces, "comp_rook", "");
			this.getAttackingPiecesPlaces(rookBkwdAttacking, newAttackingRookPlaces, "comp_rook", "");
			this.getAttackingPiecesPlaces(rookRightAttacking, newAttackingRookPlaces, "comp_rook", "");
			this.getAttackingPiecesPlaces(rookLeftAttacking, newAttackingRookPlaces, "comp_rook", "");
		} else {
			this.getAttackingPiecesPlaces(rookFwdAttacking, newAttackingRookPlaces, "", "comp_queen");
			this.getAttackingPiecesPlaces(rookBkwdAttacking, newAttackingRookPlaces, "", "comp_queen");
			this.getAttackingPiecesPlaces(rookRightAttacking, newAttackingRookPlaces, "", "comp_queen");
			this.getAttackingPiecesPlaces(rookLeftAttacking, newAttackingRookPlaces, "", "comp_queen");
		}
		return newAttackingRookPlaces;
	}

	getAttackingBishopPlaces(isBishop, x, y){
		var attackingBishopPlaces = this.getBishopMovablePlaces(x, y);
		var RightDownAttacking = attackingBishopPlaces[23];
		var LeftUpAttacking = attackingBishopPlaces[31];
		var LeftDownAttacking = attackingBishopPlaces[7];
		var RightUpAttacking = attackingBishopPlaces[15];
		var newAttackingBishopPlaces = [];
		if(isBishop==true){
			this.getAttackingPiecesPlaces(RightDownAttacking, newAttackingBishopPlaces, "comp_bishop", "");
			this.getAttackingPiecesPlaces(LeftUpAttacking, newAttackingBishopPlaces, "comp_bishop", "");
			this.getAttackingPiecesPlaces(LeftDownAttacking, newAttackingBishopPlaces, "comp_bishop", "");
			this.getAttackingPiecesPlaces(RightUpAttacking, newAttackingBishopPlaces, "comp_bishop", "");
		} else {
			this.etAttackingPiecesPlaces(RightDownAttacking, newAttackingBishopPlaces, "", "comp_queen");
			this.getAttackingPiecesPlaces(LeftUpAttacking, newAttackingBishopPlaces, "", "comp_queen");
			this.getAttackingPiecesPlaces(LeftDownAttacking, newAttackingBishopPlaces, "", "comp_queen");
			this.getAttackingPiecesPlaces(RightUpAttacking, newAttackingBishopPlaces, "", "comp_queen");
		}
		return newAttackingBishopPlaces;
	}

	getAttackingHorsePlaces(x, y){
		var horseMovablePlaces = this.getHorseMovablePlaces(x, y);
		var attackingHorsePlaces = [];
		for(var i=0; i<horseMovablePlaces.length; i++){
			next = document.getElementById(horseMovablePlaces[i]);
			if(next!=null){
				if(next.childElementCount!=0){
					if(next.firstElementChild!=null){
						if(this.chessPiece.isType(next.firstElementChild.id, "comp_horse")){
							attackingHorsePlaces.push(next.id);
						}
					}
				}
			}
		}
		return attackingHorsePlaces;
	}

	

	shrinkPawnArray(array, mechanic_needed){
		var new_array = [];
		if(mechanic_needed=="playing"){
			if(array[0]!=null){
				if(array[0]!=""){
					new_array.push(array[0]);
				}
			}
			if(array[1]!=null){
				if(array[1]!=""){
					new_array.push(array[1]);
				}
			}
			if(array[2]!=null){
				if(array[2]!=""){
					new_array.push(array[2]);
				}
			}
			if(array[3]!=null){
				if(array[3]!=""){
					new_array.push(array[3]);
				}
			}
		} else {
			if(array[0]!=""){
				leftElement = document.getElementById(array[0]);
				if(leftElement!=null){
					if(leftElement.firstElementChild!=null){
						piece = leftElement.firstElementChild;
						if(this.chessPiece.isType(piece.id, "comp_pawn")){
							new_array.push(array[0]);
						}
					}
				}
			}
			if(array[1]!=""){
				rightElement = document.getElementById(array[1]);
				if(rightElement!=null){
					if(rightElement.firstElementChild!=null){
						piece = rightElement.firstElementChild;
						if(this.chessPiece.isType(piece.id, "comp_pawn")){
							new_array.push(array[1]);
						}
					}
				}
			}
		}
		return new_array;
	}

	switchColours(){
		var player1Elements = document.getElementsByClassName("player");
		var player2Elements = document.getElementsByClassName("comp-player");
		if(current_colour=="White"){
			this.current_colour = "Black";
			this.changePlayerColour(player1Elements, "Black");
			this.changePlayerColour(player2Elements, "White");
		}else{
			this.current_colour = "White";
			this.changePlayerColour(player1Elements, "White");
			this.changePlayerColour(player2Elements, "Black");
		}
	}

	changePlayerColour(playerElements, colour){
		if (colour=="White"){
			for (var i = 0; i < playerElements.length; i++ ) {
				playerElements[i].style.backgroundColor = "#C0C0C0";
			}
		}else {
			for (var i = 0; i < playerElements.length; i++ ) {
				playerElements[i].style.backgroundColor = "#404040";
			}	
		}
	}

}