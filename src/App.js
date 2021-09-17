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
import EditCollection from "./components/EditCollection";

function App() {
  const [collections, setCollections] = useState([]);
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
        <Switch>
          <Route exact path="/">
            <Home collections={collections} />
          </Route>
          <Route exact path="/collections/new-collection">
            <CollectionForm
              collections={collections}
              setCollections={setCollections}
              getCollections={getCollections}
            />
          </Route>
          <Route exact path="/collections/:collectionTitle/new-exercise">
            <ExerciseForm
              exercises={exercises}
              collections={collections}
              setExercises={setExercises}
              getCollections={getCollections}
            />
          </Route>
          <Route exact path="/collections">
            <Collections collections={collections} />
          </Route>
          <Route exact path="/collections/:collectionTitle">
            <Collection collections={collections} />
          </Route>
          <Route exact path="/collections/:collectionTitle/edit-collection">
            <EditCollection
              collections={collections}
              setCollections={setCollections}
              getCollections={getCollections}
            />
          </Route>
          <Route exact path="/exercises">
            <Exercises exercises={exercises} />
          </Route>
          <Route exact path="/exercises/:exerciseId">
            <Exercise exercises={exercises} />
          </Route>
          <Route path="/not-found">
            <NotFound />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
