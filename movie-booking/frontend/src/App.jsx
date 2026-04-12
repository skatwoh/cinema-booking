import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Film, Calendar, Clock, MapPin, ChevronLeft, CheckCircle } from 'lucide-react';

const API_BASE_URL = 'http://localhost:8000/api';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showtimes, setShowtimes] = useState([]);
  const [selectedShowtime, setSelectedShowtime] = useState(null);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [bookingStatus, setBookingStatus] = useState(null);
  const [customerInfo, setCustomerInfo] = useState({ name: '', email: '' });

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/movies`);
      setMovies(response.data);
    } catch (error) {
      console.error("Error fetching movies", error);
    }
  };

  const fetchShowtimes = async (movieId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/showtimes/${movieId}`);
      setShowtimes(response.data);
    } catch (error) {
      console.error("Error fetching showtimes", error);
    }
  };

  const fetchBookedSeats = async (showtimeId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/bookings/${showtimeId}`);
      setBookedSeats(response.data);
    } catch (error) {
      console.error("Error fetching booked seats", error);
    }
  };

  const handleMovieSelect = (movie) => {
    setSelectedMovie(movie);
    fetchShowtimes(movie.id);
    setSelectedShowtime(null);
    setSelectedSeat(null);
    setBookingStatus(null);
  };

  const handleShowtimeSelect = (showtime) => {
    setSelectedShowtime(showtime);
    fetchBookedSeats(showtime.id);
    setSelectedSeat(null);
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/bookings`, {
        showtime_id: selectedShowtime.id,
        seat_number: selectedSeat,
        customer_name: customerInfo.name,
        customer_email: customerInfo.email
      });
      setBookingStatus('success');
    } catch (error) {
      console.error("Booking failed", error);
      setBookingStatus('error');
    }
  };

  if (bookingStatus === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-gray-800 p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Đặt vé thành công!</h2>
          <p className="text-gray-400 mb-6">Cảm ơn {customerInfo.name}. Thông tin vé đã được gửi đến {customerInfo.email}.</p>
          <button
            onClick={() => {
              setSelectedMovie(null);
              setBookingStatus(null);
              setCustomerInfo({ name: '', email: '' });
            }}
            className="w-full bg-indigo-600 hover:bg-indigo-700 py-3 rounded-lg font-semibold transition"
          >
            Quay lại trang chủ
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <header className="max-w-6xl mx-auto mb-12 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-indigo-500 flex items-center gap-2">
          <Film /> MovieBooking
        </h1>
      </header>

      <main className="max-w-6xl mx-auto">
        {!selectedMovie ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {movies.map(movie => (
              <div
                key={movie.id}
                className="bg-gray-800 rounded-xl overflow-hidden shadow-lg cursor-pointer transform hover:scale-105 transition"
                onClick={() => handleMovieSelect(movie)}
              >
                <img src={movie.poster_url} alt={movie.title} className="w-full h-96 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-2">{movie.title}</h3>
                  <div className="flex items-center text-gray-400 text-sm gap-4">
                    <span className="flex items-center gap-1"><Clock size={14}/> {movie.duration} phút</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-800 rounded-2xl p-6 md:p-8 shadow-2xl">
            <button
              onClick={() => setSelectedMovie(null)}
              className="flex items-center text-gray-400 hover:text-white mb-6 transition"
            >
              <ChevronLeft /> Quay lại
            </button>

            <div className="flex flex-col md:flex-row gap-8">
              <img src={selectedMovie.poster_url} alt={selectedMovie.title} className="w-full md:w-64 h-96 object-cover rounded-xl shadow-lg" />
              <div className="flex-1">
                <h2 className="text-3xl font-bold mb-4">{selectedMovie.title}</h2>
                <p className="text-gray-400 mb-6 leading-relaxed">{selectedMovie.description}</p>

                <h3 className="text-xl font-semibold mb-4">Chọn suất chiếu</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
                  {showtimes.map(st => (
                    <button
                      key={st.id}
                      onClick={() => handleShowtimeSelect(st)}
                      className={`p-3 rounded-lg border-2 transition ${
                        selectedShowtime?.id === st.id
                        ? 'border-indigo-500 bg-indigo-500/10'
                        : 'border-gray-700 hover:border-gray-600'
                      }`}
                    >
                      <div className="font-bold">{st.start_time.split(' ')[1]}</div>
                      <div className="text-xs text-gray-400">{st.hall}</div>
                      <div className="text-sm text-indigo-400 font-semibold">{st.price.toLocaleString()}đ</div>
                    </button>
                  ))}
                </div>

                {selectedShowtime && (
                  <div className="animate-fade-in">
                    <h3 className="text-xl font-semibold mb-4 text-center">Chọn ghế (Màn hình ở đây)</h3>
                    <div className="w-full h-2 bg-indigo-500/50 rounded-full mb-8 shadow-[0_0_15px_rgba(99,102,241,0.5)]"></div>

                    <div className="grid grid-cols-8 gap-2 mb-8 max-w-sm mx-auto">
                      {['A', 'B', 'C', 'D'].map(row =>
                        [1, 2, 3, 4, 5, 6, 7, 8].map(num => {
                          const seatId = `${row}${num}`;
                          const isBooked = bookedSeats.includes(seatId);
                          const isSelected = selectedSeat === seatId;

                          return (
                            <button
                              key={seatId}
                              disabled={isBooked}
                              onClick={() => setSelectedSeat(seatId)}
                              className={`h-8 w-8 rounded-md text-[10px] font-bold transition flex items-center justify-center
                                ${isBooked ? 'bg-gray-700 text-gray-500 cursor-not-allowed' :
                                  isSelected ? 'bg-indigo-500 text-white' :
                                  'bg-gray-600 hover:bg-gray-500 text-gray-300'}`}
                            >
                              {seatId}
                            </button>
                          );
                        })
                      )}
                    </div>

                    {selectedSeat && (
                      <form onSubmit={handleBooking} className="max-w-sm mx-auto bg-gray-900/50 p-6 rounded-xl border border-gray-700">
                        <div className="mb-4">
                          <label htmlFor="name" className="block text-sm text-gray-400 mb-1">Họ tên</label>
                          <input
                            id="name"
                            required
                            type="text"
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 focus:outline-none focus:border-indigo-500"
                            value={customerInfo.name}
                            onChange={e => setCustomerInfo({...customerInfo, name: e.target.value})}
                          />
                        </div>
                        <div className="mb-6">
                          <label htmlFor="email" className="block text-sm text-gray-400 mb-1">Email</label>
                          <input
                            id="email"
                            required
                            type="email"
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 focus:outline-none focus:border-indigo-500"
                            value={customerInfo.email}
                            onChange={e => setCustomerInfo({...customerInfo, email: e.target.value})}
                          />
                        </div>
                        <button className="w-full bg-indigo-600 hover:bg-indigo-700 py-3 rounded-lg font-bold transition">
                          Thanh toán {(selectedShowtime.price).toLocaleString()}đ
                        </button>
                      </form>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
