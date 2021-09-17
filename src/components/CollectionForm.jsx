import { Button, TextField } from "@mui/material";
import { useState } from "react";

export default function CollectionForm({
  collections,
  setCollections,
  getCollections,
}) {
  // console.log("Inside CollectionForm: ", collections, setCollections);

  const [collectionInputs, setCollectionInputs] = useState({
    title: "",
    description: "",
  });

  const handleFormInput = (event) => {
    console.log(
      "Inside handleFormInput: ",
      event.target.name,
      event.target.value
    );
    const inputName = event.target.name;
    const targetValue = event.target.value;

    setCollectionInputs({
      ...collectionInputs,
      [inputName]: targetValue,
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const { title, description } = collectionInputs;

    const collectionInfo = {
      title,
      description,
    };

    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(collectionInfo),
    };

    fetch("http://localhost:3030/collections", fetchOptions)
      .then((res) => res.json())
      .then((newCollection) => {
        console.log({ newCollection });
        setCollections([...collections, newCollection]);
        getCollections();
      });
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <h2>Create Collection</h2>
      <TextField
        id="title-input"
        name="title"
        type="text"
        label="Title"
        variant="outlined"
        fullWidth
        margin="normal"
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
        onChange={handleFormInput}
      />
      <div>
        <Button type="submit" variant="outlined">
          Create
        </Button>
      </div>
    </form>
  );
}
