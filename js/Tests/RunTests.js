$(document).ready(function(){

	runChessPieceTests();
	runHorseTests();
	runBishopTests();
	runPawnTests();
	runRookTests();
	runQueenTests();
	runKingTests();
	runCheckerGetterTests();
	runCastlingTests();
	runChessMechanicsTests();

});

function runChessMechanicsTests(){
	var testcase = new TestChessMechanics();

	testcase.testCarefullKing();
	testcase.testEnPassant();
	testcase.testSwitchColours();
}

class TestChessMechanics{
	
	constructor(){
		this.checkerGetter = new CheckerGetter();
		this.king = new King();
		this.pawn = new Pawn();
		this.chessMech = new ChessMechanics();
	}

	testCarefullKing(){
		var original_chessboard_matrix = [
			["comp_rook1", "comp_horse1", "comp_bishop1", "comp_queen", "comp_king", "comp_bishop2", "comp_horse2", "comp_rook2"],
			[ "comp_pawn1", "comp_pawn2", "comp_pawn3", "comp_pawn4", "comp_pawn5", "comp_pawn6", "comp_pawn7", "comp_pawn8" ],
			[ "", "", "", "", "", "", "", ""],
			[ "", "", "", "", "", "", "", ""],
			[ "", "", "", "", "", "", "", ""],
			[ "", "", "", "", "", "", "", ""],
			[ "player_pawn1", "player_pawn2", "player_pawn3", "player_pawn4", "player_pawn5", "player_pawn6", "player_pawn7", "player_pawn8" ],
			["player_rook1", "player_horse1", "player_bishop1", "player_queen", "player_king", "player_bishop2", "player_horse2", "player_rook2"]
		];

		var first_chessboard_matrix = [
			["comp_rook1", "comp_horse1", "", "comp_queen", "comp_king", "comp_bishop2", "comp_horse2", "comp_rook2"],
			[ "comp_pawn1", "comp_pawn2", "comp_pawn3", "comp_pawn4", "comp_pawn5", "comp_pawn6", "comp_pawn7", "comp_pawn8" ],
			[ "comp_bishop1", "", "", "", "", "", "", ""],
			[ "", "", "", "", "", "", "", ""],
			[ "", "", "", "", "", "", "", ""],
			[ "player_horse1", "player_bishop1", "player_queen", "", "", "player_pawn5", "player_horse2", "player_bishop2"],
			[ "player_pawn1", "player_pawn2", "player_pawn3", "player_pawn4", "", "player_pawn6", "player_pawn7", "player_pawn8" ],
			["player_rook1", "", "", "", "player_king", "", "", "player_rook2"]
		];

		changeMultiplePieceLocations(original_chessboard_matrix, first_chessboard_matrix);

		var moves = this.checkerGetter.carefullKing(this.king.getKingMovablePlaces(4, 7));
		changeMultiplePieceLocations(first_chessboard_matrix, original_chessboard_matrix);
		// console.log("Moves: "+moves);
		var expectedResult = ["1D", "2F", "2D"];

		for(var i=0; i<expectedResult.length; i++){
			if(moves[i]!=expectedResult[i]){
				console.assert(moves[i]==expectedResult[i], "Carefull king not working");
			}
		}
	}

	testEnPassant(){
		var original_chessboard_matrix = [
			["comp_rook1", "comp_horse1", "comp_bishop1", "comp_queen", "comp_king", "comp_bishop2", "comp_horse2", "comp_rook2"],
			[ "comp_pawn1", "comp_pawn2", "comp_pawn3", "comp_pawn4", "comp_pawn5", "comp_pawn6", "comp_pawn7", "comp_pawn8" ],
			[ "", "", "", "", "", "", "", ""],
			[ "", "", "", "", "", "", "", ""],
			[ "", "", "", "", "", "", "", ""],
			[ "", "", "", "", "", "", "", ""],
			[ "player_pawn1", "player_pawn2", "player_pawn3", "player_pawn4", "player_pawn5", "player_pawn6", "player_pawn7", "player_pawn8" ],
			["player_rook1", "player_horse1", "player_bishop1", "player_queen", "player_king", "player_bishop2", "player_horse2", "player_rook2"]
		];

		var first_chessboard_matrix = [
			["comp_rook1", "comp_horse1", "comp_bishop1", "comp_queen", "comp_king", "comp_bishop2", "comp_horse2", "comp_rook2"],
			[ "comp_pawn1", "", "comp_pawn3", "comp_pawn4", "comp_pawn5", "comp_pawn6", "comp_pawn7", "comp_pawn8" ],
			[ "", "", "", "", "", "", "", ""],
			[ "", "comp_pawn2", "player_pawn2", "", "", "", "", ""],
			[ "", "", "", "", "", "", "", ""],
			[ "", "", "", "", "", "", "", ""],
			[ "player_pawn1", "", "player_pawn3", "player_pawn4", "player_pawn5", "player_pawn6", "player_pawn7", "player_pawn8" ],
			["player_rook1", "player_horse1", "player_bishop1", "player_queen", "player_king", "player_bishop2", "player_horse2", "player_rook2"]
		];

		var second_chessboard_matrix = [
			["comp_rook1", "comp_horse1", "comp_bishop1", "comp_queen", "comp_king", "comp_bishop2", "comp_horse2", "comp_rook2"],
			[ "comp_pawn1", "", "comp_pawn3", "comp_pawn4", "comp_pawn5", "comp_pawn6", "comp_pawn7", "comp_pawn8" ],
			[ "", "player_pawn", "", "", "", "", "", ""],
			[ "", "comp_pawn2", "", "", "", "", "", ""],
			[ "", "", "", "", "", "", "", ""],
			[ "", "", "", "", "", "", "", ""],
			[ "player_pawn1", "", "player_pawn3", "player_pawn4", "player_pawn5", "player_pawn6", "player_pawn7", "player_pawn8" ],
			["player_rook1", "player_horse1", "player_bishop1", "player_queen", "player_king", "player_bishop2", "player_horse2", "player_rook2"]
		];
		
		this.chessMech.playerPawnStartingPositions = ["2A", "2B", "2C", "2D", "2E", "2F", "2G", "2H"];
		this.chessMech.compPawnStartingPositions = ["7A", "7B", "7C", "7D", "7E", "7F", "7G", "7H"];
	
		
		chessMech.chessPiece.live_chessboard_matrix = first_chessboard_matrix;
		changeMultiplePieceLocations(original_chessboard_matrix, first_chessboard_matrix);
		var enPassantOpponent = document.getElementById("5B");
		if(enPassantOpponent!=null){
			if(enPassantOpponent.firstElementChild!=null){
				// console.log(enPassantOpponent.firstElementChild.id+" -> test comp_pawn2");
				console.assert(enPassantOpponent.firstElementChild.id=="comp_pawn2", "Pawn not places to start test");
			}
		}

		this.chessMech.select("player_pawn2");
		this.chessMech.moveTo("6B");

		var enPassantOpponentAfter = document.getElementById("5B");
		if(enPassantOpponentAfter!=null){
			console.assert(!enPassantOpponentAfter.firstElementChild, "En Passant test failed");
		}
		// changeMultiplePieceLocations(second_chessboard_matrix, original_chessboard_matrix);

	}

	changeMultiplePieceLocations(live_matrix, new_chessboard_matrix){
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

	testSwitchColours(){
		var pieceElementBefore = document.getElementById("player_pawn1");
		this.chessMech.switchColours();
		console.assert(pieceElementBefore.style.backgroundColor=="rgb(64, 64, 64)", "Player pawn colour not set");
		this.chessMech.switchColours();
		console.assert(pieceElementBefore.style.backgroundColor=="rgb(192, 192, 192)", "Player pawn not changing colour");
		// console.log("Pawn element after after: "+pieceElementBefore.style.backgroundColor);
		// var pieceElementAfter= document.getElementById("player_pawn1");
	}
}

function runCastlingTests(){
	var testcase = new TestCastling();

	testcase.testCanCastleLeft();
	testcase.testCannotCastleLeft();
	testcase.testCanCastleRight();
	testcase.testCannotCastleRight();
}

class TestCastling {
	constructor(){
		this.chessMech = new ChessMechanics();
	}

	testCanCastleLeft(){
		var original_chessboard_matrix = [
			["comp_rook1", "comp_horse1", "comp_bishop1", "comp_queen", "comp_king", "comp_bishop2", "comp_horse2", "comp_rook2"],
			[ "comp_pawn1", "comp_pawn2", "comp_pawn3", "comp_pawn4", "comp_pawn5", "comp_pawn6", "comp_pawn7", "comp_pawn8" ],
			[ "", "", "", "", "", "", "", ""],
			[ "", "", "", "", "", "", "", ""],
			[ "", "", "", "", "", "", "", ""],
			[ "", "", "", "", "", "", "", ""],
			[ "player_pawn1", "player_pawn2", "player_pawn3", "player_pawn4", "player_pawn5", "player_pawn6", "player_pawn7", "player_pawn8" ],
			["player_rook1", "player_horse1", "player_bishop1", "player_queen", "player_king", "player_bishop2", "player_horse2", "player_rook2"]
		];

		var first_chessboard_matrix = [
			["comp_rook1", "comp_horse1", "comp_bishop1", "comp_queen", "comp_king", "comp_bishop2", "comp_horse2", "comp_rook2"],
			[ "comp_pawn1", "comp_pawn2", "comp_pawn3", "comp_pawn4", "comp_pawn5", "comp_pawn6", "comp_pawn7", "comp_pawn8" ],
			[ "", "", "", "", "", "", "", ""],
			[ "", "", "", "", "", "", "", ""],
			[ "", "", "", "", "", "", "", ""],
			[ "player_horse1", "player_bishop1", "player_queen", "", "", "", "", ""],
			[ "player_pawn1", "player_pawn2", "player_pawn3", "player_pawn4", "player_pawn5", "player_pawn6", "player_pawn7", "player_pawn8" ],
			["player_rook1", "", "", "", "player_king", "player_bishop2", "player_horse2", "player_rook2"]
		];

		changeMultiplePieceLocations(original_chessboard_matrix, first_chessboard_matrix);
		// console.log("toleftCanCkeck"+chessMech.canCastleLeft());
		console.assert(chessMech.canCastleLeft(), "castling left check not working");
		changeMultiplePieceLocations(first_chessboard_matrix, original_chessboard_matrix);

	}

	testCannotCastleLeft(){
		var original_chessboard_matrix = [
			["comp_rook1", "comp_horse1", "comp_bishop1", "comp_queen", "comp_king", "comp_bishop2", "comp_horse2", "comp_rook2"],
			[ "comp_pawn1", "comp_pawn2", "comp_pawn3", "comp_pawn4", "comp_pawn5", "comp_pawn6", "comp_pawn7", "comp_pawn8" ],
			[ "", "", "", "", "", "", "", ""],
			[ "", "", "", "", "", "", "", ""],
			[ "", "", "", "", "", "", "", ""],
			[ "", "", "", "", "", "", "", ""],
			[ "player_pawn1", "player_pawn2", "player_pawn3", "player_pawn4", "player_pawn5", "player_pawn6", "player_pawn7", "player_pawn8" ],
			["player_rook1", "player_horse1", "player_bishop1", "player_queen", "player_king", "player_bishop2", "player_horse2", "player_rook2"]
		];

		var second_chessboard_matrix = [
			["comp_rook1", "comp_horse1", "comp_bishop1", "comp_queen", "comp_king", "", "comp_horse2", "comp_rook2"],
			[ "comp_pawn1", "comp_pawn2", "comp_pawn3", "comp_pawn4", "comp_pawn5", "comp_pawn6", "comp_pawn7", "comp_pawn8" ],
			[ "", "", "", "", "", "", "", "comp_bishop2"],
			[ "", "", "", "", "", "", "", ""],
			[ "", "", "", "", "", "", "", ""],
			[ "player_horse1", "player_bishop1", "player_queen", "player_pawn4", "", "", "", ""],
			[ "player_pawn1", "player_pawn2", "player_pawn3", "", "player_pawn5", "player_pawn6", "player_pawn7", "player_pawn8" ],
			["player_rook1", "", "", "", "player_king", "player_bishop2", "player_horse2", "player_rook2"]
		];

		changeMultiplePieceLocations(original_chessboard_matrix, second_chessboard_matrix);
		// console.log("toleftCanCheck "+chessMech.canCastleLeft());
		console.assert(!chessMech.canCastleLeft(), "castling left check not working");
		changeMultiplePieceLocations(second_chessboard_matrix, original_chessboard_matrix);

	}

	testCanCastleRight(){
		var original_chessboard_matrix = [
			["comp_rook1", "comp_horse1", "comp_bishop1", "comp_queen", "comp_king", "comp_bishop2", "comp_horse2", "comp_rook2"],
			[ "comp_pawn1", "comp_pawn2", "comp_pawn3", "comp_pawn4", "comp_pawn5", "comp_pawn6", "comp_pawn7", "comp_pawn8" ],
			[ "", "", "", "", "", "", "", ""],
			[ "", "", "", "", "", "", "", ""],
			[ "", "", "", "", "", "", "", ""],
			[ "", "", "", "", "", "", "", ""],
			[ "player_pawn1", "player_pawn2", "player_pawn3", "player_pawn4", "player_pawn5", "player_pawn6", "player_pawn7", "player_pawn8" ],
			["player_rook1", "player_horse1", "player_bishop1", "player_queen", "player_king", "player_bishop2", "player_horse2", "player_rook2"]
		];

		var first_chessboard_matrix = [
			["comp_rook1", "comp_horse1", "comp_bishop1", "comp_queen", "comp_king", "comp_bishop2", "comp_horse2", "comp_rook2"],
			[ "comp_pawn1", "comp_pawn2", "comp_pawn3", "comp_pawn4", "comp_pawn5", "comp_pawn6", "comp_pawn7", "comp_pawn8" ],
			[ "", "", "", "", "", "", "", ""],
			[ "", "", "", "", "", "", "", ""],
			[ "", "", "", "", "", "", "", ""],
			[ "player_horse1", "player_bishop1", "player_queen", "", "", "", "player_horse2", "player_bishop2"],
			[ "player_pawn1", "player_pawn2", "player_pawn3", "player_pawn4", "player_pawn5", "player_pawn6", "player_pawn7", "player_pawn8" ],
			["player_rook1", "", "", "", "player_king", "", "", "player_rook2"]
		];

		changeMultiplePieceLocations(original_chessboard_matrix, first_chessboard_matrix);
		// console.log("toleftCanCheck "+chessMech.canCastleRight());
		console.assert(chessMech.canCastleRight(), "not castling right check not working");
		changeMultiplePieceLocations(first_chessboard_matrix, original_chessboard_matrix);

	}

	testCannotCastleRight(){
		var original_chessboard_matrix = [
			["comp_rook1", "comp_horse1", "comp_bishop1", "comp_queen", "comp_king", "comp_bishop2", "comp_horse2", "comp_rook2"],
			[ "comp_pawn1", "comp_pawn2", "comp_pawn3", "comp_pawn4", "comp_pawn5", "comp_pawn6", "comp_pawn7", "comp_pawn8" ],
			[ "", "", "", "", "", "", "", ""],
			[ "", "", "", "", "", "", "", ""],
			[ "", "", "", "", "", "", "", ""],
			[ "", "", "", "", "", "", "", ""],
			[ "player_pawn1", "player_pawn2", "player_pawn3", "player_pawn4", "player_pawn5", "player_pawn6", "player_pawn7", "player_pawn8" ],
			["player_rook1", "player_horse1", "player_bishop1", "player_queen", "player_king", "player_bishop2", "player_horse2", "player_rook2"]
		];

		var first_chessboard_matrix = [
			["comp_rook1", "comp_horse1", "", "comp_queen", "comp_king", "comp_bishop2", "comp_horse2", "comp_rook2"],
			[ "comp_pawn1", "comp_pawn2", "comp_pawn3", "comp_pawn4", "comp_pawn5", "comp_pawn6", "comp_pawn7", "comp_pawn8" ],
			[ "comp_bishop1", "", "", "", "", "", "", ""],
			[ "", "", "", "", "", "", "", ""],
			[ "", "", "", "", "", "", "", ""],
			[ "player_horse1", "player_bishop1", "player_queen", "", "", "player_pawn5", "player_horse2", "player_bishop2"],
			[ "player_pawn1", "player_pawn2", "player_pawn3", "player_pawn4", "", "player_pawn6", "player_pawn7", "player_pawn8" ],
			["player_rook1", "", "", "", "player_king", "", "", "player_rook2"]
		];

		changeMultiplePieceLocations(original_chessboard_matrix, first_chessboard_matrix);
		// console.log("toRightCanCheck "+chessMech.canCastleRight());
		console.assert(!chessMech.canCastleRight(), "not castling right check not working");
		changeMultiplePieceLocations(first_chessboard_matrix, original_chessboard_matrix);

	}

	changeMultiplePieceLocations(live_matrix, new_chessboard_matrix){
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

}

function runCheckerGetterTests(){
	var testcase = new TestCheckerGetter();

	testcase.testKingCanCheck();
}

class TestCheckerGetter {
	constructor(){
		this.checkerGetter = new CheckerGetter();
	}

	testKingCanCheck(){
		var first_chessboard_matrix = [
			["comp_rook1", "comp_horse1", "comp_bishop1", "", "comp_king", "comp_bishop2", "comp_horse2", "comp_rook2"],
			[ "comp_pawn1", "comp_pawn2", "comp_pawn3", "comp_pawn4", "comp_pawn5", "comp_pawn6", "comp_pawn7", "comp_pawn8" ],
			[ "", "", "", "", "", "", "", ""],
			[ "", "", "", "", "", "", "", ""],
			[ "", "comp_queen", "", "player_pawn4", "", "", "", ""],
			[ "", "", "", "", "", "", "", ""],
			[ "player_pawn1", "player_pawn2", "player_pawn3", "", "player_pawn5", "player_pawn6", "player_pawn7", "player_pawn8" ],
			["player_rook1", "player_horse1", "player_bishop1", "player_queen", "player_king", "player_bishop2", "player_horse2", "player_rook2"]
		];

		var second_chessboard_matrix = [
			["comp_rook1", "comp_horse1", "comp_bishop1", "comp_queen", "comp_king", "comp_bishop2", "comp_horse2", "comp_rook2"],
			[ "comp_pawn1", "comp_pawn2", "comp_pawn3", "comp_pawn4", "comp_pawn5", "comp_pawn6", "comp_pawn7", "comp_pawn8" ],
			[ "", "", "", "", "", "", "", ""],
			[ "", "", "", "", "", "", "", ""],
			[ "", "", "", "", "", "", "", ""],
			[ "", "", "", "", "", "", "", ""],
			[ "player_pawn1", "player_pawn2", "player_pawn3", "player_pawn4", "player_pawn5", "player_pawn6", "player_pawn7", "player_pawn8" ],
			["player_rook1", "player_horse1", "player_bishop1", "player_queen", "player_king", "player_bishop2", "player_horse2", "player_rook2"]
		];
 
		changeMultiplePieceLocations(second_chessboard_matrix, first_chessboard_matrix);
 		var checkerGetter = new CheckerGetter();
 		console.assert(checkerGetter.kingHasCheck(), "KingHasCheck method not working");
 		changeMultiplePieceLocations(first_chessboard_matrix, second_chessboard_matrix);
	}

	changeMultiplePieceLocations(live_matrix, new_chessboard_matrix){
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

}

function runHorseTests(){
	var testcase = new TestHorse();

	testcase.testMovablePlaces();
}

class TestHorse{
	
	constructor(){
		this.horse = new Horse();
	}

	testMovablePlaces(){
		var expectedResult = ["7G", "3G", "6F", "4F"];
		var movable = this.horse.movablePlaces(7, 3);
		// console.log("Movable: "+movable);
		for(var i=0; i<movable.length; i++){
			if(movable[i]!=expectedResult[i]){
				console.assert(movable[i]==expectedResult[i], "Movable not returning correct places");
			}
		}
	}
}

function runPawnTests(){
	var testcase = new TestPawn();

	testcase.testGetMovablePlaces();
}

class TestPawn{
	
