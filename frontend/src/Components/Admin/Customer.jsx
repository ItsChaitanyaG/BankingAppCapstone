import { useEffect } from "react";
import { useState } from "react";
import api from "../../api/axios.js";
import { useNavigate } from "react-router-dom";

const Customer = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [searchBy, setSearchBy] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const filteredCustomers = customers.filter((customer) => {
    if (searchBy === "accountNumber") {
      return customer.account[0]?.acc_no?.includes(searchTerm) || customer.account[1]?.acc_no?.includes(searchTerm);
    } else if (searchBy === "email") {
      return customer.email?.includes(searchTerm);
    }
    return customers;
  });


  useEffect(() => {
    const getCustomers = async () => {
      try {
        const res = await api.get(
          "/admin/customers",
          {
            withCredentials: true,
          },
        );

        setCustomers(res.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    getCustomers();
  }, []);

  if (!customers) {
    return <div>Loading....</div>;
  }

  return (
    <>
      <div className="m-15">
        <button className="btn btn-ghost mb-6 flex justify-start" onClick={() => navigate("/admin")}>← Back</button>
        <h1 className="justify-self-start">Customers</h1>

        <div className="flex items-center gap-5 my-10">
          <fieldset className="fieldset">
            <select value={searchBy} className="select" onChange={(e) => setSearchBy(e.target.value)}>
              <option disabled={true}>Search by</option>
              <option value="accountNumber">Account Number</option>
              <option value="email">Email</option>
            </select>
          </fieldset>

          <label className="input">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input type="search" required placeholder="Search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </label>
        </div>

        <div className="flex justify-center">
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Account ID</th>
                  <th>Email</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((c) => {
                  return (
                    <tr key={c.id}>
                      {/* <th>
                        <label>
                          <input type="checkbox" className="checkbox" />
                        </label>
                      </th> */}
                      <td>
                        <div className="flex items-center gap-3">
                          {c.id}

                        </div>
                      </td>
                      <td>
                        <div>
                            <div className="font-bold">{c.name}</div>
                            <div className="text-sm opacity-50"></div>
                          </div>
                      </td>
                      <td>
                        {c.kyc?.status}
                        <br />
                      </td>
                      <td>{c.email}</td>
                      <th>
                        <button
                          className="btn"
                          onClick={() => {
                            setSelectedCustomer(c);
                            document.getElementById("my_modal_3").showModal();
                          }}
                        >
                          Show Details
                        </button>
                      </th>
                    </tr>
                  );
                })}
                {/* row 1 */}
              </tbody>
            </table>

            <dialog id="my_modal_3" className="modal">
              <div className="modal-box">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                    ✕
                  </button>
                </form>
                <h3 className="font-bold text-lg">Customer Details</h3>
                <p className="py-4">
                  Name: {selectedCustomer?.name} <br />
                  Email: {selectedCustomer?.email} <br />
                  1. Account Number: {selectedCustomer?.account[0]?.acc_no || "-"} <br />
                  1. Balance: {selectedCustomer?.account[0]?.balance || "-"}<br />
                  2. Account Number: {selectedCustomer?.account[1]?.acc_no || "-"} <br />
                  2. Balance: {selectedCustomer?.account[1]?.balance || "-"}<br />
                  KYC Status: {selectedCustomer?.kyc?.status} <br />
                  Created Date: {new Date(selectedCustomer?.createdAt).toLocaleString()} <br />
                </p>
              </div>
            </dialog>
          </div>
        </div>
      </div>
    </>
  );
};

export default Customer;
