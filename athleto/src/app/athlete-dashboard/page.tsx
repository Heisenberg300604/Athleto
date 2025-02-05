import React from 'react';
import { Heart } from 'lucide-react';
import Link from 'next/link';
import AthleteNavbar from '@/components/AthleteNavbar';



const AthleteDashboard: React.FC = () => {
    return (
      <div className="flex flex-col h-screen">
        {/* Navbar */}
        <AthleteNavbar />
  
        {/* Filters */}
        <div className="bg-gray-800 py-4 px-6 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="text-gray-400">Filters:</span>
            <button className="bg-gray-700 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-gray-600">
              Country
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <button className="bg-gray-700 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-gray-600">
              City
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <button className="bg-gray-700 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-gray-600">
              Industry
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div className="flex gap-4">
            <button className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600">
              Clear
            </button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
              Apply
            </button>
          </div>
        </div>
  
        {/* Brands */}
        <div className="flex-1 overflow-y-auto py-6 px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Dummy brand data */}
            <div className="bg-gray-800 shadow-lg">
              <div className="p-4">
                <h3 className="text-xl font-bold">Yummy Chumz</h3>
              </div>
              <div className="bg-gray-700 p-4 text-gray-400">
                <p>Food & Beverage Retail</p>
                <p>United Kingdom, Online (UK)</p>
                <div className="flex justify-end mt-4">
                  <button
                    className="text-blue-500 hover:text-blue-400"
                    title="Favorite"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div className="bg-gray-800 shadow-lg">
              <div className="p-4">
                <h3 className="text-xl font-bold">TGI Fridays</h3>
              </div>
              <div className="bg-gray-700 p-4 text-gray-400">
                <p>Restaurants & Catering</p>
                <p>Ireland, Dublin</p>
                <div className="flex justify-end mt-4">
                  <button
                    className="text-blue-500 hover:text-blue-400"
                    title="Favorite"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div className="bg-gray-800 shadow-lg">
              <div className="p-4">
                <h3 className="text-xl font-bold">Shuz Group</h3>
              </div>
              <div className="bg-gray-700 p-4 text-gray-400">
                <p>Consumer Goods & Apparel</p>
                <p>Ireland, Cork</p>
                <div className="flex justify-end mt-4">
                  <button
                    className="text-blue-500 hover:text-blue-400"
                    title="Favorite"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            {/* Add more dummy brand data */}
          </div>
        </div>
      </div>
    );
  };
  
  export default AthleteDashboard;