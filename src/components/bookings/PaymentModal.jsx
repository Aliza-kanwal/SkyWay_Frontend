// src/components/booking/PaymentModal.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCreditCard, FaLock, FaTimes, FaCheck } from 'react-icons/fa';
import { createBooking } from '../../services/api/bookingAPI';

const PaymentModal = ({ isOpen, onClose, flightDetails, onSuccess }) => {
  const [form, setForm] = useState({
    cardNumber: '', name: '', expiry: '', cvv: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const formatCardNumber = (val) => {
    return val.replace(/\D/g, '').substring(0, 16)
      .replace(/(.{4})/g, '$1 ').trim();
  };

  const formatExpiry = (val) => {
    const v = val.replace(/\D/g, '');
    return v.length > 2 ? `${v.substring(0, 2)} / ${v.substring(2, 4)}` : v;
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === 'cardNumber') value = formatCardNumber(value);
    if (name === 'expiry') value = formatExpiry(value);
    if (name === 'cvv') value = value.replace(/\D/g, '').substring(0, 4);
    setForm(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const errs = {};
    const raw = form.cardNumber.replace(/\s/g, '');
    if (raw.length < 16) errs.cardNumber = 'Enter a valid 16-digit card number';
    if (!form.name.trim()) errs.name = 'Cardholder name is required';
    if (form.expiry.length < 7) errs.expiry = 'Enter a valid expiry date';
    if (form.cvv.length < 3) errs.cvv = 'Enter a valid CVV';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

 const handleSubmit = async () => {
  if (!validate()) return;
  setLoading(true);
  try {
    // Send complete booking data
    const booking = await createBooking({
      flight_id: flightDetails.id,
      seat_id: flightDetails.seats?.[0],
      passengers: flightDetails.passengers,
      totalPrice: flightDetails.price,
      paymentMethod: 'card',
      last4: form.cardNumber.replace(/\s/g, '').slice(-4),
      cardholderName: form.name
    });
    
    setConfirmed(true);
    setTimeout(() => onSuccess(booking), 1500);
  } catch (err) {
    console.error('Booking error:', err);
    setErrors({ submit: err.response?.data?.message || 'Payment failed. Please try again.' });
    setLoading(false);
  }
};
  // Card brand detection (basic)
  const getCardBrand = () => {
    const n = form.cardNumber.replace(/\s/g, '');
    if (n.startsWith('4')) return 'Visa';
    if (/^5[1-5]/.test(n)) return 'Mastercard';
    if (/^3[47]/.test(n)) return 'Amex';
    return null;
  };

  const maskedPreview = () => {
    const raw = form.cardNumber.replace(/\s/g, '').padEnd(16, '•');
    return [0,4,8,12].map(i => raw.substring(i, i+4)).join(' ');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
          initial={{ scale: 0.95, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.95, y: 20, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Complete your booking</h2>
              <p className="text-sm text-gray-500">Enter card details to confirm</p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            >
              <FaTimes className="text-gray-400" />
            </button>
          </div>

          {/* Flight summary strip */}
          <div className="mx-6 mt-4 bg-blue-50 rounded-xl px-4 py-3 flex justify-between items-center">
            <div>
              <p className="font-semibold text-gray-800">
                {flightDetails?.from} → {flightDetails?.to}
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                {flightDetails?.date} · {flightDetails?.flightNumber}
              </p>
            </div>
            <div className="text-right">
              <p className="text-blue-600 font-bold text-lg">${flightDetails?.price}</p>
              <p className="text-xs text-gray-400">total</p>
            </div>
          </div>

          <div className="px-6 pt-4 pb-6">
            {/* Visual card */}
            <div className="h-20 bg-gradient-to-r from-blue-700 to-blue-500 rounded-xl mb-5 px-4 py-3 flex flex-col justify-between">
              <div className="flex justify-between items-center">
                <div className="w-7 h-5 bg-yellow-300 rounded opacity-80" />
                {getCardBrand() && (
                  <span className="text-white/80 text-xs font-medium">{getCardBrand()}</span>
                )}
              </div>
              <p className="text-white/90 font-mono text-sm tracking-widest">
                {maskedPreview()}
              </p>
            </div>

            {/* Form fields */}
            <div className="space-y-3">
              <div>
                <label className="text-xs text-gray-500 block mb-1">Card number</label>
                <input
                  name="cardNumber"
                  value={form.cardNumber}
                  onChange={handleChange}
                  placeholder="1234 5678 9012 3456"
                  className={`w-full border rounded-lg px-3 h-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 ${
                    errors.cardNumber ? 'border-red-400' : 'border-gray-200'
                  }`}
                />
                {errors.cardNumber && (
                  <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>
                )}
              </div>

              <div>
                <label className="text-xs text-gray-500 block mb-1">Cardholder name</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="As printed on card"
                  className={`w-full border rounded-lg px-3 h-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 ${
                    errors.name ? 'border-red-400' : 'border-gray-200'
                  }`}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-500 block mb-1">Expiry</label>
                  <input
                    name="expiry"
                    value={form.expiry}
                    onChange={handleChange}
                    placeholder="MM / YY"
                    className={`w-full border rounded-lg px-3 h-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 ${
                      errors.expiry ? 'border-red-400' : 'border-gray-200'
                    }`}
                  />
                  {errors.expiry && (
                    <p className="text-red-500 text-xs mt-1">{errors.expiry}</p>
                  )}
                </div>
                <div>
                  <label className="text-xs text-gray-500 block mb-1">CVV</label>
                  <input
                    name="cvv"
                    value={form.cvv}
                    onChange={handleChange}
                    type="password"
                    placeholder="•••"
                    className={`w-full border rounded-lg px-3 h-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 ${
                      errors.cvv ? 'border-red-400' : 'border-gray-200'
                    }`}
                  />
                  {errors.cvv && (
                    <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>
                  )}
                </div>
              </div>
            </div>

            {errors.submit && (
              <p className="text-red-500 text-sm mt-3 text-center">{errors.submit}</p>
            )}

            {/* Submit button */}
            <motion.button
              onClick={handleSubmit}
              disabled={loading || confirmed}
              className={`mt-4 w-full h-11 rounded-xl text-white font-medium text-sm flex items-center justify-center gap-2 transition-colors ${
                confirmed
                  ? 'bg-green-600'
                  : loading
                  ? 'bg-blue-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
              whileTap={!loading && !confirmed ? { scale: 0.98 } : {}}
            >
              {confirmed ? (
                <><FaCheck /> Booking Confirmed!</>
              ) : loading ? (
                <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Processing...</>
              ) : (
                <><FaCreditCard /> Pay ${flightDetails?.price} & Confirm</>
              )}
            </motion.button>

            <p className="flex items-center justify-center gap-1.5 mt-3 text-xs text-gray-400">
              <FaLock className="text-gray-300" /> Secured with 256-bit SSL encryption
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PaymentModal;