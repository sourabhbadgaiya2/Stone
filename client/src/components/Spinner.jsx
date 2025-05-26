// components/Spinner.jsx
import React from "react";

const Spinner = () => {
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin'></div>
    </div>
  );
};

export default Spinner;
