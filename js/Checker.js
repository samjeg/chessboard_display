class Checker {

	constructor(){
		this.chessPiece = new ChessPiece();
		this.pawn = new Pawn();
		this.rook = new Rook();
		this.bishop = new Bishop();
		this.queen = new Queen();
		this.king = new King();
		this.horse = new Horse();
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

}