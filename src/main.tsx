import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "./App.tsx";
import { Provider } from "./provider.tsx";

import "@/styles/globals.css";
import { SynthProvider } from "@/context/synthContext.tsx";
import * as React from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: import.meta.env.PROD,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <SynthProvider>
        <BrowserRouter>
          <Provider>
            <App />
          </Provider>
        </BrowserRouter>
      </SynthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