	constructor(){
		this.pawn = new Pawn();
		this.chessPiece = new ChessPiece();
	}

	testGetMovablePlaces(){
		// var expectedResult = ["7G", "3G", "6F", "4F"];
		var movable = this.pawn.getPawnMovablePlaces(5, 6);
		var movableWithPawn = this.pawn.getPawnMovablePlaces(3, 2);
		var expectedMovable = [,, "3F", "4F"];
		// var expectedMovableWithPawn = ["5B",, "5C", "6C"];
		var expectedMovableWithPawn = ["7C", "7E"];
		// console.log("Movable: "+movable+" - "+movableWithPawn);
		
		for(var i=0; i<movable.length; i++){
			if(movable[i]!=expectedMovable[i]){
				console.assert(movable[i]==expectedMovable[i],
					"pawn Movable not returning correct places: "+movable[i]+" "+expectedMovable[i]
				);
			}
		}

		for(var j=0; j<movableWithPawn.length; j++){
			if(movableWithPawn[j]!=expectedMovableWithPawn[j]){
				console.assert(movableWithPawn[j]==expectedMovableWithPawn[j], "pawn Movable with opponent pawn not returning correct places");
			}
		}
	}
}

function runBishopTests(){
	var testcase = new TestBishop();

	testcase.testMovablePlaces();
}

class TestBishop{
	
	constructor(){
		this.bishop = new Bishop();
	}

	testMovablePlaces(){
		var expectedResult = ["2B", "4D", "5E", "6F", "7G", "2D", "4B", "5A"];
		var movable = this.bishop.movablePlaces(2, 5);
		// console.log("Movable: "+movable);
		for(var i=0; i<movable.length; i++){
			if(movable[i]!=expectedResult[i]){
				console.assert(movable[i]==expectedResult[i], "Movable not returning correct places");
			}
		}
	}
}

function runRookTests(){
	var testcase = new TestRook();

	testcase.testMovablePlaces();
}

class TestRook{
	
	constructor(){
		this.rook = new Rook();
	}

	testMovablePlaces(){
		var expectedResult = ["3B", "3A" ,"3D" ,"3E" , "3F" , "3G", "3H", "4C", "5C", "6C", "7C", "2C"];
		var movable = this.rook.movablePlaces(2, 5);
		// console.log("Movable: "+movable);
		for(var i=0; i<movable.length; i++){
			if(movable[i]!=expectedResult[i]){
				console.assert(movable[i]==expectedResult[i], "Movable not returning correct places");
			}
		}
	}
}

function runQueenTests(){
	var testcase = new TestQueen();

	testcase.testMovablePlaces();
}

class TestQueen{
	
	constructor(){
		this.queen = new Queen();
	}

	testMovablePlaces(){
		var expectedResult = [
			"3B", "3A" ,"3D" ,"3E" , "3F" , "3G", "3H", "4C", "5C", "6C", "7C", "2C",
			"2B", "4D", "5E", "6F", "7G", "2D", "4B", "5A"
		];
		var movable = this.queen.movablePlaces(2, 5);
		// console.log("Movable: "+movable);
		for(var i=0; i<movable.length; i++){
			if(movable[i]!=expectedResult[i]){
				console.assert(movable[i]==expectedResult[i], "Movable not returning correct places");
			}
		}
	}
}

function runKingTests(){
	var testcase = new TestKing();

	testcase.testMovablePlaces();
}

class TestKing{
	
	constructor(){
		this.king = new King();
	}

	testMovablePlaces(){
		var expectedResult = ["4C","2C","3D","3B","4D","4B","2D","2B"];
		var movable = this.king.getKingMovablePlaces(2, 5);
		// console.log("Movable: "+movable);
		for(var i=0; i<movable.length; i++){
			if(movable[i]!=expectedResult[i]){
				console.assert(movable[i]==expectedResult[i], "Movable not returning correct places");
			}
		}
	}
}

function runChessPieceTests(){
	var testcase = new TestChessPiece();

	testcase.testMoveArrayToBack();
	testcase.testShrinkContinuosArray();
	testcase.testFindPlaceCoordinates();
	testcase.testIsType();
	testcase.test_first_coordinate_gen();
	testcase.test_second_coordinate_gen();
	testcase.test_id_gen();
	testcase.testMatrixSame();
	testcase.testFindDiffentPiece();
	testcase.testFindMultipleDifferentPieces();
	testcase.testFindPlaceCoordinates();
	testcase.test_get_chess_place_ids();
	testcase.test_live_chessboard_matrix_gen();
}

class TestChessPiece{
	
	constructor(){
		this.chessPiece = new ChessPiece();
	}

	testMoveArrayToBack(){
		var array = ["A", "B", "C", "", ""];
		var arrayAtBack = ["", "", "A", "B", "C"];
		var arrayAfter = this.chessPiece.moveArrayToBack(array);
		for(var i=0; i<array; i++){
			if(arrayAfter[i]!=arrayAtBack[i]){
				console.assert(arrayAfter[i]==arrayAtBack[i], "move array to back not working");
			}
		}
	}

