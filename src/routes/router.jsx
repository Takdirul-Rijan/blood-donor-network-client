import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";

import DashboardLayout from "../layouts/DashboardLayout";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import DonorRoute from "./DonorRoute";
import VolunteerRoute from "./VolunteerRoute";

import AdminHome from "../pages/Dashboard/Admin/AdminHome";
import DonorHome from "../pages/Dashboard/Donor/DonorHome";
import VolunteerHome from "../pages/Dashboard/Volunteer/VolunteerHome";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
    ],
  },

  {
    path: "/",
    element: <AuthLayout></AuthLayout>,
    children: [
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <Register></Register>,
        loader: () => fetch("/districtsUpazilas.json"),
      },
    ],
  },

  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "admin",
        element: (
          <AdminRoute>
            <AdminHome></AdminHome>
          </AdminRoute>
        ),
      },
      {
        path: "donor",
        element: (
          <DonorRoute>
            <DonorHome></DonorHome>
          </DonorRoute>
        ),
      },
      {
        path: "volunteer",
        element: (
          <VolunteerRoute>
            <VolunteerHome></VolunteerHome>
          </VolunteerRoute>
        ),
      },
    ],
  },
]);
