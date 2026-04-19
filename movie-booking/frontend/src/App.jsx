import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, Clock, MapPin, ChevronLeft, CheckCircle, Search, User, Menu, Star, Play, Ticket } from 'lucide-react';

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
      <div className="min-h-screen flex items-center justify-center p-4 bg-bg-dark">
        <div className="bg-secondary p-8 rounded-2xl shadow-2xl border border-white/10 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-primary" />
          </div>
          <h2 className="text-3xl font-bold mb-2 text-white italic tracking-tighter uppercase">Đặt vé thành công!</h2>
          <p className="text-text-muted mb-8 leading-relaxed">Cảm ơn {customerInfo.name}. Thông tin vé đã được gửi đến {customerInfo.email}. Chúc bạn xem phim vui vẻ!</p>
          <button
            onClick={() => {
              setSelectedMovie(null);
              setBookingStatus(null);
              setCustomerInfo({ name: '', email: '' });
            }}
            className="w-full btn-primary py-4 text-base uppercase tracking-widest shadow-lg shadow-primary/20"
          >
            Quay lại trang chủ
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-bg-dark selection:bg-primary selection:text-white font-sans antialiased">
      {/* Navbar */}
      <header className="fixed top-0 w-full z-50 bg-bg-dark/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-12">
            <h1
              className="text-2xl font-black tracking-tighter italic cursor-pointer group"
              onClick={() => setSelectedMovie(null)}
            >
              <span className="text-white group-hover:text-primary transition-colors">NOCTURNE</span>
              <span className="text-primary group-hover:text-white transition-colors ml-1">CINEMAS</span>
            </h1>
            <nav className="hidden lg:flex items-center gap-8">
              <span className="nav-link nav-link-active">Phim</span>
              <span className="nav-link">Rạp</span>
              <span className="nav-link">Khuyến mãi</span>
              <span className="nav-link">Thành viên</span>
            </nav>
          </div>
          <div className="flex items-center gap-6">
            <div className="hidden sm:flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full text-text-muted focus-within:border-primary/50 transition-all">
              <Search size={16} />
              <input type="text" placeholder="Tìm kiếm phim..." className="bg-transparent border-none outline-none text-sm text-white w-40" />
            </div>
            <button className="p-2 text-text-muted hover:text-white transition-colors"><User size={20} /></button>
            <button className="lg:hidden p-2 text-text-muted hover:text-white transition-colors"><Menu size={20} /></button>
          </div>
        </div>
      </header>

      <main className="flex-1 pt-20">
        {!selectedMovie ? (
          <>
            {/* Hero Section */}
            <section className="relative h-[85vh] w-full flex items-center overflow-hidden">
              <div className="absolute inset-0 z-0">
                <img
                  src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=2000"
                  className="w-full h-full object-cover scale-105"
                  alt="Hero Background"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-bg-dark via-bg-dark/60 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-transparent to-transparent"></div>
              </div>

              <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-2xl animate-in fade-in slide-in-from-left duration-1000">
                  <div className="flex items-center gap-2 mb-6">
                    <span className="bg-primary/20 text-primary text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-primary/30">Phim nổi bật trong tuần</span>
                    <div className="flex text-accent gap-0.5"><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /></div>
                  </div>
                  <h2 className="text-7xl font-black italic tracking-tighter text-white mb-4 uppercase leading-[0.9]">
                    Neon<br />
                    <span className="text-primary">Eclipse</span>
                  </h2>
                  <p className="text-text-muted text-lg mb-10 leading-relaxed max-w-lg">
                    Bước vào thế giới nơi thực tại mờ nhạt trước chân trời kỹ thuật số. Một hành trình điện ảnh sống động định nghĩa lại bản chất của việc kể chuyện bằng hình ảnh.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    {movies.length > 0 && (
                      <button
                        onClick={() => handleMovieSelect(movies[0])}
                        className="btn-primary flex items-center gap-2 group"
                      >
                        <Ticket size={18} className="group-hover:rotate-12 transition-transform" />
                        Đặt vé ngay
                      </button>
                    )}
                    <button className="btn-glass flex items-center gap-2 group">
                      <Play size={18} className="group-hover:scale-110 transition-transform" />
                      Xem Trailer
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Movies Grid */}
            <section className="py-24 container mx-auto px-6">
              <div className="flex items-end justify-between mb-12">
                <div>
                  <h3 className="text-3xl font-black italic uppercase tracking-tighter text-white">Phim Đang Chiếu</h3>
                  <div className="h-1 w-12 bg-primary mt-2"></div>
                </div>
                <span className="text-primary text-sm font-bold uppercase tracking-widest hover:underline cursor-pointer">Xem Tất Cả</span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                {movies.map(movie => (
                  <div key={movie.id} className="group cursor-pointer" onClick={() => handleMovieSelect(movie)}>
                    <div className="relative aspect-[2/3] overflow-hidden rounded-xl bg-secondary mb-4 ring-1 ring-white/10 group-hover:ring-primary/50 transition-all duration-500">
                      <img
                        src={movie.poster_url}
                        alt={movie.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="movie-card-rating">
                        <Star size={10} fill="currentColor" /> 9.2
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                        <button className="w-full btn-primary py-3 scale-90 group-hover:scale-100 transition-transform">Mua vé nhanh</button>
                      </div>
                    </div>
                    <h4 className="text-white font-bold group-hover:text-primary transition-colors line-clamp-1">{movie.title}</h4>
                    <p className="text-text-muted text-xs mt-1 uppercase tracking-widest">{movie.duration} PHÚT • HÀNH ĐỘNG</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Promotional Section */}
            <section className="pb-24 container mx-auto px-6">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Gourmet Card */}
                <div className="relative group overflow-hidden rounded-3xl h-72 flex items-center">
                  <img
                    src="https://images.unsplash.com/photo-1572177191856-3cde618dee1f?auto=format&fit=crop&q=80&w=800"
                    alt="Popcorn"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/60"></div>
                  <div className="relative z-10 p-10 max-w-sm">
                    <h3 className="text-3xl font-black italic text-accent leading-none mb-4 uppercase tracking-tighter">Gourmet<br/>Experiences</h3>
                    <p className="text-text-muted text-xs mb-8 leading-relaxed">Elevate your viewing with our curated snack menu and artisan beverages.</p>
                    <button className="border border-accent text-accent text-[10px] font-black px-6 py-2.5 rounded-sm uppercase tracking-widest hover:bg-accent hover:text-black transition-all">Explore Menu</button>
                  </div>
                </div>

                {/* Membership Card */}
                <div className="relative group overflow-hidden rounded-3xl h-72 flex items-center bg-gradient-to-br from-rose-600 to-rose-400">
                  <div className="relative z-10 p-10 max-w-sm">
                    <h3 className="text-3xl font-black italic text-white leading-none mb-4 uppercase tracking-tighter">Join The Nocturne<br/>Elite</h3>
                    <p className="text-white/90 text-xs mb-8 leading-relaxed">Get 20% off every booking and access to exclusive preview screenings.</p>
                    <button className="bg-bg-dark text-white text-[10px] font-black px-6 py-2.5 rounded-sm uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-xl">Get Membership</button>
                  </div>
                </div>
              </div>
            </section>

            {/* Coming Soon Section */}
            <section className="py-24 bg-secondary/20 border-t border-white/5">
              <div className="container mx-auto px-6">
                <div className="flex items-center gap-4 mb-16">
                   <div className="h-0.5 w-10 bg-primary"></div>
                   <h3 className="text-2xl font-black italic uppercase tracking-tighter text-white">Coming Soon</h3>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                  {[
                    { title: "The Last Highway", genre: "MYSTERY • THRILLER", date: "OCT 14", img: "https://images.unsplash.com/photo-1533928413348-df45532570d5?auto=format&fit=crop&q=80&w=400" },
                    { title: "Rhythm of Light", genre: "MUSIC • DRAMA", date: "OCT 28", img: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?auto=format&fit=crop&q=80&w=400" },
                    { title: "Cinema Paradiso", genre: "DOCUMENTARY", date: "NOV 05", img: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=400" },
                    { title: "Project Genesis", genre: "SCI-FI • HORROR", date: "NOV 12", img: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=400" },
                    { title: "After The Fall", genre: "ROMANCE", date: "NOV 20", img: "https://images.unsplash.com/photo-1514306191717-452ec28c7814?auto=format&fit=crop&q=80&w=400" },
                  ].map((movie, i) => (
                    <div key={i} className="group">
                      <div className="relative aspect-[3/4] overflow-hidden rounded-xl grayscale group-hover:grayscale-0 transition-all duration-700 mb-5 ring-1 ring-white/5 shadow-2xl">
                        <img src={movie.img} alt={movie.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm text-black text-[9px] font-black px-2 py-1 rounded-sm shadow-xl">
                          {movie.date}
                        </div>
                      </div>
                      <h4 className="text-white text-sm font-bold mb-1 group-hover:text-primary transition-colors">{movie.title}</h4>
                      <p className="text-[9px] text-text-muted font-bold tracking-[0.15em] uppercase">{movie.genre}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </>
        ) : (
          <section className="py-12 container mx-auto px-6">
            <button
              onClick={() => setSelectedMovie(null)}
              className="flex items-center gap-2 text-text-muted hover:text-white mb-10 transition-colors group uppercase text-xs font-bold tracking-widest"
            >
              <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Quay lại danh sách phim
            </button>

            <div className="flex flex-col lg:flex-row gap-16">
              <div className="lg:w-1/3">
                <div className="sticky top-32">
                  <div className="relative aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10 mb-8">
                    <img src={selectedMovie.poster_url} alt={selectedMovie.title} className="w-full h-full object-cover" />
                  </div>
                  <h2 className="text-4xl font-black italic uppercase tracking-tighter text-white mb-4 leading-none">{selectedMovie.title}</h2>
                  <div className="flex items-center gap-4 text-text-muted text-sm mb-6">
                    <span className="flex items-center gap-1"><Clock size={14} /> {selectedMovie.duration} phút</span>
                    <span className="flex items-center gap-1 font-bold text-accent"><Star size={14} fill="currentColor" /> 9.2/10</span>
                  </div>
                  <p className="text-text-muted leading-relaxed text-sm italic border-l-2 border-primary pl-4">{selectedMovie.description}</p>
                </div>
              </div>

              <div className="lg:w-2/3">
                <div className="bg-secondary/40 backdrop-blur-md p-10 rounded-3xl ring-1 ring-white/5">
                  <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
                    <Calendar className="text-primary" size={20} /> Chọn Suất Chiếu
                  </h3>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
                    {showtimes.map(st => (
                      <button
                        key={st.id}
                        onClick={() => handleShowtimeSelect(st)}
                        className={`group p-4 rounded-2xl border transition-all text-left ${
                          selectedShowtime?.id === st.id
                          ? 'border-primary bg-primary/10 ring-1 ring-primary'
                          : 'border-white/10 bg-white/5 hover:border-white/30'
                        }`}
                      >
                        <div className={`text-lg font-bold mb-1 ${selectedShowtime?.id === st.id ? 'text-primary' : 'text-white'}`}>
                          {st.start_time.split(' ')[1].substring(0, 5)}
                        </div>
                        <div className="text-[10px] text-text-muted uppercase tracking-widest font-bold flex items-center gap-1">
                          <MapPin size={10} /> {st.hall}
                        </div>
                      </button>
                    ))}
                  </div>

                  {selectedShowtime && (
                    <div className="animate-in fade-in slide-in-from-bottom duration-700">
                      <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-3 border-t border-white/5 pt-12">
                        <Ticket className="text-primary" size={20} /> Chọn Ghế Của Bạn
                      </h3>

                      <div className="mb-12">
                        <div className="w-full h-2 bg-gradient-to-t from-primary/30 to-transparent rounded-full mb-4 shadow-[0_-10px_20px_-5px_rgba(244,63,94,0.3)]"></div>
                        <p className="text-center text-[10px] text-primary font-black uppercase tracking-[0.3em] mb-12">MÀN HÌNH</p>

                        <div className="grid grid-cols-8 gap-3 max-w-md mx-auto mb-10">
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
                                  className={`aspect-square rounded-lg text-[10px] font-bold transition-all flex items-center justify-center ${
                                    isBooked
                                    ? 'bg-white/5 text-white/10 cursor-not-allowed border border-transparent'
                                    : isSelected
                                    ? 'bg-primary text-white shadow-lg shadow-primary/30 scale-110 border border-primary'
                                    : 'bg-white/10 text-text-muted hover:bg-white/20 hover:text-white border border-white/5'
                                  }`}
                                >
                                  {seatId}
                                </button>
                              );
                            })
                          )}
                        </div>

                        <div className="flex justify-center gap-8 text-[9px] font-bold uppercase tracking-widest text-text-muted">
                          <div className="flex items-center gap-2"><div className="w-3 h-3 bg-white/10 rounded-sm border border-white/5"></div> Còn trống</div>
                          <div className="flex items-center gap-2"><div className="w-3 h-3 bg-primary rounded-sm shadow-sm shadow-primary/30"></div> Đang chọn</div>
                          <div className="flex items-center gap-2"><div className="w-3 h-3 bg-white/5 rounded-sm"></div> Đã đặt</div>
                        </div>
                      </div>

                      {selectedSeat && (
                        <div className="bg-bg-dark p-8 rounded-3xl border border-primary/20 shadow-2xl animate-in zoom-in duration-500 max-w-md mx-auto">
                          <h4 className="text-center font-black text-white italic uppercase mb-8 tracking-tighter text-xl">Xác nhận đặt vé</h4>
                          <form onSubmit={handleBooking} className="space-y-6">
                            <div>
                              <label className="block text-[10px] font-black text-text-muted uppercase tracking-[0.2em] mb-2">Họ tên khách hàng</label>
                              <input
                                required
                                type="text"
                                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                value={customerInfo.name}
                                onChange={e => setCustomerInfo({...customerInfo, name: e.target.value})}
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-black text-text-muted uppercase tracking-[0.2em] mb-2">Địa chỉ Email</label>
                              <input
                                required
                                type="email"
                                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                value={customerInfo.email}
                                onChange={e => setCustomerInfo({...customerInfo, email: e.target.value})}
                              />
                            </div>
                            <div className="bg-white/5 p-4 rounded-xl border border-white/5 mb-8">
                              <div className="flex justify-between text-xs mb-1"><span className="text-text-muted">Ghế</span> <span className="text-white font-bold">{selectedSeat}</span></div>
                              <div className="flex justify-between text-xs"><span className="text-text-muted">Giá vé</span> <span className="text-primary font-bold">{(selectedShowtime.price).toLocaleString()}đ</span></div>
                            </div>
                            <button className="w-full btn-primary py-4 text-sm uppercase tracking-[0.2em] shadow-xl shadow-primary/20">
                              Hoàn tất thanh toán
                            </button>
                          </form>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-secondary/40 border-t border-white/5 py-16 mt-24 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-black tracking-tighter italic mb-6">
            <span className="text-white">NOCTURNE</span>
            <span className="text-primary ml-1">CINEMAS</span>
          </h2>
          <p className="text-text-muted text-sm max-w-xl mx-auto mb-10 leading-relaxed">
            Nâng tầm trải nghiệm điện ảnh của bạn với công nghệ tiên tiến và sự thoải mái tối đa. Khám phá phép màu của điện ảnh trong một góc nhìn hoàn toàn mới.
          </p>
          <div className="flex justify-center gap-10 text-[10px] font-black uppercase tracking-[0.2em] text-text-muted border-t border-white/5 pt-10">
            <span className="hover:text-primary cursor-pointer transition-colors">Điều khoản sử dụng</span>
            <span className="hover:text-primary cursor-pointer transition-colors">Chính sách bảo mật</span>
            <span className="hover:text-primary cursor-pointer transition-colors">Liên hệ</span>
          </div>
          <p className="mt-10 text-[9px] text-white/20 uppercase tracking-[0.3em]">© 2024 Hệ thống rạp chiếu phim Nocturne</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
