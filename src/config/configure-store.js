import ReduxThunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReducer } from '../modules/root-reducer';

export function configureStore() {
  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(ReduxThunk))
  );

  if (process.env.NODE_ENV !== 'production') {
    if (module.hot) {
      module.hot.accept('../modules/root-reducer', () => {
        const nextRootReducer = require('../modules/root-reducer').rootReducer;
        store.replaceReducer(nextRootReducer);
      });
    }
  }

  return store;
}
