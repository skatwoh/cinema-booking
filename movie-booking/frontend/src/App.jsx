import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Film, Calendar, Clock, MapPin, ChevronLeft, CheckCircle, Search, User, Menu } from 'lucide-react';

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
    window.scrollTo(0, 0);
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
      <div className="min-h-screen flex items-center justify-center p-4 bg-[#fdfcf0]">
        <div className="bg-white p-8 rounded-lg shadow-xl border border-gray-200 max-w-md w-full text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2 text-gray-800">Đặt vé thành công!</h2>
          <p className="text-gray-600 mb-6">Cảm ơn {customerInfo.name}. Thông tin vé đã được gửi đến {customerInfo.email}.</p>
          <button
            onClick={() => {
              setSelectedMovie(null);
              setBookingStatus(null);
              setCustomerInfo({ name: '', email: '' });
            }}
            className="w-full bg-[#e71a0f] hover:bg-[#c4160d] text-white py-3 rounded font-bold transition"
          >
            Quay lại trang chủ
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header CGV Style */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-20 flex justify-between items-center">
          <div className="flex items-center gap-8">
            <h1
              className="text-4xl font-black text-[#e71a0f] cursor-pointer tracking-tighter"
              onClick={() => setSelectedMovie(null)}
            >
              CGV
            </h1>
            <nav className="hidden md:flex gap-6 font-bold text-gray-700 uppercase text-sm">
              <a href="#" className="hover:text-[#e71a0f]">Lịch chiếu</a>
              <a href="#" className="hover:text-[#e71a0f]">Phim</a>
              <a href="#" className="hover:text-[#e71a0f]">Rạp</a>
              <a href="#" className="hover:text-[#e71a0f]">Thành viên</a>
            </nav>
          </div>
          <div className="flex items-center gap-4 text-gray-600">
            <Search size={20} className="cursor-pointer hover:text-[#e71a0f]" />
            <User size={20} className="cursor-pointer hover:text-[#e71a0f]" />
            <Menu size={20} className="md:hidden cursor-pointer" />
          </div>
        </div>
      </header>

      <main className="flex-1">
        {!selectedMovie ? (
          <>
            {/* Hero Banner Placeholder */}
            <div className="bg-black w-full h-[400px] relative overflow-hidden hidden md:block">
              <img
                src="https://image.tmdb.org/t/p/original/t6Sna4_Y7LfaZ1Iolv3ZqZp9ZpP.jpg"
                className="w-full h-full object-cover opacity-60"
                alt="Banner"
              />
              <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-4">
                <h2 className="text-5xl font-bold mb-4">Avatar: The Way of Water</h2>
                <p className="text-xl max-w-2xl text-center mb-8">Trải nghiệm siêu phẩm điện ảnh đỉnh cao tại CGV.</p>
                {movies.length > 0 && (
                  <button
                    onClick={() => handleMovieSelect(movies[0])}
                    className="bg-[#e71a0f] text-white px-8 py-3 font-bold rounded uppercase hover:bg-white hover:text-[#e71a0f] transition"
                  >
                    Đặt vé ngay
                  </button>
                )}
              </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 py-12">
              <div className="flex items-center gap-4 mb-8 border-b-2 border-gray-800 pb-2">
                <h2 className="text-2xl font-bold uppercase tracking-widest border-b-4 border-[#e71a0f] pb-2 -mb-[10px]">Phim đang chiếu</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {movies.map(movie => (
                  <div key={movie.id} className="group">
                    <div className="relative overflow-hidden rounded shadow-lg bg-black aspect-[2/3]">
                      <img
                        src={movie.poster_url}
                        alt={movie.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-500 opacity-90 group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                        <button
                          onClick={() => handleMovieSelect(movie)}
                          className="bg-[#e71a0f] text-white px-6 py-2 font-bold rounded uppercase border border-[#e71a0f] hover:bg-transparent transition"
                        >
                          Mua vé
                        </button>
                      </div>
                    </div>
                    <div className="mt-4 text-center">
                      <h3 className="text-lg font-bold text-gray-800 truncate px-2">{movie.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">{movie.duration} phút</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="max-w-6xl mx-auto px-4 py-8">
            <button
              onClick={() => setSelectedMovie(null)}
              className="flex items-center text-gray-500 hover:text-[#e71a0f] mb-8 font-bold transition uppercase text-sm"
            >
              <ChevronLeft size={18} /> Quay lại
            </button>

            <div className="bg-white rounded shadow-md overflow-hidden border border-gray-200">
              <div className="bg-[#333333] text-white p-4">
                <h2 className="text-xl font-bold uppercase tracking-wider">{selectedMovie.title}</h2>
              </div>

              <div className="p-6 flex flex-col md:flex-row gap-8">
                <img
                  src={selectedMovie.poster_url}
                  alt={selectedMovie.title}
                  className="w-full md:w-64 aspect-[2/3] object-cover rounded shadow-md border-4 border-white"
                />

                <div className="flex-1">
                  <div className="mb-8">
                    <h3 className="text-sm font-bold text-gray-400 uppercase mb-2 border-b border-gray-100 pb-1">Nội dung phim</h3>
                    <p className="text-gray-700 leading-relaxed text-sm italic">{selectedMovie.description}</p>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-sm font-bold text-gray-400 uppercase mb-4 border-b border-gray-100 pb-1">Chọn suất chiếu</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {showtimes.map(st => (
                        <button
                          key={st.id}
                          onClick={() => handleShowtimeSelect(st)}
                          className={`py-2 px-3 rounded border transition text-sm font-bold ${
                            selectedShowtime?.id === st.id
                            ? 'border-[#e71a0f] bg-[#e71a0f] text-white'
                            : 'border-gray-300 hover:border-[#e71a0f] text-gray-700'
                          }`}
                        >
                          <div>{st.start_time.split(' ')[1].substring(0, 5)}</div>
                          <div className={selectedShowtime?.id === st.id ? 'text-white/80 text-[10px]' : 'text-gray-400 text-[10px]'}>{st.hall}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {selectedShowtime && (
                    <div className="mt-8 border-t border-gray-100 pt-8 animate-in fade-in duration-500">
                      <div className="text-center mb-8">
                        <div className="inline-block bg-[#eeeeee] px-12 py-1 text-xs font-bold text-gray-500 rounded uppercase">Màn hình</div>
                        <div className="h-1 w-full max-w-md mx-auto bg-gray-300 mt-2 shadow-sm"></div>
                      </div>

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
                                className={`h-8 w-8 rounded text-[10px] font-bold transition flex items-center justify-center
                                  ${isBooked ? 'bg-[#333333] text-gray-500 cursor-not-allowed' :
                                    isSelected ? 'bg-[#e71a0f] text-white shadow-lg scale-110' :
                                    'bg-white border border-gray-300 hover:border-[#e71a0f] text-gray-700'}`}
                              >
                                {seatId}
                              </button>
                            );
                          })
                        )}
                      </div>

                      <div className="flex justify-center gap-6 mb-8 text-[10px] font-bold uppercase text-gray-500">
                        <div className="flex items-center gap-2"><div className="w-3 h-3 bg-white border border-gray-300 rounded"></div> Trống</div>
                        <div className="flex items-center gap-2"><div className="w-3 h-3 bg-[#e71a0f] rounded"></div> Đang chọn</div>
                        <div className="flex items-center gap-2"><div className="w-3 h-3 bg-[#333333] rounded"></div> Đã đặt</div>
                      </div>

                      {selectedSeat && (
                        <form onSubmit={handleBooking} className="max-w-md mx-auto bg-[#fdfcf0] p-6 rounded border-2 border-[#e71a0f] shadow-lg">
                          <h4 className="text-center font-bold text-[#e71a0f] uppercase mb-4 tracking-tighter">Thông tin đặt vé</h4>
                          <div className="mb-4">
                            <label htmlFor="name" className="block text-xs font-bold text-gray-500 uppercase mb-1">Họ tên</label>
                            <input
                              id="name"
                              required
                              type="text"
                              className="w-full bg-white border border-gray-300 rounded p-2 text-sm focus:outline-none focus:border-[#e71a0f]"
                              value={customerInfo.name}
                              onChange={e => setCustomerInfo({...customerInfo, name: e.target.value})}
                            />
                          </div>
                          <div className="mb-6">
                            <label htmlFor="email" className="block text-xs font-bold text-gray-500 uppercase mb-1">Email</label>
                            <input
                              id="email"
                              required
                              type="email"
                              className="w-full bg-white border border-gray-300 rounded p-2 text-sm focus:outline-none focus:border-[#e71a0f]"
                              value={customerInfo.email}
                              onChange={e => setCustomerInfo({...customerInfo, email: e.target.value})}
                            />
                          </div>
                          <button className="w-full bg-[#e71a0f] hover:bg-[#c4160d] text-white py-3 rounded font-bold transition uppercase tracking-widest shadow-md">
                            Thanh toán {(selectedShowtime.price).toLocaleString()}đ
                          </button>
                        </form>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-[#333333] text-white py-12 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black text-[#e71a0f] mb-4">CGV</h2>
          <p className="text-gray-400 text-sm max-w-xl mx-auto mb-8">
            Hệ thống rạp chiếu phim chất lượng nhất Việt Nam. Mang đến trải nghiệm điện ảnh chân thực và sống động.
          </p>
          <div className="flex justify-center gap-8 text-gray-400 text-xs uppercase font-bold border-t border-gray-700 pt-8">
            <a href="#" className="hover:text-white">Điều khoản sử dụng</a>
            <a href="#" className="hover:text-white">Chính sách bảo mật</a>
            <a href="#" className="hover:text-white">Liên hệ</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
