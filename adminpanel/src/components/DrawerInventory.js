import React from 'react';

const DrawerInventory = () => {
  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <h2 className="text-lg font-semibold mb-4">Inventory</h2>
      <div className="flex items-center justify-between mb-4">
        <p className="text-gray-700">Care</p>
        <p className="text-gray-700">🩷</p>
      </div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-gray-700">Loyalty</p>
        <p className="text-gray-700">💂</p>
      </div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-gray-700">Patience</p>
        <p className="text-gray-700">⏳</p>
      </div>
    </div>
  );
};

export default DrawerInventory;
