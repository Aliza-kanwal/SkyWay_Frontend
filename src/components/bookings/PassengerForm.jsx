import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaPassport, FaCalendarAlt, FaPlus, FaTrash } from 'react-icons/fa';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Card from '../ui/Card';

const PassengerForm = ({ passengers, onChange, maxPassengers = 9 }) => {
  const [passengersList, setPassengersList] = useState(
    passengers || [
      { id: 1, firstName: '', lastName: '', dob: '', passport: '', specialRequests: '' }
    ]
  );

  const addPassenger = () => {
    if (passengersList.length < maxPassengers) {
      const newPassengers = [
        ...passengersList,
        { id: passengersList.length + 1, firstName: '', lastName: '', dob: '', passport: '', specialRequests: '' }
      ];
      setPassengersList(newPassengers);
      onChange?.(newPassengers);
    }
  };

  const removePassenger = (id) => {
    if (passengersList.length > 1) {
      const newPassengers = passengersList.filter(p => p.id !== id);
      setPassengersList(newPassengers);
      onChange?.(newPassengers);
    }
  };

  const updatePassenger = (id, field, value) => {
    const newPassengers = passengersList.map(p =>
      p.id === id ? { ...p, [field]: value } : p
    );
    setPassengersList(newPassengers);
    onChange?.(newPassengers);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">Passenger Details</h3>
        <span className="text-sm text-gray-500">
          {passengersList.length} / {maxPassengers} Passengers
        </span>
      </div>

      <AnimatePresence>
        {passengersList.map((passenger, index) => (
          <motion.div
            key={passenger.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="p-6 relative border-2 border-blue-100">
              {/* Passenger Number Badge */}
              <div className="absolute -top-3 left-4 bg-gradient-to-r from-blue-600 to-indigo-600 
                            text-white px-4 py-1 rounded-full text-sm font-medium">
                Passenger {index + 1}
              </div>

              {/* Remove Button (only if more than 1 passenger) */}
              {passengersList.length > 1 && (
                <button
                  onClick={() => removePassenger(passenger.id)}
                  className="absolute -top-3 right-4 bg-red-500 text-white p-1 rounded-full 
                           hover:bg-red-600 transition-colors"
                >
                  <FaTrash size={12} />
                </button>
              )}

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="First Name"
                  value={passenger.firstName}
                  onChange={(e) => updatePassenger(passenger.id, 'firstName', e.target.value)}
                  icon={FaUser}
                  required
                  placeholder="John"
                />

                <Input
                  label="Last Name"
                  value={passenger.lastName}
                  onChange={(e) => updatePassenger(passenger.id, 'lastName', e.target.value)}
                  icon={FaUser}
                  required
                  placeholder="Doe"
                />

                <Input
                  type="date"
                  label="Date of Birth"
                  value={passenger.dob}
                  onChange={(e) => updatePassenger(passenger.id, 'dob', e.target.value)}
                  icon={FaCalendarAlt}
                  required
                />

                <Input
                  label="Passport Number"
                  value={passenger.passport}
                  onChange={(e) => updatePassenger(passenger.id, 'passport', e.target.value)}
                  icon={FaPassport}
                  required
                  placeholder="P12345678"
                />
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Special Requests (Optional)
                </label>
                <textarea
                  value={passenger.specialRequests}
                  onChange={(e) => updatePassenger(passenger.id, 'specialRequests', e.target.value)}
                  rows="2"
                  className="w-full p-3 border-2 border-blue-200 rounded-xl 
                           focus:border-blue-500 focus:ring-4 focus:ring-blue-100 
                           transition-all outline-none"
                  placeholder="Dietary restrictions, medical assistance, wheelchair access, etc."
                />
              </div>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>

      {passengersList.length < maxPassengers && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-center"
        >
          <Button
            variant="outline"
            onClick={addPassenger}
            className="flex items-center space-x-2"
          >
            <FaPlus />
            <span>Add Another Passenger</span>
          </Button>
        </motion.div>
      )}

      {/* Summary */}
      <Card className="p-4 bg-blue-50">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">Total Passengers:</span>
          <span className="font-bold text-blue-600">{passengersList.length}</span>
        </div>
      </Card>
    </div>
  );
};

export default PassengerForm;