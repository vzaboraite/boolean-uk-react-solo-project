import AddIcon from "@mui/icons-material/Add";
import React from "react";
import { useHistory } from "react-router-dom";
import CollectionRow from "../components/CollectionRow";

export default function Collections({ collections }) {
  const history = useHistory();

  return (
    <>
      <ul className="collections">
        <li>
          <button
            className="add-btn"
            type="button"
            onClick={() => history.push("/collections/new-collection")}
          >
            <AddIcon sx={{ fontSize: 40 }} />
          </button>
        </li>
        {collections.map((collection, index) => {
          return <CollectionRow collection={collection} key={index} />;
        })}
      </ul>
    </>
  );
}
