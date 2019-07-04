var current_colour = "White"
var current_selected_piece = undefined;
var current_selected_coordinates = [];
var live_chessboard_matrix = undefined;
var current_selected_movable_ids = [];
var current_king_piece = undefined;
var current_king_coordinates = [];

$(document).ready(function(){
	var chess_piece_ids = [ 
		"comp_pawn1", "comp_pawn2", "comp_pawn3", "comp_pawn4", "comp_pawn5", "comp_pawn6", "comp_pawn7", "comp_pawn8", 
		"comp_rook1", "comp_horse1", "comp_bishop1", "comp_queen", "comp_king", "comp_bishop2", "comp_horse2", "comp_rook2",
		"player_pawn1", "player_pawn2", "player_pawn3", "player_pawn4", "player_pawn5", "player_pawn6", "player_pawn7", "player_pawn8",
		"player_rook1", "player_horse1", "player_bishop1", "player_queen", "player_king", "player_bishop2", "player_horse2", "player_rook2",
	];
		
	var new_chessboard_matrix = [
		["comp_rook1", "comp_horse1", "comp_bishop1", "comp_queen", "comp_king", "comp_bishop2", "comp_horse2", "comp_rook2"],
		[ "comp_pawn1", "comp_pawn2", "comp_pawn3", "comp_pawn4", "comp_pawn5", "comp_pawn6", "comp_pawn7", "comp_pawn8" ],
		[ "", "", "", "", "", "", "", ""],
		[ "", "", "", "", "", "", "", ""],
		[ "", "", "", "", "", "", "", ""],
		[ "", "", "", "", "", "", "", ""],
		[ "player_pawn1", "player_pawn2", "player_pawn3", "player_pawn4", "player_pawn5", "player_pawn6", "player_pawn7", "player_pawn8" ],
		["player_rook1", "player_horse1", "player_bishop1", "player_queen", "player_king", "player_bishop2", "player_horse2", "player_rook2"]
	];

	// var chess_place_ids = get_chess_place_ids(chess_piece_ids);
	// live_chessboard_matrix = live_chessboard_matrix_gen(chess_place_ids, chess_piece_ids);
	// var matrixIsSame = matrixSame(live_chessboard_matrix, new_chessboard_matrix);
	// var diffPiece = findDiffentPiece(live_chessboard_matrix, new_chessboard_matrix);
	// var diffPieceCoor = findBoardCoordinates(new_chessboard_matrix, diffPiece);
	// var diffPiecePlaceId = id_gen(diffPieceCoor[0], diffPieceCoor[1]); 
	// console.log("Live matrix: "+
	// 	matrixIsSame+
	// 	" "+
	// 	diffPiece+
	// 	" "+
	// 	diffPieceCoor+
	// 	" "+
	// 	diffPiecePlaceId
	// );

	// var diffElement = document.getElementById(diffPiece);
	// var diffPlaceElement = document.getElementById(diffPiecePlaceId)
	// console.log("diff El: "+diffElement+" "+diffPlaceElement);


	var players = document.getElementsByClassName("player");
	var comp_players = document.getElementsByClassName("comp-player");


	// setInterval(displayAttackingPlaces, 3000);

});


function displayAttackingPlaces(){
	console.log("Attacking Places: "+getAttackingPlaces());
}

function select(pieceId){
	current_selected_piece = document.getElementById(pieceId);
	current_selected_coordinates = findPieceCoordinates(current_selected_piece);
	// current_selected_movable_ids = shrinkPawnArray(getPawnMovablePlaces(), "checking");
	current_selected_movable_ids = getQueenMovablePlaces();
	current_king_place_id = document.getElementById("player_king").parentElement.id;
	// console.log("Movable "+current_selected_movable_ids);
	console.log("King id: "+current_king_place_id)
	console.log("Attacking Places: "+getAttackingPlaces());
}

function moveTo(placeId){
	if(current_selected_piece!=undefined){
		if(current_selected_movable_ids.length!=0){
			for(var i=0; i<current_selected_movable_ids.length; i++){
				if(placeId==current_selected_movable_ids[i]){
					var current_place = document.getElementById(placeId);
					current_place.appendChild(current_selected_piece);
				}
			}

		}
	}
}

