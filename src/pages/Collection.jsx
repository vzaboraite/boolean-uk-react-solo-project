import { Button } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import { useParams, useHistory } from "react-router-dom";
import Exercises from "../components/Exercises";
import { findById } from "../utils/CommonFunctions";
import useStore from "../store";

export default function Collection() {
  const history = useHistory();
  const { collectionId } = useParams();
  const collections = useStore((state) => state.collections);

  const collection = findById(collections, collectionId);

  if (!collection) {
    history.push("/not-found");
    return null;
  }

  const { id, title, description, exercises } = collection;

  const updatedTitle = title.split(" ").join("_");

  return (
    <>
      <div className="btn-group">
        <div className="back-btn">
          <Button
            onClick={() => history.push("/collections")}
            variant="outlined"
            color="success"
          >
            <ArrowBackIosIcon />
          </Button>
        </div>
        <div className="buttons">
          <Button
            onClick={() =>
              history.push(`/collections/${id}/${updatedTitle}/edit-collection`)
            }
            variant="outlined"
            color="success"
          >
            Edit collection
          </Button>
        </div>
      </div>
      <h2>{title}</h2>
      <p className="description">{description}</p>
      <Exercises
        exercises={exercises}
        addNewHandler={() =>
          history.push(`/collections/${id}/${updatedTitle}/new-exercise`)
        }
      />
    </>
  );
}
