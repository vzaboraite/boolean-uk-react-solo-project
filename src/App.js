import { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./pages/Home";
import Collections from "./pages/Collections";
import Collection from "./pages/Collection";
import Exercise from "./pages/Exercise";
import NotFound from "./pages/NotFound";

import Header from "./components/Header";
import Exercises from "./components/Exercises";
import CollectionForm from "./components/CollectionForm";
import ExerciseForm from "./components/ExerciseForm";

function App() {
  const [collections, setCollections] = useState([]);
  const [exercises, setExercises] = useState([]);

  console.log({ collections, exercises });

  useEffect(() => {
    fetch("http://localhost:3030/collections")
      .then((res) => res.json())
      .then((collectionsData) => {
        console.log(collectionsData);
        setCollections(collectionsData);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:3030/exercises")
      .then((res) => res.json())
      .then((exercisesData) => {
        console.log(exercisesData);
        setExercises(exercisesData);
      });
  }, []);

  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/">
          <Home collections={collections} />
        </Route>
        <Route exact path="/new-collection">
          <CollectionForm />
        </Route>
        <Route exact path="/new-exercise">
          <ExerciseForm />
        </Route>
        <Route exact path="/collections">
          <Collections collections={collections} />
        </Route>
        <Route exact path="/collections/:collectionTitle">
          <Collection />
        </Route>
        <Route exact path="/exercises">
          <Exercises exercises={exercises} />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </>
  );
}

export default App;
