import Main from "./pages/Main";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Layout from "./components/Layout";
import Meaning from "./pages/Meaning";
import Community from "./pages/Community";
import Engineering from "./pages/Engineering";
import MusicApp from "./pages/MusicApp";
import Browse from "./pages/Browse";
import Library from "./pages/Library";
import Search from "./pages/Search";
import Upload from "./pages/Upload";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Navigate to="/" />,
    children: [
      { path: "/", element: <Main /> },
      { path: "/meaning", element: <Meaning /> },
      { path: "/community", element: <Community /> },
      { path: "/engineering", element: <Engineering /> },
    ],
  },
  {
    path: "/app",
    element: <MusicApp />,
    children: [
      { path: "/app", element: <Browse /> },
      { path: "/app/search", element: <Search /> },
      { path: "/app/library", element: <Library /> },
      { path: "/app/upload", element: <Upload /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
