import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function WholesalerRequests() {

  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {

    try {

      const response = await fetch(
        "http://localhost/ecommerce-billing/smart-ledger-backend/api/wholesaler/get_requests.php"
      );

      const data = await response.json();

      if (data.status) {
        setRequests(data.data);
      }

    } catch (error) {

      toast.error("Failed to fetch requests");
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // 🔥 APPROVE
  const approveRequest = async (id) => {

    try {

      const response = await fetch(
        `http://localhost/ecommerce-billing/smart-ledger-backend/api/wholesaler/approve.php?id=${id}`
      );

      const data = await response.json();

      if (!data.status) {
        toast.error(data.message);
        return;
      }

      toast.success(data.message);

      fetchRequests();

    } catch (error) {

      toast.error("Approval failed");
    }
  };

  // 🔥 REJECT
  const rejectRequest = async (id) => {

    try {

      const response = await fetch(
        `http://localhost/ecommerce-billing/smart-ledger-backend/api/wholesaler/reject.php?id=${id}`
      );

      const data = await response.json();

      if (!data.status) {
        toast.error(data.message);
        return;
      }

      toast.success(data.message);

      fetchRequests();

    } catch (error) {

      toast.error("Reject failed");
    }
  };

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        Wholesaler Requests
      </h1>

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-indigo-600 text-white">

            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Phone</th>
              <th className="p-4 text-left">Proof</th>
              <th className="p-4 text-center">Actions</th>
            </tr>

          </thead>

          <tbody>

            {requests.length === 0 ? (

              <tr>
                <td
                  colSpan="5"
                  className="text-center p-10"
                >
                  No Requests
                </td>
              </tr>

            ) : (

              requests.map((item) => (

                <tr
                  key={item.id}
                  className="border-b"
                >

                  <td className="p-4">
                    {item.owner_name}
                  </td>

                  <td className="p-4">
                    {item.email}
                  </td>

                  <td className="p-4">
                    {item.phone}
                  </td>

                  <td className="p-4">

                    <a
                      href={`http://localhost/ecommerce-billing/smart-ledger-backend/${item.document}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 underline"
                    >
                      View Proof
                    </a>

                  </td>

                  <td className="p-4">

                    <div className="flex justify-center gap-3">

                      <button
                        onClick={() => approveRequest(item.id)}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() => rejectRequest(item.id)}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg"
                      >
                        Reject
                      </button>

                    </div>

                  </td>

                </tr>

              ))
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}