function remove(pieceId){
	if(current_selected_piece!=undefined){
		if(current_selected_movable_ids.length!=0){
			for(var i=0; i<current_selected_movable_ids.length; i++){
				var current_element = document.getElementById(pieceId);
				var parent_id = current_element.parentElement.id;
				var parent_element = document.getElementById(parent_id);
				if(parent_id==current_selected_movable_ids[i]){
					parent_element.removeChild(current_element);
					var current_place = document.getElementById(parent_id);
					current_place.appendChild(current_selected_piece);
				}
			}
		}
	}
}

function getAttackingPlaces(){
	var current_king_piece = document.getElementById("player_king");
	var current_king_coordinates = findPieceCoordinates(current_king_piece);
	var x = current_king_coordinates[1];
	var y = current_king_coordinates[0]
	var attackingPawnPlaces = shrinkPawnArray(getPawnMovablePlaces(x, y), "checking");
	console.log("Pawn pieces: "+attackingPawnPlaces);
	var attackingHorsePlaces = getAttackingHorsePlaces();
	var attackingRookPlaces = getAttackingRookPlaces(true);
	var attackingBishopPlaces = getAttackingBishopPlaces(true);
	var queen1 = getAttackingRookPlaces(false);
	var queen2 = getAttackingBishopPlaces(false);
	var attackingQueenPlaces = queen1.concat(queen2);
	var attackingPlaces = attackingPawnPlaces.concat(attackingHorsePlaces)
											 .concat(attackingRookPlaces)
											 .concat(attackingBishopPlaces)
											 .concat(attackingQueenPlaces);

	return attackingPlaces;
}

function getAttackingPiecesPlaces(placeId, array, type1, type2){
	var type = type1;

	if(type1==""){
		type = type2;
	}

	if(placeId!=""){
		var nextPlace = document.getElementById(placeId);
		if(nextPlace.childElementCount!=0){
			var nextPiece = nextPlace.firstElementChild.id;
			if(isType(nextPiece, type)){
				array.push(placeId);
			}
		}
	}
}

function getAttackingRookPlaces(isRook){
	var attackingRookPlaces = getRookMovablePlaces();
	var rookFwdAttacking = attackingRookPlaces[23];
	var rookBkwdAttacking = attackingRookPlaces[31];
	var rookRightAttacking = attackingRookPlaces[7];
	var rookLeftAttacking = attackingRookPlaces[15];

	var newAttackingRookPlaces = [];

	if(isRook==true){
		getAttackingPiecesPlaces(rookFwdAttacking, newAttackingRookPlaces, "comp_rook", "");
		getAttackingPiecesPlaces(rookBkwdAttacking, newAttackingRookPlaces, "comp_rook", "");
		getAttackingPiecesPlaces(rookRightAttacking, newAttackingRookPlaces, "comp_rook", "");
		getAttackingPiecesPlaces(rookLeftAttacking, newAttackingRookPlaces, "comp_rook", "");
	} else {
		getAttackingPiecesPlaces(rookFwdAttacking, newAttackingRookPlaces, "", "comp_queen");
		getAttackingPiecesPlaces(rookBkwdAttacking, newAttackingRookPlaces, "", "comp_queen");
		getAttackingPiecesPlaces(rookRightAttacking, newAttackingRookPlaces, "", "comp_queen");
		getAttackingPiecesPlaces(rookLeftAttacking, newAttackingRookPlaces, "", "comp_queen");
	}

	// console.log("Naughty rooks: "+newAttackingRookPlaces);
	return newAttackingRookPlaces;
}

function getAttackingBishopPlaces(isBishop){
	var attackingBishopPlaces = getBishopMovablePlaces();
	var RightDownAttacking = attackingBishopPlaces[23];
	var LeftUpAttacking = attackingBishopPlaces[31];
	var LeftDownAttacking = attackingBishopPlaces[7];
	var RightUpAttacking = attackingBishopPlaces[15];

	var newAttackingBishopPlaces = [];

	if(isBishop==true){
		getAttackingPiecesPlaces(RightDownAttacking, newAttackingBishopPlaces, "comp_bishop", "");
		getAttackingPiecesPlaces(LeftUpAttacking, newAttackingBishopPlaces, "comp_bishop", "");
		getAttackingPiecesPlaces(LeftDownAttacking, newAttackingBishopPlaces, "comp_bishop", "");
		getAttackingPiecesPlaces(RightUpAttacking, newAttackingBishopPlaces, "comp_bishop", "");
	} else {
		getAttackingPiecesPlaces(RightDownAttacking, newAttackingBishopPlaces, "", "comp_queen");
		getAttackingPiecesPlaces(LeftUpAttacking, newAttackingBishopPlaces, "", "comp_queen");
		getAttackingPiecesPlaces(LeftDownAttacking, newAttackingBishopPlaces, "", "comp_queen");
		getAttackingPiecesPlaces(RightUpAttacking, newAttackingBishopPlaces, "", "comp_queen");
	}
	
	// console.log("Naughty Bishops: "+newAttackingBishopPlaces);
	return newAttackingBishopPlaces;
}


function moveArrayToBack(array){
	rem_length = 8 - array.length;
	rem_counter = 0;
	new_array = [];

	for(var i=0; i<8; i++){
		if(rem_counter<rem_length){
			new_array[i] = "";
			rem_counter++;
		} else {
			new_array[i] = array[i-rem_length];
		}
	}

	return new_array;
}

function shrinkContinuosArray(array){
	new_array = [];

	for(var i=0; i<8; i++){
		var next = array[i];
		if(next!=""){
			new_array.push(next);
		}
	}

	for(var j=8; j<16; j++){
		var next = array[j];
		if(next!=""){
			new_array.push(next);
		}
	}

	for(var k=16; k<24; k++){
		var next = array[k];
		if(next!=""){
			new_array.push(next);
		}
	}

	for(var n=24; n<32; n++){
		var next = array[n];
		if(next!=""){
			new_array.push(next);
		}
	}

	return new_array;
}

function getAttackingHorsePlaces(){
	var horseMovablePlaces = getHorseMovablePlaces();
	var attackingHorsePlaces = [];
	for(var i=0; i<horseMovablePlaces.length; i++){
		next = horseMovablePlaces[i];
		if(next!=null){
			if(next.childElementCount!=0){
				if(next.firstElementChild!=null){
					if(isType(next.firstElementChild.id, "comp_")){
						attackingHorsePlaces.push(next);
					}
				}
			}
		}
	}
	return attackingHorsePlaces;
}

