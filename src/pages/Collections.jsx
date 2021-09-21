import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React from "react";
import { useHistory } from "react-router-dom";
import CollectionRow from "../components/CollectionRow";

export default function Collections({ collections }) {
  const history = useHistory();

  return (
    <>
      <div className="button">
        <Button
          onClick={() => history.push("/collections/new-collection")}
          variant="outlined"
        >
          <AddIcon />
        </Button>
      </div>

      <ul className="collections">
        {collections.map((collection, index) => {
          return <CollectionRow collection={collection} key={index} />;
        })}
      </ul>
    </>
  );
}
