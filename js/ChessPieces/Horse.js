class Horse extends ChessPiece{
	
	constructor(){
		super();
	}
	
	movablePlaces(x, y){
		var matrix = this.live_chessboard_matrix;
		var placeIds = [];
		if(x>=0&&x<=7&&y>=0&&y<=7){
			var topThenRightElement = document.getElementById(this.id_gen(y-2, x-1));
			var topThenLeftElement = document.getElementById(this.id_gen(y-2, x+1));
			var bottomThenRightElement = document.getElementById(this.id_gen(y+2, x+1));
			var bottomThenRightElement = document.getElementById(this.id_gen(y+2, x+1));
			var bottomThenLeftElement = document.getElementById(this.id_gen(y+2, x-1));
			var rightThenTopElement = document.getElementById(this.id_gen(y-1, x+2));
			var rightThenBottomElement = document.getElementById(this.id_gen(y+1, x+2));
			var leftThenTopElement = document.getElementById(this.id_gen(y-1, x-2));
			var leftThenBottomElement = document.getElementById(this.id_gen(y+1, x-2));
			if(topThenRightElement!=null){
				placeIds.push(topThenRightElement.id);	
			}
			if(topThenLeftElement!=null){
				placeIds.push(topThenLeftElement.id);		
			}
			if(bottomThenRightElement!=null){
				placeIds.push(bottomThenRightElement.id);
			}
			if(bottomThenLeftElement!=null){
				placeIds.push(bottomThenLeftElement.id);
			}
			if(rightThenTopElement!=null){
				placeIds.push(rightThenTopElement.id);
			}
			if(rightThenBottomElement!=null){
				placeIds.push(rightThenBottomElement.id);
			}
			if(leftThenTopElement!=null){
				placeIds.push(leftThenTopElement.id);
			}
			if(leftThenBottomElement!=null){
				placeIds.push(leftThenBottomElement.id);
			}
		}
		return placeIds;
	}

	attackingPlaces(x, y){
		var horseMovablePlaces = this.movablePlaces(x, y);
		var attackingHorsePlaces = [];
		for(var i=0; i<horseMovablePlaces.length; i++){
			var next = document.getElementById(horseMovablePlaces[i]);
			if(next!=null){
				if(next.childElementCount!=0){
					if(next.firstElementChild!=null){
						if(this.isType(next.firstElementChild.id, "comp_horse")){
							attackingHorsePlaces.push(next.id);
						}
					}
				}
			}
		}
		return attackingHorsePlaces;
	}
}