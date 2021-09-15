import { Button } from "@material-ui/core";

export default function Collection({ collection }) {
  // console.log("Inside Collection component: ", collection);
  const { title, exercises } = collection;
  return (
    <li>
      <h2>{title}</h2>
      <p>
        {exercises.length} {exercises.length === 1 ? "exercise" : "exercises"}
      </p>
      <Button
        onClick={() => console.log("Clicked collection: ", collection.title)}
        variant="outlined"
      >
        View collection
      </Button>
    </li>
  );
}
