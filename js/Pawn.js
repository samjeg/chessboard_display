class Pawn extends ChessPiece{

	constructor(){
		super();
	}

	movablePlaces(x, y){
		// console.log("pawn: "+this.getPawnMovablePlaces(x, y)+" "+x+" "+y);
		// console.log("shrunken pawn: "+this.shrinkPawnArray(this.getPawnMovablePlaces(x, y), "playing"));
		return this.shrinkPawnArray(this.getPawnMovablePlaces(x, y), "playing");
	}

	getPawnMovablePlaces(x, y){
		var matrix = this.live_chessboard_matrix;
		var placeIds = [];
		if(x>=0&&x<=7&&y>=0&&y<=7){
			var leftFwd1Element = document.getElementById(this.id_gen(y-1, x-1));
			var rightFwd1Element = document.getElementById(this.id_gen(y-1, x+1));
			var fwd1Element = document.getElementById(this.id_gen(y-1, x));
			var fwd2Element = document.getElementById(this.id_gen(y-2, x));
			// console.log("Id gen: "+
			// 			this.id_gen(y-1, x-1)+
			// 			" "+
			// 			this.id_gen(y-1, x+1)+
			// 			" "+
			// 			this.id_gen(y-1, x)+
			// 			" "+
			// 			this.id_gen(y-2, x)
			// );
			if(leftFwd1Element!=null){
				if(leftFwd1Element.childElementCount!=0){
					var leftFwd1Id = leftFwd1Element.firstElementChild.id;
					if(this.isType(leftFwd1Id, "comp_")){
						placeIds[0] = leftFwd1Element.id;
					}
				}
			}
			if(rightFwd1Element!=null){
				if(rightFwd1Element.childElementCount!=0){
					var rightFwd1Id = rightFwd1Element.firstElementChild.id;
					if(this.isType(rightFwd1Id, "comp_")){
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

	attackingPlaces(x, y){
		var attackingPawnPlaces = this.shrinkPawnArray(this.getPawnMovablePlaces(x, y), "checking");
		var new_array = [];
		var first = document.getElementById(attackingPawnPlaces[0]);
		if(first!=null){
			if(first.firstElementChild!=null){
				var next = first.firstElementChild; 
				if(this.isType(next.id, "comp_pawn")){
					new_array.push(attackingPawnPlaces[0]);
				}		
			}
		}
		var second = document.getElementById(attackingPawnPlaces[1]);
		if(second!=null){
			if(second.firstElementChild!=null){
				var next = first.firstElementChild; 
				if(this.isType(next.id, "comp_pawn")){
					new_array.push(attackingPawnPlaces[0]);
				}		
			}
		}
		return new_array;
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
				var leftElement = document.getElementById(array[0]);
				if(leftElement!=null){
					if(leftElement.firstElementChild!=null){
						piece = leftElement.firstElementChild;
						if(this.isType(piece.id, "comp_pawn")){
							new_array.push(array[0]);
						}
					}
				}
			}
			if(array[1]!=""){
				var rightElement = document.getElementById(array[1]);
				if(rightElement!=null){
					if(rightElement.firstElementChild!=null){
						piece = rightElement.firstElementChild;
						if(this.isType(piece.id, "comp_pawn")){
							new_array.push(array[1]);
						}
					}
				}
			}
		}
		return new_array;
	}

}