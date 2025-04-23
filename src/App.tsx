import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TracksPage from "./pages/TracksPage";
import { ToastProvider } from "./context/ToastContext";

// Create React Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 30000,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <div className="min-h-screen bg-gray-50">
          <TracksPage />
        </div>
      </ToastProvider>
    </QueryClientProvider>
  );
}

export default App;
