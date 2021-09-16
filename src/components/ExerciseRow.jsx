import { Button } from "@mui/material";
import { useHistory } from "react-router-dom";

export default function ExerciseRow({ exercise }) {
  console.log("Inside ExerciseRow: ", exercise);

  const history = useHistory();

  const { id, difficulty } = exercise;
  return (
    <li>
      <h2>Exercise #{id}</h2>
      <span>Difficulty: {difficulty}</span>

      <Button
        onClick={() => history.push(`/exercises/${id}`)}
        variant="outlined"
      >
        View exercise
      </Button>
    </li>
  );
}
