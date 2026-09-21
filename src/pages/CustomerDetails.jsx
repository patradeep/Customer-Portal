import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";

export default function CustomerDetails() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [customer, setCustomer] = useState(null);

  useEffect(() => {

    fetch(`https://dummyjson.com/users/${id}`)
      .then((res) => res.json())
      .then((data) => setCustomer(data));
  }, [id]);

  if (!customer) {
    return <div className="p-8 text-center text-sm">Loading details...</div>;
  }

  return (
    <div>
      <NavBar />
      <button className="p-2 bg-slate-100 rounded-md m-5 cursor-pointer hover:bg-slate-200" onClick={() => navigate(-1)}>Back</button>
        <div className="flex flex-col p-4 rounded-md">
          <div className="flex items-center">
            <img src={customer.image} alt="" className="w-24 h-24 rounded-full" />
            <div className="flex flex-col gap-2 pl-4">
              <div className="font-medium text-lg">{customer.firstName} {customer.lastName}</div>
              <div className="text-gray-600 text-sm">{customer.role} id : {customer.id}</div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-4">

            {/* Contact Info Section */}
          <div className="py-4 px-6 rounded-md bg-slate-50 border border-slate-200">
            <h2 className="font-semibold text-sm text-gray-600">Contact Info</h2>
            <div className="text-gray-600 text-sm">Email : {customer.email}</div>
            <div className="text-gray-600 text-sm">Phone : {customer.phone}</div>
          </div>

          {/* address section */}
          <div className="py-4 px-6 rounded-md bg-slate-50 border border-slate-200">
            <h2 className="font-semibold text-sm text-gray-600">Address</h2>
            <div className="text-gray-600 text-sm">Address : {customer.address?.address}</div>
            <div className="text-gray-600 text-sm">City : {customer.address?.city}</div>
            <div className="text-gray-600 text-sm">State : {customer.address?.state}</div>
            <div className="text-gray-600 text-sm">Zip : {customer.address?.postalCode}</div>
          </div>

          {/* Company Info section */}
          <div className="py-4 px-6 rounded-md bg-slate-50 border border-slate-200">
            <h2 className="font-semibold text-sm text-gray-600">Company Info</h2>
            <div className="text-gray-600 text-sm">Company : {customer.company?.name}</div>
            <div className="text-gray-600 text-sm">Department : {customer.company?.department}</div>
            <div className="text-gray-600 text-sm">Title : {customer.company?.title}</div>
            <div className="text-gray-600 text-sm">Address : {customer.company?.address?.address}</div>
            <div className="text-gray-600 text-sm">City : {customer.company?.address?.city}</div>
            <div className="text-gray-600 text-sm">State : {customer.company?.address?.state}</div>
            <div className="text-gray-600 text-sm">Zip : {customer.company?.address?.postalCode}</div>
          </div>

          {/* Bank info section */}
          <div className="py-4 px-6 rounded-md bg-slate-50 border border-slate-200">
            <h2 className="font-semibold text-sm text-gray-600">Bank Info</h2>
            <div className="text-gray-600 text-sm">Card Type : {customer.bank.cardType}</div>
            <div className="text-gray-600 text-sm">Card Number : {customer.bank.cardNumber}</div>
            <div className="text-gray-600 text-sm">Currency : {customer.bank.currency}</div>
            <div className="text-gray-600 text-sm">Expiry Date : {customer.bank.cardExpire}</div>
            <div className="text-gray-600 text-sm">IBAN : {customer.bank.iban}</div>
          </div>

          </div>

          

        </div>
      </div>
  )
}