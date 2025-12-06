import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import CreateTrip from "./create-trip";
import TripResult from "./trip-result/TripResult.jsx";
import Header from "./components/ui/custom/Header.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Layout wraps header + page content
function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">{children}</main>
    </div>
  );
}

// Define all routes in the router
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <App />
      </Layout>
    ),
    errorElement: (
      <Layout>
        <div className="p-10 text-center">
          <h1 className="text-3xl font-bold mb-4">404 Not Found</h1>
          <p>Oops! The page you are looking for does not exist.</p>
          <a href="/" className="text-blue-600 mt-4 inline-block">Go Home</a>
        </div>
      </Layout>
    ),
  },
  {
    path: "/create-trip",
    element: (
      <Layout>
        <CreateTrip />
      </Layout>
    ),
  },
  {
    path: "/trip-result",
    element: (
      <Layout>
        <TripResult />
      </Layout>
    ),
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
