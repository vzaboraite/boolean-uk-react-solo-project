import "chessboard-element";

export default function ChessBoard({ position }) {
  return (
    <chess-board
      position={position}
      draggable-pieces
      drop-off-board="snapback"
    ></chess-board>
  );
}
