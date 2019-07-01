current_colour = "White"
current_selected_piece = undefined;

$(document).ready(function(){
	var chess_piece_ids = [ 
		"comp_pawn1", "comp_pawn2", "comp_pawn3", "comp_pawn4", "comp_pawn5", "comp_pawn6", "comp_pawn7", "comp_pawn8", 
		"comp_rook1", "comp_horse1", "comp_bishop1", "comp_queen", "comp_king", "comp_bishop2", "comp_horse2", "comp_rook2",
		"player_pawn1", "player_pawn2", "player_pawn3", "player_pawn4", "player_pawn5", "player_pawn6", "player_pawn7", "player_pawn8",
		"player_rook1", "player_horse1", "player_bishop1", "player_queen", "player_king", "player_bishop2", "player_horse2", "player_rook2",
	];
		
	var new_chessboard_matrix = [
		["comp_rook1", "comp_horse1", "comp_bishop1", "comp_queen", "comp_king", "comp_bishop2", "comp_horse2", "comp_rook2"],
		[ "comp_pawn1", "comp_pawn2", "", "comp_pawn4", "comp_pawn5", "comp_pawn6", "comp_pawn7", "comp_pawn8" ],
		[ "", "", "", "", "", "", "", ""],
		[ "", "", "comp_pawn3", "", "", "", "", ""],
		[ "", "", "", "", "", "", "", ""],
		[ "", "", "", "", "", "", "", ""],
		[ "player_pawn1", "player_pawn2", "player_pawn3", "player_pawn4", "player_pawn5", "player_pawn6", "player_pawn7", "player_pawn8" ],
		["player_rook1", "player_horse1", "player_bishop1", "player_queen", "player_king", "player_bishop2", "player_horse2", "player_rook2"]
	];

	var chess_place_ids = get_chess_place_ids(chess_piece_ids);
	var live_chessboard_matrix = live_chessboard_matrix_gen(chess_place_ids, chess_piece_ids);
	var matrixIsSame = matrixSame(live_chessboard_matrix, new_chessboard_matrix);
	var diffPiece = findDiffentPiece(live_chessboard_matrix, new_chessboard_matrix);
	var diffPieceCoor = findPieceCoordinates(new_chessboard_matrix, diffPiece);
	var diffPiecePlaceId = id_gen(diffPieceCoor[0], diffPieceCoor[1]); 
	// console.log("Matrix the same: "+
	// 			matrixIsSame+
	// 			" "+
	// 			diffPiece+
	// 			" "+
	// 			diffPieceCoor+
	// 			" "+
	// 			diffPiecePlaceId
	// );

	var diffElement = document.getElementById(diffPiece);
	// console.log("Place Ids: "+chess_place_ids);
	// console.log("Diff place id: "+diffPiece+" "+diffPiecePlaceId);
	var diffPlaceElement = document.getElementById(diffPiecePlaceId).appendChild(diffElement);

	var players = document.getElementsByClassName("player");
	var comp_players = document.getElementsByClassName("comp-player");

	// switchColours(players, comp_players, "White");
	// console.log("Current Id: "+current_selected_piece.id);
	
});


function select(pieceId){
	current_selected_piece = document.getElementById(pieceId);
}

function moveTo(placeId){
	if(current_selected_piece!=undefined){
		var current_place = document.getElementById(placeId);
		current_place.appendChild(current_selected_piece) 
	}
}

function remove(pieceId){
	if(current_selected_piece!=undefined){
		console.log("Hello remove");
		var current_element = document.getElementById(pieceId);
		var parent_id = document.getElementById(pieceId).parentElement.id;
		var parent_element = document.getElementById(parent_id);
		parent_element.removeChild(current_element);
	}
}

function switchColours(){
	var player1Elements = document.getElementsByClassName("player");
	var player2Elements = document.getElementsByClassName("comp-player");


	if(current_colour=="White"){
		current_colour = "Black";
		changePlayerColour(player1Elements, "Black");
		changePlayerColour(player2Elements, "White");
	}else{
		current_colour = "White";
		changePlayerColour(player1Elements, "White");
		changePlayerColour(player2Elements, "Black");
	}
}

function changePlayerColour(playerElements, colour){
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

function get_chess_place_ids(piece_ids){
	place_ids = [];

	for(var i=0; i<piece_ids.length; i++){
		place_ids[i] = document.getElementById(piece_ids[i]).parentElement.id;
	}              

	return place_ids;
}

function live_chessboard_matrix_gen(place_ids, piece_ids){
	var place_coordinates = [];
	var live_matrix = [
		[ "", "", "", "", "", "", "", ""],
		[ "", "", "", "", "", "", "", ""],
		[ "", "", "", "", "", "", "", ""],
		[ "", "", "", "", "", "", "", ""],
		[ "", "", "", "", "", "", "", ""],
		[ "", "", "", "", "", "", "", ""],
		[ "", "", "", "", "", "", "", ""],
		[ "", "", "", "", "", "", "", ""]
	];

	for(var i=0; i<place_ids.length; i++){
		fstAttr = first_coordinate_gen(parseInt(place_ids[i].charAt(0)));
		secAttr = second_coordinate_gen(place_ids[i].charAt(1));
		place_coordinates[i] = [fstAttr, secAttr];
		current_piece = piece_ids[i];
		current_place = place_coordinates[i];
		live_matrix[current_place[0]][current_place[1]] = current_piece;
	}

	return live_matrix;
}

function id_gen(row_num, col_num){
	var secAttr = String.fromCharCode(65 + col_num);
	var fstAttr = 8 - (row_num);
	var chess_id = fstAttr + secAttr;
	return chess_id;
}

function first_coordinate_gen(fstAttr){
	var row_num = 8 - (fstAttr);
	return row_num;
}

function second_coordinate_gen(secAttr){
	var col_num = secAttr.charCodeAt(0) - 65;
	return col_num;
}

function matrixSame(matrix1, matrix2){
	for(var i=0; i<matrix1.length; i++){
		for(var j=0; j<matrix1[i].length; j++){
			if(matrix1[i][j]!=matrix2[i][j]){
				return false;
			}
		}
	}
	return true;
}

function findDiffentPiece(live_matrix, new_matrix){
	for(var i=0; i<live_matrix.length; i++){
		for(var j=0; j<live_matrix[i].length; j++){
			if(live_matrix[i][j]!=new_matrix[i][j]){
				return live_matrix[i][j];
			}
		}
	}
	return "";
}

function findPieceCoordinates(new_matrix, value){
	for(var i=0; i<new_matrix.length; i++){
		for(var j=0; j<new_matrix[i].length; j++){
			if(new_matrix[i][j]==value){
				return [i, j];
			}
		}
	}
	return [];
}