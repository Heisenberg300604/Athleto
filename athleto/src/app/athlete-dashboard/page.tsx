import React from 'react';
import { Heart, Search } from 'lucide-react';
import AthleteNavbar from '@/components/AthleteNavbar';


const AthleteDashboard: React.FC = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-800">
      {/* Navbar */}
      <AthleteNavbar />

      <div className="flex flex-1 p-6 gap-6">
        {/*  Filters */}
        <div className="w-80">
            <div className="bg-gray-800 p-6 rounded-lg shadow-2xl">
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

        {/* Main Content */}
        <div className="flex-1">
          {/* Search and Tabs */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-300 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="flex gap-6 mt-4 border-b border-gray-700">
              <button className="px-4 py-2 text-blue-500 border-b-2 border-blue-500">All Brands</button>
              <button className="px-4 py-2 text-gray-400 hover:text-gray-300">Favorites</button>
            </div>
          </div>

          {/* Brands  */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-2">

            {/* dummy data  */}
            <div className="bg-gray-800 shadow-md rounded-lg p-6">
              <div className="flex items-start justify-between">
                <div className="flex gap-4">
                  <img src="#" alt="Yummy Chumz" className="rounded-full" />
                  <div>
                    <div className="flex items-center gap-4">
                      <h3 className="text-xl font-bold text-white">Yummy Chumz</h3>
                    </div>
                    <p className="text-gray-400 mt-2">Food & Beverage Retail</p>
                    <p className="text-gray-400">United Kingdom, Online (UK)</p>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-blue-500">
                  <Heart size={24} />
                </button>
              </div>
            </div>

            {/* TGI Fridays */}
            <div className="bg-gray-800 shadow-md rounded-lg p-6">
              <div className="flex items-start justify-between">
                <div className="flex gap-4">
                  <img src="#" alt="TGI Fridays" className="rounded-full" />
                  <div>
                    <h3 className="text-xl font-bold text-white">TGI Fridays</h3>
                    <p className="text-gray-400 mt-2">Restaurants & Catering</p>
                    <p className="text-gray-400">Ireland, Dublin</p>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-blue-500">
                  <Heart size={24} />
                </button>
              </div>
            </div>

            {/* Shuz Group */}
            <div className="bg-gray-800 shadow-md rounded-lg p-6">
              <div className="flex items-start justify-between">
                <div className="flex gap-4">
                  <img src="#" alt="Shuz Group" className="rounded-full" />
                  <div>
                    <h3 className="text-xl font-bold text-white">Shuz Group</h3>
                    <p className="text-gray-400 mt-2">Consumer Goods & Apparel</p>
                    <p className="text-gray-400">Ireland, Cork</p>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-blue-500">
                  <Heart size={24} />
                </button>
              </div>
            </div>

          {/* Can add more brands */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AthleteDashboard;