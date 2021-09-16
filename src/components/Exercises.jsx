import React from "react";
import ExerciseRow from "./ExerciseRow";

export default function Exercises({ exercises }) {
  console.log("Inside Exercises component: ", exercises);
  return (
    <ul>
      {exercises.map((exercise, index) => {
        return <ExerciseRow exercise={exercise} key={index} />;
      })}
    </ul>
  );
}
