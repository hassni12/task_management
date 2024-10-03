import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { persistor, store } from "./redux-store/store.tsx";
import { PersistGate } from "redux-persist/integration/react";

import PageLoading from "./components/page-loading.tsx";
createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={<PageLoading />} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
