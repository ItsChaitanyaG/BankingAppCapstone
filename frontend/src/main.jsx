import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./App.css";
import Dashboard from "./Components/Customer/Dashboard.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout.jsx";
import Profile from "./Components/Customer/Profile.jsx";
import TransferMoney from "./Components/Customer/TransferMoney.jsx";
import TransactionHistory from "./Components/Customer/TransactionHistory.jsx";
import Beneficiaries from "./Components/Customer/Beneficiaries.jsx";
import KYC from "./Components/Customer/KYC.jsx";
import AdminDashboard from "./Components/Admin/AdminDashboard.jsx";
import Customer from "./Components/Admin/Customer.jsx";
import KycRequests from "./Components/Admin/KycRequests.jsx";
import KycDetails from "./Components/Admin/KycDetails.jsx";
import Transactions from "./Components/Admin/Transactions.jsx";
import Landing from "./Components/Landing.jsx";
import Register from "./Components/Register.jsx";
import Login from "./Components/Login.jsx";
import Layout2 from "./Layout2.jsx";
import Accounts from "./Components/Customer/Accounts.jsx";
import AccountDetail from "./Components/Customer/AccountDetail.jsx";
import AuthProvider from "./Context/AuthProvider.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/user",
    element: (
      <AuthProvider>
        <Layout />
      </AuthProvider>
    ),
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "kyc",
        element: <KYC />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "transfer-money",
        element: <TransferMoney />,
      },
      {
        path: "transaction-history",
        element: <TransactionHistory />,
      },
      {
        path: "accounts",
        element: <Accounts />,
      },
      {
        path: "accounts/:id",
        element: <AccountDetail />,
      },
      {
        path: "beneficiaries",
        element: <Beneficiaries />,
      },
    ],
  },
  {
    path: "/admin",
    element: <Layout2 />,
    children: [
      {
        path: "",
        element: <AdminDashboard />,
      },
      {
        path: "customers",
        element: <Customer />,
      },
      {
        path: "kyc-requests",
        element: <KycRequests />,
      },
      {
        path: "kyc-requests/:id",
        element: <KycDetails />,
      },
      {
        path: "transactions",
        element: <Transactions />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
