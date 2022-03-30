import React from 'react';
import { Route, useHistory } from 'react-router-dom';
import { ROOT_PATH, PRODUCT_PATH } from './utils/paths';
import { Header } from './components';
import Home from './view/Home';
import Detail from './view/Detail';
import { ContextProvider } from './utils/context';

function App() {
  const history = useHistory();

  return (
    <ContextProvider>
      <Header
        brand='Phone Store'
        onClick={() =>
          history.push({
            pathname: ROOT_PATH,
            state: { access: 'init' },
          })
        }
      />
      <main>
        <Route exact path={ROOT_PATH} component={Home} />
        <Route path={`${PRODUCT_PATH}/:id`} component={Detail} />
      </main>
    </ContextProvider>
  );
}

export default App;
