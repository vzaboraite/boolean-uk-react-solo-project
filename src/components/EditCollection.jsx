import { Button, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import { findById } from "../utils/CommonFunctions";

export default function EditCollection({ collections, getCollections }) {
  // console.log("Inside CollectionForm: ", collections, setCollections);

  const history = useHistory();
  const { collectionId } = useParams();
  const [collectionToEdit] = useState(findById(collections, collectionId));
  const [collectionInputs, setCollectionInputs] = useState(
    collectionToEdit && { ...collectionToEdit }
  );

  if (!collectionToEdit) {
    history.push("/not-found");
    return null;
  }

  const handleFormInput = (event) => {
    const inputName = event.target.name;
    const targetValue = event.target.value;

    console.log({ inputName, targetValue });

    setCollectionInputs({
      ...collectionInputs,
      [inputName]: targetValue,
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const collectionInfo = {
      title: collectionInputs.title,
      description: collectionInputs.description,
    };

    const fetchOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(collectionInfo),
    };

    fetch(
      `http://localhost:3030/collections/${collectionToEdit.id}`,
      fetchOptions
    )
      .then((res) => res.json())
      .then((collectionData) => {
        console.log({ collectionData });
        getCollections();
        history.push("/collections");
      });
  };

  const handleDeleteButton = () => {
    const collectionToDelete = { ...collectionToEdit };
    const { id } = collectionToDelete;

    fetch(`http://localhost:3030/collections/${id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then(() => {
        getCollections();
        history.push("/collections");
      });
  };

  return (
    <form className="center" onSubmit={handleFormSubmit}>
      <h2>Edit Collection</h2>
      <TextField
        id="title-input"
        name="title"
        type="text"
        label="Title"
        variant="outlined"
        fullWidth
        margin="normal"
        required
        value={collectionInputs.title}
        onChange={handleFormInput}
      />
      <TextField
        id="description-input"
        name="description"
        type="text"
        label="Description"
        variant="outlined"
        multiline
        minRows={3}
        fullWidth
        margin="normal"
        value={collectionInputs.description}
        onChange={handleFormInput}
      />

      <div className="action-btn">
        <Button type="submit" variant="outlined">
          Save
        </Button>
        <Button
          type="button"
          variant="outlined"
          margin="normal"
          onClick={handleDeleteButton}
        >
          <DeleteIcon />
        </Button>
      </div>
    </form>
  );
}
