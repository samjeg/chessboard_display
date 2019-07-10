$(document).ready(function(){
	var testcase = new TestKing();

	testcase.testMovablePlaces();
	
});


class TestKing{
	
	constructor(){
		this.king = new King();
	}

	testMovablePlaces(){
		var expectedResult = ["4C","2C","3D","3B","4D","4B","2D","2B"];
		var movable = this.king.getKingMovablePlaces(2, 5);
		// console.log("Movable: "+movable);
		for(var i=0; i<movable.length; i++){
			if(movable[i]!=expectedResult[i]){
				console.assert(movable[i]==expectedResult[i], "Movable not returning correct places");
			}
		}
	}
}