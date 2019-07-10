$(document).ready(function(){
	var testcase = new TestBishop();

	testcase.testMovablePlaces();
	
});


class TestBishop{
	
	constructor(){
		this.bishop = new Bishop();
	}

	testMovablePlaces(){
		var expectedResult = ["2B", "4D", "5E", "6F", "7G", "2D", "4B", "5A"];
		var movable = this.bishop.movablePlaces(2, 5);
		// console.log("Movable: "+movable);
		for(var i=0; i<movable.length; i++){
			if(movable[i]!=expectedResult[i]){
				console.assert(movable[i]==expectedResult[i], "Movable not returning correct places");
			}
		}
	}
}