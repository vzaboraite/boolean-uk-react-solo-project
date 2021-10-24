import { Button } from "@mui/material";

import { useHistory } from "react-router-dom";

export default function CollectionRow({ collection }) {
  const history = useHistory();

  const updatedTitle = collection.title.split(" ").join("_");
  return (
    <li className="collection-card">
      <h2>{collection.title}</h2>
      <p>
        {collection.exercises.length}
        {collection.exercises.length === 1 ? " exercise" : " exercises"}
      </p>
      <Button
        onClick={() =>
          history.push(`/collections/${collection.id}/${updatedTitle}`)
        }
        variant="outlined"
        color="success"
        sx={{ fontWeight: 700 }}
      >
        View collection
      </Button>
    </li>
  );
}
