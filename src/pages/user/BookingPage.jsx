import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PaymentModal from '../../components/bookings/PaymentModal';
import { getSeatsByFlight } from '../../services/api/seatsAPI';
import { 
  FaPlane, 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaCreditCard, 
  FaLock,
  FaCheckCircle,
  FaArrowLeft,
  FaCalendarAlt,
  FaClock,
  FaArrowRight,
  FaShieldAlt
} from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { getFlightDetails } from '../../services/api/flightAPI';
import { createBooking } from '../../services/api/bookingAPI';
import toast from 'react-hot-toast';

const BookingPage = () => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const { flightId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [flight, setFlight] = useState(location.state?.flight || null);
  const [loading, setLoading] = useState(!flight);
  const [availableSeats, setAvailableSeats] = useState([]);
  const [seatsLoading, setSeatsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    passengers: [],
    contactEmail: user?.email || '',
    contactPhone: '',
    paymentMethod: 'credit_card',
    specialRequests: '',
    insurance: false
  });
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // Fetch seats when flight loads
  useEffect(() => {
    if (flight?.id) {
      fetchSeatsForFlight();
    }
  }, [flight]);

  // Load flight details if not provided
  useEffect(() => {
    if (!flight && flightId) {
      loadFlightDetails();
    }
  }, [flightId]);

  // Calculate total price
  useEffect(() => {
    if (flight && bookingData.passengers.length > 0) {
      const basePrice = flight.price * bookingData.passengers.length;
      const insuranceCost = bookingData.insurance ? basePrice * 0.05 : 0;
      setTotalPrice(basePrice + insuranceCost);
    }
  }, [flight, bookingData.passengers, bookingData.insurance]);

  const loadFlightDetails = async () => {
    try {
      const data = await getFlightDetails(flightId);
      setFlight(data);
    } catch (error) {
      toast.error('Failed to load flight details');
      navigate('/search');
    } finally {
      setLoading(false);
    }
  };

  const fetchSeatsForFlight = async () => {
    setSeatsLoading(true);
    try {
      const seats = await getSeatsByFlight(flight.id);
      setAvailableSeats(seats);
      console.log('Loaded seats:', seats);
    } catch (error) {
      console.error('Failed to fetch seats:', error);
    } finally {
      setSeatsLoading(false);
    }
  };

  const addPassenger = () => {
    setBookingData(prev => ({
      ...prev,
      passengers: [
        ...prev.passengers,
        { id: Date.now(), firstName: '', lastName: '', dob: '', passport: '', seat: '' }
      ]
    }));
  };

  const removePassenger = (id) => {
    setBookingData(prev => ({
      ...prev,
      passengers: prev.passengers.filter(p => p.id !== id)
    }));
  };

  const updatePassenger = (id, field, value) => {
    setBookingData(prev => ({
      ...prev,
      passengers: prev.passengers.map(p =>
        p.id === id ? { ...p, [field]: value } : p
      )
    }));
  };

  const handleSeatSelect = (seatNumber) => {
    setSelectedSeats(prev => {
      if (prev.includes(seatNumber)) {
        return prev.filter(s => s !== seatNumber);
      }
      if (prev.length < bookingData.passengers.length) {
        return [...prev, seatNumber];
      }
      toast.error(`You can only select ${bookingData.passengers.length} seat(s)`);
      return prev;
    });
  };

  const paymentDetails = {
    id: flight?.id,
    from: flight?.from,
    to: flight?.to,
    date: flight?.departureTime,
    flightNumber: flight?.flightNumber,
    price: totalPrice,
    passengers: bookingData.passengers,
    seats: selectedSeats
  };

  const handlePaymentSuccess = (bookingResponse) => {
    toast.success('Booking confirmed!');
    navigate('/booking-confirmation', {
      state: {
        booking: bookingResponse,
        flight: flight,
        passengers: bookingData.passengers,
        seats: selectedSeats,
        totalPrice: totalPrice
      }
    });
  };

  const handleFinalSubmit = () => {
    if (selectedSeats.length !== bookingData.passengers.length) {
      toast.error(`Please select ${bookingData.passengers.length} seat(s)`);
      return;
    }
    if (!bookingData.contactEmail || !bookingData.contactPhone) {
      toast.error('Please fill in contact information');
      return;
    }
    setShowPaymentModal(true);
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      if (bookingData.passengers.length === 0) {
        toast.error('Please add at least one passenger');
        return;
      }
      for (const passenger of bookingData.passengers) {
        if (!passenger.firstName || !passenger.lastName || !passenger.dob || !passenger.passport) {
          toast.error('Please fill all passenger details');
          return;
        }
      }
    }
    setCurrentStep(prev => prev + 1);
  };

  const steps = [
    { number: 1, title: 'Passenger Details', icon: FaUser },
    { number: 2, title: 'Select Seats', icon: FaPlane },
    { number: 3, title: 'Payment', icon: FaCreditCard },
    { number: 4, title: 'Confirmation', icon: FaCheckCircle }
  ];

  // Format seats by row for display
  const getSeatsByRow = () => {
    const rows = {};
    availableSeats.forEach(seat => {
      const row = seat.seat_number.replace(/[A-Z]/g, '');
      if (!rows[row]) rows[row] = [];
      rows[row].push(seat);
    });
    // Sort rows numerically
    return Object.keys(rows).sort((a, b) => parseInt(a) - parseInt(b)).map(row => ({
      row,
      seats: rows[row].sort((a, b) => {
        const colA = a.seat_number.match(/[A-Z]/)[0];
        const colB = b.seat_number.match(/[A-Z]/)[0];
        return colA.localeCompare(colB);
      })
    }));
  };

  const getSeatClassColor = (seatClass) => {
    switch(seatClass?.toLowerCase()) {
      case 'business': return 'bg-purple-100 border-purple-300 hover:bg-purple-200';
      case 'first': return 'bg-amber-100 border-amber-300 hover:bg-amber-200';
      default: return 'bg-white border-blue-200 hover:bg-blue-50';
    }
  };

  const getSeatTextColor = (seatClass, isSelected) => {
    if (isSelected) return 'text-white';
    switch(seatClass?.toLowerCase()) {
      case 'business': return 'text-purple-700';
      case 'first': return 'text-amber-700';
      default: return 'text-gray-700';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-blue-600 border-t-transparent 
                        rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading flight details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100/50 py-8">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center text-gray-600 hover:text-blue-600 
                   transition-colors group"
        >
          <FaArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Search
        </button>

        {/* Flight Summary Card */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-8
                   border border-blue-100/50"
        >
          <div className="flex flex-col lg:flex-row justify-between items-center">
            <div className="flex items-center space-x-6 mb-4 lg:mb-0">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 
                            rounded-2xl flex items-center justify-center">
                <FaPlane className="text-3xl text-white transform -rotate-45" />
              </div>
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-2xl font-bold text-gray-800">{flight?.from}</span>
                  <FaArrowRight className="text-blue-600" />
                  <span className="text-2xl font-bold text-gray-800">{flight?.to}</span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span className="flex items-center">
                    <FaCalendarAlt className="mr-1 text-blue-500" />
                    {flight?.departureTime ? new Date(flight.departureTime).toLocaleDateString() : 'N/A'}
                  </span>
                  <span className="flex items-center">
                    <FaClock className="mr-1 text-blue-500" />
                    {flight?.duration} min
                  </span>
                  <span className="flex items-center">
                    <FaPlane className="mr-1 text-blue-500" />
                    {flight?.flightNumber}
                  </span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Total Price</p>
              <p className="text-4xl font-bold text-blue-600">${totalPrice}</p>
              <p className="text-sm text-gray-500">for {bookingData.passengers.length} passenger(s)</p>
            </div>
          </div>
        </motion.div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            {steps.map((step, index) => (
              <React.Fragment key={step.number}>
                <div className="flex flex-col items-center relative">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className={`w-12 h-12 rounded-xl flex items-center justify-center
                              transition-all duration-300 ${
                      currentStep >= step.number
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                        : 'bg-white text-gray-400 border-2 border-gray-200'
                    }`}
                  >
                    {currentStep > step.number ? <FaCheckCircle /> : <step.icon />}
                  </motion.div>
                  <span className={`text-sm mt-2 font-medium ${
                    currentStep >= step.number ? 'text-blue-600' : 'text-gray-400'
                  }`}>
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-1 mx-4 rounded ${
                    currentStep > index + 1 ? 'bg-gradient-to-r from-blue-600 to-indigo-600' : 'bg-gray-200'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 
                      border border-blue-100/50">
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Passenger Details</h2>
                
                {/* Contact Information */}
                <div className="mb-8 p-6 bg-blue-50 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <FaEnvelope className="inline mr-2 text-blue-500" />
                        Email
                      </label>
                      <input
                        type="email"
                        value={bookingData.contactEmail}
                        onChange={(e) => setBookingData(prev => ({ ...prev, contactEmail: e.target.value }))}
                        className="w-full p-3 border-2 border-blue-200 rounded-xl 
                                 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 
                                 transition-all outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <FaPhone className="inline mr-2 text-blue-500" />
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={bookingData.contactPhone}
                        onChange={(e) => setBookingData(prev => ({ ...prev, contactPhone: e.target.value }))}
                        className="w-full p-3 border-2 border-blue-200 rounded-xl 
                                 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 
                                 transition-all outline-none"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Passengers */}
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Passenger Information</h3>
                {bookingData.passengers.map((passenger, index) => (
                  <motion.div
                    key={passenger.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mb-6 p-6 border-2 border-blue-100 rounded-xl relative"
                  >
                    <div className="absolute -top-3 left-4 bg-white px-2 text-sm font-medium text-blue-600">
                      Passenger {index + 1}
                    </div>
                    {index > 0 && (
                      <button
                        onClick={() => removePassenger(passenger.id)}
                        className="absolute -top-3 right-4 bg-red-500 text-white px-2 py-1 
                                 rounded-lg text-xs hover:bg-red-600 transition"
                      >
                        Remove
                      </button>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          First Name
                        </label>
                        <input
                          type="text"
                          value={passenger.firstName}
                          onChange={(e) => updatePassenger(passenger.id, 'firstName', e.target.value)}
                          className="w-full p-3 border-2 border-blue-200 rounded-xl 
                                   focus:border-blue-500 transition-all outline-none"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Last Name
                        </label>
                        <input
                          type="text"
                          value={passenger.lastName}
                          onChange={(e) => updatePassenger(passenger.id, 'lastName', e.target.value)}
                          className="w-full p-3 border-2 border-blue-200 rounded-xl 
                                   focus:border-blue-500 transition-all outline-none"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Date of Birth
                        </label>
                        <input
                          type="date"
                          value={passenger.dob}
                          onChange={(e) => updatePassenger(passenger.id, 'dob', e.target.value)}
                          className="w-full p-3 border-2 border-blue-200 rounded-xl 
                                   focus:border-blue-500 transition-all outline-none"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Passport Number
                        </label>
                        <input
                          type="text"
                          value={passenger.passport}
                          onChange={(e) => updatePassenger(passenger.id, 'passport', e.target.value)}
                          className="w-full p-3 border-2 border-blue-200 rounded-xl 
                                   focus:border-blue-500 transition-all outline-none"
                          required
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}

                <button
                  onClick={addPassenger}
                  className="mb-6 px-6 py-3 border-2 border-blue-600 text-blue-600 
                           rounded-xl font-medium hover:bg-blue-600 hover:text-white 
                           transition-all duration-300 flex items-center"
                >
                  <FaUser className="mr-2" />
                  Add Another Passenger
                </button>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Special Requests (Optional)
                  </label>
                  <textarea
                    value={bookingData.specialRequests}
                    onChange={(e) => setBookingData(prev => ({ ...prev, specialRequests: e.target.value }))}
                    rows="3"
                    className="w-full p-3 border-2 border-blue-200 rounded-xl 
                             focus:border-blue-500 focus:ring-4 focus:ring-blue-100 
                             transition-all outline-none"
                    placeholder="Dietary restrictions, medical assistance, etc."
                  />
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Select Your Seats</h2>
                <p className="text-gray-600 mb-6">
                  Choose {bookingData.passengers.length} seat(s) for your flight
                </p>

                <div className="mb-8 overflow-x-auto">
                  <div className="min-w-[600px]">
                    <div className="flex justify-center mb-8">
                      <div className="bg-blue-600 text-white px-8 py-3 rounded-t-2xl">
                        <FaPlane className="inline mr-2" />
                        Front of Aircraft
                      </div>
                    </div>

                    {seatsLoading ? (
                      <div className="text-center py-12 bg-gray-100 rounded-2xl">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="mt-4 text-gray-500">Loading seats...</p>
                      </div>
                    ) : availableSeats.length === 0 ? (
                      <div className="text-center py-12 bg-gray-100 rounded-2xl">
                        <p className="text-gray-500">No seats available for this flight</p>
                      </div>
                    ) : (
                      <div className="bg-gray-100 p-6 rounded-2xl">
                        {getSeatsByRow().map(({ row, seats }) => (
                          <div key={row} className="flex justify-center mb-2">
                            <span className="w-8 flex items-center justify-center font-bold text-gray-500">
                              {row}
                            </span>
                            {seats.map((seat) => {
                              const seatNumber = seat.seat_number;
                              const isBooked = !seat.is_available;
                              const isSelected = selectedSeats.includes(seatNumber);
                              const seatClass = seat.class || 'economy';
                              const col = seatNumber.match(/[A-Z]/)?.[0] || '';
                              
                              return (
                                <motion.button
                                  key={seat.id}
                                  whileHover={!isBooked ? { scale: 1.1 } : {}}
                                  whileTap={!isBooked ? { scale: 0.95 } : {}}
                                  onClick={() => !isBooked && handleSeatSelect(seatNumber)}
                                  disabled={isBooked}
                                  className={`w-12 h-12 m-1 rounded-xl font-medium
                                            transition-all duration-200 flex flex-col items-center justify-center
                                            ${isBooked ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : getSeatClassColor(seatClass)}
                                            ${isSelected ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg' : getSeatTextColor(seatClass, isSelected)}`}
                                  title={`${seatNumber} - ${seatClass}`}
                                >
                                  <span className="text-sm font-bold">{col}</span>
                                  <span className="text-xs">
                                    {seatClass === 'business' ? 'B' : seatClass === 'first' ? 'F' : 'E'}
                                  </span>
                                </motion.button>
                              );
                            })}
                            {/* Add empty spaces for missing columns */}
                            {seats.length < 6 && [...Array(6 - seats.length)].map((_, i) => (
                              <div key={`empty-${i}`} className="w-12 h-12 m-1"></div>
                            ))}
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex justify-center mt-4">
                      <div className="bg-gray-800 text-white px-8 py-3 rounded-b-2xl">
                        Rear of Aircraft
                      </div>
                    </div>

                    {/* Legend */}
                    <div className="flex justify-center space-x-6 mt-6">
                      <div className="flex items-center">
                        <div className="w-6 h-6 bg-white border-2 border-blue-200 rounded mr-2"></div>
                        <span className="text-sm text-gray-600">Economy</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-6 h-6 bg-purple-100 border-2 border-purple-300 rounded mr-2"></div>
                        <span className="text-sm text-gray-600">Business</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-6 h-6 bg-amber-100 border-2 border-amber-300 rounded mr-2"></div>
                        <span className="text-sm text-gray-600">First Class</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-indigo-600 rounded mr-2"></div>
                        <span className="text-sm text-gray-600">Selected</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-6 h-6 bg-gray-300 rounded mr-2"></div>
                        <span className="text-sm text-gray-600">Booked</span>
                      </div>
                    </div>
                  </div>
                </div>

                {selectedSeats.length > 0 && (
                  <div className="bg-blue-50 p-4 rounded-xl">
                    <p className="text-sm text-gray-600 mb-1">Selected Seats:</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedSeats.map(seat => (
                        <span key={seat} className="px-3 py-1 bg-blue-600 text-white 
                                                   rounded-lg text-sm font-medium">
                          {seat}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Review & Payment</h2>

                <div className="mb-8 p-6 bg-gray-50 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Booking Summary</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Flight</span>
                      <span className="font-medium">{flight?.flightNumber} ({flight?.from} → {flight?.to})</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Passengers</span>
                      <span className="font-medium">{bookingData.passengers.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Seats</span>
                      <span className="font-medium">{selectedSeats.join(', ')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Base Fare</span>
                      <span className="font-medium">${flight?.price * bookingData.passengers.length}</span>
                    </div>
                    {bookingData.insurance && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Insurance (5%)</span>
                        <span className="font-medium">${flight?.price * bookingData.passengers.length * 0.05}</span>
                      </div>
                    )}
                    <div className="border-t pt-3 mt-3">
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span className="text-blue-600">${totalPrice}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-8 p-6 border-2 border-blue-100 rounded-xl">
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={bookingData.insurance}
                      onChange={(e) => setBookingData(prev => ({ ...prev, insurance: e.target.checked }))}
                      className="mt-1 w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <div className="flex-1">
                      <div className="flex items-center">
                        <FaShieldAlt className="text-blue-600 mr-2" />
                        <span className="font-semibold text-gray-800">Add Travel Insurance</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        Protect your trip against cancellations, medical emergencies, 
                        and lost baggage. Only 5% of total fare.
                      </p>
                    </div>
                  </label>
                </div>

                <div className="bg-blue-50 p-4 rounded-xl">
                  <p className="text-sm text-gray-600 flex items-center">
                    <FaLock className="text-green-500 mr-2" />
                    Your payment is secure and encrypted
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            {currentStep > 1 && (
              <button
                onClick={() => setCurrentStep(prev => prev - 1)}
                className="px-6 py-3 border-2 border-gray-300 text-gray-600 
                         rounded-xl font-medium hover:bg-gray-50 
                         transition-all duration-300 flex items-center"
              >
                <FaArrowLeft className="mr-2" />
                Back
              </button>
            )}
            {currentStep === 3 ? (
              <button
                onClick={handleFinalSubmit}
                disabled={bookingData.passengers.length === 0 || selectedSeats.length === 0}
                className={`px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 
                         text-white rounded-xl font-medium hover:shadow-xl 
                         transform hover:scale-105 transition-all duration-300
                         flex items-center ml-auto ${
                  (bookingData.passengers.length === 0 || selectedSeats.length === 0) 
                    ? 'opacity-50 cursor-not-allowed' 
                    : ''
                }`}
              >
                Proceed to Payment
                <FaCreditCard className="ml-2" />
              </button>
            ) : (
              <button
                onClick={handleNextStep}
                disabled={currentStep === 1 && bookingData.passengers.length === 0}
                className={`px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 
                         text-white rounded-xl font-medium hover:shadow-xl 
                         transform hover:scale-105 transition-all duration-300
                         flex items-center ml-auto ${
                  (currentStep === 1 && bookingData.passengers.length === 0) 
                    ? 'opacity-50 cursor-not-allowed' 
                    : ''
                }`}
              >
                Continue
                <FaArrowRight className="ml-2" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        flightDetails={paymentDetails}
        onSuccess={handlePaymentSuccess}
      />
    </div>
  );
};

export default BookingPage;