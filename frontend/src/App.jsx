import "./App.css";
import Customer from "./Components/Admin/Customer";
import KycRequests from "./Components/Admin/KycRequests";
import Transactions from "./Components/Admin/Transactions";
import Beneficiaries from "./Components/Customer/Beneficiaries";
import Dashboard from "./Components/Customer/Dashboard";
import KYC from "./Components/Customer/KYC";
import Profile from "./Components/Customer/Profile";
import TransactionHistory from "./Components/Customer/TransactionHistory";
import TransferMoney from "./Components/Customer/TransferMoney";
import Footer from "./Components/Footer";
import Login from "./Components/Login";
import Navbar from "./Components/Navbar";
import Register from "./Components/Register";

function App() {
  return (
    <>
      <div data-theme="dark">
        <Navbar />
        <Customer />
        <KycRequests />
        <Transactions />
        <Footer />
      </div>
    </>
  );
}

export default App;
