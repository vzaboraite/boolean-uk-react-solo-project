import { useParams } from "react-router-dom";

export default function Exercise({ exercises }) {
  console.log("Inside Exercise: ", exercises);

  const { exerciseId } = useParams();

  const exercise = exercises.find(
    (exercise) => exercise.id === parseInt(exerciseId)
  );

  if (!exercise) {
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
