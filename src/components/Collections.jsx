import React from "react";
import Collection from "./Collection";

export default function Collections({ collections }) {
  console.log("Inside Collections component: ", collections);
  return (
    <ul>
      {collections.map((collection, index) => {
        return (
          <React.Fragment key={index}>
            <Collection collection={collection} />
          </React.Fragment>
        );
      })}
    </ul>
  );
}
