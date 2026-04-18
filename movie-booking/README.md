# Movie Booking System (CGV Clone)

Hệ thống đặt vé xem phim đầy đủ chức năng với giao diện lấy cảm hứng từ CGV Cinemas.

## 🚀 Công nghệ sử dụng
- **Backend**: PHP 8.x, Slim Framework 4, MySQL (XAMPP).
- **Frontend**: ReactJS 19, Vite, Tailwind CSS v4, Lucide Icons, Axios.

---

## 🛠 Hướng dẫn cài đặt

### 1. Yêu cầu hệ thống
- Đã cài đặt [XAMPP](https://www.apachefriends.org/index.html) (bao gồm Apache và MySQL).
- Đã cài đặt [Composer](https://getcomposer.org/).
- Đã cài đặt [Node.js & NPM](https://nodejs.org/).

### 2. Thiết lập Backend (PHP & MySQL)
1. Mở XAMPP Control Panel và Start **Apache** và **MySQL**.
2. Di chuyển vào thư mục backend:
   ```bash
   cd movie-booking/backend
   ```
3. Cài đặt các thư viện PHP:
   ```bash
   composer install
   ```
4. Khởi tạo Database:
   - Cách 1: Chạy script khởi tạo tự động (Yêu cầu PHP CLI):
     ```bash
     php init_db.php
     ```
   - Cách 2: Tạo database tên `movie_booking` trong phpMyAdmin và nhập (Import) các bảng thủ công từ nội dung trong `init_db.php`.
5. Chạy Backend server:
   ```bash
   php -S localhost:8000 -t public
   ```

### 3. Thiết lập Frontend (React)
1. Mở một terminal mới và di chuyển vào thư mục frontend:
   ```bash
   cd movie-booking/frontend
   ```
2. Cài đặt các thư viện:
   ```bash
   npm install
   ```
3. Chạy Frontend server (Development mode):
   ```bash
   npm run dev
   ```
4. Truy cập vào địa chỉ hiển thị trên terminal (thường là `http://localhost:5173`).

---

## 🌟 Các tính năng chính
- **Trang chủ**: Banner quảng cáo, danh sách phim đang chiếu với hiệu ứng hover "Mua vé".
- **Chi tiết phim**: Thông tin mô tả, thời lượng và danh sách suất chiếu.
- **Chọn ghế**: Sơ đồ ghế ngồi trực quan (Ghế trống, đang chọn, đã đặt).
- **Đặt vé**: Form điền thông tin khách hàng và thông báo thành công.
- **Responsive**: Giao diện hoạt động tốt trên cả máy tính và thiết bị di động.

## 📁 Cấu trúc thư mục
- `backend/`: Chứa mã nguồn PHP Slim API và cấu hình Database.
- `frontend/`: Chứa mã nguồn ReactJS và giao diện Tailwind CSS.
