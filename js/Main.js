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
		[ "", "", "", "", "", "", "", ""],
		[ "player_pawn1", "player_pawn2", "player_pawn3", "player_pawn4", "player_pawn5", "player_pawn6", "player_pawn7", "player_pawn8" ],
		["player_rook1", "player_horse1", "player_bishop1", "player_queen", "player_king", "player_bishop2", "player_horse2", "player_rook2"]
	];

	/*	["comp_rook1", "comp_horse1", "", "comp_queen", "comp_king", "comp_bishop2", "", "comp_rook2"],
		[ "comp_pawn1", "", "comp_pawn3", "comp_pawn4", "comp_pawn5", "comp_pawn6", "comp_pawn7", "comp_pawn8" ],
		[ "comp_bishop1", "", "", "", "", "", "", ""],
		[ "", "comp_pawn2", "", "comp_horse2", "", "", "", ""],
		[ "", "", "player_pawn3", "", "", "", "", ""],
		[ "", "", "", "", "", "", "", ""],
		[ "player_pawn1", "player_pawn2", "", "player_pawn4", "player_pawn5", "player_pawn6", "player_pawn7", "player_pawn8" ],
		["player_rook1", "player_horse1", "player_bishop1", "player_queen", "player_king", "player_bishop2", "player_horse2", "player_rook2"]*/

	chessMech = new ChessMechanics();	

	chessMech.playerPawnStartingPositions = ["2A", "2B", "2C", "2D", "2E", "2F", "2G", "2H"];
	chessMech.compPawnStartingPositions = ["7A", "7B", "7C", "7D", "7E", "7F", "7G", "7H"];
	
	var chess_place_ids = chessMech.chessPiece.get_chess_place_ids(chess_piece_ids);
	chessMech.chessPiece.live_chessboard_matrix = chessMech.chessPiece.live_chessboard_matrix_gen(chess_place_ids, chess_piece_ids);
	var matrixIsSame = chessMech.chessPiece.matrixSame(chessMech.chessPiece.live_chessboard_matrix, new_chessboard_matrix);
	

	// changePieceLocation(chessMech.chessPiece.live_chessboard_matrix, new_chessboard_matrix);
 	

 	// changeMultiplePieceLocations(chessMech.chessPiece.live_chessboard_matrix, new_chessboard_matrix);
	
	
	var players = document.getElementsByClassName("player");
	var comp_players = document.getElementsByClassName("comp-player");
});

function changeMultiplePieceLocations(live_matrix, new_chessboard_matrix){
	var diffPieces = chessMech.chessPiece.shrinkContinuosArray(
 		chessMech.chessPiece.findMultipleDifferentPieces(live_matrix, new_chessboard_matrix)
 	);

	for(var i=0; i<diffPieces.length; i++){
 		var diffPiece = diffPieces[i];
 		var diffPieceCoor = chessMech.chessPiece.findBoardCoordinates(new_chessboard_matrix, diffPiece);
		var diffPiecePlaceId = chessMech.chessPiece.id_gen(diffPieceCoor[0], diffPieceCoor[1]);
		var diffElement = document.getElementById(diffPiece);
		var diffPlaceElement = document.getElementById(diffPiecePlaceId).appendChild(diffElement);
 	}
}

