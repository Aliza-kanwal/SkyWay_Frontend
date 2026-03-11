import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AirportTable from '../../components/admin/AirportTable';
import { getAirports, createAirport, updateAirport, deleteAirport } from '../../services/api/airportAPI';
import toast from 'react-hot-toast';

const ManageAirportsPage = () => {
  const [airports, setAirports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAirports();
  }, []);

  const loadAirports = async () => {
    try {
      const data = await getAirports();
      setAirports(data);
    } catch (error) {
      toast.error('Failed to load airports');
    } finally {
      setLoading(false);
    }
  };

  const handleAddAirport = async (airportData) => {
    try {
      await createAirport(airportData);
      toast.success('Airport added successfully');
      loadAirports();
    } catch (error) {
      toast.error('Failed to add airport');
    }
  };

  const handleEditAirport = async (airportData) => {
    try {
      await updateAirport(airportData.id, airportData);
      toast.success('Airport updated successfully');
      loadAirports();
    } catch (error) {
      toast.error('Failed to update airport');
    }
  };

  const handleDeleteAirport = async (id) => {
    if (window.confirm('Are you sure you want to delete this airport?')) {
      try {
        await deleteAirport(id);
        toast.success('Airport deleted successfully');
        loadAirports();
      } catch (error) {
        toast.error('Failed to delete airport');
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
          <h1 className="text-3xl font-bold text-gray-800">Manage Airports</h1>
          <p className="text-gray-600">Add, edit, or remove airports from the system</p>
        </div>

        <AirportTable
          airports={airports}
          onAdd={handleAddAirport}
          onEdit={handleEditAirport}
          onDelete={handleDeleteAirport}
        />
      </div>
    </div>
  );
};

export default ManageAirportsPage;