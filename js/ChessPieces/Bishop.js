class Bishop extends ChessPiece{
	
	constructor(){
		super();
	}

	movablePlaces(x, y){
		return this.shrinkContinuosArray(this.getBishopMovablePlaces(x, y));
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

	attackingPlaces(isBishop, x, y){
		var attackingBishopPlaces = this.getBishopMovablePlaces(x, y);
		var RightDownAttacking = attackingBishopPlaces[23];
		var LeftUpAttacking = attackingBishopPlaces[31];
		var LeftDownAttacking = attackingBishopPlaces[7];
		var RightUpAttacking = attackingBishopPlaces[15];
		var newAttackingBishopPlaces = [];
		if(isBishop==true){
			this.getAttackingPiecesPlaces(RightDownAttacking, newAttackingBishopPlaces, "comp_bishop", "");
			this.getAttackingPiecesPlaces(LeftUpAttacking, newAttackingBishopPlaces, "comp_bishop", "");
			this.getAttackingPiecesPlaces(LeftDownAttacking, newAttackingBishopPlaces, "comp_bishop", "");
			this.getAttackingPiecesPlaces(RightUpAttacking, newAttackingBishopPlaces, "comp_bishop", "");
		} else {
			this.getAttackingPiecesPlaces(RightDownAttacking, newAttackingBishopPlaces, "", "comp_queen");
			this.getAttackingPiecesPlaces(LeftUpAttacking, newAttackingBishopPlaces, "", "comp_queen");
			this.getAttackingPiecesPlaces(LeftDownAttacking, newAttackingBishopPlaces, "", "comp_queen");
			this.getAttackingPiecesPlaces(RightUpAttacking, newAttackingBishopPlaces, "", "comp_queen");
		}
		return newAttackingBishopPlaces;
	}

	getAttackingPiecesPlaces(placeId, array, type1, type2){
		var type = type1;
		if(type1==""){
			type = type2;
		}
		if(type=="comp_rook"){
		}
		if(placeId!=""){
			var nextPlace = document.getElementById(placeId);
			if(nextPlace.childElementCount!=0){
				var nextPiece = nextPlace.firstElementChild.id;
				if(this.isType(nextPiece, type)){
					array.push(placeId);
				}
			}
		}
	}
}