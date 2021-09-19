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
import { findById } from "../utils/CommonFunctions";

export default function ExerciseForm({ collections, getNewestData }) {
  const history = useHistory();
  const { collectionId } = useParams();
  const [collection] = useState(findById(collections, collectionId));
  const [exerciseInputs, setExerciseInputs] = useState({
    FEN: "",
    description: "",
    solution: "",
    difficulty: "",
  });

  if (!collection) {
    history.push("/not-found");
    return null;
  }

  const handleFormInput = (event) => {
    const inputName = event.target.name;
    const targetValue = event.target.value;

    setExerciseInputs({ ...exerciseInputs, [inputName]: targetValue });
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
      .then(() => {
        getNewestData();
        history.push(`/collections/${collection.id}/${collection.title}`);
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
        required
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
        required
        onChange={handleFormInput}
      />
      <FormLabel component="legend" required>
        Set exercise difficulty:
      </FormLabel>
      <RadioGroup
        aria-label="difficulty"
        name="difficulty"
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
        Create
      </Button>
    </form>
  );
}
