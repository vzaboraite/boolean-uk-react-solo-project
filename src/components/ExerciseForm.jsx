import {
  Button,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function ExerciseForm({
  exercises,
  collections,
  setExercises,
  getCollections,
}) {
  console.log("Inside ExerciseForm: ", exercises);

  const { collectionTitle } = useParams();

  const collection = collections.find(
    (collection) => collection.title === collectionTitle
  );

  console.log({ collection });

  const [exerciseInputs, setExerciseInputs] = useState({
    FEN: "",
    description: "",
    solution: "",
    difficulty: "",
  });

  const handleFormInput = (event) => {
    console.log(
      "Inside handleFormInput: ",
      event.target.name,
      event.target.value,
      event.target.checked
    );
    const inputName = event.target.name;
    const targetValue = event.target.value;

    setExerciseInputs({ ...exerciseInputs, [inputName]: targetValue });
    console.log({ exerciseInputs });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const { FEN, description, solution, difficulty } = exerciseInputs;

    const exerciseInfo = {
      FEN,
      description,
      solution,
      difficulty,
      collectionId: collection.id,
    };

    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(exerciseInfo),
    };

    fetch("http://localhost:3030/exercises", fetchOptions)
      .then((res) => res.json())
      .then((newExercise) => {
        console.log({ newExercise });
        setExercises([...exercises, newExercise]);
        getCollections();
      });
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <h2>Create exercise</h2>

      <TextField
        id="fen-input"
        name="FEN"
        label="Starting position"
        variant="outlined"
        fullWidth
        margin="normal"
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
        onChange={handleFormInput}
      />
      <TextField
        id="solution-input"
        name="solution"
        label="Solution"
        variant="outlined"
        fullWidth
        margin="normal"
        onChange={handleFormInput}
      />
      <FormLabel component="legend">Set exercise difficulty:</FormLabel>
      <RadioGroup
        aria-label="difficulty"
        name="difficulty"
        onChange={handleFormInput}
      >
        <FormControlLabel value="easy" control={<Radio />} label="easy" />
        <FormControlLabel value="medium" control={<Radio />} label="medium" />
        <FormControlLabel value="hard" control={<Radio />} label="hard" />
      </RadioGroup>
      <Button type="submit" variant="outlined">
        Create
      </Button>
    </form>
  );
}
