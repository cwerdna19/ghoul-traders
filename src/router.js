import { createBrowserRouter } from "react-router-dom";

import Layout from './components/Layout.js'
import SignUp from './components/SignUp.js'
import Login from './components/Login.js'
import Profile from "./components/profile/Profile.js";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "signup",
          element: <SignUp />
        },
        {
          path: "login",
          element: <Login />
        },
        {
          path: "profile",
          element: <Profile />
        }
      ]
    },
]);

export default router;