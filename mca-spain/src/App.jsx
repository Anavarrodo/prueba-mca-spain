import React from 'react';
import { Route, useHistory } from 'react-router-dom';
import { ROOT_PATH, PRODUCT_PATH } from './utils/paths';
import { Header } from './components';
import ProductListPage from './pages/ProductListPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import { ContextProvider } from './context/context';

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
        <Route exact path={ROOT_PATH} component={ProductListPage} />
        <Route path={`${PRODUCT_PATH}/:id`} component={ProductDetailsPage} />
      </main>
    </ContextProvider>
  );
}

export default App;
