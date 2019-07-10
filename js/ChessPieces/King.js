class King extends ChessPiece{
	
	constructor(){
		super();
	}
	
	getKingMovablePlaces(x, y){
		var matrix = this.live_chessboard_matrix;
		var placeIds = [];
		if(x>=0&&x<=7&&y>=0&&y<=7){
			var leftFwdElement = document.getElementById(this.id_gen(y-1, x-1));
			var rightFwdElement = document.getElementById(this.id_gen(y-1, x+1));
			var fwdElement = document.getElementById(this.id_gen(y-1, x));
			var leftBkwdElement = document.getElementById(this.id_gen(y+1, x-1));
			var rightBkwdElement = document.getElementById(this.id_gen(y+1, x+1));
			var bkwdElement = document.getElementById(this.id_gen(y+1, x));
			var rightElement = document.getElementById(this.id_gen(y, x+1));
			var leftElement = document.getElementById(this.id_gen(y, x-1));
			if(fwdElement!=null){
				placeIds.push(fwdElement.id);
			}
			if(bkwdElement!=null){
				placeIds.push(bkwdElement.id);
			}
			if(rightElement!=null){
				placeIds.push(rightElement.id);
			}
			if(leftElement!=null){
				placeIds.push(leftElement.id);
			}
			if(rightFwdElement!=null){
				placeIds.push(rightFwdElement.id);
			}
			if(leftFwdElement!=null){
				placeIds.push(leftFwdElement.id);
			}
			if(rightBkwdElement!=null){
				placeIds.push(rightBkwdElement.id);
			}
			if(leftBkwdElement!=null){
				placeIds.push(leftBkwdElement.id);
			}
		}
		return placeIds;
	}

	kingHasMoved(movedPieces){
		for(var i=0; i<movedPieces.length; i++){
			var next = movedPieces[i];
			if(this.isType(next, "player_king")){
				return true;
			}
		}
		return false;
	}
}