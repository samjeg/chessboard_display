class Rook extends ChessTools{

	constructor(){
		super();
	}

	movablePlaces(x, y){
		var matrix = this.live_chessboard_matrix;
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
					var nextElement = document.getElementById(this.id_gen(y, i));
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
					var nextElement = document.getElementById(this.id_gen(y, j));
					if(nextElement!=null){
						right[j] = nextElement.id;
						if(nextElement.childElementCount!=0){
							break;
						}
					}
				}
			}

			//Going Down
			for(var k=0; k<=7; k++){
				if(k>y){
					var nextElement = document.getElementById(this.id_gen(k, x));
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
					var nextElement = document.getElementById(this.id_gen(n, x));
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
		
		left = this.moveArrayToBack(left);
		right = this.moveArrayToBack(right);
		up = this.moveArrayToBack(up);
		down = this.moveArrayToBack(down);

		var horizontal = left.concat(right);
		var vertical = up.concat(down);
		placeIds = horizontal.concat(vertical);
		// console.log("Rook Place Ids: "+placeIds)
	
		return placeIds;
	}
}
