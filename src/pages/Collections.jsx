import { Button } from "@mui/material";
import React from "react";
import { useHistory } from "react-router-dom";
import CollectionRow from "../components/CollectionRow";

export default function Collections({ collections }) {
  console.log("Inside Collections component: ", collections);

  const history = useHistory();
  return (
    <>
      <Button
        onClick={() => history.push("/collections/new-collection")}
        variant="outlined"
      >
        Create collection
      </Button>
      <ul>
        {collections.map((collection, index) => {
          return <CollectionRow collection={collection} key={index} />;
        })}
      </ul>
    </>
  );
}
