import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './App.css';
import Login from "./layout/Login";
import Chat from "./layout/Chat";
import AuthCheck from "./utils/AuthCheck";

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/chat",
      element: (
        <AuthCheck>
          <Chat />
        </AuthCheck>
      )
    }
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
