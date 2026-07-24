import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <>
      <div className="min-h-screen bg-base-200">
      {/* Hero */}
      <section className="hero min-h-[85vh] bg-base-100">
        <div className="hero-content text-center max-w-5xl">
          <div>
            <div className="badge badge-primary badge-lg mb-6">
              <span></span>Welcome to NeoBank<span></span>
            </div>

            <h1 className="text-6xl font-extrabold">
              Secure Banking.
              <br />
              <span className="text-primary">Simplified.</span>
            </h1>

            <p className="py-8 text-lg max-w-3xl mx-auto text-base-content/70">
              Experience modern digital banking with secure authentication,
              hassle-free KYC verification, seamless money transfers, and
              intuitive account management—all in one place.
            </p>

            <div className="flex justify-center gap-5">
              <Link to="/register" className="btn btn-primary btn-lg">
                Get Started
              </Link>

              <Link to="/login" className="btn btn-outline btn-lg">
                Login
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-3">
            Everything You Need
          </h2>

          <p className="text-center text-base-content/60 mb-12">
            Designed to make your banking experience simple, secure, and
            efficient.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 my-10">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="text-4xl">🔒</div>
                <h2 className="card-title">Secure Authentication</h2>
                <p>
                  JWT-based authentication with encrypted passwords to keep your
                  account safe.
                </p>
              </div>
            </div>

            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="text-4xl">📄</div>
                <h2 className="card-title">Digital KYC</h2>
                <p>
                  Upload your documents online and get verified quickly without
                  visiting a branch.
                </p>
              </div>
            </div>

            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="text-4xl">💳</div>
                <h2 className="card-title">Account Management</h2>
                <p>
                  Open Savings or Current accounts and monitor balances in real
                  time.
                </p>
              </div>
            </div>

            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="text-4xl">👥</div>
                <h2 className="card-title">Beneficiaries</h2>
                <p>
                  Add trusted beneficiaries securely and manage transfer limits
                  effortlessly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="bg-base-100 py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-10">
            Why Choose NeoBank?
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 my-10">
            <div>
              <div className="text-5xl mb-3">🛡️</div>
              <h3 className="font-semibold text-xl">Reliable Security</h3>
              <p className="text-base-content/70 mt-2">
                Industry-standard authentication and secure banking operations.
              </p>
            </div>

            <div>
              <div className="text-5xl mb-3">⚡</div>
              <h3 className="font-semibold text-xl">Fast Verification</h3>
              <p className="text-base-content/70 mt-2">
                Digital KYC processing for quicker onboarding.
              </p>
            </div>

            <div>
              <div className="text-5xl mb-3">📱</div>
              <h3 className="font-semibold text-xl">Simple Interface</h3>
              <p className="text-base-content/70 mt-2">
                Clean and responsive design for desktop and mobile devices.
              </p>
            </div>

            <div>
              <div className="text-5xl mb-3">🏦</div>
              <h3 className="font-semibold text-xl">Complete Banking</h3>
              <p className="text-base-content/70 mt-2">
                Manage accounts, transfers, and beneficiaries from one
                dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center text-4xl font-bold mb-16">
            How It Works
          </h2>

          <ul className="steps steps-vertical lg:steps-horizontal w-full">
            <li className="step step-primary">
              Register
              <br />
              Create your account
            </li>

            <li className="step step-primary">
              Complete KYC
              <br />
              Submit documents
            </li>

            <li className="step step-primary">
              Open Account
              <br />
              Savings / Current
            </li>

            <li className="step step-primary">
              Start Banking
              <br />
              Transfer & Manage
            </li>
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-primary-content">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-5">
            Ready to Start Banking?
          </h2>

          <p className="mb-8">
            Join NeoBank today and experience secure, modern digital banking
            built for simplicity.
          </p>

          <Link
            to="/register"
            className="btn btn-neutral btn-lg my-5"
          >
            Create Your Account
          </Link>
        </div>
      </section>
    </div>
    </>
  );
};

export default Landing;
