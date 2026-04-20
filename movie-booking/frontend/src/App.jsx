import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Calendar, Clock, MapPin, ChevronLeft, CheckCircle, Search,
  User, Menu, Star, Play, Ticket, Bell, ChevronDown,
  Volume2, Film, Share2
} from 'lucide-react';

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
  const [selectedDate, setSelectedDate] = useState('OCT 24');

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/movies`);
      setMovies(response.data);
      if (response.data.length > 0 && !selectedMovie) {
        handleMovieSelect(response.data[0]);
      }
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
    if (movie) {
      fetchShowtimes(movie.id);
    }
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
          <h2 className="text-3xl font-bold mb-2 text-white italic tracking-tighter uppercase">ĐẶT VÉ THÀNH CÔNG!</h2>
          <p className="text-text-muted mb-8 leading-relaxed">Cảm ơn {customerInfo.name}. Thông tin vé đã được gửi đến {customerInfo.email}. Chúc bạn xem phim vui vẻ!</p>
          <button
            onClick={() => {
              setBookingStatus(null);
              setCustomerInfo({ name: '', email: '' });
              if (movies.length > 0) {
                handleMovieSelect(movies[0]);
              } else {
                setSelectedMovie(null);
                setSelectedShowtime(null);
                setSelectedSeat(null);
              }
            }}
            className="w-full btn-primary py-4 text-base uppercase tracking-widest shadow-lg shadow-primary/20"
          >
            QUAY LẠI TRANG CHỦ
          </button>
        </div>
      </div>
    );
  }

  const dates = [
    { day: '24', month: 'OCT', weekday: 'TODAY' },
    { day: '25', month: 'OCT', weekday: 'FRI' },
    { day: '26', month: 'OCT', weekday: 'SAT' },
    { day: '27', month: 'OCT', weekday: 'SUN' },
    { day: '28', month: 'OCT', weekday: 'MON' },
  ];

  const groupedShowtimes = showtimes.reduce((acc, showtime) => {
    const hall = showtime.hall;
    if (!acc[hall]) acc[hall] = [];
    acc[hall].push(showtime);
    return acc;
  }, {});

  return (
    <div className="min-h-screen flex flex-col bg-bg-dark selection:bg-primary selection:text-white font-sans antialiased">
      {/* Navbar */}
      <header className="fixed top-0 w-full z-50 bg-bg-dark/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-12">
            <h1
              className="text-xl font-black tracking-tighter cursor-pointer group"
              onClick={() => setSelectedMovie(null)}
            >
              <span className="text-primary group-hover:text-white transition-colors">NOCTURNE</span>
              <span className="text-white group-hover:text-primary transition-colors ml-2">CINEMAS</span>
            </h1>
            <nav className="hidden lg:flex items-center gap-6">
              <span className="nav-link nav-link-active">Phim</span>
              <span className="nav-link">Rạp</span>
              <span className="nav-link">Ưu đãi</span>
            </nav>
          </div>
          <div className="flex items-center gap-6">
            <div className="hidden sm:flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full text-text-muted focus-within:border-primary/50 transition-all">
              <Search size={14} />
              <input type="text" placeholder="Tìm kiếm phim..." className="bg-transparent border-none outline-none text-xs text-white w-48" />
            </div>
            <button className="p-2 text-text-muted hover:text-white transition-colors relative">
              <Bell size={18} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-bg-dark"></span>
            </button>
            <button className="flex items-center gap-2 p-1 pl-1 pr-3 rounded-full hover:bg-white/5 transition-colors border border-transparent hover:border-white/10">
              <div className="w-7 h-7 bg-primary/20 rounded-full flex items-center justify-center">
                <User size={16} className="text-primary" />
              </div>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="relative h-[60vh] w-full flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src={selectedMovie?.poster_url || "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=2000"}
              className="w-full h-full object-cover"
              alt={selectedMovie?.title || "Hero Background"}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-bg-dark via-bg-dark/40 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-transparent to-transparent"></div>
          </div>

          <div className="container mx-auto px-10 relative z-10 pt-20">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="badge badge-primary">ĐANG CHIẾU</span>
                <span className="badge badge-outline">TRẢI NGHIỆM CAO CẤP</span>
              </div>
              <h2 className="text-7xl font-black tracking-tighter text-white mb-6 uppercase leading-none">
                {selectedMovie?.title || "NOCTURNE PREMIERE"}
              </h2>
              <p className="text-text-muted text-lg mb-6 max-w-xl line-clamp-3">
                {selectedMovie?.description}
              </p>
              <div className="flex items-center gap-6 text-sm text-text-main/80 font-medium">
                <div className="flex items-center gap-1.5"><Star size={16} className="text-accent" fill="currentColor" /> 9.2</div>
                <span>•</span>
                <span>{selectedMovie?.duration} phút</span>
                <span>•</span>
                <span className="border border-white/40 px-1.5 py-0.5 rounded-sm text-[10px]">PG-13</span>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="container mx-auto px-10 py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column: Selection */}
            <div className="lg:w-2/3">
              {/* Movie Selection Slider */}
              <div className="mb-12">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-white">KHÁM PHÁ PHIM</h3>
                </div>
                <div className="flex gap-6 overflow-x-auto pb-6 no-scrollbar">
                  {movies.map((movie) => (
                    <div
                      key={movie.id}
                      onClick={() => handleMovieSelect(movie)}
                      className={`flex-shrink-0 w-40 cursor-pointer transition-all duration-500 group ${
                        selectedMovie?.id === movie.id ? 'scale-105' : 'opacity-60 hover:opacity-100'
                      }`}
                    >
                      <div className={`relative aspect-[2/3] rounded-xl overflow-hidden mb-3 border-2 transition-colors ${
                        selectedMovie?.id === movie.id ? 'border-primary shadow-lg shadow-primary/20' : 'border-transparent'
                      }`}>
                        <img
                          src={movie.poster_url}
                          alt={movie.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        {selectedMovie?.id === movie.id && (
                          <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
                            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                              <Play size={16} fill="white" className="ml-1" />
                            </div>
                          </div>
                        )}
                      </div>
                      <h4 className={`text-[11px] font-black uppercase tracking-tighter truncate ${
                        selectedMovie?.id === movie.id ? 'text-primary' : 'text-text-muted'
                      }`}>
                        {movie.title}
                      </h4>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between mb-8">
                <h3 className="text-sm font-bold uppercase tracking-widest text-white">CHỌN NGÀY</h3>
                <button className="text-[10px] font-bold text-text-muted hover:text-white flex items-center gap-1.5 uppercase">
                  Xem lịch <Calendar size={14} />
                </button>
              </div>

              <div className="flex gap-4 mb-12 overflow-x-auto pb-2 no-scrollbar">
                {dates.map((d, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedDate(`${d.month} ${d.day}`)}
                    className={`flex-shrink-0 w-20 h-24 rounded-xl border flex flex-col items-center justify-center transition-all ${
                      selectedDate === `${d.month} ${d.day}`
                      ? 'bg-primary border-primary text-white shadow-lg shadow-primary/30'
                      : 'bg-secondary/40 border-white/5 text-text-muted hover:border-white/20'
                    }`}
                  >
                    <span className="text-[10px] font-bold mb-1">{d.month}</span>
                    <span className="text-2xl font-black mb-1">{d.day}</span>
                    <span className="text-[9px] font-black uppercase tracking-tighter">{d.weekday === 'TODAY' ? 'HÔM NAY' : d.weekday}</span>
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-between mb-8">
                <h3 className="text-sm font-bold uppercase tracking-widest text-white">RẠP ĐANG CHIẾU</h3>
                <button className="bg-secondary/60 border border-white/10 px-4 py-2 rounded-md text-xs font-bold text-white flex items-center gap-4">
                  Hà Nội <ChevronDown size={14} className="text-primary" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Seat Selection Section */}
                {selectedShowtime && (
                  <div className="card-dark p-8 border-primary/30 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="flex justify-between items-center mb-8">
                      <div>
                        <h4 className="text-xl font-bold text-white mb-1">Chọn Chỗ Ngồi</h4>
                        <p className="text-text-muted text-xs uppercase tracking-widest font-bold">
                          {selectedShowtime.hall} • {new Date(selectedShowtime.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                      <div className="flex gap-4">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-white/10 rounded-sm"></div>
                          <span className="text-[10px] text-text-muted font-bold">TRỐNG</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-primary rounded-sm"></div>
                          <span className="text-[10px] text-text-muted font-bold">ĐANG CHỌN</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-white/40 rounded-sm"></div>
                          <span className="text-[10px] text-text-muted font-bold">ĐÃ ĐẶT</span>
                        </div>
                      </div>
                    </div>

                    <div className="mb-12">
                      <div className="w-full h-1.5 bg-gradient-to-r from-transparent via-primary/40 to-transparent rounded-full mb-12 relative">
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[9px] font-black text-primary/60 tracking-[0.5em] uppercase">MÀN HÌNH</div>
                      </div>

                      <div className="grid grid-cols-8 gap-3 max-w-md mx-auto">
                        {['A', 'B', 'C', 'D'].map(row =>
                          Array.from({length: 8}, (_, i) => i + 1).map(col => {
                            const seatId = `${row}${col}`;
                            const isBooked = bookedSeats.includes(seatId);
                            const isSelected = selectedSeat === seatId;

                            return (
                              <button
                                key={seatId}
                                disabled={isBooked}
                                onClick={() => setSelectedSeat(seatId)}
                                className={`aspect-square rounded-md text-[10px] font-bold transition-all ${
                                  isBooked ? 'bg-white/40 cursor-not-allowed opacity-20' :
                                  isSelected ? 'bg-primary text-white shadow-lg shadow-primary/40 scale-110' :
                                  'bg-white/5 border border-white/10 text-text-muted hover:border-primary hover:text-primary'
                                }`}
                              >
                                {seatId}
                              </button>
                            );
                          })
                        )}
                      </div>
                    </div>

                    {/* Booking Form */}
                    <div className="pt-8 border-t border-white/5">
                      <h5 className="text-[10px] font-black text-text-muted uppercase tracking-[0.15em] mb-6 text-center">THÔNG TIN LIÊN HỆ</h5>
                      <form onSubmit={handleBooking} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="HỌ VÀ TÊN"
                          required
                          value={customerInfo.name}
                          onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                          className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-xs text-white outline-none focus:border-primary transition-colors"
                        />
                        <input
                          type="email"
                          placeholder="ĐỊA CHỈ EMAIL"
                          required
                          value={customerInfo.email}
                          onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                          className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-xs text-white outline-none focus:border-primary transition-colors"
                        />
                        <button
                          type="submit"
                          disabled={!selectedSeat}
                          className={`md:col-span-2 py-4 rounded-xl font-black text-xs uppercase tracking-[0.2em] transition-all ${
                            selectedSeat
                            ? 'bg-primary text-white shadow-lg shadow-primary/30 hover:scale-[1.02] active:scale-95'
                            : 'bg-white/5 text-text-muted cursor-not-allowed'
                          }`}
                        >
                          XÁC NHẬN ĐẶT VÉ
                        </button>
                      </form>
                    </div>
                  </div>
                )}

                {Object.keys(groupedShowtimes).length > 0 ? (
                  Object.entries(groupedShowtimes).map(([hall, times], i) => (
                    <div key={i} className="card-dark p-8">
                      <div className="flex justify-between items-start mb-8">
                        <div>
                          <h4 className="text-xl font-bold text-white mb-1">Nocturne {hall}</h4>
                          <p className="text-text-muted text-xs flex items-center gap-1.5">
                            <MapPin size={12} className="text-primary" /> Phố Phim, Hà Nội
                          </p>
                        </div>
                        <span className="bg-accent/10 text-accent text-[9px] font-black px-3 py-1.5 rounded-full tracking-widest">
                          CÓ SUẤT CHIẾU HÔM NAY
                        </span>
                      </div>

                      <div className="space-y-8">
                        <div>
                          <h5 className="text-[10px] font-black text-text-muted uppercase tracking-[0.15em] mb-4">SUẤT CHIẾU CAO CẤP</h5>
                          <div className="flex flex-wrap gap-3">
                            {times.map((showtime, k) => (
                              <button
                                key={k}
                                onClick={() => handleShowtimeSelect(showtime)}
                                className={`px-6 py-2.5 rounded-md border text-sm font-bold transition-all ${
                                  selectedShowtime?.id === showtime.id
                                  ? 'bg-primary border-primary text-white shadow-lg shadow-primary/30'
                                  : 'bg-white/5 border-white/10 text-white hover:border-primary hover:text-primary'
                                }`}
                              >
                                {new Date(showtime.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-12 text-center card-dark">
                    <p className="text-text-muted italic uppercase tracking-widest text-xs">Không có suất chiếu cho ngày này.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Sidebar */}
            <div className="lg:w-1/3">
              <div className="sticky top-24 space-y-6">
                {/* Booking Summary */}
                <div className="bg-secondary/40 backdrop-blur-md rounded-2xl border border-white/5 overflow-hidden">
                  <div className="p-6 border-b border-white/5">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-white">TÓM TẮT ĐẶT VÉ</h3>
                  </div>
                  <div className="p-6">
                    <div className="flex gap-4 mb-8">
                      <div className="w-16 h-20 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={selectedMovie?.poster_url || "https://images.unsplash.com/photo-1596727147705-61a532a659bd?auto=format&fit=crop&q=80&w=400"}
                          className="w-full h-full object-cover"
                          alt="Movie Thumbnail"
                        />
                      </div>
                      <div>
                        <h4 className="font-bold text-white mb-1 truncate w-40">{selectedMovie?.title || "Chọn phim"}</h4>
                        <p className="text-[10px] text-text-muted uppercase font-black mb-2">NOCTURNE CINEMAS</p>
                        <p className={`text-[10px] flex items-center gap-1 font-bold ${selectedShowtime ? 'text-primary' : 'text-accent'}`}>
                          <Clock size={10} /> {selectedShowtime ? new Date(selectedShowtime.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Chờ chọn suất'}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4 pt-4 border-t border-white/5">
                      <div className="flex justify-between text-xs font-bold">
                        <span className="text-text-muted">Ghế</span>
                        <span className="text-white">{selectedSeat || '--'}</span>
                      </div>
                      <div className="flex justify-between text-xs font-bold">
                        <span className="text-text-muted">Số vé</span>
                        <span className="text-white">{selectedSeat ? '1' : '--'}</span>
                      </div>
                      <div className="flex justify-between items-end pt-2">
                        <span className="text-lg font-bold text-white">Tổng cộng</span>
                        <span className="text-2xl font-black text-accent">
                          {selectedShowtime ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(selectedShowtime.price) : '0 ₫'}
                        </span>
                      </div>
                    </div>

                    {selectedShowtime ? (
                      <button
                        onClick={() => {
                          const form = document.querySelector('form');
                          if(form) form.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="w-full mt-8 py-4 bg-primary text-white rounded-xl font-bold text-sm uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
                      >
                        {selectedSeat ? 'TIẾN HÀNH THANH TOÁN' : 'VUI LÒNG CHỌN GHẾ'}
                      </button>
                    ) : (
                      <button className="w-full mt-8 py-4 bg-white/5 text-text-muted rounded-xl font-bold text-sm uppercase tracking-widest cursor-not-allowed border border-white/5">
                        VUI LÒNG CHỌN SUẤT CHIẾU
                      </button>
                    )}
                    <p className="text-center text-[9px] text-text-muted mt-4 font-bold uppercase tracking-widest">
                      THUẾ VÀ PHÍ ĐƯỢC TÍNH KHI THANH TOÁN
                    </p>
                  </div>
                </div>

                {/* Exclusive Offer */}
                <div className="bg-offer-bg rounded-2xl p-6 relative overflow-hidden group">
                   <div className="relative z-10">
                      <p className="text-[9px] font-black text-white/70 uppercase tracking-widest mb-2">ƯU ĐÃI ĐỘC QUYỀN</p>
                      <h4 className="text-xl font-black text-white mb-3">Đêm Nhân Đôi Điểm Thưởng</h4>
                      <p className="text-xs text-white/80 mb-6 leading-relaxed">
                        Đặt bất kỳ suất chiếu IMAX nào hôm nay và nhận gấp đôi điểm thưởng Nocturne.
                      </p>
                      <button className="bg-white text-offer-bg px-4 py-2 rounded font-bold text-[10px] uppercase tracking-wider hover:bg-white/90 transition-all">
                        TÌM HIỂU THÊM
                      </button>
                   </div>
                   <div className="absolute -bottom-4 -right-4 opacity-20 group-hover:scale-110 transition-transform duration-700">
                      <Ticket size={120} className="text-white rotate-12" />
                   </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-bg-dark border-t border-white/5 py-20 mt-12">
        <div className="max-w-7xl mx-auto px-10">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2">
              <h2 className="text-xl font-black tracking-tighter mb-6">
                <span className="text-primary">NOCTURNE</span>
                <span className="text-white ml-2">CINEMAS</span>
              </h2>
              <p className="text-text-muted text-sm max-w-sm mb-8 leading-relaxed font-medium">
                Tái định nghĩa trải nghiệm điện ảnh thông qua không gian đắm chìm và dịch vụ cao cấp. Mỗi khung hình là một câu chuyện.
              </p>
              <div className="flex items-center gap-6">
                <Volume2 size={20} className="text-text-muted hover:text-white cursor-pointer" />
                <Film size={20} className="text-text-muted hover:text-white cursor-pointer" />
                <Share2 size={20} className="text-text-muted hover:text-white cursor-pointer" />
              </div>
            </div>

            <div>
              <h4 className="text-xs font-black text-white uppercase tracking-widest mb-8">KHÁM PHÁ</h4>
              <ul className="space-y-4 text-sm font-medium text-text-muted">
                <li className="hover:text-primary cursor-pointer transition-colors">Sắp Chiếu</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Thẻ Quà Tặng</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Trải Nghiệm IMAX</li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-black text-white uppercase tracking-widest mb-8">LIÊN HỆ</h4>
              <ul className="space-y-4 text-sm font-medium text-text-muted">
                <li className="hover:text-primary cursor-pointer transition-colors">Trung Tâm Hỗ Trợ</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Hợp Tác Kinh Doanh</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Chính Sách Bảo Mật</li>
              </ul>
            </div>
          </div>

          <div className="pt-12 border-t border-white/5 text-center">
            <p className="text-[10px] text-text-muted font-black uppercase tracking-[0.2em]">
              © 2024 NOCTURNE CINEMAS ENTERTAINMENT GROUP. BẢN QUYỀN ĐƯỢC BẢO LƯU.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
