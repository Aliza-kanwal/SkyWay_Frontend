import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEdit, FaTrash, FaPlus, FaSearch, FaPlane } from 'react-icons/fa';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Modal from '../ui/Modal';

const FlightTable = ({ flights, airports, onEdit, onDelete, onAdd }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingFlight, setEditingFlight] = useState(null);
  const [formData, setFormData] = useState({
    flightNumber: '',
    airline: '',
    departureAirport: '',
    arrivalAirport: '',
    departureTime: '',
    arrivalTime: '',
    price: '',
    availableSeats: '',
    class: 'economy'
  });

  const filteredFlights = flights.filter(flight =>
    flight.flightNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    flight.airline.toLowerCase().includes(searchTerm.toLowerCase()) ||
    flight.departureAirport.includes(searchTerm.toUpperCase())
  );

  const airlineOptions = [
    { value: 'American Airlines', label: 'American Airlines' },
    { value: 'United Airlines', label: 'United Airlines' },
    { value: 'Delta Airlines', label: 'Delta Airlines' },
    { value: 'Emirates', label: 'Emirates' },
    { value: 'British Airways', label: 'British Airways' },
    { value: 'Lufthansa', label: 'Lufthansa' },
    { value: 'Singapore Airlines', label: 'Singapore Airlines' },
    { value: 'Qatar Airways', label: 'Qatar Airways' }
  ];

  const airportOptions = airports.map(airport => ({
    value: airport.code,
    label: `${airport.code} - ${airport.name}`
  }));

  const classOptions = [
    { value: 'economy', label: 'Economy' },
    { value: 'premium-economy', label: 'Premium Economy' },
    { value: 'business', label: 'Business' },
    { value: 'first', label: 'First Class' }
  ];

  const handleEdit = (flight) => {
    setEditingFlight(flight);
    setFormData({
      flightNumber: flight.flightNumber,
      airline: flight.airline,
      departureAirport: flight.from,
      arrivalAirport: flight.to,
      departureTime: flight.departureTime,
      arrivalTime: flight.arrivalTime,
      price: flight.price,
      availableSeats: flight.availableSeats,
      class: flight.class
    });
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditingFlight(null);
    setFormData({
      flightNumber: '',
      airline: '',
      departureAirport: '',
      arrivalAirport: '',
      departureTime: '',
      arrivalTime: '',
      price: '',
      availableSeats: '',
      class: 'economy'
    });
    setShowModal(true);
  };

  const handleSubmit = () => {
    const flightData = {
      ...formData,
      from: formData.departureAirport,
      to: formData.arrivalAirport,
      id: editingFlight?.id || Date.now()
    };
    
    if (editingFlight) {
      onEdit?.({ ...editingFlight, ...flightData });
    } else {
      onAdd?.(flightData);
    }
    setShowModal(false);
  };

  return (
    <>
      <Card className="p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">Flights</h2>
          <div className="flex w-full sm:w-auto space-x-3">
            <div className="relative flex-1 sm:flex-none">
              <Input
                placeholder="Search flights..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                icon={FaSearch}
                className="pl-10"
              />
            </div>
            <Button variant="primary" onClick={handleAdd}>
              <FaPlus className="mr-2" /> Add Flight
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Flight</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Route</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Departure</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Arrival</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Seats</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <AnimatePresence>
                {filteredFlights.map((flight) => (
                  <motion.tr
                    key={flight.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FaPlane className="text-blue-600 mr-2" />
                        <div>
                          <div className="font-mono font-bold text-gray-900">{flight.flightNumber}</div>
                          <div className="text-xs text-gray-500">{flight.airline}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-medium">{flight.from}</span>
                      <span className="mx-2 text-gray-400">→</span>
                      <span className="font-medium">{flight.to}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {new Date(flight.departureTime).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {new Date(flight.arrivalTime).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-bold text-blue-600">${flight.price}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        flight.availableSeats > 20 ? 'bg-green-100 text-green-800' :
                        flight.availableSeats > 5 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {flight.availableSeats} seats
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 capitalize">
                      {flight.class}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button
                        onClick={() => handleEdit(flight)}
                        className="text-blue-600 hover:text-blue-800 mr-3"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => onDelete?.(flight.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>

          {filteredFlights.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No flights found</p>
            </div>
          )}
        </div>
      </Card>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={editingFlight ? 'Edit Flight' : 'Add New Flight'}
        onConfirm={handleSubmit}
        size="lg"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Flight Number"
              value={formData.flightNumber}
              onChange={(e) => setFormData({ ...formData, flightNumber: e.target.value.toUpperCase() })}
              placeholder="AA123"
              required
            />
            <Select
              label="Airline"
              options={airlineOptions}
              value={formData.airline}
              onChange={(value) => setFormData({ ...formData, airline: value })}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Departure Airport"
              options={airportOptions}
              value={formData.departureAirport}
              onChange={(value) => setFormData({ ...formData, departureAirport: value })}
              required
            />
            <Select
              label="Arrival Airport"
              options={airportOptions}
              value={formData.arrivalAirport}
              onChange={(value) => setFormData({ ...formData, arrivalAirport: value })}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              type="datetime-local"
              label="Departure Time"
              value={formData.departureTime}
              onChange={(e) => setFormData({ ...formData, departureTime: e.target.value })}
              required
            />
            <Input
              type="datetime-local"
              label="Arrival Time"
              value={formData.arrivalTime}
              onChange={(e) => setFormData({ ...formData, arrivalTime: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <Input
              type="number"
              label="Price ($)"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              min="0"
              required
            />
            <Input
              type="number"
              label="Available Seats"
              value={formData.availableSeats}
              onChange={(e) => setFormData({ ...formData, availableSeats: e.target.value })}
              min="0"
              required
            />
            <Select
              label="Class"
              options={classOptions}
              value={formData.class}
              onChange={(value) => setFormData({ ...formData, class: value })}
              required
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default FlightTable;