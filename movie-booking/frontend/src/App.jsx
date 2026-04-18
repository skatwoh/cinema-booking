import React, { useState } from 'react';
import {
  Search,
  ShoppingCart,
  Menu,
  X,
  ChevronRight,
  Quote,
  Share2
} from 'lucide-react';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col font-sans text-text-main">
      {/* Top Bar */}
      <div className="bg-primary text-white py-2 px-4 md:px-12 flex justify-between items-center text-xs">
        <div className="flex gap-4">
          <Share2 size={16} className="cursor-pointer hover:opacity-80" />
          <span className="hidden sm:inline">Facebook</span>
          <span className="hidden sm:inline">Instagram</span>
          <span className="hidden sm:inline">TikTok</span>
        </div>
        <div className="flex items-center gap-6">
          <div className="relative hidden md:block">
            <input
              type="text"
              placeholder="Tìm kiếm..."
              className="bg-white/20 border-none rounded-full py-1 px-4 placeholder:text-white/70 focus:ring-1 focus:ring-white outline-none w-48 text-white"
            />
            <Search size={14} className="absolute right-3 top-1.5 text-white/70" />
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <ShoppingCart size={18} />
            <span className="font-bold">GIỎ HÀNG</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-12 h-20 flex justify-between items-center">
          <div className="text-2xl font-serif font-bold tracking-tighter text-primary">
            DECOR <span className="text-text-main">HANDICRAFT</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex gap-8">
            <a href="#" className="nav-link text-primary">Trang Chủ</a>
            <a href="#" className="nav-link">Giới Thiệu</a>
            <a href="#" className="nav-link">Sản Phẩm</a>
            <a href="#" className="nav-link">Tin Tức</a>
            <a href="#" className="nav-link">Liên Hệ</a>
          </nav>

          <button className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 p-4 absolute w-full shadow-xl">
            <nav className="flex flex-col gap-4">
              <a href="#" className="nav-link text-primary">Trang Chủ</a>
              <a href="#" className="nav-link">Giới Thiệu</a>
              <a href="#" className="nav-link">Sản Phẩm</a>
              <a href="#" className="nav-link">Tin Tức</a>
              <a href="#" className="nav-link">Liên Hệ</a>
            </nav>
          </div>
        )}
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative h-[600px] overflow-hidden flex items-center">
          <img
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop"
            alt="Handicraft Hero"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="relative max-w-7xl mx-auto px-12 w-full text-white">
            <h2 className="text-5xl md:text-7xl font-serif font-light mb-6 leading-tight">
              Nâng Tầm <br /> <span className="font-bold italic">Không Gian Sống</span>
            </h2>
            <p className="max-w-xl text-lg mb-8 text-white/90">
              Mang nét đẹp thủ công vào ngôi nhà của bạn với những sản phẩm decor tinh tế,
              được làm từ đôi bàn tay khéo léo của các nghệ nhân.
            </p>
            <button className="btn-primary">
              Khám Phá Ngay
            </button>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-20 px-4 md:px-12 max-w-7xl mx-auto text-center">
          <div className="mb-16">
            <h3 className="text-sm font-bold text-primary uppercase tracking-[0.3em] mb-4">Bộ Sưu Tập</h3>
            <h2 className="section-title">Sản Phẩm Khác Biệt</h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
            <p className="max-w-2xl mx-auto text-gray-600 leading-relaxed italic">
              "Chúng tôi tin rằng mỗi vật dụng trong nhà đều mang một câu chuyện riêng.
              Các sản phẩm tại Decor Handicraft không chỉ là đồ trang trí, mà còn là linh hồn của không gian sống."
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Category 1 */}
            <div className="group cursor-pointer">
              <div className="relative aspect-[4/5] overflow-hidden rounded-sm mb-4">
                <img
                  src="https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=1974&auto=format&fit=crop"
                  alt="Gối Decor"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                <div className="absolute bottom-8 left-0 w-full text-white">
                  <h4 className="text-2xl font-serif font-bold">Gối Decor</h4>
                  <div className="flex items-center justify-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-xs uppercase tracking-widest">Xem Chi Tiết</span>
                    <ChevronRight size={14} />
                  </div>
                </div>
              </div>
            </div>

            {/* Category 2 */}
            <div className="group cursor-pointer">
              <div className="relative aspect-[4/5] overflow-hidden rounded-sm mb-4">
                <img
                  src="https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1974&auto=format&fit=crop"
                  alt="Túi Xách"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                <div className="absolute bottom-8 left-0 w-full text-white">
                  <h4 className="text-2xl font-serif font-bold">Túi Xách</h4>
                  <div className="flex items-center justify-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-xs uppercase tracking-widest">Xem Chi Tiết</span>
                    <ChevronRight size={14} />
                  </div>
                </div>
              </div>
            </div>

            {/* Category 3 */}
            <div className="group cursor-pointer">
              <div className="relative aspect-[4/5] overflow-hidden rounded-sm mb-4">
                <img
                  src="https://images.unsplash.com/photo-1534349762230-e0929b7a153b?q=80&w=2070&auto=format&fit=crop"
                  alt="Đồ Trang Trí"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                <div className="absolute bottom-8 left-0 w-full text-white">
                  <h4 className="text-2xl font-serif font-bold">Đồ Trang Trí</h4>
                  <div className="flex items-center justify-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-xs uppercase tracking-widest">Xem Chi Tiết</span>
                    <ChevronRight size={14} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="bg-secondary/10 py-24 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-serif mb-16 text-text-main">Khách Hàng Nói Gì Về Chúng Tôi</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="bg-white p-10 rounded-lg shadow-sm border border-gray-100 relative">
                <Quote className="text-primary/20 absolute top-6 left-6" size={64} />
                <p className="text-gray-600 italic mb-8 relative z-10 leading-relaxed">
                  "Tôi rất ấn tượng với chất lượng sản phẩm gối decor ở đây. Đường kim mũi chỉ cực kỳ tinh xảo,
                  màu sắc nhã nhặn đúng chất rustic mà tôi đang tìm kiếm cho phòng khách."
                </p>
                <div>
                  <h5 className="font-bold text-text-main">Nguyễn Thảo Anh</h5>
                  <span className="text-xs text-primary uppercase tracking-wider">Hà Nội</span>
                </div>
              </div>

              <div className="bg-white p-10 rounded-lg shadow-sm border border-gray-100 relative">
                <Quote className="text-primary/20 absolute top-6 left-6" size={64} />
                <p className="text-gray-600 italic mb-8 relative z-10 leading-relaxed">
                  "Các sản phẩm đồ trang trí bằng mây tre đan mang lại cảm giác rất ấm cúng.
                  Nhân viên tư vấn rất nhiệt tình và giao hàng nhanh chóng."
                </p>
                <div>
                  <h5 className="font-bold text-text-main">Trần Minh Hiếu</h5>
                  <span className="text-xs text-primary uppercase tracking-wider">TP. Hồ Chí Minh</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-text-main text-white py-16 px-4 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-white/10 pb-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-xl font-serif font-bold mb-6 tracking-tighter text-accent">DECOR HANDICRAFT</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              Chúng tôi mang đến những giải pháp trang trí nội thất thủ công độc bản,
              giúp không gian sống của bạn trở nên ấm cúng và phong cách hơn.
            </p>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-widest text-sm mb-6">Liên Kết</h4>
            <ul className="flex flex-col gap-3 text-sm text-white/60">
              <li className="hover:text-accent cursor-pointer">Về Chúng Tôi</li>
              <li className="hover:text-accent cursor-pointer">Sản Phẩm</li>
              <li className="hover:text-accent cursor-pointer">Tin Tức</li>
              <li className="hover:text-accent cursor-pointer">Chính Sách</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-widest text-sm mb-6">Liên Hệ</h4>
            <ul className="flex flex-col gap-3 text-sm text-white/60">
              <li>Địa chỉ: 123 Đường Decor, Quận 1, TP. HCM</li>
              <li>Hotline: 0123 456 789</li>
              <li>Email: info@decorhandicraft.com</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-widest text-sm mb-6">Đăng Ký</h4>
            <p className="text-sm text-white/60 mb-4">Nhận thông tin về bộ sưu tập mới nhất.</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Email của bạn"
                className="bg-white/10 border-none px-4 py-2 text-sm w-full outline-none focus:ring-1 focus:ring-accent"
              />
              <button className="bg-primary px-4 py-2 font-bold text-xs uppercase">Gửi</button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40">
          <p>© 2025 Decor Handicraft. All Rights Reserved.</p>
          <div className="flex gap-6">
            <Share2 size={16} />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
