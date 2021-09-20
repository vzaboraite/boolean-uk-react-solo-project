import { Button } from "@mui/material";

import { useParams, useHistory } from "react-router-dom";
import Exercises from "../components/Exercises";
import { findById } from "../utils/CommonFunctions";

export default function Collection({ collections }) {
  const history = useHistory();
  const { collectionId } = useParams();

  const collection = findById(collections, collectionId);

  if (!collection) {
    history.push("/not-found");
    return null;
  }

  const { id, title, exercises } = collection;

  return (
    <>
      <Button onClick={() => history.push("/collections")} variant="outlined">
        Back
      </Button>
      <h2>{title}</h2>
      <p>
        {exercises.length}
        {exercises.length === 1 ? " exercise" : " exercises"}
      </p>
      <Button
        onClick={() => history.push(`/collections/${id}/${title}/new-exercise`)}
        variant="outlined"
      >
        Create exercise
      </Button>
      <Button
        onClick={() =>
          history.push(`/collections/${id}/${title}/edit-collection`)
        }
        variant="outlined"
      >
        Edit collection
      </Button>
      {exercises.length > 0 && <Exercises exercises={exercises} />}
    </>
  );
}
