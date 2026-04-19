import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Add this import
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaSearch, 
  FaPlaneDeparture, 
  FaPlaneArrival, 
  FaCalendarAlt, 
  FaUsers,
  FaExchangeAlt,
  FaMapMarkerAlt,
  FaInfoCircle
} from 'react-icons/fa';
import { searchFlights } from '../../services/api/flightAPI';
import { getAirports } from '../../services/api/airportAPI';
import toast from 'react-hot-toast';
import "react-datepicker/dist/react-datepicker.css";

const FlightSearchForm = ({ onSearch, loading: externalLoading }) => {
  const navigate = useNavigate(); // ✅ Add this line
  const [isRoundTrip, setIsRoundTrip] = useState(false);
  const [loading, setLoading] = useState(false);
  const [airports, setAirports] = useState([]);
  const [airportOptions, setAirportOptions] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});
  const [searchParams, setSearchParams] = useState({
    from: '',
    to: '',
    departureDate: new Date('2026-04-01'),
    returnDate: new Date('2026-04-08'),
    passengers: 1,
    class: 'economy'
  });

  // Load airports on component mount
  useEffect(() => {
    loadAirports();
  }, []);

  const loadAirports = async () => {
    try {
      const data = await getAirports();
      setAirports(data);
      
      // Format for react-select
      const options = data.map(airport => ({
        value: airport.code,
        label: `${airport.code} - ${airport.city}, ${airport.country}`,
        city: airport.city,
        country: airport.country,
        name: airport.name
      }));
      setAirportOptions(options);
    } catch (error) {
      console.error('Failed to load airports:', error);
      toast.error('Could not load airports. Please try again.');
    }
  };

  const validateAirport = (code) => {
    if (!code) return false;
    if (airportOptions.length === 0) return false;
    return airportOptions.some(option => option.value === code.toUpperCase());
  };

  const validateForm = () => {
    const errors = {};
    
    // Validate departure airport
    if (!searchParams.from) {
      errors.from = 'Please select a departure airport';
    } else if (!validateAirport(searchParams.from)) {
      errors.from = 'Invalid departure airport code. Please select from the list';
    }
    
    // Validate arrival airport
    if (!searchParams.to) {
      errors.to = 'Please select an arrival airport';
    } else if (!validateAirport(searchParams.to)) {
      errors.to = 'Invalid arrival airport code. Please select from the list';
    }
    
    // Check if same airport
    if (searchParams.from && searchParams.to && searchParams.from === searchParams.to) {
      errors.to = 'Departure and arrival airports cannot be the same';
    }
    
    // Validate passengers
    if (searchParams.passengers < 1) {
      errors.passengers = 'At least 1 passenger is required';
    } else if (searchParams.passengers > 9) {
      errors.passengers = 'Maximum 9 passengers allowed';
    }
    
    // Validate dates
    if (!searchParams.departureDate) {
      errors.departureDate = 'Please select a departure date';
    }
    
    if (isRoundTrip && !searchParams.returnDate) {
      errors.returnDate = 'Please select a return date';
    }
    
    if (isRoundTrip && searchParams.returnDate && searchParams.departureDate) {
      if (searchParams.returnDate < searchParams.departureDate) {
        errors.returnDate = 'Return date must be after departure date';
      }
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    setLoading(true);
    try {
      const searchData = {
        ...searchParams,
        from: searchParams.from.toUpperCase(),
        to: searchParams.to.toUpperCase(),
        departureDate: searchParams.departureDate.toISOString().split('T')[0],
        returnDate: isRoundTrip ? searchParams.returnDate.toISOString().split('T')[0] : null
      };
      
      const results = await searchFlights(searchData);
      
      if (onSearch) {
        // If onSearch prop is provided, use it
        onSearch(results, searchData);
      } else {
        // Otherwise navigate to results page
        navigate('/search', { 
          state: { 
            flights: results, 
            searchParams: searchData,
            isRoundTrip 
          } 
        });
      }
      
      toast.success(`Found ${results.length} flights!`);
    } catch (error) {
      toast.error('Failed to search flights. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const swapLocations = () => {
    setSearchParams(prev => ({
      ...prev,
      from: prev.to,
      to: prev.from
    }));
    // Clear validation errors for swapped fields
    setValidationErrors({});
  };

  const handleAirportSelect = (selected, field) => {
    setSearchParams(prev => ({ 
      ...prev, 
      [field]: selected ? selected.value : '' 
    }));
    // Clear validation error for this field
    if (validationErrors[field]) {
      setValidationErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  // Custom styles for react-select
  const selectStyles = {
    control: (base, state) => ({
      ...base,
      padding: '4px',
      borderColor: validationErrors[state.selectProps.name] ? '#ef4444' : '#e2e8f0',
      borderWidth: '2px',
      borderRadius: '0.75rem',
      boxShadow: 'none',
      '&:hover': {
        borderColor: '#3b82f6'
      }
    }),
    option: (base, { isFocused, isSelected }) => ({
      ...base,
      backgroundColor: isSelected ? '#3b82f6' : isFocused ? '#dbeafe' : 'white',
      color: isSelected ? 'white' : '#1f2937',
      cursor: 'pointer',
      padding: '10px 12px'
    })
  };

  return (
    <div id="search-section" className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Where would you like to go?
          </h2>
          <p className="text-gray-600 text-lg">
            Discover amazing destinations across Pakistan and the Middle East
          </p>
        </div>

        {/* Search Form */}
        <div className="premium-card p-8">
          {/* Trip Type Toggle */}
          <div className="flex justify-center mb-8">
            <div className="bg-gray-100 p-1 rounded-2xl inline-flex">
              {['one-way', 'round-trip'].map((type) => (
                <button
                  key={type}
                  onClick={() => setIsRoundTrip(type === 'round-trip')}
                  className={`px-6 py-2 rounded-xl font-medium transition-all duration-300 ${
                    (type === 'round-trip' && isRoundTrip) || (type === 'one-way' && !isRoundTrip)
                      ? 'bg-white text-blue-600 shadow-md'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSearch} className="space-y-6">
            {/* Locations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FaPlaneDeparture className="inline mr-2 text-blue-500" />
                  From
                </label>
                <Select
                  name="from"
                  options={airportOptions}
                  onChange={(selected) => handleAirportSelect(selected, 'from')}
                  value={airportOptions.find(opt => opt.value === searchParams.from)}
                  placeholder="Search for airport or city..."
                  isClearable
                  styles={selectStyles}
                  className="react-select"
                  classNamePrefix="select"
                />
                {validationErrors.from && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <FaInfoCircle className="mr-1" /> {validationErrors.from}
                  </p>
                )}
              </div>
              
              {/* Swap Button */}
              <button
                type="button"
                onClick={swapLocations}
                className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 
                         bg-white rounded-full p-3 shadow-lg hover:shadow-xl 
                         transition-all duration-300 z-10 hidden md:block"
                title="Swap departure and arrival"
              >
                <FaExchangeAlt className="text-blue-600" />
              </button>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FaPlaneArrival className="inline mr-2 text-blue-500" />
                  To
                </label>
                <Select
                  name="to"
                  options={airportOptions}
                  onChange={(selected) => handleAirportSelect(selected, 'to')}
                  value={airportOptions.find(opt => opt.value === searchParams.to)}
                  placeholder="Search for airport or city..."
                  isClearable
                  styles={selectStyles}
                  className="react-select"
                  classNamePrefix="select"
                />
                {validationErrors.to && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <FaInfoCircle className="mr-1" /> {validationErrors.to}
                  </p>
                )}
              </div>
            </div>

            {/* Dates and Passengers */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FaCalendarAlt className="inline mr-2 text-blue-500" />
                  Departure
                </label>
                <DatePicker
                  selected={searchParams.departureDate}
                  onChange={(date) => {
                    setSearchParams(prev => ({ ...prev, departureDate: date }));
                    setValidationErrors(prev => ({ ...prev, departureDate: null }));
                  }}
                  minDate={new Date()}
                  className={`premium-input ${validationErrors.departureDate ? 'border-red-500' : ''}`}
                  dateFormat="MMM dd, yyyy"
                  placeholderText="Select departure date"
                />
                {validationErrors.departureDate && (
                  <p className="mt-1 text-sm text-red-600">{validationErrors.departureDate}</p>
                )}
              </div>
              
              <AnimatePresence>
                {isRoundTrip && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FaCalendarAlt className="inline mr-2 text-blue-500" />
                      Return
                    </label>
                    <DatePicker
                      selected={searchParams.returnDate}
                      onChange={(date) => {
                        setSearchParams(prev => ({ ...prev, returnDate: date }));
                        setValidationErrors(prev => ({ ...prev, returnDate: null }));
                      }}
                      minDate={searchParams.departureDate}
                      className={`premium-input ${validationErrors.returnDate ? 'border-red-500' : ''}`}
                      dateFormat="MMM dd, yyyy"
                      placeholderText="Select return date"
                    />
                    {validationErrors.returnDate && (
                      <p className="mt-1 text-sm text-red-600">{validationErrors.returnDate}</p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FaUsers className="inline mr-2 text-blue-500" />
                  Passengers
                </label>
                <select
                  value={searchParams.passengers}
                  onChange={(e) => {
                    setSearchParams(prev => ({ ...prev, passengers: parseInt(e.target.value) }));
                    setValidationErrors(prev => ({ ...prev, passengers: null }));
                  }}
                  className={`premium-input ${validationErrors.passengers ? 'border-red-500' : ''}`}
                >
                  {[1,2,3,4,5,6,7,8,9].map(num => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'Passenger' : 'Passengers'}
                    </option>
                  ))}
                </select>
                {validationErrors.passengers && (
                  <p className="mt-1 text-sm text-red-600">{validationErrors.passengers}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Class
                </label>
                <select
                  value={searchParams.class}
                  onChange={(e) => setSearchParams(prev => ({ ...prev, class: e.target.value }))}
                  className="premium-input"
                >
                  <option value="economy">Economy</option>
                  <option value="business">Business</option>
                  <option value="first">First Class</option>
                </select>
              </div>
            </div>

            {/* Search Button */}
            <motion.button
              type="submit"
              disabled={loading || externalLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-primary w-full text-lg disabled:opacity-50"
            >
              {loading || externalLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Searching...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <FaSearch className="mr-2" />
                  Search Flights
                </span>
              )}
            </motion.button>
          </form>

          {/* Popular Airports Quick Select */}
          <div className="mt-8">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Popular Airports</h3>
            <div className="flex flex-wrap gap-2">
              {['KHI', 'LHE', 'ISB', 'DXB', 'IST'].map(code => {
                const airport = airports.find(a => a.code === code);
                if (!airport) return null;
                return (
                  <button
                    key={code}
                    onClick={() => {
                      setSearchParams(prev => ({ ...prev, to: code }));
                      setValidationErrors({});
                    }}
                    className="px-3 py-2 bg-gray-100 hover:bg-blue-100 rounded-lg 
                             text-sm font-medium transition-colors flex items-center"
                  >
                    <FaMapMarkerAlt className="mr-1 text-blue-500 text-xs" />
                    {code} - {airport.city}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FlightSearchForm;