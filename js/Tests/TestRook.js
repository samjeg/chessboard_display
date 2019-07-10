$(document).ready(function(){
	var testcase = new TestRook();

	testcase.testMovablePlaces();
	
});


class TestRook{
	
	constructor(){
		this.rook = new Rook();
	}

	testMovablePlaces(){
		var expectedResult = ["3B", "3A" ,"3D" ,"3E" , "3F" , "3G", "3H", "4C", "5C", "6C", "7C", "2C"];
		var movable = this.rook.movablePlaces(2, 5);
		// console.log("Movable: "+movable);
		for(var i=0; i<movable.length; i++){
			if(movable[i]!=expectedResult[i]){
				console.assert(movable[i]==expectedResult[i], "Movable not returning correct places");
			}
		}
	}
}