import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <>
      <h1>Temp Landing Page</h1>

      <h2>Secure Banking. Simplified.</h2>
      <h4>
        Manage your finances with confidence. Create accounts, complete KYC
        verification, add beneficiaries, and perform secure banking
        operations—all from one intuitive platform.
      </h4>

      <div>
        <Link to="/register">Register</Link>
      </div>
      <div>
        <Link to="/login">Login</Link>
      </div>

      <div>
        Features 🔒 Secure Authentication Industry-standard authentication using
        JWT and encrypted passwords to keep your account protected. 💳 Digital
        Account Management Create and manage Savings or Current accounts with
        ease after completing KYC verification. 📄 Quick KYC Verification Submit
        your KYC documents digitally for fast account verification and seamless
        onboarding. 👥 Beneficiary Management Add trusted beneficiaries securely
        and set personalized transfer limits for safer transactions. Why Choose
        Us? Secure & Reliable Banking Fast Digital Verification Easy Account
        Management Role-based User & Admin Portal Modern and Responsive
        Interface How It Works 1️⃣ Register Create your banking account in just a
        few minutes. ↓ 2️⃣ Complete KYC Submit your identification documents for
        verification. ↓ 3️⃣ Create Your Account Open a Savings or Current account
        with the required minimum balance. ↓ 4️⃣ Start Banking Manage
        beneficiaries and access your banking dashboard securely.
      </div>
    </>
  );
};

export default Landing;
