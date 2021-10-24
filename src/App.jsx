import { useEffect, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Collections from "./pages/Collections";
import Collection from "./pages/Collection";
import Exercise from "./pages/Exercise";
import NotFound from "./pages/NotFound";

import Header from "./components/Header";
import Exercises from "./components/Exercises";
import CollectionForm from "./components/CollectionForm";
import ExerciseForm from "./components/ExerciseForm";
import EditExercise from "./components/EditExercise";
import EditCollection from "./components/EditCollection";
import useStore from "./store";

function App() {
  const [collections, setCollections] = useStore((state) => [
    state.collections,
    state.setCollections,
  ]);
  const [exercises, setExercises] = useState([]);
  /* This state shows if we are fetching data from the 
  server, needed for application to work properly.*/
  const [isLoadingCollections, setIsLoadingCollections] = useState(true);
  const [isLoadingExercises, setIsLoadingExercises] = useState(true);
  // Derived state to check if we currently fetching data from both endpoints.
  const isLoading = isLoadingCollections || isLoadingExercises;
  console.log({ collections, exercises });

  useEffect(() => {
    getCollections();
  }, []);

  useEffect(() => {
    getExercises();
  }, []);

  function getCollections() {
    setIsLoadingCollections(true);
    fetch("http://localhost:3030/collections")
      .then((res) => res.json())
      .then((collectionsData) => {
        console.log(collectionsData);
        setCollections(collectionsData);
        setIsLoadingCollections(false);
      });
  }

  function getExercises() {
    setIsLoadingExercises(true);
    fetch("http://localhost:3030/exercises")
      .then((res) => res.json())
      .then((exercisesData) => {
        console.log(exercisesData);
        setExercises(exercisesData);
        setIsLoadingExercises(false);
      });
  }

  return (
    <>
      <Header />
      {!isLoading && (
        <main className="center">
          <Switch>
            <Route exact path="/">
              <Redirect push to="/collections" />
            </Route>

            <Route exact path="/collections">
              <Collections />
            </Route>
            <Route exact path="/collections/:collectionId/:collectionTitle">
              <Collection />
            </Route>
            <Route exact path="/collections/new-collection">
              <CollectionForm />
            </Route>
            <Route
              exact
              path="/collections/:collectionId/:collectionTitle/edit-collection"
            >
              <EditCollection />
            </Route>
            <Route
              exact
              path="/collections/:collectionId/:collectionTitle/new-exercise"
            >
              <ExerciseForm setExercises={setExercises} exercises={exercises} />
            </Route>

            <Route exact path="/exercises">
              <Exercises exercises={exercises} />
            </Route>
            <Route exact path="/exercises/:exerciseId">
              <Exercise exercises={exercises} />
            </Route>
            <Route exact path="/exercises/:exerciseId/edit-exercise">
              <EditExercise exercises={exercises} setExercises={setExercises} />
            </Route>

            <Route path="/not-found">
              <NotFound />
            </Route>
            <Route>
              <Redirect push to="/not-found" />
            </Route>
          </Switch>
        </main>
      )}
    </>
  );
}

export default App;
