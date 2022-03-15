import React from 'react';
import { Route, useHistory } from 'react-router-dom';
import { ROOT_PATH, DETAIL_PATH } from './utils/paths';
import Header from './components/Header';
import Home from './view/Home';
import Detail from './view/Detail';

function App() {
  const history = useHistory();

  return (
    <>
      <Header brand='Phone Store' onClick={() => history.push(ROOT_PATH)} />
      <main>
        <Route exact path={ROOT_PATH} component={Home} />
        <Route path={`${DETAIL_PATH}/:id`} component={Detail} />
      </main>
    </>
  );
}

export default App;
