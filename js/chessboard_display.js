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
	
	var chess_place_ids = chessMech.chessTool.get_chess_place_ids(chess_piece_ids);
	chessMech.chessTool.live_chessboard_matrix = chessMech.chessTool.live_chessboard_matrix_gen(chess_place_ids, chess_piece_ids);
	var matrixIsSame = chessMech.chessTool.matrixSame(chessMech.chessTool.live_chessboard_matrix, new_chessboard_matrix);
	var diffPiece = chessMech.chessTool.findDiffentPiece(chessMech.chessTool.live_chessboard_matrix, new_chessboard_matrix);
	var diffPieceCoor = chessMech.chessTool.findBoardCoordinates(new_chessboard_matrix, diffPiece);
	var diffPiecePlaceId = chessMech.chessTool.id_gen(diffPieceCoor[0], diffPieceCoor[1]); 
	
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
		this.chessTool = new ChessTools();
		this.rook = new Rook();
	}

	select(pieceId){
		this.prevSelectedHighlightIds = this.current_selected_movable_ids;
		this.current_selected_piece = document.getElementById(pieceId);
		this.current_selected_coordinates = this.chessTool.findPieceCoordinates(this.current_selected_piece);
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
						if(this.chessTool.isType(selectedId, "player_rook")){
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
		var leftOfPawn = this.chessTool.id_gen(y, x-1);
		var rightOfPawn = this.chessTool.id_gen(y, x+1);
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
		if(this.chessTool.isType(pieceId, "comp_pawn")){
			for(var i=0; i<this.compPawnStartingPositions.length; i++){
				if(this.chessTool.isType(pieceId, String(i+1))){
					var posBefore = this.chessTool.findPlaceCoordinates(this.compPawnStartingPositions[i]);
					var y = posBefore[0] + 1;
					var x = posBefore[1];
					var posNow = this.chessTool.findPlaceCoordinates(placeId);
					var nY = posNow[0] - 1;
					var nX = posNow[1];
					var placeIdWithPosBefore = this.chessTool.id_gen(y, x);
					var placeIdWithPosNow = this.chessTool.id_gen(nY, nX);
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
		var currentCoordinates = this.chessTool.findPlaceCoordinates(placeId);
		var enPassantOpponentPlaceId = this.chessTool.id_gen(currentCoordinates[0] + 1, currentCoordinates[1]);
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
		if(this.chessTool.isType(pieceId, "player_pawn")){
			for(var i=0; i<this.playerPawnsHasMoved.length; i++){
				if(this.chessTool.isType(pieceId, String(i+1))){
					this.playerPawnsHasMoved[i] = true;
				}
			}
		}
	}

	setCompPawnsHasMoved(pieceId){
		if(this.chessTool.isType(pieceId, "comp_pawn")){
			for(var i=0; i<this.compPawnsHasMoved.length; i++){
				if(this.chessTool.isType(pieceId, String(i+1))){
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
		if(this.chessTool.isType(pieceId, "pawn")){
			movablePlaces = this.enPassantMovement(this.shrinkPawnArray(this.getPawnMovablePlaces(x, y), "playing"), x, y);
		}
		else if(this.chessTool.isType(pieceId, "rook")){
			movablePlaces = this.rookExtraMoves(this.chessTool.shrinkContinuosArray(this.rook.movablePlaces(x, y)));
		}
		else if(this.chessTool.isType(pieceId, "bishop")){
			movablePlaces = this.chessTool.shrinkContinuosArray(this.getBishopMovablePlaces(x, y));
		}
		else if(this.chessTool.isType(pieceId, "queen")){
			movablePlaces = this.chessTool.shrinkContinuosArray(this.getQueenMovablePlaces(x, y));
		}
		else if(this.chessTool.isType(pieceId, "horse")){
			movablePlaces = this.getHorseMovablePlaces(x, y);
		}
		else if(this.chessTool.isType(pieceId, "king")){
			movablePlaces = this.carefullKing(this.kingExtraMoves(this.getKingMovablePlaces(x, y)));
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
			if(this.chessTool.isType(next, "player_rook1")){
				return true;
			}
		}
		return false;
	}

	rightRookHasMoved(){
		for(var i=0; i<this.movedPieces.length; i++){
			next = this.movedPieces[i];
			if(this.chessTool.isType(next, "player_rook2")){
				return true;
			}
		}
		return false;
	}

	kingHasMoved(){
		for(var i=0; i<this.movedPieces.length; i++){
			next = this.movedPieces[i];
			if(this.chessTool.isType(next, "player_king")){
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
		var king_coordinates = this.chessTool.findPieceCoordinates(king_piece);
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
		var placeCoordinates = this.chessTool.findPlaceCoordinates(placeId);
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
				if(this.chessTool.isType(nextPiece, type)){
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
						if(this.chessTool.isType(next.firstElementChild.id, "comp_horse")){
							attackingHorsePlaces.push(next.id);
						}
					}
				}
			}
		}
		return attackingHorsePlaces;
	}

	getPawnMovablePlaces(x, y){
		var matrix = this.chessTool.live_chessboard_matrix;
		var placeIds = [];
		if(x>=0&&x<=7&&y>=0&&y<=7){
			var leftFwd1Element = document.getElementById(this.chessTool.id_gen(y-1, x-1));
			var rightFwd1Element = document.getElementById(this.chessTool.id_gen(y-1, x+1));
			var fwd1Element = document.getElementById(this.chessTool.id_gen(y-1, x));
			var fwd2Element = document.getElementById(this.chessTool.id_gen(y-2, x));
			if(leftFwd1Element!=null){
				if(leftFwd1Element.childElementCount!=0){
					var leftFwd1Id = leftFwd1Element.firstElementChild.id;
					if(this.chessTool.isType(leftFwd1Id, "comp_")){
						placeIds[0] = leftFwd1Element.id;
					}
				}
			}
			if(rightFwd1Element!=null){
				if(rightFwd1Element.childElementCount!=0){
					var rightFwd1Id = rightFwd1Element.firstElementChild.id;
					if(this.chessTool.isType(rightFwd1Id, "comp_")){
						placeIds[1] = rightFwd1Element.id;
					}
				}
			}
			if(fwd1Element!=null){
				if(fwd1Element.childElementCount==0){
					placeIds[2] = fwd1Element.id;
				}
			}
			if(fwd2Element!=null){
				if(fwd2Element.childElementCount==0){
					placeIds[3] = fwd2Element.id;
				}
			}
		}
		return placeIds;
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
						if(this.chessTool.isType(piece.id, "comp_pawn")){
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
						if(this.chessTool.isType(piece.id, "comp_pawn")){
							new_array.push(array[1]);
						}
					}
				}
			}
		}
		return new_array;
	}

	getHorseMovablePlaces(x, y){
		var matrix = this.chessTool.live_chessboard_matrix;
		var placeIds = [];
		if(x>=0&&x<=7&&y>=0&&y<=7){
			var topThenRightElement = document.getElementById(this.chessTool.id_gen(y-2, x-1));
			var topThenLeftElement = document.getElementById(this.chessTool.id_gen(y-2, x+1));
			var bottomThenRightElement = document.getElementById(this.chessTool.id_gen(y+2, x+1));
			var bottomThenRightElement = document.getElementById(this.chessTool.id_gen(y+2, x+1));
			var bottomThenLeftElement = document.getElementById(this.chessTool.id_gen(y+2, x-1));
			var rightThenTopElement = document.getElementById(this.chessTool.id_gen(y-1, x+2));
			var rightThenBottomElement = document.getElementById(this.chessTool.id_gen(y+1, x+2));
			var leftThenTopElement = document.getElementById(this.chessTool.id_gen(y-1, x-2));
			var leftThenBottomElement = document.getElementById(this.chessTool.id_gen(y+1, x-2));
			if(topThenRightElement!=null){
				placeIds.push(topThenRightElement.id);	
			}
			if(topThenLeftElement!=null){
				placeIds.push(topThenLeftElement.id);		
			}
			if(bottomThenRightElement!=null){
				placeIds.push(bottomThenRightElement.id);
			}
			if(bottomThenLeftElement!=null){
				placeIds.push(bottomThenLeftElement.id);
			}
			if(rightThenTopElement!=null){
				placeIds.push(rightThenTopElement.id);
			}
			if(rightThenBottomElement!=null){
				placeIds.push(rightThenBottomElement.id);
			}
			if(leftThenTopElement!=null){
				placeIds.push(leftThenTopElement.id);
			}
			if(leftThenBottomElement!=null){
				placeIds.push(leftThenBottomElement.id);
			}
		}
		return placeIds;
	}

	

	getBishopMovablePlaces(x, y){
		var matrix = this.chessTool.live_chessboard_matrix;
		var placeIds = [];
		var leftUp = [];
		var rightUp = [];
		var leftDown = [];
		var rightDown = [];
		if(x>=0&&x<=7&&y>=0&&y<=7){
			for(var i=0; i<=7; i++){
				var b_x = x - i;
				var b_y = y - i;
				if(b_x<=7&&b_x>=0&&b_y<=7&&b_y>=0){
					if(b_x<x&&b_y<y){
						var nextElement = document.getElementById(this.chessTool.id_gen(b_y, b_x));
						if(nextElement!=null){
							leftUp[i] = nextElement.id;
							if(nextElement.childElementCount!=0){
								break;
							}
						}
					}
				}
			}
			for(var j=0; j<=7; j++){
				var b_x = x + j;
				var b_y = y - j;
				if(b_x<=7&&b_x>=0&&b_y<=7&&b_y>=0){
					if(b_x>x&&b_y<y){
						var nextElement = document.getElementById(this.chessTool.id_gen(b_y, b_x));
						if(nextElement!=null){
							rightUp[j] = nextElement.id;
							if(nextElement.childElementCount!=0){
								break;
							}
						}
					}
				}
			}
			for(var k=0; k<=7; k++){
				var b_x = x - k;
				var b_y = y + k;
				if(b_x<=7&&b_x>=0&&b_y<=7&&b_y>=0){
					if(b_x<x&&b_y>y){
						var nextElement = document.getElementById(this.chessTool.id_gen(b_y, b_x));
						if(nextElement!=null){
							leftDown[k] = nextElement.id;
							if(nextElement.childElementCount!=0){
								break;
							}
						}
					}
				}
			}
			for(var n=0; n<=7; n++){
				var b_x = x + n;
				var b_y = y + n;
				if(b_x<=7&&b_x>=0&&b_y<=7&&b_y>=0){
					if(b_x>x&&b_y>y){
						var nextElement = document.getElementById(this.chessTool.id_gen(b_y, b_x));
						if(nextElement!=null){
							rightDown[n] = nextElement.id;
							if(nextElement.childElementCount!=0){
								break;
							}
						}
					}
				}
			}
		}
		leftUp = this.chessTool.moveArrayToBack(leftUp);
		rightUp = this.chessTool.moveArrayToBack(rightUp);
		leftDown = this.chessTool.moveArrayToBack(leftDown);
		rightDown = this.chessTool.moveArrayToBack(rightDown);
		var leftToRight = leftDown.concat(rightUp);
		var rightToLeft = rightDown.concat(leftUp);
		placeIds = leftToRight.concat(rightToLeft);
		return placeIds;
	}

	getQueenMovablePlaces(x, y){
		var rookPlaces = this.getRookMovablePlaces(x, y);
		var bishopPlaces = this.getBishopMovablePlaces(x, y);
		var place_ids = rookPlaces.concat(bishopPlaces);
		return place_ids;
	}

	getKingMovablePlaces(x, y){
		var matrix = this.chessTool.live_chessboard_matrix;
		var placeIds = [];
		if(x>=0&&x<=7&&y>=0&&y<=7){
			var leftFwdElement = document.getElementById(this.chessTool.id_gen(y-1, x-1));
			var rightFwdElement = document.getElementById(this.chessTool.id_gen(y-1, x+1));
			var fwdElement = document.getElementById(this.chessTool.id_gen(y-1, x));
			var leftBkwdElement = document.getElementById(this.chessTool.id_gen(y+1, x-1));
			var rightBkwdElement = document.getElementById(this.chessTool.id_gen(y+1, x+1));
			var bkwdElement = document.getElementById(this.chessTool.id_gen(y+1, x));
			var rightElement = document.getElementById(this.chessTool.id_gen(y, x+1));
			var leftElement = document.getElementById(this.chessTool.id_gen(y, x-1));
			if(fwdElement!=null){
				placeIds.push(fwdElement.id);
			}
			if(bkwdElement!=null){
				placeIds.push(bkwdElement.id);
			}
			if(rightElement!=null){
				placeIds.push(rightElement.id);
			}
			if(leftElement!=null){
				placeIds.push(leftElement.id);
			}
			if(rightFwdElement!=null){
				placeIds.push(rightFwdElement.id);
			}
			if(leftFwdElement!=null){
				placeIds.push(leftFwdElement.id);
			}
			if(rightBkwdElement!=null){
				placeIds.push(rightBkwdElement.id);
			}
			if(leftBkwdElement!=null){
				placeIds.push(leftBkwdElement.id);
			}
		}
		return placeIds;
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