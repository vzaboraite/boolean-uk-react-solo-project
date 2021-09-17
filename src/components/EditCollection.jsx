import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";

export default function EditCollection({
  collections,
  setCollections,
  getCollections,
}) {
  // console.log("Inside CollectionForm: ", collections, setCollections);

  const { collectionTitle } = useParams();
  const history = useHistory();

  const collectionToEdit = collections.find(
    (collection) => collection.title === collectionTitle
  );

  const [collectionInputs, setCollectionInputs] = useState({
    ...collectionToEdit,
  });

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
    <form onSubmit={handleFormSubmit}>
      <h2>Edit Collection</h2>
      <TextField
        id="title-input"
        name="title"
        type="text"
        label="Title"
        variant="outlined"
        fullWidth
        margin="normal"
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
      <div>
        <Button type="submit" variant="outlined">
          Edit
        </Button>
        <Button type="button" variant="outlined" onClick={handleDeleteButton}>
          Delete
        </Button>
      </div>
    </form>
  );
}
