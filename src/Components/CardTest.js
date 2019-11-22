import React from "react";
import Board from "./Board/Board";
import Card from "./Card/Card";

function CardTest() {
  return (
    <div className="flexbox">
      <Board id="board-1" className="board">
        <Card id="card-1" className="card" draggable="true">
          <p>Card One</p>
        </Card>
      </Board>

      <Board id="board-2" className="board">
        <Card id="card-2" className="card" draggable="true">
          <p>Card Two</p>
        </Card>
      </Board>
    </div>
  );
}

export default CardTest