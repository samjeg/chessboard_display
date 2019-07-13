class Pawn extends ChessPiece{

	constructor(){
		super();
		this.opponentPlaceIsSetEnPassant = false;
		this.opponentPlaceEnPassant = null;
		this.placeIsSetEnPassant = false;
		this.placeEnPassant = null;
	}

	movablePlaces(
		compPawnStartingPositions, 
		currentEnPassantPlaceId,
		enPassantOpponentLeft, 
		enPassantOpponentRight, 
		isEnPassant, 
		currentEnPassantOpponentPlaceId, 
		x, 
		y
	){
		
		// console.log("pawn: "+this.getPawnMovablePlaces(x, y)+" "+x+" "+y);
		// console.log("shrunken pawn: "+this.shrinkPawnArray(this.getPawnMovablePlaces(x, y), "playing"));
		return this.enPassantMovement(
			compPawnStartingPositions, 
			currentEnPassantPlaceId,
			enPassantOpponentLeft, 
			enPassantOpponentRight, 
			isEnPassant, 
			currentEnPassantOpponentPlaceId,
			this.shrinkPawnArray(this.getPawnMovablePlaces(x, y), "playing"),
			x,
			y
		);
	}

    getEnPassantPlace(){
    	if(this.placeIsSetEnPassant){
    		this.placeIsSetEnPassant = true;
    		return this.placeEnPassant;
    	}
    	return undefined;
    }

     getEnPassantOpponentPlace(){
    	if(this.opponentPlaceIsSetEnPassant){
    		this.opponentPlaceIsSetEnPassant = false;
    		return this.opponentPlaceEnPassant;
    	}
    	return undefined;
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

	enPassantMovement(
		compPawnStartingPositions, 
		currentEnPassantPlaceId, 
		enPassantOpponentLeft, 
		enPassantOpponentRight, 
		isEnPassant, 
		currentEnPassantOpponentPlaceId, 
		rookArray, 
		x,
		y 
	){
		var newArray = [];
		var pawnHasLeft = false;
		var pawnHasRight = false;
		var leftOfPawn = this.id_gen(y, x-1);
		var rightOfPawn = this.id_gen(y, x+1);
		var leftOfPawnElement = document.getElementById(leftOfPawn);
		var rightOfPawnElement = document.getElementById(rightOfPawn);
		if(leftOfPawnElement!=null){
			if(leftOfPawnElement.firstElementChild!=null){
				var enPassantSpace = this.pawnReadyEnPassant(
					compPawnStartingPositions, 
					currentEnPassantPlaceId,
					leftOfPawnElement.firstElementChild.id, 
					leftOfPawn
				);
				// console.log("Curr en pass move: "+currentEnPassantPlaceId);
				// console.log("Pawn ready: "+enPassantSpace);
				if(enPassantSpace!=""){
					rookArray.push(enPassantSpace);
					enPassantOpponentLeft = leftOfPawnElement.firstElementChild.id;
					currentEnPassantOpponentPlaceId = leftOfPawn;
					isEnPassant = true;
					this.opponentPlaceIsSetEnPassant = true;
					this.opponentPlaceEnPassant = leftOfPawn;
					// console.log("En Passant left: "+enPassantSpace);
				}
			}
		}

		if(rightOfPawnElement!=null){
			if(rightOfPawnElement.firstElementChild!=null){
				var enPassantSpace = this.pawnReadyEnPassant(
					compPawnStartingPositions, 
					currentEnPassantPlaceId,
					rightOfPawnElement.firstElementChild.id, 
					rightOfPawn
				);
				if(enPassantSpace!=""){
					rookArray.push(enPassantSpace);
					enPassantOpponentRight = rightOfPawnElement.firstElementChild.id;
					currentEnPassantOpponentPlaceId = rightOfPawn;
					isEnPassant = true;
					this.opponentPlaceIsSetEnPassant = true;
					this.opponentPlaceEnPassant = rightOfPawn;
					// console.log("En Passant right: "+enPassantSpace);
				}
			}
		}
		return rookArray;
	}

	pawnReadyEnPassant(compPawnStartingPositions, currentEnPassantPlaceId, pieceId, placeId){
		var newPlaceId = "";
		// console.log("PieceId: "+pieceId);
		if(this.isType(pieceId, "comp_pawn")){
			for(var i=0; i<compPawnStartingPositions.length; i++){
				if(this.isType(pieceId, String(i+1))){
					var posBefore = this.findPlaceCoordinates(compPawnStartingPositions[i]);
					var y = posBefore[0] + 1;
					var x = posBefore[1];
					var posNow = this.findPlaceCoordinates(placeId);
					var nY = posNow[0] - 1;
					var nX = posNow[1];
					var placeIdWithPosBefore = this.id_gen(y, x);
					var placeIdWithPosNow = this.id_gen(nY, nX);
					// console.log("Pos en passant: "+placeIdWithPosBefore+" "+placeIdWithPosNow);
					if(placeIdWithPosBefore==placeIdWithPosNow){
						newPlaceId = placeIdWithPosNow;
						currentEnPassantPlaceId = placeIdWithPosNow;
						this.placeIsSetEnPassant = true;
						this.placeEnPassant = placeIdWithPosNow;
						// console.log("curr en pass: "+currentEnPassantPlaceId);
					}
				}
			}
		}
		return newPlaceId;
	}

}