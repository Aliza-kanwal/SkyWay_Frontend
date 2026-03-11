import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCouch, FaChair, FaWheelchair, FaQuestion } from 'react-icons/fa';
import Card from '../ui/Card';

const SeatMap = ({ flightId, onSeatSelect, maxSeats = 1, bookedSeats = [] }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);

  // Mock seat layout - 10 rows, 6 columns
  const rows = 10;
  const columns = ['A', 'B', 'C', 'D', 'E', 'F'];
  
  // Mock seat types
  const seatTypes = {
    economy: { price: 0, icon: FaCouch, color: 'blue' },
    premium: { price: 50, icon: FaChair, color: 'purple' },
    business: { price: 100, icon: FaChair, color: 'amber' }
  };

  const getSeatType = (row, col) => {
    if (row <= 2) return 'business';
    if (row <= 4) return 'premium';
    return 'economy';
  };

  const getSeatPrice = (row, col) => {
    const type = getSeatType(row, col);
    return seatTypes[type].price;
  };

  const isSeatBooked = (row, col) => {
    const seatId = `${row}${col}`;
    return bookedSeats.includes(seatId);
  };

  const isSeatSelected = (row, col) => {
    const seatId = `${row}${col}`;
    return selectedSeats.includes(seatId);
  };

  const handleSeatClick = (row, col) => {
    const seatId = `${row}${col}`;
    
    if (isSeatBooked(row, col)) return;

    setSelectedSeats(prev => {
      if (prev.includes(seatId)) {
        const newSeats = prev.filter(s => s !== seatId);
        onSeatSelect?.(newSeats);
        return newSeats;
      }
      
      if (prev.length < maxSeats) {
        const newSeats = [...prev, seatId];
        onSeatSelect?.(newSeats);
        return newSeats;
      }
      
      return prev;
    });
  };

  const getSeatColor = (row, col) => {
    if (isSeatBooked(row, col)) return 'bg-gray-300 text-gray-500 cursor-not-allowed';
    if (isSeatSelected(row, col)) return 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white';
    
    const type = getSeatType(row, col);
    switch(type) {
      case 'business':
        return 'bg-amber-100 border-amber-300 hover:bg-amber-200';
      case 'premium':
        return 'bg-purple-100 border-purple-300 hover:bg-purple-200';
      default:
        return 'bg-white border-blue-200 hover:bg-blue-50';
    }
  };

  return (
    <Card className="p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Select Your Seats</h3>
        <div className="flex items-center space-x-6 text-sm">
          <div className="flex items-center">
            <div className="w-6 h-6 bg-white border-2 border-blue-200 rounded mr-2"></div>
            <span>Economy (+$0)</span>
          </div>
          <div className="flex items-center">
            <div className="w-6 h-6 bg-purple-100 border-2 border-purple-300 rounded mr-2"></div>
            <span>Premium (+$50)</span>
          </div>
          <div className="flex items-center">
            <div className="w-6 h-6 bg-amber-100 border-2 border-amber-300 rounded mr-2"></div>
            <span>Business (+$100)</span>
          </div>
          <div className="flex items-center">
            <div className="w-6 h-6 bg-gray-300 rounded mr-2"></div>
            <span>Booked</span>
          </div>
        </div>
      </div>

      {/* Aircraft Layout */}
      <div className="relative">
        {/* Aircraft Nose */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-800 text-white px-8 py-2 rounded-t-2xl text-sm">
            ✈️ Front of Aircraft
          </div>
        </div>

        {/* Seat Grid */}
        <div className="bg-gray-50 p-6 rounded-2xl">
          {Array.from({ length: rows }, (_, rowIndex) => {
            const row = rowIndex + 1;
            return (
              <div key={row} className="flex items-center mb-2">
                <span className="w-8 text-sm font-medium text-gray-500">{row}</span>
                <div className="flex flex-1 justify-center space-x-2">
                  {columns.map((col) => {
                    const type = getSeatType(row, col);
                    const price = getSeatPrice(row, col);
                    const SeatIcon = seatTypes[type].icon;
                    
                    return (
                      <motion.button
                        key={`${row}${col}`}
                        whileHover={!isSeatBooked(row, col) ? { scale: 1.1 } : {}}
                        whileTap={!isSeatBooked(row, col) ? { scale: 0.95 } : {}}
                        onClick={() => handleSeatClick(row, col)}
                        disabled={isSeatBooked(row, col)}
                        className={`w-10 h-10 rounded-xl border-2 flex items-center justify-center
                                 transition-all duration-200 relative group ${getSeatColor(row, col)}`}
                      >
                        <SeatIcon className="text-sm" />
                        
                        {/* Price Tooltip */}
                        {!isSeatBooked(row, col) && price > 0 && (
                          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 
                                        bg-gray-800 text-white text-xs py-1 px-2 rounded 
                                        opacity-0 group-hover:opacity-100 transition-opacity
                                        whitespace-nowrap">
                            +${price}
                          </div>
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Aircraft Tail */}
        <div className="flex justify-center mt-4">
          <div className="bg-gray-800 text-white px-8 py-2 rounded-b-2xl text-sm">
            Rear of Aircraft
          </div>
        </div>
      </div>

      {/* Selected Seats Summary */}
      {selectedSeats.length > 0 && (
        <div className="mt-6 p-4 bg-blue-50 rounded-xl">
          <p className="text-sm text-gray-600 mb-2">Selected Seats:</p>
          <div className="flex flex-wrap gap-2">
            {selectedSeats.map(seat => (
              <span key={seat} className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm font-medium">
                {seat}
              </span>
            ))}
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Total Seat Price: ${selectedSeats.reduce((sum, seat) => {
              const row = parseInt(seat[0]);
              const col = seat[1];
              return sum + getSeatPrice(row, col);
            }, 0)}
          </p>
        </div>
      )}
    </Card>
  );
};

export default SeatMap;