import React from "react";
import ReactDOM from "react-dom/client";

import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./app/store.js";

// in development comment it out 👇🏻
import { disableReactDevTools } from "@fvilers/disable-react-devtools";

import App from "./App.jsx";

import "./index.css";

// in development comment it out 👇🏻
if (import.meta.env.MODE === "production") disableReactDevTools();

const router = createBrowserRouter(
  createRoutesFromElements(<Route path='/*' element={<App />} />)
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
