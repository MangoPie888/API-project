import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import HomePage from "./components/HomePage";
import SpotDetailPage from "./components/SpotDetailPage";
import HostingHomePage from "./components/HostingHomePage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
        <Route path='/' exact>
          <HomePage />
        </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path='/spots/:spotId'>
            <SpotDetailPage />
          </Route>
          <Route path='/current'>
            <HostingHomePage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
