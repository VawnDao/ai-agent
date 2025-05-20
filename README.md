# Hướng dẫn chạy dự án

## Giới thiệu

Đây là một dự án HTML cơ bản với các trang web như Home, Text-to-Speech, và Instant Avatar. Dự án sử dụng HTML và CSS để hiển thị giao diện người dùng.

## Cấu trúc dự án

- `index.html`: Trang chủ của dự án.
- `style.css`: Tệp CSS để định dạng giao diện.
- Các trang khác:
  - `/tts/text-to-speech.html`
  - `/avatar/instant-avatar.html`

## Yêu cầu

- Trình duyệt web hiện đại (Google Chrome, Firefox, Safari, v.v.).
- (Tùy chọn) Máy chủ HTTP đơn giản để chạy dự án cục bộ.

## Hướng dẫn chạy dự án với Visual Studio Code và Live Server

### 1. Cài đặt các công cụ cần thiết

1. **Tải và cài đặt Visual Studio Code**:

   - Truy cập [Visual Studio Code](https://code.visualstudio.com/) và tải về phiên bản phù hợp với hệ điều hành của bạn.
   - Cài đặt theo hướng dẫn.

2. **Cài đặt Git**:

   - Truy cập [Git](https://git-scm.com/) và tải về phiên bản phù hợp với hệ điều hành.
   - Cài đặt Git để có thể clone mã nguồn từ GitHub.

3. **Cài đặt tiện ích Live Server trong Visual Studio Code**:
   - Mở Visual Studio Code.
   - Nhấn vào biểu tượng **Extensions** (hình ô vuông ở thanh bên trái).
   - Tìm kiếm **Live Server** và nhấn nút **Install** để cài đặt.

### 2. Clone mã nguồn dự án

1. Mở Terminal trong Visual Studio Code:
   - Nhấn `Ctrl + ~` (Windows/Linux) hoặc `Cmd + ~` (MacOS).
2. Chạy lệnh sau để clone mã nguồn về máy:
   ```bash
   git clone https://github.com/VawnDao/ai-agent
   ```

### 3. Chạy dự án

- Nhìn lên thanh công cụ, chọn file, open folder.
- Chọn folder AI_AGENT
- chọn file text-to-speech.html -> sau đó chuột phải chọn "Open with live server"
- Sau khi chạy được web lên (kèm ảnh) thì lên web https://ausynclab.io/ đăng kí tài khoản.
- Sau khi đăng kí xong tìm API KEY
- Lấy API KEY thay thế vào apiKey trong file script.js

### 4. Text to speech

- Chọn id của voice có sẵn trên web https://ausynclab.io/ hoặc đăng kí riêng giọng nói của mình rồi lấy id, điền vào phần nhập id voice
- Nhập text cần chuyển đổi
- Chọn button convert để chuyển đổi (có thể mất một lúc để tạo tuỳ vào text và tiền bỏ ra đăng kí gói tốt hay không)
- Hiển thị audio dưới nút convert thì xong
