import React, { useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import ExerciseRow from "./ExerciseRow";
import FilterByDifficultyForm from "./FilterByDifficultyForm";

export default function Exercises({ exercises, addNewHandler }) {
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
      {exercises.length > 0 && (
        <FilterByDifficultyForm
          difficulty={difficulty}
          onChange={handleDifficultyOptionsChange}
        />
      )}
      <ul className="exercises">
        {addNewHandler && (
          <div className="exercise">
            <button
              className="add-btn"
              onClick={addNewHandler}
              variant="outlined"
              color="success"
            >
              <AddIcon sx={{ fontSize: 60 }} />
            </button>
          </div>
        )}
        {filteredExercises.map((exercise, index) => {
          return <ExerciseRow exercise={exercise} key={index} />;
        })}
      </ul>
    </>
  );
}
