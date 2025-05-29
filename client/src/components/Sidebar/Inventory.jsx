import React, { useState } from "react";
import { PlusCircle, Edit, Bell, AlertTriangle, X } from "lucide-react";
import { MdDeleteOutline } from "react-icons/md";


// Mock data for inventory items
const mockInventory = [
  { id: "INV001", itemId: "RM001", name: "Steel Plate", type: "raw_material", quantity: 150, unit: "pcs", minStockLevel: 50, lastUpdated: "2024-07-20" },
  { id: "INV002", itemId: "FP001", name: "Premium Widget A", type: "finished_good", quantity: 75, unit: "units", minStockLevel: 20, lastUpdated: "2024-07-21" },
  { id: "INV003", itemId: "FL001", name: "Diesel", type: "fuel", quantity: 500, unit: "liters", minStockLevel: 100, lastUpdated: "2024-07-19" },
  { id: "INV004", itemId: "EP001", name: "Machine Bearing X1", type: "equipment_part", quantity: 10, unit: "pcs", minStockLevel: 5, lastUpdated: "2024-07-15" },
  { id: "INV005", itemId: "RM002", name: "Plastic Casing", type: "raw_material", quantity: 30, unit: "pcs", minStockLevel: 100, lastUpdated: "2024-07-22" },
];

const inventoryTypes = [
  { value: "raw_material", label: "Raw Materials" },
  { value: "finished_good", label: "Finished Goods" },
  { value: "fuel", label: "Fuel" },
  { value: "equipment_part", label: "Equipment Parts" },
];

// Form field configurations for each inventory type
const formFieldsConfig = {
  raw_material: [
    { id: "name", label: "Material Name", type: "text" },
    { id: "quantity", label: "Quantity", type: "number" },
    { id: "unit", label: "Unit", type: "select", options: ["pcs", "kg", "meters", "liters"] },
    { id: "minStockLevel", label: "Minimum Stock Level", type: "number" },
    { id: "supplier", label: "Supplier", type: "text" },
  ],
  finished_good: [
    { id: "name", label: "Product Name", type: "text" },
    { id: "quantity", label: "Quantity", type: "number" },
    { id: "unit", label: "Unit", type: "select", options: ["units", "pcs", "boxes"] },
    { id: "minStockLevel", label: "Minimum Stock Level", type: "number" },
    { id: "sku", label: "SKU Code", type: "text" },
  ],
  fuel: [
    { id: "name", label: "Fuel Type", type: "text" },
    { id: "quantity", label: "Quantity (Liters)", type: "number" },
    { id: "minStockLevel", label: "Minimum Stock Level", type: "number" },
    { id: "storageLocation", label: "Storage Location", type: "text" },
  ],
  equipment_part: [
    { id: "name", label: "Part Name", type: "text" },
    { id: "quantity", label: "Quantity", type: "number" },
    { id: "unit", label: "Unit", type: "select", options: ["pcs", "sets"] },
    { id: "minStockLevel", label: "Minimum Stock Level", type: "number" },
    { id: "machineModel", label: "Machine Model", type: "text" },
  ],
};
const handleDeleteVendor = (id) => {
  const updatedVendors = vendors.filter((vendor) => vendor.id !== id);
  setVendors(updatedVendors);
};


function InventoryTable({ items, onEdit }) {
  return (
    <table className="w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item ID</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Min. Stock</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {items.map((item) => (
          <tr key={item.id} className={item.quantity < item.minStockLevel ? "bg-red-100" : ""}>
            <td className="px-6 py-4 whitespace-nowrap">{item.itemId}</td>
            <td className="px-6 py-4 whitespace-nowrap font-medium">{item.name}</td>
            <td className="px-6 py-4 whitespace-nowrap">{item.quantity}</td>
            <td className="px-6 py-4 whitespace-nowrap">{item.unit}</td>
            <td className="px-6 py-4 whitespace-nowrap">{item.minStockLevel}</td>
            <td className="px-6 py-4 whitespace-nowrap">
              {item.quantity < item.minStockLevel ? (
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                  <AlertTriangle className="h-3 w-3 mr-1" /> Low Stock
                </span>
              ) : (
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                  In Stock
                </span>
              )}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">{new Date(item.lastUpdated).toLocaleDateString()}</td>
            <td className="px-6 py-4 whitespace-nowrap">
              <button
                className="text-gray-400 hover:text-gray-500"
                onClick={() => onEdit(item)}
              >
                <Edit size={25}  />
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
  );
}

function InventoryFormDialog({ 
  isOpen, 
  onClose, 
  activeTab, 
  currentItem, 
  formData, 
  setFormData, 
  onSubmit, 
  onDelete 
}) {
  const inventoryTypeLabel = inventoryTypes.find(t => t.value === activeTab)?.label;

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value
    }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">
          {currentItem ? `Edit ${currentItem.name}` : `Add New ${inventoryTypeLabel}`}
        </h2>
        <form onSubmit={onSubmit} className="space-y-4">
          {formFieldsConfig[activeTab].map((field) => (
            <div key={field.id} className="flex flex-col">
              <label className="text-sm font-medium text-gray-700">{field.label}</label>
              {field.type === "select" ? (
                <select
                  value={formData[field.id] || ""}
                  onChange={(e) => handleSelectChange(field.id, e.target.value)}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  {field.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  id={field.id}
                  name={field.id}
                  type={field.type}
                  value={formData[field.id] || ""}
                  onChange={handleInputChange}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              )}
            </div>
          ))}
          <div className="flex justify-end gap-2 pt-4">
           
            <button
              type="submit"
              className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
            >
              {currentItem ? "Save Changes" : "Add Item"}
              

            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function Inventory() {
  const [activeTab, setActiveTab] = useState("raw_material");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [formData, setFormData] = useState({});

  const handleTabChange = (value) => {
    setActiveTab(value);
  };

  const handleAddClick = () => {
    setCurrentItem(null);
    setFormData({ type: activeTab });
    setIsDialogOpen(true);
  };

  const handleEditClick = (item) => {
    setCurrentItem(item);
    setFormData(item);
    setIsDialogOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setIsDialogOpen(false);
  };

  const handleDelete = () => {
    if (currentItem) {
      console.log("Delete item:", currentItem.id);
      setIsDialogOpen(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Inventory Tracking</h1>
        <button
          className="bg-[#5161BC] text-white px-4 py-2 rounded flex items-center"
          onClick={handleAddClick}
        >
          <PlusCircle className="mr-2 h-4 w-4 " /> Add Stock / Adjustment
        </button>
      </div>

      <div className="mt-6">
        <div className="flex flex-wrap gap-4">
          {inventoryTypes.map((type) => (
            <button
              key={type.value}
              className={`px-4 py-2 rounded ${activeTab === type.value ? 'bg-[#5161BC] text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              onClick={() => handleTabChange(type.value)}
            >
              {type.label}
            </button>
          ))}
        </div>

        <div className="mt-4">
          <InventoryTable 
            items={mockInventory.filter(item => item.type === activeTab)} 
            onEdit={handleEditClick}
          />
        </div>
      </div>

      <div className="mt-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
        <div className="flex items-center gap-2">
          <Bell className="h-6 w-6 text-gray-500" />
          <h2 className="text-lg font-bold text-gray-900">Stock Alerts</h2>
        </div>
        <p className="text-sm text-gray-500">
          Items highlighted in <span className="text-red-500 font-semibold">red</span> are below minimum stock levels.
        </p>
      </div>

      <InventoryFormDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        activeTab={activeTab}
        currentItem={currentItem}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        onDelete={handleDelete}
      />
    </div>
  );
}