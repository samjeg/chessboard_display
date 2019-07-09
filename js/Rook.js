class Rook extends ChessPiece{

	constructor(){
		super();
	}

	movablePlaces(x, y){
		return this.shrinkContinuosArray(this.getRookMovablePlaces(x, y));
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

	placeHasCheck(placeId){
		var attackingPlaces = this.checkerGetter.fromPlace(placeId);
		if(attackingPlaces.length>0){
			return true;
		}
		return false;
	}

	rightRookHasMoved(movedPieces){
		for(var i=0; i<movedPieces.length; i++){
			var next = movedPieces[i];
			if(this.isType(next, "player_rook2")){
				return true;
			}
		}
		return false;
	}

	leftRookHasMoved(movedPieces){
		for(var i=0; i<movedPieces.length; i++){
			var next = movedPieces[i];
			if(this.isType(next, "player_rook1")){
				return true;
			}
		}
		return false;
	}

	toRightRookHasPieces(){
		var toRightRookPlaces = ["1F", "1G"];
		var first = document.getElementById(toRightRookPlaces[0]);
		if(first!=null){
			if(first.firstElementChild!=null){
				return true;
			}
		}
		var second = document.getElementById(toRightRookPlaces[1]);
		if(second!=null){
			if(second.firstElementChild!=null){
				return true;
			}
		}
		return false;
	}

	toLeftRookHasPieces(){
		var toLeftRookPlaces = ["1D", "1C", "1B"];
		var first = document.getElementById(toLeftRookPlaces[0]);
		if(first!=null){
			if(first.firstElementChild!=null){
				return true;
			}
		}
		var second = document.getElementById(toLeftRookPlaces[1]);
		if(second!=null){
			if(second.firstElementChild!=null){
				return true;
			}
		}
		var third = document.getElementById(toLeftRookPlaces[2]);
		if(third!=null){
			if(third.firstElementChild!=null){
				return true;
			}
		}
		return false;
	}	

	attackingPlaces(isRook, x, y){
		var attackingRookPlaces = this.getRookMovablePlaces(x, y);
		var rookFwdAttacking = attackingRookPlaces[23];
		var rookBkwdAttacking = attackingRookPlaces[31];
		var rookRightAttacking = attackingRookPlaces[7];
		var rookLeftAttacking = attackingRookPlaces[15];
		var newAttackingRookPlaces = [];
		if(isRook==true){
			this.getAttackingPiecesPlaces(rookFwdAttacking, newAttackingRookPlaces, "comp_rook", "");
			this.getAttackingPiecesPlaces(rookBkwdAttacking, newAttackingRookPlaces, "comp_rook", "");
			this.getAttackingPiecesPlaces(rookRightAttacking, newAttackingRookPlaces, "comp_rook", "");
			this.getAttackingPiecesPlaces(rookLeftAttacking, newAttackingRookPlaces, "comp_rook", "");
		} else {
			this.getAttackingPiecesPlaces(rookFwdAttacking, newAttackingRookPlaces, "", "comp_queen");
			this.getAttackingPiecesPlaces(rookBkwdAttacking, newAttackingRookPlaces, "", "comp_queen");
			this.getAttackingPiecesPlaces(rookRightAttacking, newAttackingRookPlaces, "", "comp_queen");
			this.getAttackingPiecesPlaces(rookLeftAttacking, newAttackingRookPlaces, "", "comp_queen");
		}
		return newAttackingRookPlaces;
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
