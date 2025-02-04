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
        <div className="ml-8 mt-6">
           <div className="bg-gray-800 p-6 flex justify-between items-start w-60 rounded-lg">
             <div className="w-full">
           <div>
          <div className="text-lg font-medium mb-6 text-white">Filters:</div>
          <div className="space-y-6">
           <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Country</span>
                <button className="text-gray-400 text-sm hover:text-gray-300">Clear</button>
              </div>
              <select className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-gray-300">
                <option>All countries</option>
              </select>
             </div>
             <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">City</span>
                <button className="text-gray-400 text-sm hover:text-gray-300">Clear</button>
              </div>
              <select className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-gray-300">
                <option>All cities</option>
              </select>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Industry</span>
                <button className="text-gray-400 text-sm hover:text-gray-300">Clear</button>
              </div>
              <select className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-gray-300">
                <option>All industries</option>
              </select>
            </div>

            <div className="flex gap-3 mt-8">
              <button className="flex-1 py-2 px-4 border border-gray-600 rounded-md text-gray-300 hover:bg-gray-700">
                Clear
              </button>
              <button className="flex-1 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>


  
        {/* Brands */}
        <div className="flex-1 overflow-y-auto py-6 px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {/* Dummy brand data */}
            <div className="bg-gray-800 shadow-lg rounded-lg">
            <div className="p-4">
              <h3 className="text-xl font-bold text-white">Yummy Chumz</h3>
            </div>
            <div className="bg-gray-700 p-4 text-gray-400 rounded-b-lg">
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
            <div className="bg-gray-800 shadow-lg rounded-lg">
            <div className="p-4">
              <h3 className="text-xl font-bold text-white">TGI Fridays</h3>
            </div>
            <div className="bg-gray-700 p-4 text-gray-400 rounded-b-lg">
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
            <div className="bg-gray-800 shadow-lg rounded-lg">
              <div className="p-4">
                <h3 className="text-xl font-bold text-white">Shuz Group</h3>
              </div>
              <div className="bg-gray-700 p-4 text-gray-400 rounded-b-lg">
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