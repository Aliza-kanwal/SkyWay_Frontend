import React, { useState } from 'react';
import { FaEdit, FaPlus, FaSearch, FaBuilding, FaTimes } from 'react-icons/fa';

const emptyForm = { code: '', name: '', city: '', country: '', terminal: '' };

const AirportTable = ({ airports, onEdit, onAdd }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingAirport, setEditingAirport] = useState(null);
  const [formData, setFormData] = useState(emptyForm);

  const filteredAirports = airports.filter(airport =>
    airport.code?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    airport.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    airport.city?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddClick = () => {
    setEditingAirport(null);
    setFormData(emptyForm);
    setShowModal(true);
  };

  const handleEditClick = (airport) => {
    setEditingAirport(airport);
    setFormData({
      code: airport.code,
      name: airport.name,
      city: airport.city,
      country: airport.country,
      terminal: airport.terminal || ''
    });
    setShowModal(true);
  };

  const handleSubmit = () => {
    if (!formData.code || !formData.name || !formData.city || !formData.country) {
      alert('Please fill all required fields');
      return;
    }
    if (editingAirport) {
      onEdit?.({ ...formData, id: editingAirport.id });
    } else {
      onAdd?.(formData);
    }
    setShowModal(false);
    setFormData(emptyForm);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">Airports</h2>
        <div className="flex w-full sm:w-auto space-x-3">
          <div className="relative">
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
            onClick={handleAddClick}
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium hover:shadow-lg transition-all flex items-center gap-2"
          >
            <FaPlus /> Add Airport
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Code</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
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
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => handleEditClick(airport)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                  >
                    <FaEdit />
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

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-2xl p-6 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">
                {editingAirport ? 'Edit Airport' : 'Add New Airport'}
              </h2>
              <button onClick={() => setShowModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg">
                <FaTimes />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">IATA Code * (3 letters e.g. KHI)</label>
                <input
                  type="text"
                  maxLength={3}
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                  className="w-full p-2 border-2 border-gray-200 rounded-xl focus:border-blue-500 outline-none"
                  placeholder="e.g. KHI"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Airport Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-2 border-2 border-gray-200 rounded-xl focus:border-blue-500 outline-none"
                  placeholder="e.g. Jinnah International Airport"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">City *</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full p-2 border-2 border-gray-200 rounded-xl focus:border-blue-500 outline-none"
                  placeholder="e.g. Karachi"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Country *</label>
                <input
                  type="text"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="w-full p-2 border-2 border-gray-200 rounded-xl focus:border-blue-500 outline-none"
                  placeholder="e.g. Pakistan"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Terminal</label>
                <input
                  type="text"
                  value={formData.terminal}
                  onChange={(e) => setFormData({ ...formData, terminal: e.target.value })}
                  className="w-full p-2 border-2 border-gray-200 rounded-xl focus:border-blue-500 outline-none"
                  placeholder="e.g. Terminal 1"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button onClick={() => setShowModal(false)}
                  className="flex-1 py-2 border border-gray-300 rounded-xl hover:bg-gray-50">
                  Cancel
                </button>
                <button onClick={handleSubmit}
                  className="flex-1 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg">
                  {editingAirport ? 'Update Airport' : 'Add Airport'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AirportTable;