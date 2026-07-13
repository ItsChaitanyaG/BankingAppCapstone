import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const Customer = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    const getCustomers = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/v1/admin/customers",
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
        <h1 className="justify-self-start">Customers</h1>

        <div className="flex items-center gap-5 my-10">
          <fieldset className="fieldset">
            <select defaultValue="Pick a browser" className="select">
              <option disabled={true}>Search by</option>
              <option>Account Number</option>
              <option>Name</option>
              <option>Email</option>
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
            <input type="search" required placeholder="Search" />
          </label>
        </div>

        <div>
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
                {customers.map((c) => {
                  return (
                    <tr key={c.id}>
                      <th>
                        <label>
                          <input type="checkbox" className="checkbox" />
                        </label>
                      </th>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle h-12 w-12">
                              <img
                                src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                                alt="Avatar Tailwind CSS Component"
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">{c.name}</div>
                            <div className="text-sm opacity-50"></div>
                          </div>
                        </div>
                      </td>
                      <td>
                        000000000
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
                  Account Number: <br />
                  Balance: <br />
                  KYC Status: {selectedCustomer?.kyc?.status} <br />
                  Created Date: {selectedCustomer?.createdAt} <br />
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
