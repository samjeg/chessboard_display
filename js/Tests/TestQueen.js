$(document).ready(function(){
	var testcase = new TestQueen();

	testcase.testMovablePlaces();
	
});


class TestQueen{
	
	constructor(){
		this.queen = new Queen();
	}

	testMovablePlaces(){
		var expectedResult = [
			"3B", "3A" ,"3D" ,"3E" , "3F" , "3G", "3H", "4C", "5C", "6C", "7C", "2C",
			"2B", "4D", "5E", "6F", "7G", "2D", "4B", "5A"
		];
		var movable = this.queen.movablePlaces(2, 5);
		// console.log("Movable: "+movable);
		for(var i=0; i<movable.length; i++){
			if(movable[i]!=expectedResult[i]){
				console.assert(movable[i]==expectedResult[i], "Movable not returning correct places");
			}
		}
	}
}