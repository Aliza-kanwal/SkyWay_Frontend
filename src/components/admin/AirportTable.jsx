import React, { useState } from 'react';
import { FaEdit, FaTrash, FaPlus, FaSearch, FaBuilding } from 'react-icons/fa';

const AirportTable = ({ airports, onEdit, onDelete, onAdd }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAirports = airports.filter(airport =>
    airport.code?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    airport.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    airport.city?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">Airports</h2>
        <div className="flex w-full sm:w-auto space-x-3">
          <div className="relative flex-1 sm:flex-none">
            <input
              type="text"
              placeholder="Search airports..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border-2 border-gray-200 rounded-xl focus:border-blue-500 outline-none"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
          <button
            onClick={() => onAdd?.()}
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium hover:shadow-lg transition-all flex items-center gap-2"
          >
            <FaPlus /> Add Airport
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Code</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Airport Name</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">City</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Country</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredAirports.map((airport) => (
              <tr key={airport.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <FaBuilding className="text-blue-600" />
                    <span className="font-mono font-bold text-blue-600">{airport.code}</span>
                  </div>
                </td>
                <td className="px-4 py-3 font-medium">{airport.name}</td>
                <td className="px-4 py-3 text-gray-600">{airport.city}</td>
                <td className="px-4 py-3 text-gray-600">{airport.country}</td>
                <td className="px-4 py-3 text-right space-x-2">
                  <button
                    onClick={() => onEdit?.(airport)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => onDelete?.(airport.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredAirports.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No airports found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AirportTable;