	testShrinkContinuosArray(){
		var array = ["A", "", "B", "C", "", ""];
		var shrunkenArray = ["A", "B", "C"];
		var arrayAfter = this.chessPiece.shrinkContinuosArray(array);		
		console.assert(arrayAfter.length==shrunkenArray.length, "shrink continuos array not working");
	}

	testFindPlaceCoordinates(){
		var placeId = "2C";
		var expectedCoordinates = [6, 2]
		var coordinates = this.chessPiece.findPlaceCoordinates(placeId);
		console.assert(expectedCoordinates[0]==coordinates[0], "find coordinates wrong y coordinate: "+expectedCoordinates[0]+" "+coordinates[0]);
		console.assert(expectedCoordinates[1]==coordinates[1], "find coordinates wrong x coordinate: "+expectedCoordinates[1]+" "+coordinates[1]);
	}

	testIsType(){
		var pieceId1 = "player_rook1";
		var pieceId2 = "comp_king";
		var pieceId3 = "player_pawn5";

		console.assert(this.chessPiece.isType(pieceId1, "rook"), "is type cannot verify type of piece");
		console.assert(this.chessPiece.isType(pieceId2, "comp_"), "is type cannot verify if player or opponent");
		console.assert(this.chessPiece.isType(pieceId3, "5"), "is type cannot verify number of piece");
	}

	test_first_coordinate_gen(fstAttr){
		var input = 5;
		var expectedResult = "3";

		console.assert(this.chessPiece.first_coordinate_gen(input)==expectedResult,
					"Does not generate first coordinate "+expectedResult+" "+this.chessPiece.first_coordinate_gen(input)
		);
	}

	test_second_coordinate_gen(fstAttr){
		var input = "F";
		var expectedResult = "5";

		console.assert(this.chessPiece.second_coordinate_gen(input)==expectedResult, 
			"Does not generate second coordinate "+expectedResult+" "+this.chessPiece.second_coordinate_gen(input)
		);
	}

	test_id_gen(){
		var input = [6, 2];
		var expectedResult = "2C";

		console.assert(this.chessPiece.id_gen(input[0], input[1])==expectedResult, "Id gen does not generate the correct Id");
	}

	testMatrixSame(){
		var first_chessboard_matrix = [
			["comp_rook1", "comp_horse1", "comp_bishop1", "comp_queen", "comp_king", "comp_bishop2", "comp_horse2", "comp_rook2"],
			[ "comp_pawn1", "", "comp_pawn3", "comp_pawn4", "comp_pawn5", "comp_pawn6", "comp_pawn7", "comp_pawn8" ],
			[ "", "", "", "", "", "", "", ""],
			[ "", "comp_pawn2", "", "", "", "", "", ""],
			[ "", "", "", "", "", "", "", ""],
			[ "player_horse1", "", "", "", "", "", "", ""],
			[ "player_pawn1", "player_pawn2", "player_pawn3", "player_pawn4", "player_pawn5", "player_pawn6", "player_pawn7", "player_pawn8" ],
			["player_rook1", "", "player_bishop1", "player_queen", "player_king", "player_bishop2", "player_horse2", "player_rook2"]
		];

		var second_chessboard_matrix = [
			["comp_rook1", "comp_horse1", "comp_bishop1", "comp_queen", "comp_king", "comp_bishop2", "comp_horse2", "comp_rook2"],
			[ "comp_pawn1", "comp_pawn2", "comp_pawn3", "comp_pawn4", "comp_pawn5", "comp_pawn6", "comp_pawn7", "comp_pawn8" ],
			[ "", "", "", "", "", "", "", ""],
			[ "", "", "", "", "", "", "", ""],
			[ "", "", "", "", "", "", "", ""],
			[ "player_horse1", "", "", "", "", "", "", ""],
			[ "player_pawn1", "player_pawn2", "player_pawn3", "player_pawn4", "player_pawn5", "player_pawn6", "player_pawn7", "player_pawn8" ],
			["player_rook1", "", "player_bishop1", "player_queen", "player_king", "player_bishop2", "player_horse2", "player_rook2"]
		];

		var third_chessboard_matrix = [
			["comp_rook1", "comp_horse1", "comp_bishop1", "comp_queen", "comp_king", "comp_bishop2", "comp_horse2", "comp_rook2"],
			[ "comp_pawn1", "", "comp_pawn3", "comp_pawn4", "comp_pawn5", "comp_pawn6", "comp_pawn7", "comp_pawn8" ],
			[ "", "", "", "", "", "", "", ""],
			[ "", "comp_pawn2", "", "", "", "", "", ""],
			[ "", "", "", "", "", "", "", ""],
			[ "player_horse1", "", "", "", "", "", "", ""],
			[ "player_pawn1", "player_pawn2", "player_pawn3", "player_pawn4", "player_pawn5", "player_pawn6", "player_pawn7", "player_pawn8" ],
			["player_rook1", "", "player_bishop1", "player_queen", "player_king", "player_bishop2", "player_horse2", "player_rook2"]
		];

		console.assert(!this.chessPiece.matrixSame(first_chessboard_matrix, second_chessboard_matrix), "matrixSame incorrect for different matrices");
		console.assert(this.chessPiece.matrixSame(first_chessboard_matrix, third_chessboard_matrix), "matrix same incorrect on identical matrices");		
	}

