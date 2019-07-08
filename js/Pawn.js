class Pawn extends ChessPiece{

	constructor(){
		super();
	}

	getPawnMovablePlaces(x, y){
		var matrix = this.live_chessboard_matrix;
		var placeIds = [];
		if(x>=0&&x<=7&&y>=0&&y<=7){
			var leftFwd1Element = document.getElementById(this.id_gen(y-1, x-1));
			var rightFwd1Element = document.getElementById(this.id_gen(y-1, x+1));
			var fwd1Element = document.getElementById(this.id_gen(y-1, x));
			var fwd2Element = document.getElementById(this.id_gen(y-2, x));
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
}