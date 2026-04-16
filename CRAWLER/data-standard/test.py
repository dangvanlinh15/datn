import pandas as pd 

df = pd.read_csv('nhadat24h_clean.csv')

# df = df.dropna(subset=['description'])
print(df.info())


# Giả sử df là DataFrame của bạn
# Duyệt qua từng tên cột trong danh sách cột
for col in df.columns:
    print(f"--- Cột: {col} ---")
    
    # Lọc các giá trị không phải NaN và in ra
    non_nan_values = df[col].dropna()
    
    if not non_nan_values.empty:
        print(non_nan_values)
    else:
        print("Cột này trống (toàn NaN)")
    
    print("\n") # Xuống dòng để dễ nhìn