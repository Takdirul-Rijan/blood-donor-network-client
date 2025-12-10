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
import DonorHome from "../pages/Dashboard/Donor/DonorHome";
import AdminHome from "../pages/Dashboard/Admin/AdminHome";
import VolunteerHome from "../pages/Dashboard/Volunteer/VolunteerHome";
import RequestBlood from "../pages/RequestBlood";
import Profile from "../pages/Dashboard/Profile/Profile";
import ContactSection from "../pages/Home/ContactSection/ContactSection";
import DashboardRedirect from "../components/DashboardRedirect/DashboardRedirect";
import EditRequest from "../pages/Dashboard/EditRequest/EditRequest";
import ViewRequest from "../pages/Dashboard/Donor/ViewRequest";
import MyDonationRequests from "../pages/Dashboard/MyRequests/MyDonationRequests";
import CreateDonationRequest from "../pages/Dashboard/CreateDonationRequest/CreateDonationRequest";
import AllUsers from "../pages/Dashboard/Admin/AllUsers";
import AllDonationRequests from "../pages/Dashboard/Admin/AllDonationRequests";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "request-blood",
        element: (
          <PrivateRoute>
            <RequestBlood></RequestBlood>
          </PrivateRoute>
        ),
        loader: () => fetch("/districtsUpazilas.json"),
      },
      { path: "search", element: <h2>SearchDonors</h2> },
      { path: "donation-requests", element: <h2>DonationRequests</h2> },
      {
        path: "contact-us",
        element: <ContactSection></ContactSection>,
      },

      {
        path: "donation-requests/:id",
        element: (
          <PrivateRoute>
            <h2>DonationRequestDetails</h2>
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
        index: true,
        element: <DashboardRedirect></DashboardRedirect>,
      },
      {
        path: "admin",
        element: (
          <AdminRoute>
            <AdminHome />
          </AdminRoute>
        ),
      },
      {
        path: "all-users",
        element: (
          <AdminRoute>
            <AllUsers></AllUsers>
          </AdminRoute>
        ),
      },
      {
        path: "all-blood-donation-request",
        element: (
          <AdminRoute>
            <AllDonationRequests></AllDonationRequests>
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
            <VolunteerHome />
          </VolunteerRoute>
        ),
      },

      {
        path: "my-requests",
        element: (
          <DonorRoute>
            <MyDonationRequests />
          </DonorRoute>
        ),
      },
      {
        path: "profile",
        element: <Profile></Profile>,
      },
      {
        path: "edit-request/:id",
        element: <EditRequest></EditRequest>,
      },
      {
        path: "/dashboard/request/:id",
        element: <ViewRequest></ViewRequest>,
      },
      {
        path: "/dashboard/my-donation-requests",
        element: <MyDonationRequests></MyDonationRequests>,
      },
      {
        path: "create-donation-request",
        element: <CreateDonationRequest></CreateDonationRequest>,
        loader: () => fetch("/districtsUpazilas.json"),
      },
    ],
  },
]);
