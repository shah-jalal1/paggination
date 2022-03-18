import React from 'react';
import { Stack } from '@mui/material';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from './component/Home';
import Details from './component/Details';

function App() {
  return (
    <div data-testid="app">
      <BrowserRouter>
        <Stack direction="column" justifyContent="center" alignItems="center" my={5}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/details/:index" component={Details} />
          </Switch>
        </Stack>
      </BrowserRouter>
    </div>
  );
}

export default App;
