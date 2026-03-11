import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEdit, FaTrash, FaPlus, FaSearch, FaTimes } from 'react-icons/fa';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Modal from '../ui/Modal';

const AirportTable = ({ airports, onEdit, onDelete, onAdd }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingAirport, setEditingAirport] = useState(null);
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    city: '',
    country: '',
    terminals: 1,
    timezone: ''
  });

  const filteredAirports = airports.filter(airport =>
    airport.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    airport.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    airport.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (airport) => {
    setEditingAirport(airport);
    setFormData(airport);
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditingAirport(null);
    setFormData({
      code: '',
      name: '',
      city: '',
      country: '',
      terminals: 1,
      timezone: ''
    });
    setShowModal(true);
  };

  const handleSubmit = () => {
    if (editingAirport) {
      onEdit?.({ ...editingAirport, ...formData });
    } else {
      onAdd?.(formData);
    }
    setShowModal(false);
  };

  return (
    <>
      <Card className="p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">Airports</h2>
          <div className="flex w-full sm:w-auto space-x-3">
            <div className="relative flex-1 sm:flex-none">
              <Input
                placeholder="Search airports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                icon={FaSearch}
                className="pl-10"
              />
            </div>
            <Button variant="primary" onClick={handleAdd}>
              <FaPlus className="mr-2" /> Add Airport
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">City</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Country</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Terminals</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timezone</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <AnimatePresence>
                {filteredAirports.map((airport) => (
                  <motion.tr
                    key={airport.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap font-mono font-bold text-blue-600">
                      {airport.code}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                      {airport.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                      {airport.city}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                      {airport.country}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                      {airport.terminals}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                      {airport.timezone}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button
                        onClick={() => handleEdit(airport)}
                        className="text-blue-600 hover:text-blue-800 mr-3"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => onDelete?.(airport.id)}
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

          {filteredAirports.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No airports found</p>
            </div>
          )}
        </div>
      </Card>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={editingAirport ? 'Edit Airport' : 'Add New Airport'}
        onConfirm={handleSubmit}
      >
        <div className="space-y-4">
          <Input
            label="Airport Code"
            value={formData.code}
            onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
            placeholder="JFK"
            maxLength={3}
            required
          />
          <Input
            label="Airport Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="John F. Kennedy International Airport"
            required
          />
          <Input
            label="City"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            placeholder="New York"
            required
          />
          <Input
            label="Country"
            value={formData.country}
            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
            placeholder="USA"
            required
          />
          <Input
            type="number"
            label="Number of Terminals"
            value={formData.terminals}
            onChange={(e) => setFormData({ ...formData, terminals: parseInt(e.target.value) })}
            min="1"
            required
          />
          <Input
            label="Timezone"
            value={formData.timezone}
            onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
            placeholder="America/New_York"
            required
          />
        </div>
      </Modal>
    </>
  );
};

export default AirportTable;