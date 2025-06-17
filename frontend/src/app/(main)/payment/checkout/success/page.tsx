'use client';
import { FaCheckCircle } from 'react-icons/fa';
import Link from 'next/link';

const SuccessPage = () => {
  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center">
        <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h1>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your transaction has been completed successfully.
        </p>
        <Link href="/">
          <button className="mt-4 inline-block bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md transition duration-300">
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SuccessPage;
