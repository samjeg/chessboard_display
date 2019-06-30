$(document).ready(function(){
	console.log("Hello chessboard")
	var chess_piece = document.createElement("DIV");
	chess_piece.setAttribute("id", "brook1")
	chess_piece.setAttribute("class", "chesspiece")
	var chess_icon = document.createTextNode("♜"); 
	chess_piece.appendChild(chess_icon);
	document.getElementById("8B").appendChild(chess_piece);
	// chess_piece.classList.add("chesspiece");                 
	// document.getElementById("8B").setAttribute("text", "♜")
	// chess_piece.setAttribute("text", "♜")
	// chesspiece.appendChild(chess_icon);                         
});

function robot(){
}