function getPawnMovablePlaces(x, y){
	var matrix = live_chessboard_matrix;
	var placeIds = [];

	if(x>=0&&x<=7&&y>=0&&y<=7){
		var leftFwd1Element = document.getElementById(id_gen(y-1, x-1));
		var rightFwd1Element = document.getElementById(id_gen(y-1, x+1));
		var fwd1Element = document.getElementById(id_gen(y-1, x));
		var fwd2Element = document.getElementById(id_gen(y-2, x));
		console.log("ID: "+id_gen(y-1, x+1));
		if(leftFwd1Element!=null){
			if(leftFwd1Element.childElementCount!=0){
				leftFwd1Id = leftFwd1Element.firstElementChild.id;
				if(isType(leftFwd1Id, "comp_")){
					placeIds[0] = leftFwd1Element.id;

				}
			}
		}
		console.log("befores rightfwd: "+rightFwd1Element.id);
		if(rightFwd1Element!=null){
			if(rightFwd1Element.childElementCount!=0){
				rightFwd1Id = rightFwd1Element.firstElementChild.id;
				if(isType(rightFwd1Id, "comp_")){
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

function shrinkPawnArray(array, mechanic_needed){
	new_array = [];

	console.log("pawn "+array[1]);
	
	if(mechanic_needed=="playing"){
		if(array[0]!=""){
			new_array.push(array[0]);
		}
		if(array[1]!=""){
			new_array.push(array[1]);
		}
		if(array[2]!=""){
			new_array.push(array[2]);
		}
		if(array[3]!=""){
			new_array.push(array[3]);
		}
	} else {
		if(array[0]!=""){
			leftElement = document.getElementById(array[0]);
			if(leftElement!=null){
				if(leftElement.firstElementChild!=null){
					piece = leftElement.firstElementChild;
					if(isType(piece.id, "comp_pawn")){
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
					if(isType(piece.id, "comp_pawn")){
						new_array.push(array[1]);
					}
				}
			}
		}
	}

	return new_array;
}

function getHorseMovablePlaces(){
	var x = current_selected_coordinates[1];
	var y = current_selected_coordinates[0];
	var matrix = live_chessboard_matrix;
	var placeIds = [];

	if(x>=0&&x<=7&&y>=0&&y<=7){
		var topThenRightElement = document.getElementById(id_gen(y-2, x-1));
		var topThenLeftElement = document.getElementById(id_gen(y-2, x+1));
		var bottomThenRightElement = document.getElementById(id_gen(y+2, x+1));
		var bottomThenLeftElement = document.getElementById(id_gen(y+2, x-1));
		var rightThenTopElement = document.getElementById(id_gen(y-1, x+2));
		var rightThenBottomElement = document.getElementById(id_gen(y+1, x+2));
		var leftThenTopElement = document.getElementById(id_gen(y-1, x-2));
		var leftThenBottomElement = document.getElementById(id_gen(y+1, x-2));

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

function getRookMovablePlaces(){
	var x = current_selected_coordinates[1];
	var y = current_selected_coordinates[0];
	var matrix = live_chessboard_matrix;
	var placeIds = [];
	var left = [];
	var right = [];
	var up = [];
	var down = [];
	var leftCounter = 0;
	var upCounter = 0;

	if(x>=0&&x<=7&&y>=0&&y<=7){

		//Going Left
		for(var i=7; i>=0; i--){
			if(i<x){
				// console.log("hello y, x and i: "+y+" "+x+" "+i);
				var nextElement = document.getElementById(id_gen(y, i));
				if(nextElement!=null){
					left[leftCounter] = nextElement.id;
					if(nextElement.childElementCount!=0){
						break;
					}
					leftCounter++;
				}
			}
		}

		//Going Right
		for(var j=0; j<=7; j++){
			if(j>x){
				var nextElement = document.getElementById(id_gen(y, j));
				if(nextElement!=null){
					up[j] = nextElement.id;
					if(nextElement.childElementCount!=0){
						break;
					}
				}
			}
		}

		//Going Down
		for(var k=0; k<=7; k++){
			if(k>y){
				var nextElement = document.getElementById(id_gen(k, x));
				if(nextElement!=null){
					down[k] = nextElement.id;
					if(nextElement.childElementCount!=0){
						break;
					}
				}
			}
		}

		//Going Up
		for(var n=7; n>=0; n--){
			if(n<y){
				var nextElement = document.getElementById(id_gen(n, x));
				if(nextElement!=null){
					up[upCounter] = nextElement.id;
					if(nextElement.childElementCount!=0){
						break;
					}
					upCounter++;
				}
			}
		}	
	}
	// console.log("before new array: "+left);
	// // console.log("new array: "+left);
	left = moveArrayToBack(left);
	right = moveArrayToBack(right);
	up = moveArrayToBack(up);
	down = moveArrayToBack(down);
	// console.log("Down: "+down);

	var horizontal = left.concat(right);
	var vertical = up.concat(down);
	placeIds = horizontal.concat(vertical);
	// console.log("Rook Place Ids: "+placeIds)
	
	return placeIds;
}

function getBishopMovablePlaces(){
	var x = current_selected_coordinates[1];
	var y = current_selected_coordinates[0];
	var matrix = live_chessboard_matrix;
	var placeIds = [];
	var leftUp = [];
	var rightUp = [];
	var leftDown = [];
	var rightDown = [];

	if(x>=0&&x<=7&&y>=0&&y<=7){

		//Going Left and Up
		for(var i=0; i<=7; i++){
			var b_x = x - i;
			var b_y = y - i;
			if(b_x<=7&&b_x>=0&&b_y<=7&&b_y>=0){
				if(b_x<x&&b_y<y){
					var nextElement = document.getElementById(id_gen(b_y, b_x));
					if(nextElement!=null){
						leftUp[i] = nextElement.id;
						if(nextElement.childElementCount!=0){
							break;
						}
					}
				}
			}
		}

		//Going Right and Up
		for(var j=0; j<=7; j++){
			var b_x = x + j;
			var b_y = y - j;
			if(b_x<=7&&b_x>=0&&b_y<=7&&b_y>=0){
				if(b_x>x&&b_y<y){
					var nextElement = document.getElementById(id_gen(b_y, b_x));
					if(nextElement!=null){
						rightUp[j] = nextElement.id;
						if(nextElement.childElementCount!=0){
							break;
						}
					}
				}
			}
		}

		//Going Left and Down 
		for(var k=0; k<=7; k++){
			var b_x = x - k;
			var b_y = y + k;
			if(b_x<=7&&b_x>=0&&b_y<=7&&b_y>=0){
				if(b_x<x&&b_y>y){
					var nextElement = document.getElementById(id_gen(b_y, b_x));
					if(nextElement!=null){
						leftDown[k] = nextElement.id;
						if(nextElement.childElementCount!=0){
							break;
						}
					}
				}
			}
		}

		//Going Right and Down
		for(var n=0; n<=7; n++){
			var b_x = x + n;
			var b_y = y + n;
			if(b_x<=7&&b_x>=0&&b_y<=7&&b_y>=0){
				if(b_x>x&&b_y>y){
					var nextElement = document.getElementById(id_gen(b_y, b_x));
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

	leftUp = moveArrayToBack(leftUp);
	rightUp = moveArrayToBack(rightUp);
	leftDown = moveArrayToBack(leftDown);
	rightDown = moveArrayToBack(rightDown);
	// console.log("Down: "+down);

	var leftToRight = leftDown.concat(rightUp);
	var rightToLeft = rightDown.concat(leftUp);
	placeIds = leftToRight.concat(rightToLeft);
	
	return placeIds;
}


function getQueenMovablePlaces(){
	var rookPlaces = getRookMovablePlaces();
	var bishopPlaces = getBishopMovablePlaces();
	place_ids = rookPlaces.concat(bishopPlaces);
	return place_ids;
}

function getKingMovablePlaces(){
	var x = current_selected_coordinates[1];
	var y = current_selected_coordinates[0];
	var matrix = live_chessboard_matrix;
	var placeIds = [];

	if(x>=0&&x<=7&&y>=0&&y<=7){
		var leftFwdElement = document.getElementById(id_gen(y-1, x-1));
		var rightFwdElement = document.getElementById(id_gen(y-1, x+1));
		var fwdElement = document.getElementById(id_gen(y-1, x));
		var leftBkwdElement = document.getElementById(id_gen(y+1, x-1));
		var rightBkwdElement = document.getElementById(id_gen(y+1, x+1));
		var bkwdElement = document.getElementById(id_gen(y+1, x));
		var rightElement = document.getElementById(id_gen(y, x+1));
		var leftElement = document.getElementById(id_gen(y, x-1));
	
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


function findPieceCoordinates(selected){
	if(selected!=undefined){
		parent_id = selected.parentElement.id;
		fstAttr = first_coordinate_gen(parseInt(parent_id.charAt(0)));
		secAttr = second_coordinate_gen(parent_id.charAt(1));
		coordinates = [fstAttr, secAttr];
		return coordinates
	}
}

function isType(pieceId, target_piece){
	var new_target_piece = target_piece;
	var count = 0;
	var found = false;
	var keep_looking = true;
	
	for(var j=0; j<pieceId.length; j++){
		if(pieceId.charAt(j)==new_target_piece.charAt(0)){
			new_target_piece = new_target_piece.substr(1);
		}
		if(new_target_piece==""){
			return true;
		}
	}
	return false;
		

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

function findBoardCoordinates(new_matrix, value){
	for(var i=0; i<new_matrix.length; i++){
		for(var j=0; j<new_matrix[i].length; j++){
			if(new_matrix[i][j]==value){
				return [i, j];
			}
		}
	}
	return [];
}