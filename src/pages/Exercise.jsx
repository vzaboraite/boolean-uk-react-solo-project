import { Button } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useParams, useHistory } from "react-router-dom";
import ChessBoard from "../components/ChessBoard";
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
    <>
      <Button
        onClick={() => history.goBack()}
        variant="outlined"
        color="success"
        sx={{
          fontWeight: 700,
          color: "success.dark",
        }}
      >
        <ArrowBackIosIcon />
      </Button>
      <h2>Exercise #{id}</h2>
      <div className="exercise chess-board">
        <ChessBoard position={FEN} />
        <div className="text">
          {description !== "" && (
            <p>
              <b>Description:</b> {description}
            </p>
          )}
          <p>
            <b>Solution:</b> {solution}
          </p>
        </div>
      </div>
      <Button
        onClick={() => history.push(`/exercises/${id}/edit-exercise`)}
        variant="outlined"
        color="success"
        sx={{
          fontWeight: 700,
          color: "success.dark",
        }}
      >
        Edit exercise
      </Button>
    </>
  );
}
