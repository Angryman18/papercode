import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import rootReducer from "reducer/root-reducer";
import storage from "redux-persist/lib/storage";

const persistConfig = { key: "root", version: 1, storage, blacklist: ["output", "utils"] };

const PersistReducers = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: PersistReducers,
  middleware: (defaultMiddleware) =>
    defaultMiddleware({
      serializableCheck: false,
    }),
});

const persistReduxStore = persistStore(store);

export default store;
export { persistReduxStore };
