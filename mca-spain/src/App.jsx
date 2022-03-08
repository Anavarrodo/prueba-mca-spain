import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ROOT_PATH, HOME_PATH, DETAIL_PATH } from './utils/paths';
import Home from './view/Home';
import Detail from './view/Detail';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path={ROOT_PATH} exact element={<Home />} />
          <Route path={HOME_PATH} exact element={<Home />} />
          <Route path={DETAIL_PATH} element={<Detail />} />
        </Routes>
      </BrowserRouter>
  );
}
export default App;
// path={`${DETAIL_PATH}/:id`}
