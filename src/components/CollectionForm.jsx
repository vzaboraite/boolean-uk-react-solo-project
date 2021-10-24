import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import useStore from "../store";

export default function CollectionForm() {
  const history = useHistory();
  const collections = useStore((state) => state.collections);
  const setCollections = useStore((state) => state.setCollections);
  const [collectionInputs, setCollectionInputs] = useState({
    title: "",
    description: "",
  });

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
      .then((data) => {
        console.log("data: ", data);

        const newCollection = { ...data, exercises: [] };
        const updatedCollections = [...collections, newCollection];
        setCollections(updatedCollections);

        history.push("/collections");
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
        required
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
