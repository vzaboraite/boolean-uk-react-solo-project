import {
  Button,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { findById } from "../utils/CommonFunctions";

export default function EditExercise({
  exercises,
  collections,
  getNewestData,
}) {
  const history = useHistory();
  const { exerciseId } = useParams();
  const [exerciseToEdit] = useState(findById(exercises, exerciseId));
  const [exerciseInputs, setExerciseInputs] = useState(
    exerciseToEdit && { ...exerciseToEdit }
  );

  const collection =
    exerciseToEdit && findById(collections, exerciseToEdit.collectionId);

  if (!exerciseToEdit) {
    history.push("/not-found");
    return null;
  }

  const { id, collectionId } = exerciseToEdit;
  const { FEN, description, solution, difficulty } = exerciseInputs;

  const handleFormInput = (event) => {
    const inputName = event.target.name;
    const targetValue = event.target.value;

    setExerciseInputs({ ...exerciseInputs, [inputName]: targetValue });

    console.log({ exerciseInputs });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const exerciseInfo = {
      FEN,
      description,
      solution,
      difficulty,
      collectionId,
    };

    const fetchOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(exerciseInfo),
    };

    fetch(`http://localhost:3030/exercises/${id}`, fetchOptions)
      .then((res) => res.json())
      .then((newExercise) => {
        console.log({ newExercise });
        getNewestData();
        history.push(`/exercises/${id}`);
      });
  };

  const handleDeleteButton = () => {
    const exerciseToDelete = { ...exerciseToEdit };
    const { id } = exerciseToDelete;

    fetch(`http://localhost:3030/exercises/${id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then(() => {
        getNewestData();
        history.push(`/collections/${collectionId}/${collection.title}`);
      });
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <h2>Edit exercise</h2>

      <TextField
        id="fen-input"
        name="FEN"
        label="Starting position"
        variant="outlined"
        fullWidth
        margin="normal"
        required
        value={FEN}
        onChange={handleFormInput}
      />
      <TextField
        id="description-input"
        name="description"
        label="Description"
        variant="outlined"
        fullWidth
        margin="normal"
        multiline
        minRows={3}
        value={description}
        onChange={handleFormInput}
      />
      <TextField
        id="solution-input"
        name="solution"
        label="Solution"
        variant="outlined"
        fullWidth
        margin="normal"
        required
        value={solution}
        onChange={handleFormInput}
      />
      <FormLabel component="legend" required>
        Set exercise difficulty:
      </FormLabel>
      <RadioGroup
        aria-label="difficulty"
        name="difficulty"
        value={difficulty}
        onChange={handleFormInput}
      >
        <FormControlLabel
          value="easy"
          control={<Radio required={true} />}
          label="easy"
        />
        <FormControlLabel
          value="medium"
          control={<Radio required={true} />}
          label="medium"
        />
        <FormControlLabel
          value="hard"
          control={<Radio required={true} />}
          label="hard"
        />
      </RadioGroup>
      <div className="action-btn">
        <Button
          type="submit"
          variant="outlined"
          color="success"
          sx={{ fontWeight: 700, color: "success.dark" }}
        >
          Save
        </Button>
        <Button
          type="button"
          variant="outlined"
          color="success"
          sx={{ color: "success.dark" }}
          onClick={handleDeleteButton}
        >
          <DeleteIcon />
        </Button>
      </div>
    </form>
  );
}
