# Sử dụng Python phiên bản slim để giảm dung lượng image
FROM python:3.10-slim

# Thiết lập thư mục làm việc trong container
WORKDIR /app

# Cài đặt các công cụ hệ thống cần thiết (nếu scikit-learn hoặc pandas yêu cầu biên dịch)
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Copy file requirements vào trước để tận dụng Docker cache
COPY requirements.txt .

# Cài đặt các thư viện Python
RUN pip install --no-cache-dir -r requirements.txt

# Copy toàn bộ mã nguồn và dữ liệu vào container
# Đảm bảo các file .csv và .txt có mặt trong thư mục này
COPY . .

# Flask mặc định chạy ở port 5000
EXPOSE 5000

# Lệnh để chạy ứng dụng
# Sử dụng host 0.0.0.0 để có thể truy cập từ bên ngoài container
CMD ["python", "app.py"]