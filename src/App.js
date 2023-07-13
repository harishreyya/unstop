import { useState } from 'react';
import "./App.css"


const App = () => {
  const [seats, setSeats] = useState(Array(80).fill(false));
  const [numSeats, setNumSeats] = useState('');

  const handleSeatReservation = () => {
    const seatsToBook = parseInt(numSeats, 10);
    if (seatsToBook <= 0 || isNaN(seatsToBook)) {
      alert('Please enter a valid number of seats.');
      return;
    }

    if (seatsToBook > 7) {
      alert('You can only book up to 7 seats at a time.');
      return;
    }

    const findAvailableSeatsInRow = (rowStart, rowEnd, numSeats) => {
      let startIndex = -1;
      for (let i = rowStart; i <= rowEnd; i++) {
        let seatsAvailable = true;
        for (let j = i; j < i + numSeats; j++) {
          if (seats[j]) {
            seatsAvailable = false;
            break;
          }
        }
        if (seatsAvailable) {
          startIndex = i;
          break;
        }
      }
      return startIndex;
    };

    const startSeatIndex = findAvailableSeatsInRow(0, 6, seatsToBook);
    if (startSeatIndex !== -1) {
      const updatedSeats = [...seats];
      for (let i = startSeatIndex; i < startSeatIndex + seatsToBook; i++) {
        updatedSeats[i] = true;
      }
      setSeats(updatedSeats);
      setNumSeats('');
      return;
    }

    for (let i = 0; i < 80; i++) {
      if (!seats[i]) {
        let j = i;
        let count = 0;
        while (j < 80 && !seats[j]) {
          count++;
          if (count === seatsToBook) {
            break;
          }
          j++;
        }
        if (count === seatsToBook) {
          const updatedSeats = [...seats];
          for (let k = i; k < i + seatsToBook; k++) {
            updatedSeats[k] = true;
          }
          setSeats(updatedSeats);
          setNumSeats('');
          break;
        }
      }
    }
  };

  const handleResetSeats = () => {
    setSeats(Array(80).fill(false));
    setNumSeats('');
  };

  const getSeatName = (seatIndex) => {
    const rowNumber = Math.floor(seatIndex / 7) + 1;
    const seatNumber = seatIndex % 7 + 1;
    return `Row ${rowNumber}, Seat ${seatNumber}`;
  };

  return (
    <div>
      <h2>Coach</h2>
      <div className="seats">
        {seats.map((isReserved, index) => (
          <div
            key={index}
            className={`seat ${isReserved ? 'reserved' : 'available'}`}
          >
            {getSeatName(index)}
          </div>
        ))}
      </div>
      <div>
        <input
          type="number"
          value={numSeats}
          onChange={(e) => setNumSeats(e.target.value)}
          placeholder="Enter number of seats"
        />
        <button onClick={handleSeatReservation}>Reserve Seats</button>
        <button onClick={handleResetSeats}>Reset Seats</button>
      </div>
    </div>
  );
};

export default App;