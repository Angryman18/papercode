import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import rootReducer from "reducer/root-reducer";
import storage from "redux-persist/lib/storage";

const persistConfig = { key: "root", storage };

const PersisReducers = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: PersisReducers,
  middleware: (defaultMiddleware) =>
    defaultMiddleware({
      serializableCheck: false,
    }),
});

const persistReduxStore = persistStore(store);

export default store;
export { persistReduxStore };
