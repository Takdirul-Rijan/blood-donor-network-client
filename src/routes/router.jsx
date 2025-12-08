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
import RequestBlood from "../pages/RequestBlood";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      { path: "search", element: <h2>SearchDonors</h2> },
      { path: "donation-requests", element: <h2>DonationRequests</h2> },

      {
        path: "donation-requests/:id",
        element: (
          <PrivateRoute>
            <h2>DonationRequestDetails</h2>
          </PrivateRoute>
        ),
      },

      {
        path: "request-blood",
        element: (
          <PrivateRoute>
            <RequestBlood />
          </PrivateRoute>
        ),
      },
    ],
  },

  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
        loader: () => fetch("/districtsUpazilas.json"),
      },
    ],
  },

  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "admin",
        element: (
          <AdminRoute>
            <AdminHome />
          </AdminRoute>
        ),
      },
      {
        path: "donor",
        element: (
          <DonorRoute>
            <DonorHome />
          </DonorRoute>
        ),
      },
      {
        path: "volunteer",
        element: (
          <VolunteerRoute>
            <VolunteerHome />
          </VolunteerRoute>
        ),
      },
    ],
  },
]);
