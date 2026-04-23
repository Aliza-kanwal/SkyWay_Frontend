import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import FlightTable from '../../components/admin/FlightTable';
import { getFlights, createFlight, updateFlight, deleteFlight } from '../../services/api/flightAPI';
import { getAirports } from '../../services/api/airportAPI';
import toast from 'react-hot-toast';

const ManageFlightsPage = () => {
  const [flights, setFlights] = useState([]);
  const [airports, setAirports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

 const loadData = async () => {
  try {
    setLoading(true);
    // Fetch flights from your backend
    const flightsData = await getFlights(); 
    console.log('Flights data:', flightsData);
    setFlights(flightsData);
    
    // Make sure this function exists
    const airportsData = await getAirports();
    
    // Format flights for display
    const formattedFlights = flightsData.map(flight => ({
      id: flight.id,
      flightNumber: flight.flightNumber || `FL${flight.id}`,
      airline: flight.airline,
      from: flight.from_code || flight.departure_airport_code,
      to: flight.to_code || flight.arrival_airport_code,
      departureTime: flight.departure_time,
      arrivalTime: flight.arrival_time,
      duration: flight.duration,
      price: flight.price,
      availableSeats: flight.availableSeats || 30,
      class: flight.class || 'economy'
    }));
    
    setFlights(formattedFlights);
    setAirports(airportsData);
  } catch (error) {
    console.error('Failed to load data:', error);
    toast.error('Failed to load flights');
  } finally {
    setLoading(false);
  }
  
};

const handleAddFlight = async (flightData) => {
  try {
    console.log('Received flight data:', flightData);

    // ✅ Backend expects codes directly now, not IDs
    const payload = {
      departure_airport: flightData.departure_airport,
      arrival_airport: flightData.arrival_airport,
      departure_time: flightData.departure_time,
      arrival_time: flightData.arrival_time,
      duration: parseInt(flightData.duration),
      price: parseInt(flightData.price),
      airline: flightData.airline,
      aircraft_type: flightData.aircraft_type || 'Boeing 737'
    };

    console.log('Sending payload:', payload);
    await createFlight(payload);
    toast.success('Flight added successfully!');
    loadData();
  } catch (error) {
    console.error('Error:', error);
    toast.error(error.error || 'Failed to add flight');
  }
};

  const handleEditFlight = async (flightData) => {
    try {
      await updateFlight(flightData.id, flightData);
      toast.success('Flight updated successfully');
      loadData();
    } catch (error) {
      toast.error('Failed to update flight');
    }
  };

  const handleDeleteFlight = async (id) => {
    if (window.confirm('Are you sure you want to delete this flight?')) {
      try {
        await deleteFlight(id);
        toast.success('Flight deleted successfully');
        loadData();
      } catch (error) {
        toast.error('Failed to delete flight');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-100">
        <AdminSidebar />
        <div className="flex-1 p-8 flex items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 p-8 ml-64">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Manage Flights</h1>
          <p className="text-gray-600">Add, edit, or remove flights from the system</p>
        </div>

        <FlightTable
          flights={flights}
          airports={airports}
          onAdd={handleAddFlight}
          onEdit={handleEditFlight}
          onDelete={handleDeleteFlight}
        />
      </div>
    </div>
  );
};

export default ManageFlightsPage;