import { Button } from "@material-ui/core";

export default function Exercise({ exercise }) {
  console.log("Inside Exercise: ", exercise);

  const { difficulty, FEN, description, id, collectionId } = exercise;
  return (
    <li>
      <h2>Exercise #{id}</h2>
      <h3>Collection: {collectionId}</h3>
      <span>Difficulty: {difficulty}</span>
      <p>Starting position: {FEN}</p>
      <p>{description}</p>

      <Button
        onClick={() => console.log("Clicked exercise: ", id)}
        variant="outlined"
      >
        View exercise
      </Button>
      <Button
        type="button"
        onClick={() => console.log("Render form to add exercise")}
        variant="outlined"
      >
        Add exercise
      </Button>
    </li>
  );
}