	testFindDiffentPiece(){
		var first_chessboard_matrix = [
			["comp_rook1", "comp_horse1", "comp_bishop1", "comp_queen", "comp_king", "comp_bishop2", "comp_horse2", "comp_rook2"],
			[ "comp_pawn1", "", "comp_pawn3", "comp_pawn4", "comp_pawn5", "comp_pawn6", "comp_pawn7", "comp_pawn8" ],
			[ "", "", "", "", "", "", "", ""],
			[ "", "comp_pawn2", "", "", "", "", "", ""],
			[ "", "", "", "", "", "", "", ""],
			[ "player_horse1", "", "", "", "", "", "", ""],
			[ "player_pawn1", "player_pawn2", "player_pawn3", "player_pawn4", "player_pawn5", "player_pawn6", "player_pawn7", "player_pawn8" ],
			["player_rook1", "", "player_bishop1", "player_queen", "player_king", "player_bishop2", "player_horse2", "player_rook2"]
		];

		var second_chessboard_matrix = [
			["comp_rook1", "comp_horse1", "comp_bishop1", "comp_queen", "comp_king", "comp_bishop2", "comp_horse2", "comp_rook2"],
			[ "comp_pawn1", "comp_pawn2", "comp_pawn3", "comp_pawn4", "comp_pawn5", "comp_pawn6", "comp_pawn7", "comp_pawn8" ],
			[ "", "", "", "", "", "", "", ""],
			[ "", "", "", "", "", "", "", ""],
			[ "", "", "", "", "", "", "", ""],
			[ "player_horse1", "", "", "", "", "", "", ""],
			[ "player_pawn1", "player_pawn2", "player_pawn3", "player_pawn4", "player_pawn5", "player_pawn6", "player_pawn7", "player_pawn8" ],
			["player_rook1", "", "player_bishop1", "player_queen", "player_king", "player_bishop2", "player_horse2", "player_rook2"]
		];

		var expectedResult = "comp_pawn2";

		console.assert(this.chessPiece.findDiffentPiece(second_chessboard_matrix, first_chessboard_matrix)==expectedResult, "Find Different piece not working");
	}

	testFindMultipleDifferentPieces(){
		var first_chessboard_matrix = [
			["comp_rook1", "comp_horse1", "", "comp_queen", "comp_king", "comp_bishop2", "", "comp_rook2"],
			[ "comp_pawn1", "", "comp_pawn3", "comp_pawn4", "comp_pawn5", "comp_pawn6", "comp_pawn7", "comp_pawn8" ],
			[ "comp_bishop1", "", "", "", "", "", "", ""],
			[ "", "comp_pawn2", "", "comp_horse2", "", "", "", ""],
			[ "", "", "", "", "", "", "", ""],
			[ "player_horse1", "", "", "", "", "", "", ""],
			[ "player_pawn1", "player_pawn2", "player_pawn3", "player_pawn4", "player_pawn5", "player_pawn6", "player_pawn7", "player_pawn8" ],
			["player_rook1", "", "player_bishop1", "player_queen", "player_king", "player_bishop2", "player_horse2", "player_rook2"]
		];

		var second_chessboard_matrix = [
			["comp_rook1", "comp_horse1", "comp_bishop1", "comp_queen", "comp_king", "comp_bishop2", "comp_horse2", "comp_rook2"],
			[ "comp_pawn1", "comp_pawn2", "comp_pawn3", "comp_pawn4", "comp_pawn5", "comp_pawn6", "comp_pawn7", "comp_pawn8" ],
			[ "", "", "", "", "", "", "", ""],
			[ "", "", "", "", "", "", "", ""],
			[ "", "", "", "", "", "", "", ""],
			[ "player_horse1", "", "", "", "", "", "", ""],
			[ "player_pawn1", "player_pawn2", "player_pawn3", "player_pawn4", "player_pawn5", "player_pawn6", "player_pawn7", "player_pawn8" ],
			["player_rook1", "", "player_bishop1", "player_queen", "player_king", "player_bishop2", "player_horse2", "player_rook2"]
		];
 
		var expectedResult = ["comp_bishop1", "comp_horse2", "comp_pawn2"];
		var differentPieces = this.chessPiece.shrinkContinuosArray(
			this.chessPiece.findMultipleDifferentPieces(second_chessboard_matrix, first_chessboard_matrix)
		);
		// console.log("diff pieces: "+differentPieces);

		for(var i=0; i<differentPieces.length; i++){
			if(differentPieces[i]!=expectedResult[i]){
				console.assert(differentPieces[i]==expectedResult[i], "findMultipleDifferentPieces not return correct different Pieces");
			}
		}

		// console.assert(==expectedResult, "Find Different piece not working");
	}

