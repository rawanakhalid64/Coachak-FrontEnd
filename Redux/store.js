// // store.js
// import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
// import userReducer from "./userSlice";

// // Combine reducers
// const rootReducer = combineReducers({
//   user: userReducer,
// });

// // Check if we're on client side
// const isClient = typeof window !== 'undefined';

// let store;
// let persistor;

// if (isClient) {
//   // Client-side code
//   const storage = require('redux-persist/lib/storage').default;
  
//   const persistConfig = {
//     key: "root",
//     storage,
//   };
  
//   const persistedReducer = persistReducer(persistConfig, rootReducer);
  
//   store = configureStore({
//     reducer: persistedReducer,
//     middleware: (getDefaultMiddleware) =>
//       getDefaultMiddleware({
//         serializableCheck: {
//           ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//         },
//       }),
//   });
  
//   persistor = persistStore(store);
// } else {
//   // Server-side code
//   store = configureStore({
//     reducer: rootReducer,
//     middleware: (getDefaultMiddleware) =>
//       getDefaultMiddleware({
//         serializableCheck: {
//           ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//         },
//       }),
//   });
// }

// export { store, persistor };
// Redux/store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import userReducer from "./userSlice";

// Import customStorage instead of redux-persist storage
// Only import on client side
let customStorage;
if (typeof window !== 'undefined') {
  customStorage = require('./customStorage').default;
}

const rootReducer = combineReducers({
  user: userReducer,
});

// Check if we're on client side
const isClient = typeof window !== 'undefined';

let store;
let persistor;

if (isClient) {
  // Client-side code
  const persistConfig = {
    key: "root",
    storage: customStorage,
  };
  
  const persistedReducer = persistReducer(persistConfig, rootReducer);
  
  store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });
  
  persistor = persistStore(store);
} else {
  // Server-side code
  store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });
}

export { store, persistor };