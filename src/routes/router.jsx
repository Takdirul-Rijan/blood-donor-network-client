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
import Profile from "../pages/Dashboard/Profile/Profile";
import ContactSection from "../pages/Home/ContactSection/ContactSection";
import DashboardRedirect from "../components/DashboardRedirect/DashboardRedirect";
import EditRequest from "../pages/Dashboard/EditRequest/EditRequest";
import ViewRequest from "../pages/Dashboard/Donor/ViewRequest";
import MyDonationRequests from "../pages/Dashboard/MyRequests/MyDonationRequests";
import AllUsers from "../pages/Dashboard/Admin/AllUsers";
import AllDonationRequests from "../pages/Dashboard/Admin/AllDonationRequests";
import VolunteerDonationRequests from "../pages/Dashboard/Volunteer/VolunteerDonationRequests";
import SearchDonors from "../pages/SearchDonors/SearchDonors";
import CreateDonationRequest from "../pages/Dashboard/Donor/CreateDonationRequest";
import DonationRequests from "../pages/DonationRequests/DonationRequests";
import DonationRequestDetails from "../pages/DonationRequestDetails/DonationRequestDetails";
import FundingPage from "../pages/Funding/FundingPage";
import PaymentSuccess from "../pages/Funding/PaymentSuccess";
import PaymentCancelled from "../pages/Funding/PaymentCancelled";
import AboutUs from "../pages/Home/AboutUs/AboutUs";
import ErrorPage from "../pages/Error/ErrorPage";

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
        path: "contact-us",
        element: <ContactSection></ContactSection>,
      },
      {
        path: "about-us",
        element: <AboutUs></AboutUs>,
      },
      {
        path: "search",
        element: <SearchDonors></SearchDonors>,
        loader: () => fetch("/districtsUpazilas.json"),
      },
      {
        path: "donation-requests",
        element: <DonationRequests></DonationRequests>,
      },
      {
        path: "donation-request/:id",
        element: (
          <PrivateRoute>
            <DonationRequestDetails></DonationRequestDetails>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/requests/${params.id}`),
      },
      {
        path: "funding",
        element: (
          <PrivateRoute>
            <FundingPage></FundingPage>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/payment-success",
        element: <PaymentSuccess></PaymentSuccess>,
      },
      {
        path: "/dashboard/payment-cancelled",
        element: <PaymentCancelled></PaymentCancelled>,
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
      {
        path: "volunteer-requests",
        element: (
          <VolunteerRoute>
            <VolunteerDonationRequests></VolunteerDonationRequests>
          </VolunteerRoute>
        ),
      },
    ],
  },
  {
    path: "/*",
    element: <ErrorPage></ErrorPage>,
  },
]);
