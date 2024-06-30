import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './App.css';
import Login from "./layout/AuthUi/Login";
import Chat from "./layout/Chat";
import AuthCheck from "./utils/AuthCheck";
import AuthUi from "./layout/AuthUi/Auth";

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <AuthUi />,
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
