# NeoBank

A full-stack digital banking application built with the PERN ecosystem, featuring secure authentication, KYC verification, account management, beneficiary management, money transfers, AI-powered financial insights, and an administrative dashboard.

---

## Features

### User Features

* Secure registration and login using JWT authentication
* Password hashing with bcrypt
* Create Savings and Current accounts
* KYC document submission
* View profile and update personal information
* Deposit money
* Withdraw money
* Transfer funds between beneficiaries
* Add and manage beneficiaries
* View transaction history
* AI-generated financial insights using Groq LLM

### Admin Features

* Dashboard with banking statistics
* Customer management
* Review and approve/reject KYC requests
* View all transactions
* Search and filter customers
* Filter KYC requests by status

---

## Tech Stack

### Frontend

* React
* React Router
* Axios
* Tailwind CSS
* DaisyUI
* React Hot Toast

### Backend

* Node.js
* Express.js
* Prisma ORM
* PostgreSQL
* JWT Authentication
* bcrypt

### Cloud Services

* Cloudinary (Document Storage)
* Groq API (AI Financial Insights)

---

## Installation

### Clone Repository

```bash
git clone <repository-url>
cd NeoBank
```

---

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file.

Example:

```env
PORT=
DATABASE_URL=
CORS_ORIGIN=
ACCESS_TOKEN_SECRET=
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=
REFRESH_TOKEN_EXPIRY=10d

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

GROQ_API_KEY=
```

Run Prisma:

```bash
npx prisma migrate dev
```

Start backend:

```bash
npm run dev
```

---

### Frontend Setup

```bash
cd frontend
npm install
```

Run frontend:

```bash
npm run dev
```

---

## Application Workflow

### User

1. Register
2. Login
3. Complete KYC
4. Create Bank Account
5. Add Beneficiary
6. Deposit / Withdraw
7. Transfer Money
8. View Transactions
9. Generate AI Insights

---

### Admin

1. Login
2. View Dashboard
3. Review KYC Requests
4. Approve or Reject KYC
5. Monitor Customers
6. Monitor Transactions

---

## Business Rules

* Maximum of **2 accounts per user**
* Deposit limit per transaction: **₹100,000**
* Withdrawal limit per transaction: **₹100,000**
* Withdrawal cannot exceed available balance
* Transfers require an existing beneficiary
* Transfer amount cannot exceed beneficiary transfer limit
* KYC approval is required before account creation

---

## AI Financial Insights

NeoBank integrates the Groq API to generate personalized financial insights.

Examples include:

* Spending summary
* Income vs expenditure
* Transaction trends
* Largest transactions
* Savings suggestions

---

## Security

* JWT Authentication
* Password hashing using bcrypt
* Protected routes
* Role-based authorization
* Server-side validation
* Database transactions for financial operations

---

## Author

Chaitanya Gokhale.

Developed as an MCA Capstone Project.

---

## License

This project is intended for educational purposes.
