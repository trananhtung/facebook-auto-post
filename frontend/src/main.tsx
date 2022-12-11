import React from "react";
import { createRoot } from "react-dom/client";
import "./style.css";
import App from "./App";
import { InfoProvider } from "./hooks/LoginContext";
import { ChakraProvider } from "@chakra-ui/react";

const container = document.getElementById("root");

const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <ChakraProvider>
      <InfoProvider>
        <App />
      </InfoProvider>
    </ChakraProvider>
  </React.StrictMode>
);
