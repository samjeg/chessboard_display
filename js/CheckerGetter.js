class CheckerGetter{

	constructor(){
		this.chessPiece = new ChessPiece();
		this.rook = new Rook();
		this.bishop = new Bishop();
		this.queen = new Queen();
		this.king = new King();
		this.pawn = new Pawn();
		this.horse = new Horse();
	}

	fromPiece(){
		var king_piece = document.getElementById("player_king");
		var king_coordinates = this.chessPiece.findPieceCoordinates(king_piece);
		var x = king_coordinates[1];
		var y = king_coordinates[0]
		var attackingPawnPlaces = this.pawn.attackingPlaces(x, y);
		var attackingHorsePlaces = this.horse.attackingPlaces(x, y);
		var attackingRookPlaces = this.rook.attackingPlaces(true, x, y);
		var attackingBishopPlaces = this.bishop.attackingPlaces(true, x, y);
		var queen1 = this.rook.attackingPlaces(false, x, y);
		var queen2 = this.bishop.attackingPlaces(false, x, y);
		var attackingQueenPlaces = queen1.concat(queen2);
		var attackingPlaces = attackingPawnPlaces.concat(attackingHorsePlaces)
		.concat(attackingRookPlaces)
		.concat(attackingBishopPlaces)
		.concat(attackingQueenPlaces);
		return attackingPlaces;
	}

	fromPlace(placeId){
		var attackingPlaces = [];
		var placeCoordinates = this.chessPiece.findPlaceCoordinates(placeId);
		var x = placeCoordinates[1];
		var y = placeCoordinates[0]
		var attackingPawnPlaces = this.pawn.attackingPlaces(x, y);
		var attackingHorsePlaces = this.horse.attackingPlaces(x, y);
		var attackingRookPlaces = this.rook.attackingPlaces(true, x, y);
		var attackingBishopPlaces = this.bishop.attackingPlaces(true, x, y);
		var queen1 = this.rook.attackingPlaces(false, x, y);
		var queen2 = this.bishop.attackingPlaces(false, x, y);
		var attackingQueenPlaces = queen1.concat(queen2);
		var attackingPlaces = attackingPawnPlaces.concat(attackingHorsePlaces)
		.concat(attackingRookPlaces)
		.concat(attackingBishopPlaces)
		.concat(attackingQueenPlaces);
		return attackingPlaces;
	}

	kingHasCheck(){
		var attackingPlaces = this.fromPiece();
		if(attackingPlaces.length>0){
			return true;
		}
		return false;
	}

	placeHasCheck(placeId){
		var attackingPlaces = this.fromPlace(placeId);
		if(attackingPlaces.length>0){
			return true;
		}
		return false;
	}

	toRightRookHasCheck(){
		var toRightRookPlaces = ["1F", "1G"];
		if(this.placeHasCheck(toRightRookPlaces[0])){
			return true;
		}
		if(this.placeHasCheck(toRightRookPlaces[1])){
			return true;
		}
		return false;
	}

	toLeftRookHasCheck(){
		var toLeftRookPlaces = ["1D", "1C", "1B"];
		if(this.placeHasCheck(toLeftRookPlaces[0])){
			// console.log("1D: "+toLeftRookPlaces[0]);
			return true;
		}
		if(this.placeHasCheck(toLeftRookPlaces[1])){
			// console.log("1C: "+toLeftRookPlaces[1]);
			return true;
		}
		if(this.placeHasCheck(toLeftRookPlaces[2])){
			// console.log("1B: "+toLeftRookPlaces[2]);
			return true;
		}
		return false;
	}

	leftRookHasCheck(){
		if(this.checkerGetter.placeHasCheck("1A")){
			return true;
		}
		return false;
	}

	rightRookHasCheck(){
		if(this.checkerGetter.placeHasCheck("1H")){
			return true;
		}
		return false;
	}

	carefullKing(kingArray){
		var newArray = []; 
		for(var i=0; i<kingArray.length; i++){
			var next = kingArray[i];
			if(!this.placeHasCheck(next)){
				newArray.push(next);
			} 
		}
		return newArray;
	}

}