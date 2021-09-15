import { Button } from "@material-ui/core";

export default function CollectionForm() {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        console.log("Submitted");
      }}
    >
      <h2>Create Collection</h2>
      <label htmlFor="title">Title:</label>
      <input id="title-input" name="title" type="text" /> <br />
      <div>
        <Button type="submit" variant="outlined">
          Create
        </Button>
      </div>
    </form>
  );
}
