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
      const [flightsData, airportsData] = await Promise.all([
        getFlights({}),
        getAirports()
      ]);
      setFlights(flightsData);
      setAirports(airportsData);
    } catch (error) {
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleAddFlight = async (flightData) => {
    try {
      await createFlight(flightData);
      toast.success('Flight added successfully');
      loadData();
    } catch (error) {
      toast.error('Failed to add flight');
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