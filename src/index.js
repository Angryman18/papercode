import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { NhostReactProvider } from "@nhost/react";
import { NhostApolloProvider } from "@nhost/react-apollo";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import { Provider } from "react-redux";
import store, { persistReduxStore } from "./store/redux";
import nhost from "helper/nhost";
import { PersistGate } from "redux-persist/es/integration/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistReduxStore}>
      <NhostReactProvider nhost={nhost}>
        <NhostApolloProvider nhost={nhost}>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </NhostApolloProvider>
      </NhostReactProvider>
    </PersistGate>
  </Provider>
);

serviceWorkerRegistration.register();
