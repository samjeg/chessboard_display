$(document).ready(function(){
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
	testcase.testFindPlaceCoordinates();
	testcase.test_get_chess_place_ids();
	testcase.test_live_chessboard_matrix_gen();
});


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
			"comp_pawn1", "comp_pawn2", "comp_pawn3", "comp_pawn4", "comp_pawn5", "comp_pawn6", "comp_pawn7", "comp_pawn8", 
			"comp_rook1", "comp_horse1", "comp_bishop1", "comp_queen", "comp_king", "comp_bishop2", "comp_horse2", "comp_rook2",
			"player_pawn1", "player_pawn2", "player_pawn3", "player_pawn4", "player_pawn5", "player_pawn6", "player_pawn7", "player_pawn8",
			"player_rook1", "player_horse1", "player_bishop1", "player_queen", "player_king", "player_bishop2", "player_horse2", "player_rook2",
		];

		var expectedResult = [
			"7A", "5B", "7C", "7D", "7E", "7F", "7G", "7H",
			"8A", "8B", "8C", "8D", "8E", "8F", "8G", "8H",
			"2A", "2B", "2C", "2D", "2E", "2F", "2G", "2H",
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