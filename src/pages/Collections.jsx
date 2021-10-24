import AddIcon from "@mui/icons-material/Add";
import React from "react";
import { useHistory } from "react-router-dom";
import CollectionRow from "../components/CollectionRow";
import useStore from "../store";

export default function Collections() {
  const history = useHistory();
  const collections = useStore((state) => state.collections);

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
