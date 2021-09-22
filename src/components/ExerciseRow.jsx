import { Button } from "@mui/material";
import { useHistory } from "react-router-dom";
import ChessBoard from "./ChessBoard";

export default function ExerciseRow({ exercise }) {
  const history = useHistory();
  const { id, difficulty, FEN } = exercise;

  return (
    <li>
      <h2>Exercise #{id}</h2>
      <span>Difficulty: {difficulty}</span>
      <ChessBoard position={FEN} />

      <div className="action-btn">
        <Button
          onClick={() => history.push(`/exercises/${id}`)}
          variant="outlined"
          color="success"
          sx={{
            fontWeight: 700,
            color: "success.dark",
          }}
        >
          View exercise
        </Button>
      </div>
    </li>
  );
}
