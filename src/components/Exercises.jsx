import React, { useState } from "react";
import ExerciseRow from "./ExerciseRow";
import FilterByDifficultyForm from "./FilterByDifficultyForm";

export default function Exercises({ exercises }) {
  const [difficulty, setDifficulty] = useState("");

  const handleDifficultyOptionsChange = (event) => {
    setDifficulty(event.target.value);
  };

  function filterByDifficulty(exercises) {
    if (difficulty === "") {
      return exercises;
    }

    const filteredExercises = exercises.filter(
      (exercise) => exercise.difficulty === difficulty
    );
    return filteredExercises;
  }
  const filteredExercises = filterByDifficulty(exercises);

  return (
    <>
      <FilterByDifficultyForm
        difficulty={difficulty}
        onChange={handleDifficultyOptionsChange}
      />
      <ul>
        {filteredExercises.map((exercise, index) => {
          return <ExerciseRow exercise={exercise} key={index} />;
        })}
      </ul>
    </>
  );
}
