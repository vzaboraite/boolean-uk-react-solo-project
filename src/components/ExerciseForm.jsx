import {
  Button,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";

export default function ExerciseForm() {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        console.log("Submitted");
      }}
    >
      <h2>Create exercise</h2>

      <TextField
        id="fen-input"
        name="fen"
        label="Starting position"
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <TextField
        id="description-input"
        name="description"
        label="Description"
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <TextField
        id="solution-input"
        name="solution"
        label="Solution"
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <FormLabel component="legend">Set exercise difficulty:</FormLabel>
      <RadioGroup
        aria-label="difficulty"
        name="difficulty"
        onChange={(event) => console.log(event.target.value)}
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
