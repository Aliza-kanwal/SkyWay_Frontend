import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEdit, FaTrash, FaPlus, FaSearch, FaPlane, FaTimes } from 'react-icons/fa';

const FlightTable = ({ flights, airports, onEdit, onDelete, onAdd }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    departure_airport: '',
    arrival_airport: '',
    departure_time: '',
    arrival_time: '',
    duration: '',
    price: '',
    airline: '',
    aircraft_type: 'Boeing 737'
  });

  const filteredFlights = flights.filter(flight =>
    flight.flightNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    flight.airline?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddClick = () => {
    setShowModal(true);
  };

  const handleSubmit = () => {
    // Validate required fields
    if (!formData.departure_airport || !formData.arrival_airport || !formData.departure_time || 
        !formData.arrival_time || !formData.duration || !formData.price || !formData.airline) {
      alert('Please fill all required fields');
      return;
    }
    
    onAdd(formData);
    setShowModal(false);
    // Reset form
    setFormData({
      departure_airport: '',
      arrival_airport: '',
      departure_time: '',
      arrival_time: '',
      duration: '',
      price: '',
      airline: '',
      aircraft_type: 'Boeing 737'
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">Flights</h2>
        <div className="flex w-full sm:w-auto space-x-3">
          <div className="relative flex-1 sm:flex-none">
            <input
              type="text"
              placeholder="Search flights..."
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
            <FaPlus /> Add Flight
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Flight</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Route</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Departure</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Seats</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredFlights.map((flight) => (
              <tr key={flight.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <FaPlane className="text-blue-600" />
                    <div>
                      <div className="font-mono font-bold">{flight.flightNumber}</div>
                      <div className="text-xs text-gray-500">{flight.airline}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  {flight.from} → {flight.to}
                </td>
                <td className="px-4 py-3 text-sm">
                  {new Date(flight.departureTime).toLocaleString()}
                </td>
                <td className="px-4 py-3 font-bold text-blue-600">
                  PKR {flight.price?.toLocaleString()}
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    flight.availableSeats > 20 ? 'bg-green-100 text-green-800' :
                    flight.availableSeats > 5 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {flight.availableSeats} seats
                  </span>
                </td>
                <td className="px-4 py-3 text-right space-x-2">
                  <button
                    onClick={() => onEdit?.(flight)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => onDelete?.(flight.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                  >
                    <FaTrash />
                  </button>
                </td>
               </tr>
            ))}
          </tbody>
        </table>

        {filteredFlights.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No flights found</p>
          </div>
        )}
      </div>

      {/* Add Flight Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Add New Flight</h2>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <FaTimes />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Departure Airport *</label>
                <select
                  value={formData.departure_airport}
                  onChange={(e) => setFormData({...formData, departure_airport: e.target.value})}
                  className="w-full p-2 border rounded-xl"
                  required
                >
                  <option value="">Select Airport</option>
                  {airports.map(a => (
                    <option key={a.id} value={a.code}>{a.code} - {a.city}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Arrival Airport *</label>
                <select
                  value={formData.arrival_airport}
                  onChange={(e) => setFormData({...formData, arrival_airport: e.target.value})}
                  className="w-full p-2 border rounded-xl"
                  required
                >
                  <option value="">Select Airport</option>
                  {airports.map(a => (
                    <option key={a.id} value={a.code}>{a.code} - {a.city}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Departure Time *</label>
                <input
                  type="datetime-local"
                  value={formData.departure_time}
                  onChange={(e) => setFormData({...formData, departure_time: e.target.value})}
                  className="w-full p-2 border rounded-xl"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Arrival Time *</label>
                <input
                  type="datetime-local"
                  value={formData.arrival_time}
                  onChange={(e) => setFormData({...formData, arrival_time: e.target.value})}
                  className="w-full p-2 border rounded-xl"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Duration (minutes) *</label>
                <input
                  type="number"
                  value={formData.duration}
                  onChange={(e) => setFormData({...formData, duration: parseInt(e.target.value)})}
                  className="w-full p-2 border rounded-xl"
                  required
                  placeholder="e.g., 120"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Price (PKR) *</label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: parseInt(e.target.value)})}
                  className="w-full p-2 border rounded-xl"
                  required
                  placeholder="e.g., 15000"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Airline *</label>
                <input
                  type="text"
                  value={formData.airline}
                  onChange={(e) => setFormData({...formData, airline: e.target.value})}
                  className="w-full p-2 border rounded-xl"
                  required
                  placeholder="e.g., PIA, AirBlue, Emirates"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Aircraft Type</label>
                <select
                  value={formData.aircraft_type}
                  onChange={(e) => setFormData({...formData, aircraft_type: e.target.value})}
                  className="w-full p-2 border rounded-xl"
                >
                  <option value="Boeing 737">Boeing 737</option>
                  <option value="Airbus A320">Airbus A320</option>
                  <option value="Boeing 777">Boeing 777</option>
                  <option value="Airbus A380">Airbus A380</option>
                  <option value="ATR 72">ATR 72</option>
                </select>
              </div>
              
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-2 border border-gray-300 rounded-xl hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg"
                >
                  Add Flight
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlightTable;