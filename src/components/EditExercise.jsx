import {
  Button,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useParams, useHistory } from "react-router-dom";

export default function EditExercise({ exercises, getCollections }) {
  console.log("Inside ExerciseForm: ", exercises);

  const { exerciseId } = useParams();
  const history = useHistory();

  const exerciseToEdit = exercises.find(
    (exercise) => exercise.id === parseInt(exerciseId)
  );

  console.log({ exerciseToEdit });

  const [exerciseInputs, setExerciseInputs] = useState({
    ...exerciseToEdit,
  });

  const { id, collectionId, FEN, description, solution, difficulty } =
    exerciseInputs;

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
        getCollections();
        history.push(`/exercises`);
      });
  };

  const handleDeleteButton = () => {
    const exerciseToDelete = { ...exerciseToEdit };
    const { id } = exerciseToDelete;

    fetch(`http://localhost:3030/exercises/${id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then(() => {
        getCollections();
        history.push(`/exercises`);
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
      <Button type="submit" variant="outlined">
        Edit
      </Button>
      <Button type="button" variant="outlined" onClick={handleDeleteButton}>
        Delete
      </Button>
    </form>
  );
}