function changePieceLocation(live_matrix, new_chessboard_matrix){
	var diffPiece = chessMech.chessPiece.findDiffentPiece(live_matrix, new_chessboard_matrix);
	var diffPieceCoor = chessMech.chessPiece.findBoardCoordinates(new_chessboard_matrix, diffPiece);
	var diffPiecePlaceId = chessMech.chessPiece.id_gen(diffPieceCoor[0], diffPieceCoor[1]);
	var diffElement = document.getElementById(diffPiece);
	var diffPlaceElement = document.getElementById(diffPiecePlaceId).appendChild(diffElement);
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
		this.checkerGetter = new CheckerGetter();
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
		// console.log("Movable Params: "+
		// 	this.current_selected_piece.id+
		// 	" "+
		// 	this.current_selected_coordinates[1]+
		// 	" "+
		// 	this.current_selected_coordinates[0]
		// );
		this.current_selected_movable_ids = this.getMovable(
			this.current_selected_piece.id,
			this.current_selected_coordinates[1],
			this.current_selected_coordinates[0]
		);

		// console.log("Movable "+this.current_selected_movable_ids);
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
						// console.log("OUT Remove en passant: "+placeId+" "+this.currentEnPassantPlaceId);
						if(this.currentEnPassantPlaceId!=""||this.currentEnPassantPlaceId!=null){
							if(placeId==this.currentEnPassantPlaceId){
								// console.log("IN Remove en passant: "+placeId+" "+this.currentEnPassantPlaceId);
								this.removeEnPassantOpponent(placeId);	
							}
						}
						this.setPlayerPawnsHasMoved(selectedId);
					}
				}
			}
		}
	}


	removeEnPassantOpponent(placeId){
		// console.log("En passant opponent: ");
		var currentCoordinates = this.chessPiece.findPlaceCoordinates(placeId);
		var enPassantOpponentPlaceId = this.chessPiece.id_gen(currentCoordinates[0] + 1, currentCoordinates[1]);
		var enPassantOpponentPlace = document.getElementById(enPassantOpponentPlaceId);
		if(enPassantOpponentPlace!=null){
			var enPassantOpponent = enPassantOpponentPlace.firstElementChild;
			if(enPassantOpponent!=null){
				this.removeEnPassantOpponentHelper(enPassantOpponent.id);
			}
		}
		this.currentEnPassantPlaceId = "";
	}

	removeEnPassantOpponentHelper(pieceId){
		var current_element = document.getElementById(pieceId);
		var parent_id = current_element.parentElement.id;
		var parent_element = document.getElementById(parent_id);
		// console.log("Opponent Helper: "+parent_id+" "+pieceId+" "+this.currentEnPassantPlaceId);
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

	kingExtraMoves(kingArray){
		if(this.canCastleRight()){
			kingArray.push("1G")
			// console.log("can castle right");
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

	getMovable(pieceId, x, y){
		var movablePlaces = [];
		if(this.chessPiece.isType(pieceId, "pawn")){
			// console.log("Movable: start"+
			// 	this.compPawnStartingPositions+
			// 	" place "+ 
			// 	this.currentEnPassantPlaceId+
			// 	" opplft "+
			// 	this.enPassantOpponentLeft+
			// 	" opprgt "+ 
			// 	this.enPassantOpponentRight+
			// 	" bool "+ 
			// 	this.isEnPassant+
			// 	" curropp "+ 
			// 	this.currentEnPassantOpponentPlaceId
			// );
			movablePlaces = this.pawn.movablePlaces(
				this.compPawnStartingPositions, 
				this.currentEnPassantPlaceId,
				this.enPassantOpponentLeft, 
				this.enPassantOpponentRight, 
				this.isEnPassant, 
				this.currentEnPassantOpponentPlaceId,
				x, 
				y
			);
			this.currentEnPassantPlaceId = this.pawn.getEnPassantPlace();
			this.currentEnPassantOpponentPlaceId = this.pawn.getEnPassantOpponentPlace();
		}
		else if(this.chessPiece.isType(pieceId, "rook")){
			movablePlaces = this.rookExtraMoves(this.rook.movablePlaces(x, y));
		}
		else if(this.chessPiece.isType(pieceId, "bishop")){
			movablePlaces = this.bishop.movablePlaces(x, y);
		}
		else if(this.chessPiece.isType(pieceId, "queen")){
			movablePlaces = this.queen.movablePlaces(x, y);
		}
		else if(this.chessPiece.isType(pieceId, "horse")){
			movablePlaces = this.horse.movablePlaces(x, y);
		}
		else if(this.chessPiece.isType(pieceId, "king")){
			movablePlaces = this.checkerGetter.carefullKing(this.kingExtraMoves(this.king.getKingMovablePlaces(x, y)));
		}
		return movablePlaces;
	}

	canCastleRight(){
		if(
			!this.king.kingHasMoved(this.movedPieces)&&
			!this.checkerGetter.kingHasCheck()&&
			!this.rook.rightRookHasMoved(this.movedPieces)&&
			!this.checkerGetter.toRightRookHasCheck()&&
			!this.rook.toRightRookHasPieces()
		){
			return true;
		}
		return false;
	}

	canCastleLeft(){
		if(
			!this.king.kingHasMoved(this.movedPieces)&&
			!this.checkerGetter.kingHasCheck()&&
			!this.rook.leftRookHasMoved(this.movedPieces)&&
			!this.checkerGetter.toLeftRookHasCheck()&&
			!this.rook.toLeftRookHasPieces()
		){
			return true;
		}
		return false;
	}


	switchColours(){
		var player1Elements = document.getElementsByClassName("player");
		var player2Elements = document.getElementsByClassName("comp-player");
		if(this.current_colour=="White"){
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