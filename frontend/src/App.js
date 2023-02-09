import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import HomePage from "./components/HomePage";
import SpotDetailPage from "./components/SpotDetailPage";
import HostingHomePage from "./components/HostingHomePage";
import NotFound from "./components/NotFound";
import MyReview from "./components/MyReview/MyReview";
import MyBooking from "./components/Booking/MyBooking";

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
          <Route path="/signup" exact>
            <SignupFormPage />
          </Route>
          <Route path='/current' exact>
            <HostingHomePage />
          </Route>
          <Route path='/reviews/current'>
            <MyReview/>
          </Route>
          <Route path='/mybookings'>
            <MyBooking/>
          </Route>
          <Route path='/notfound'>
            <NotFound/>
          </Route>
          <Route path='/:spotId' >
            <SpotDetailPage />
          </Route>
          <Route path='*'>
            <NotFound/>
          </Route>
        </Switch>
    
    
      )}
    </>
  );
}

export default App;
