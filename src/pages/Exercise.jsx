import { useParams, useHistory } from "react-router-dom";

export default function Exercise({ exercises }) {
  console.log("Inside Exercise: ", exercises);

  const { exerciseId } = useParams();
  const history = useHistory();

  // If exercise id is not a number, redirect to `404 Page Not Found`
  if (!Number.isInteger(parseInt(exerciseId))) {
    history.push("/not-found");
  }

  const exercise = exercises.find(
    (exercise) => exercise.id === parseInt(exerciseId)
  );

  // If exercise wasn't found, redirect to `404 Page Not Found`
  if (!exercise) {
    history.push("/not-found");
    return null;
  }

  const { difficulty, FEN, description, id, collectionId } = exercise;

  return (
    <main>
      <h2>Exercise #{id}</h2>
      <h3>Collection: {collectionId}</h3>
      <span>Difficulty: {difficulty}</span>
      <p>Starting position: {FEN}</p>
      <p>{description}</p>
    </main>
  );
}
