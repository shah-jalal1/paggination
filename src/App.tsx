import React from 'react';
import Home from './component/Home';
import {
  Navigate,
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import { Stack } from '@mui/material';
import Details from './component/Details';

function App() {
  return (
    <div >
      <BrowserRouter>
        <Stack direction="column" justifyContent="center" alignItems="center" my={5}>
          <Link to='/'>Return Home</Link>
          <Routes>
            <Route path="/*" element={<Navigate  to="/" />} />
            <Route path="/" element={<Home />} />
            <Route path="/details" element={<Details/>} />
          </Routes>
        </Stack>
      </BrowserRouter>
    </div>
  );
}

export default App;
