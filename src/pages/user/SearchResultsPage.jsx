import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaPlane, FaArrowLeft } from 'react-icons/fa';
import { format } from 'date-fns';
import FlightCard from '../../components/flights/FlightCard';
import FlightSearchForm from '../../components/flights/FlightSearchForm';
import { searchFlights } from '../../services/api/flightAPI';

const SearchResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { flights: initialFlights = [], searchParams = {} } = location.state || {};
  const [flights, setFlights] = useState(initialFlights);
  const [sortBy, setSortBy] = useState('price');
  const [loading, setLoading] = useState(false);
  const hasSearchParams = Object.keys(searchParams).length > 0;

  // Add this useEffect inside SearchResultsPage component
useEffect(() => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}, []);
  // ✅ useEffect is now INSIDE the component
  useEffect(() => {
    if (location.state?.autoSearch && location.state?.searchParams) {
      triggerSearch(location.state.searchParams);
    }
  }, []);

  const triggerSearch = async (params) => {
    setLoading(true);
    try {
      const results = await searchFlights(params);
      setFlights(results);
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (criteria) => {
    setSortBy(criteria);
  };

  const sortedFlights = [...flights].sort((a, b) => {
    if (sortBy === 'price') return a.price - b.price;
    if (sortBy === 'duration') return a.duration - b.duration;
    if (sortBy === 'departure') return new Date(a.departureTime) - new Date(b.departureTime);
    return 0;
  });

  const handleBackToSearch = () => {
    navigate('/search');
  };

  const handleSearch = async (results, params) => {
  // ✅ results already come from FlightSearchForm, just update state
  setFlights(results);
  navigate('/search', {
    state: { flights: results, searchParams: params },
    replace: true  // 👈 replaces current history entry
  });
};

  if (flights.length === 0 && !hasSearchParams) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100/50 py-12">
        <div className="container mx-auto px-4">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-12 max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">🔎</div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Search for Flights</h1>
              <p className="text-gray-600">
                Enter your departure and destination airports to find available flights.
              </p>
            </div>
            <FlightSearchForm onSearch={handleSearch} loading={loading} />
          </div>
        </div>
      </div>
    );
  }

  if (flights.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100/50 py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-12 max-w-2xl mx-auto">
            <div className="text-8xl mb-6">🔍</div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">No Flights Found</h1>
            <p className="text-gray-600 mb-8">
              We couldn't find any flights matching your search criteria.
              Try adjusting your dates or destination.
            </p>
            <button
              onClick={handleBackToSearch}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-xl font-medium hover:shadow-lg transition-all"
            >
              <FaArrowLeft className="inline mr-2" />
              Back to Search
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100/50 py-8">
      <div className="container mx-auto px-4">
        <button
          onClick={handleBackToSearch}
          className="mb-6 flex items-center text-gray-600 hover:text-blue-600 transition-colors"
        >
          <FaArrowLeft className="mr-2" /> Modify Search
        </button>

        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-gray-800">{searchParams.from}</span>
                <FaPlane className="text-blue-600 mx-2" />
                <span className="text-2xl font-bold text-gray-800">{searchParams.to}</span>
              </div>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                {searchParams.passengers} {searchParams.passengers === 1 ? 'Passenger' : 'Passengers'}
              </span>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="border-l pl-4">
                <span className="block font-medium">
                  {searchParams.departureDate ? format(new Date(searchParams.departureDate), 'MMM dd, yyyy') : 'N/A'}
                </span>
                <span className="text-xs">Departure</span>
              </div>
              {searchParams.returnDate && (
                <div className="border-l pl-4">
                  <span className="block font-medium">
                    {format(new Date(searchParams.returnDate), 'MMM dd, yyyy')}
                  </span>
                  <span className="text-xs">Return</span>
                </div>
              )}
              <div className="border-l pl-4">
                <span className="block font-medium capitalize">{searchParams.class}</span>
                <span className="text-xs">Class</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {flights.length} {flights.length === 1 ? 'Flight' : 'Flights'} Found
          </h2>
          <select
            value={sortBy}
            onChange={(e) => handleSort(e.target.value)}
            className="p-2 border-2 border-blue-200 rounded-xl focus:border-blue-500 outline-none"
          >
            <option value="price">Sort by Price (Lowest)</option>
            <option value="departure">Sort by Departure Time</option>
            <option value="duration">Sort by Duration</option>
          </select>
        </div>

        <div className="space-y-4">
          {sortedFlights.map((flight) => (
            <FlightCard
              key={flight.id}
              flight={flight}
              searchParams={searchParams}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchResultsPage;