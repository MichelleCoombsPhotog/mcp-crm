import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import MCRM from "./App.jsx";
import Proposal from "./Proposal.jsx";

const path = window.location.pathname;
const isProposal = path === "/proposal" || path.startsWith("/proposal");

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {isProposal ? <Proposal /> : <MCRM />}
  </StrictMode>
);
