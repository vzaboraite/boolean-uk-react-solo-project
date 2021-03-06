import { Button, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import { findById } from "../utils/CommonFunctions";
import useStore from "../store";

export default function EditCollection() {
  const history = useHistory();
  const collections = useStore((state) => state.collections);
  const setCollections = useStore((state) => state.setCollections);
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
        const updatedCollections = collections.map((collection) => {
          if (collection.id === collectionToEdit.id) {
            return { ...collectionData, exercises: [...collection.exercises] };
          } else {
            return collection;
          }
        });
        setCollections(updatedCollections);

        history.push("/collections");
      });
  };

  const handleDeleteButton = () => {
    const collectionToDelete = { ...collectionToEdit };
    const { id } = collectionToDelete;

    fetch(`http://localhost:3030/collections/${id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then(() => {
        const updatedCollections = collections.filter(
          (collection) => collection.id !== id
        );
        setCollections(updatedCollections);

        history.push("/collections");
      });
  };

  return (
    <form className="center collection-form" onSubmit={handleFormSubmit}>
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
        <Button
          type="submit"
          variant="outlined"
          color="success"
          sx={{ fontWeight: 700, color: "success.dark" }}
        >
          Save
        </Button>
        <Button
          type="button"
          variant="outlined"
          margin="normal"
          color="success"
          sx={{ color: "error" }}
          onClick={handleDeleteButton}
        >
          <DeleteIcon />
        </Button>
      </div>
    </form>
  );
}
