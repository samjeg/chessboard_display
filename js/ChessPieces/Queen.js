class Queen extends ChessPiece{
	
	constructor(){
		super();
	}

	movablePlaces(x, y){
		return this.shrinkContinuosArray(this.getQueenMovablePlaces(x, y));
	}

	getQueenMovablePlaces(x, y){
		var rookPlaces = this.getRookMovablePlaces(x, y);
		var bishopPlaces = this.getBishopMovablePlaces(x, y);
		var place_ids = rookPlaces.concat(bishopPlaces);
		return place_ids;
	}

	getBishopMovablePlaces(x, y){
		var matrix = this.live_chessboard_matrix;
		var placeIds = [];
		var leftUp = [];
		var rightUp = [];
		var leftDown = [];
		var rightDown = [];
		if(x>=0&&x<=7&&y>=0&&y<=7){
			for(var i=0; i<=7; i++){
				var b_x = x - i;
				var b_y = y - i;
				if(b_x<=7&&b_x>=0&&b_y<=7&&b_y>=0){
					if(b_x<x&&b_y<y){
						var nextElement = document.getElementById(this.id_gen(b_y, b_x));
						if(nextElement!=null){
							leftUp[i] = nextElement.id;
							if(nextElement.childElementCount!=0){
								break;
							}
						}
					}
				}
			}
			for(var j=0; j<=7; j++){
				var b_x = x + j;
				var b_y = y - j;
				if(b_x<=7&&b_x>=0&&b_y<=7&&b_y>=0){
					if(b_x>x&&b_y<y){
						var nextElement = document.getElementById(this.id_gen(b_y, b_x));
						if(nextElement!=null){
							rightUp[j] = nextElement.id;
							if(nextElement.childElementCount!=0){
								break;
							}
						}
					}
				}
			}
			for(var k=0; k<=7; k++){
				var b_x = x - k;
				var b_y = y + k;
				if(b_x<=7&&b_x>=0&&b_y<=7&&b_y>=0){
					if(b_x<x&&b_y>y){
						var nextElement = document.getElementById(this.id_gen(b_y, b_x));
						if(nextElement!=null){
							leftDown[k] = nextElement.id;
							if(nextElement.childElementCount!=0){
								break;
							}
						}
					}
				}
			}
			for(var n=0; n<=7; n++){
				var b_x = x + n;
				var b_y = y + n;
				if(b_x<=7&&b_x>=0&&b_y<=7&&b_y>=0){
					if(b_x>x&&b_y>y){
						var nextElement = document.getElementById(this.id_gen(b_y, b_x));
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
		leftUp = this.moveArrayToBack(leftUp);
		rightUp = this.moveArrayToBack(rightUp);
		leftDown = this.moveArrayToBack(leftDown);
		rightDown = this.moveArrayToBack(rightDown);
		var leftToRight = leftDown.concat(rightUp);
		var rightToLeft = rightDown.concat(leftUp);
		placeIds = leftToRight.concat(rightToLeft);
		return placeIds;
	}

	getRookMovablePlaces(x, y){
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