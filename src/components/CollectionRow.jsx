import { Button } from "@mui/material";

import { useHistory } from "react-router-dom";

export default function CollectionRow({ collection }) {
  const history = useHistory();
  return (
    <li>
      <h2>{collection.title}</h2>
      <p>
        {collection.exercises.length}
        {collection.exercises.length === 1 ? " exercise" : " exercises"}
      </p>
      <Button
        onClick={() =>
          history.push(`/collections/${collection.id}/${collection.title}`)
        }
        variant="outlined"
      >
        View collection
      </Button>
    </li>
  );
}
