import React, { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { BsPencilSquare } from "react-icons/bs";

const VendorMaster = () => {
  const [vendors, setVendors] = useState([
    {
      id: "V001",
      name: "Apex Supplies Co.",
      contactPerson: "John Doe",
      email: "sales@apexsupplies.com",
      phone: "555-1234",
      paymentTerms: "Net 30",
      pendingAmount: "$1500.00",
    },
    {
      id: "V002",
      name: "Beta Materials Inc.",
      contactPerson: "Jane Smith",
      email: "contact@betamaterials.com",
      phone: "555-5678",
      paymentTerms: "Net 45",
      pendingAmount: "$0.00",
    },
    {
      id: "V003",
      name: "Gamma Components Ltd.",
      contactPerson: "Robert Brown",
      email: "info@gammacomp.com",
      phone: "555-9012",
      paymentTerms: "COD",
      pendingAmount: "$320.50",
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newVendor, setNewVendor] = useState({
    name: "",
    contactPerson: "",
    email: "",
    phone: "",
    paymentTerms: "Net 30",
    pendingAmount: "0.00",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewVendor({ ...newVendor, [name]: value });
  };

  const handleAddVendor = (e) => {
    e.preventDefault();
    
    // Generate a new Vendor ID
    const newId = `V${String(vendors.length + 1).padStart(3, "0")}`;
    
    // Format pending amount with dollar sign
    const formattedAmount = newVendor.pendingAmount.startsWith("$") 
      ? newVendor.pendingAmount 
      : `$${newVendor.pendingAmount}`;

    const vendorToAdd = {
      id: newId,
      name: newVendor.name,
      contactPerson: newVendor.contactPerson,
      email: newVendor.email,
      phone: newVendor.phone,
      paymentTerms: newVendor.paymentTerms,
      pendingAmount: formattedAmount,
    };

    setVendors([...vendors, vendorToAdd]);
    setNewVendor({
      name: "",
      contactPerson: "",
      email: "",
      phone: "",
      paymentTerms: "Net 30",
      pendingAmount: "0.00",
    });
    setShowAddForm(false);
  };
  const handleDeleteVendor = (id) => {
  const updatedVendors = vendors.filter((vendor) => vendor.id !== id);
  setVendors(updatedVendors);
};


  return (
    <div className="p-6 max-w-8xl mx-auto relative">
      <h1 className="text-2xl font-bold mb-4">Vendor Management</h1>
      
      <section className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-semibold">Vendor List</h2>
            <p className="text-gray-600">Manage your company's vendors and their details.</p>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-[#5161BC] hover:bg-[#3e4da0] text-white px-4 py-2 rounded"
          >
            Add Vendor
          </button>
        </div>

        {/* Vendor Table */}
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact Person</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Terms</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pending Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {vendors.map((vendor) => (
                <tr key={vendor.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{vendor.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{vendor.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{vendor.contactPerson}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{vendor.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{vendor.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{vendor.paymentTerms}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{vendor.pendingAmount}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-green-500 hover:text-green-700">
                      <BsPencilSquare size={25} />

                    </button>
                    <button
    onClick={() => handleDeleteVendor(vendor.id)}
    className="text-red-500  ml-2  hover:text-red-700"
    title="Delete Vendor"
  ><MdDeleteOutline size={25} />
    
  </button>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section> 

      {/* Add Vendor Modal */}
      {showAddForm && (
        <div className="fixed inset-0  backdrop:blur-2xl  bg-white/80 shadow-2xl sh d bg-opacity-0 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Add New Vendor</h3>
                <button 
                  onClick={() => setShowAddForm(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <form onSubmit={handleAddVendor}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Vendor Name*</label>
                    <input
                      type="text"
                      name="name"
                      value={newVendor.name}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded"
                      placeholder="Apex Supplies Co."
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person*</label>
                    <input
                      type="text"
                      name="contactPerson"
                      value={newVendor.contactPerson}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email*</label>
                    <input
                      type="email"
                      name="email"
                      value={newVendor.email}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded"
                      placeholder="sales@example.com"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone*</label>
                    <input
                      type="text"
                      name="phone"
                      value={newVendor.phone}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded"
                      placeholder="555-1234"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Payment Terms</label>
                    <select
                      name="paymentTerms"
                      value={newVendor.paymentTerms}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    >
                      <option value="Net 30">Net 30</option>
                      <option value="Net 45">Net 45</option>
                      <option value="COD">COD</option>
                      <option value="Net 60">Net 60</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Pending Amount</label>
                    <input
                      type="text"
                      name="pendingAmount"
                      value={newVendor.pendingAmount}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded"
                      placeholder="0.00"
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-2 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                  >
                    Save Vendor
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorMaster;