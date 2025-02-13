import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
//import "./index.css";
import App from "./App.tsx";
import StarRating from "./components/StarRating-component.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <App /> */}
    <StarRating maxRating={10} currentRating={0} />
  </StrictMode>
);
