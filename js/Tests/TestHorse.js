$(document).ready(function(){
	var testcase = new TestHorse();

	testcase.testMovablePlaces();
	
});


class TestHorse{
	
	constructor(){
		this.horse = new Horse();
	}

	testMovablePlaces(){
		var expectedResult = ["7G", "3G", "6F", "4F"];
		var movable = this.horse.movablePlaces(7, 3);
		// console.log("Movable: "+movable);
		for(var i=0; i<movable.length; i++){
			if(movable[i]!=expectedResult[i]){
				console.assert(movable[i]==expectedResult[i], "Movable not returning correct places");
			}
		}
	}
}