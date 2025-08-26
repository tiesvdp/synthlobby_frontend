import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App.tsx";
import { Provider } from "./provider.tsx";
import "@/styles/globals.css";
import * as React from "react";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { PaginationProvider } from "./context/paginationContext.tsx";
import { AuthProvider } from "./context/authContext.tsx";
import { UserPreferencesProvider } from "./context/userPreferencesContext.tsx";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Filler
);

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
      <AuthProvider>
        <UserPreferencesProvider>
          <PaginationProvider>
            <BrowserRouter>
              <Provider>
                <App />
              </Provider>
            </BrowserRouter>
          </PaginationProvider>
        </UserPreferencesProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
