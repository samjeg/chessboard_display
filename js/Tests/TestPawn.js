$(document).ready(function(){
	var testcase = new TestPawn();

	testcase.testGetMovablePlaces();
	
});


class TestPawn{
	
	constructor(){
		this.pawn = new Pawn();
		this.chessPiece = new ChessPiece();
	}

	testGetMovablePlaces(){
		// var expectedResult = ["7G", "3G", "6F", "4F"];
		var movable = this.pawn.getPawnMovablePlaces(5, 6);
		var movableWithPawn = this.pawn.getPawnMovablePlaces(2, 4);
		var expectedMovable = [,, "3F", "4F"];
		var expectedMovableWithPawn = ["5B",, "5C", "6C"];
		// console.log("Movable: "+movable+" - "+movableWithPawn);
		
		for(var i=0; i<movable.length; i++){
			if(movable[i]!=expectedMovable[i]){
				console.assert(movable[i]==expectedMovable[i],
					"pawn Movable not returning correct places: "+movable[i]+" "+expectedMovable[i]
				);
			}
		}

		for(var j=0; j<movableWithPawn.length; j++){
			if(movableWithPawn[j]!=expectedMovableWithPawn[j]){
				console.assert(movableWithPawn[j]==expectedMovableWithPawn[j], "pawn Movable with opponent pawn not returning correct places");
			}
		}
	}
}