import Exercise from "./Exercise";

export default function Exercises({ exercises }) {
  console.log("Inside Exercises component: ", exercises);
  return (
    <ul>
      {exercises.map((exercise, index) => {
        return <Exercise exercise={exercise} key={index} />;
      })}
    </ul>
  );
}