	testFindBoardCoordinates(){
		var first_chessboard_matrix = [
			["comp_rook1", "comp_horse1", "comp_bishop1", "comp_queen", "comp_king", "comp_bishop2", "comp_horse2", "comp_rook2"],
			[ "comp_pawn1", "", "comp_pawn3", "comp_pawn4", "comp_pawn5", "comp_pawn6", "comp_pawn7", "comp_pawn8" ],
			[ "", "", "", "", "", "", "", ""],
			[ "", "comp_pawn2", "", "", "", "", "", ""],
			[ "", "", "", "", "", "", "", ""],
			[ "", "", "", "", "", "", "", ""],
			[ "player_pawn1", "player_pawn2", "player_pawn3", "player_pawn4", "player_pawn5", "player_pawn6", "player_pawn7", "player_pawn8" ],
			["player_rook1", "player_horse1", "player_bishop1", "player_queen", "player_king", "player_bishop2", "player_horse2", "player_rook2"]
		];

		var input2 = "comp_pawn2";
		var expectedResult = [3, 1];

		console.assert(this.chessPiece.findBoardCoordinates(first_chessboard_matrix, input2), "find board coordinates cannot find coordinates");
	}

	test_get_chess_place_ids(){
		var chess_piece_ids = [ 
			"comp_pawn1", "comp_pawn3", "comp_pawn4", "comp_pawn5", "comp_pawn6", "comp_pawn7", "comp_pawn8", 
			"comp_rook1", "comp_horse1", "comp_bishop1", "comp_queen", "comp_king", "comp_bishop2", "comp_horse2", "comp_rook2",
			"player_pawn1", "player_pawn3", "player_pawn4", "player_pawn5", "player_pawn6", "player_pawn7", "player_pawn8",
			"player_rook1", "player_horse1", "player_bishop1", "player_queen", "player_king", "player_bishop2", "player_horse2", "player_rook2",
		];

		var expectedResult = [
			"7A", "7C", "7D", "7E", "7F", "7G", "7H",
			"8A", "8B", "8C", "8D", "8E", "8F", "8G", "8H",
			"2A", "2C", "2D", "2E", "2F", "2G", "2H",
			"1A", "1B", "1C", "1D", "1E", "1F", "1G", "1H"	
		];

		var chessAfter = this.chessPiece.get_chess_place_ids(chess_piece_ids);

		for(var i=0; i<chessAfter.length; i++){
			if(expectedResult[i]!=chessAfter[i]){
				console.assert(chessAfter[i]==expectedResult[i], 
					"get chess place ids not getting correct ids: "+chessAfter[i]
				);
			}
		}
	}

	test_live_chessboard_matrix_gen(){
		var chess_piece_ids = [ 
			"comp_pawn1", "comp_pawn2", "comp_pawn3", "comp_pawn4", "comp_pawn5", "comp_pawn6", "comp_pawn7", "comp_pawn8", 
			"comp_rook1", "comp_horse1", "comp_bishop1", "comp_queen", "comp_king", "comp_bishop2", "comp_horse2", "comp_rook2",
			"player_pawn1", "player_pawn2", "player_pawn3", "player_pawn4", "player_pawn5", "player_pawn6", "player_pawn7", "player_pawn8",
			"player_rook1", "player_horse1", "player_bishop1", "player_queen", "player_king", "player_bishop2", "player_horse2", "player_rook2",
		];

		var chess_place_ids = [
			"7A", "5B", "7C", "7D", "7E", "7F", "7G", "7H",
			"8A", "8B", "8C", "8D", "8E", "8F", "8G", "8H",
			"2A", "2B", "2C", "2D", "2E", "2F", "2G", "2H",
			"1A", "1B", "1C", "1D", "1E", "1F", "1G", "1H"	
		];

		var expectedResult = [
			["comp_rook1", "comp_horse1", "comp_bishop1", "comp_queen", "comp_king", "comp_bishop2", "comp_horse2", "comp_rook2"],
			[ "comp_pawn1", "", "comp_pawn3", "comp_pawn4", "comp_pawn5", "comp_pawn6", "comp_pawn7", "comp_pawn8" ],
			[ "", "", "", "", "", "", "", ""],
			[ "", "comp_pawn2", "", "", "", "", "", ""],
			[ "", "", "", "", "", "", "", ""],
			[ "", "", "", "", "", "", "", ""],
			[ "player_pawn1", "player_pawn2", "player_pawn3", "player_pawn4", "player_pawn5", "player_pawn6", "player_pawn7", "player_pawn8" ],
			["player_rook1", "player_horse1", "player_bishop1", "player_queen", "player_king", "player_bishop2", "player_horse2", "player_rook2"]
		];

		var matrixAfter = this.chessPiece.live_chessboard_matrix_gen(chess_place_ids, chess_piece_ids);

		for(var i=0; i<expectedResult.length; i++){
			for(var j=0; j<expectedResult[i].length; j++){
				console.assert(matrixAfter[i][j]==expectedResult[i][j], "live matrix gen not working: "+matrixAfter[i][j]);
			}
		}
	}
}