class ChessPiece {

	constructor(){
		this.live_chessboard_matrix = undefined;
	}

	moveArrayToBack(array){
		var rem_length = 8 - array.length;
		var rem_counter = 0;
		var new_array = [];
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

	shrinkContinuosArray(array){
		var new_array = [];
		for(var i=0; i<array.length; i++){
			var next = array[i];
			if(next!=undefined){
				if(next!=""){
					new_array.push(next);
				}
			}
		}
		return new_array;
	}

	findPieceCoordinates(selected){
		if(selected!=undefined){
			var parent_id = selected.parentElement.id;
			var fstAttr = this.first_coordinate_gen(parseInt(parent_id.charAt(0)));
			var secAttr = this.second_coordinate_gen(parent_id.charAt(1));
			var coordinates = [fstAttr, secAttr];
			return coordinates
		}
	}

	findPlaceCoordinates(parent_id){
		var fstAttr = this.first_coordinate_gen(parseInt(parent_id.charAt(0)));
		var secAttr = this.second_coordinate_gen(parent_id.charAt(1));
		var coordinates = [fstAttr, secAttr];
		
		return coordinates;
	}

	isType(pieceId, target_piece){
		var new_target_piece = target_piece;

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

	get_chess_place_ids(piece_ids){
		var place_ids = [];
		for(var i=0; i<piece_ids.length; i++){
			if(document.getElementById(piece_ids[i])!=null){
				place_ids[i] = document.getElementById(piece_ids[i]).parentElement.id;
			}
		}              
		return place_ids;
	}

	first_coordinate_gen(fstAttr){
		var row_num = 8 - (fstAttr);
		return row_num;
	}

	second_coordinate_gen(secAttr){
		var col_num = secAttr.charCodeAt(0) - 65;
		return col_num;
	}

	live_chessboard_matrix_gen(place_ids, piece_ids){
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
			var fstAttr = this.first_coordinate_gen(parseInt(place_ids[i].charAt(0)));
			var secAttr = this.second_coordinate_gen(place_ids[i].charAt(1));
			place_coordinates[i] = [fstAttr, secAttr];
			var current_piece = piece_ids[i];
			var current_place = place_coordinates[i];
			live_matrix[current_place[0]][current_place[1]] = current_piece;
		}
		return live_matrix;
	}

	id_gen(row_num, col_num){
		var secAttr = String.fromCharCode(65 + col_num);
		var fstAttr = 8 - (row_num);
		var chess_id = fstAttr + secAttr;
		return chess_id;
	}

	matrixSame(matrix1, matrix2){
		for(var i=0; i<matrix1.length; i++){
			for(var j=0; j<matrix1[i].length; j++){
				if(matrix1[i][j]!=matrix2[i][j]){
					return false;
				}
			}
		}
		return true;
	}

	findDiffentPiece(live_matrix, new_matrix){
		for(var i=0; i<live_matrix.length; i++){
			for(var j=0; j<live_matrix[i].length; j++){
				if(live_matrix[i][j]!=new_matrix[i][j]){
					if(live_matrix[i][j]!=null){
						return live_matrix[i][j];
					} else if(new_matrix[i][j]!=null){
						return new_matrix[i][j];
					}
				}
			}
		}
		return "";
	}

	findMultipleDifferentPieces(live_matrix, new_matrix){
		var new_array = [];

		for(var i=0; i<live_matrix.length; i++){
			for(var j=0; j<live_matrix[i].length; j++){
				if(live_matrix[i][j]!=new_matrix[i][j]){
					if(live_matrix[i][j]!=null){
						new_array.push(live_matrix[i][j]);
					} else if(new_matrix[i][j]!=null){
						new_array.push(new_matrix[i][j]);
					}
				}
			}
		}
		return new_array;
	}

	findBoardCoordinates(new_matrix, value){
		for(var i=0; i<new_matrix.length; i++){
			for(var j=0; j<new_matrix[i].length; j++){
				if(new_matrix[i][j]==value&&value!=""){
					return [i, j];
				}
			}
		}
		return [];
	}
}