import { Button } from "@mui/material";

import { useParams, useHistory } from "react-router-dom";
import Exercises from "../components/Exercises";

export default function Collection({ collections }) {
  console.log("Inside Collection component: ", collections);

  const { collectionTitle } = useParams();
  const history = useHistory();

  const collection = collections.find(
    (collection) => collection.title === collectionTitle
  );
  console.log({ collection });

  const { title, exercises } = collection;

  if (!collection) {
    return null;
  }
  return (
    <main>
      <Button onClick={() => history.push("/")} variant="outlined">
        Back
      </Button>
      <h2>{title}</h2>
      {exercises.length > 0 && (
        <p>
          {exercises.length}
          {exercises.length === 1 ? " exercise" : " exercises"}
        </p>
      )}
      <Button
        onClick={() => history.push(`/collections/${title}/new-exercise`)}
        variant="outlined"
      >
        Create exercise
      </Button>
      <Button
        onClick={() =>
          history.push(`/collections/${collection.title}/edit-collection`)
        }
        variant="outlined"
      >
        Edit collection
      </Button>
      <Exercises exercises={exercises} />
    </main>
  );
}
