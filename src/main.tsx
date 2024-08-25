import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import "./styles/main.scss";
import { Provider } from "react-redux";
import { Store } from "./lib/redux/store.ts";
createRoot(document.getElementById("root")!).render(
  <Provider store={Store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
