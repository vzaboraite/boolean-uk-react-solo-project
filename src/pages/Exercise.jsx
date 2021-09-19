import { Button } from "@mui/material";
import { useParams, useHistory } from "react-router-dom";
import { findById } from "../utils/CommonFunctions";

export default function Exercise({ exercises }) {
  const history = useHistory();
  const { exerciseId } = useParams();
  const exercise = findById(exercises, exerciseId);

  // If exercise wasn't found, redirect to `404 Page Not Found`
  if (!exercise) {
    history.push("/not-found");
    return null;
  }

  const { difficulty, FEN, description, id, collectionId, solution } = exercise;

  return (
    <main>
      <Button onClick={() => history.goBack()} variant="outlined">
        Back
      </Button>
      <h2>Exercise #{id}</h2>
      <h3>Collection: {collectionId}</h3>
      <span>Difficulty: {difficulty}</span>
      <p>Starting position: {FEN}</p>
      {description !== "" && <p>Description: {description}</p>}
      <p>Solution: {solution}</p>
    </main>
  );
}
