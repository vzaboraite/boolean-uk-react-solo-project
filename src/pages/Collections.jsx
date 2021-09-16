import React from "react";
import CollectionRow from "../components/CollectionRow";

export default function Collections({ collections }) {
  console.log("Inside Collections component: ", collections);

  return (
    <ul>
      {collections.map((collection, index) => {
        return <CollectionRow collection={collection} key={index} />;
      })}
    </ul>
  );
}
