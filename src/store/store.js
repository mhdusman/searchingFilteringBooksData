import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import combineAllReducer from "./combine";


const composeEnhanced =
  (window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const initialState = {};
// const initialState = { msg: { text: "Hello world." } };

const middleware = [thunk];

export const store = createStore(
  combineAllReducer,
  initialState,
  composeEnhanced(applyMiddleware(...middleware))
);



// import { persistStore, persistReducer } from 'redux-persist'
// import storage from 'redux-persist/lib/storage'
// const persistConfig = {
//   key: 'root',
//   storage,
// }
// const persistedReducer = persistReducer(persistConfig, combineAllReducer)
// let store = createStore(persistedReducer,initialState,
//   composeEnhanced(applyMiddleware(...middleware)))
// let persistor = persistStore(store)
// export  { store, persistor }


// console.log(store.getState());
// store.dispatch({
//   type: "SUCCESS",
//   payload: "action is completed successfully.",
// });
// console.log(store.getState());
