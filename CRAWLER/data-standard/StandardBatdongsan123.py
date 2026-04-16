import pandas as pd
import csv
import re
from datetime import datetime, timedelta

class StandardCommon:
    def __init__(self, data):
        self.data = data

    # loại bỏ trùng lặp
    def dropDuplicate(self, subset):
        self.data = self.data.drop_duplicates(subset=subset)

    #tách trường address thành các trường ward, province, street, district
    def sliceAddress(self, fieldAddress):
        lsProvince = []

        for item in self.data[fieldAddress]:
            province = item.split(",")[-1].strip()
            province = re.sub("Tỉnh ", "", province)
            province = re.sub("Thành phố ", "", province)
            lsProvince.append(province)

        self.data["province"] = lsProvince

    #bỏ đơn vị đo lường : m
    def removeUnitMeasure(self, fields):
        for field in fields:
            ls = []
            for item in self.data[field]:
                item = str(item)
                item = re.findall(r"(?:\d*\.\d+|\d+)", item)
                if len(item):
                    item = item[0]
                else:
                    item = "0"
                ls.append(item)
            self.data[field] = ls

    # Chuẩn hóa đơn vị cho price theo đồng
    def standardPrice(self, fieldPrice, fieldSquare):
        ls = []
        for price, square in zip(self.data[fieldPrice], self.data[fieldSquare]):
            price = str(price)
            price = price.lower()
            price = re.sub(",", ".", price)
            valPrice = re.findall(r"(?:\d*\.\d+|\d+)", price)

            square = str(square)
            square = re.findall(r"(?:\d*\.\d+|\d+)", square)
            if (len(square)):
                square = square[0]

            if (len(valPrice)):
                valPrice = float(valPrice[0])
                if "/m" in price:
                    valPrice = int(valPrice * float(square))
                if "/tháng" in price:
                    valPrice = ""
                else:
                    if "tỷ" in price:
                        valPrice = int(valPrice * 1000000000)
                    if "triệu" in price:
                        valPrice = int(valPrice * 1000000)
                    if "ngàn" in price:
                        valPrice = int(valPrice * 1000)
            else:
                valPrice = ""
            ls.append(str(valPrice))
        self.data[fieldPrice] = ls

    # Chuẩn hóa date về dạng dd/mm/yyyy
    def standardDate(self, fieldDate):
        ls = []
        today = datetime(2026, 3, 25)
        for item in self.data[fieldDate]:
            # 1. Thử tìm định dạng ngày chuẩn dd/mm/yyyy hoặc dd-mm-yyyy trước
            clean_item = re.sub('-', '/', item)
            match_date = re.search(r'\d{2}/\d{2}/\d{4}', clean_item)
            
            if match_date:
                date_str = match_date.group(0)
            else:
                # 2. Xử lý thời gian tương đối
                item_lower = item.lower()
                
                if "hôm nay" in item_lower or "giờ trước" in item_lower:
                    # "24 giờ trước" hoặc "5 giờ trước" vẫn tính là hôm nay (theo logic của bạn)
                    target_date = today
                    
                elif "hôm qua" in item_lower or "1 ngày trước" in item_lower:
                    target_date = today - timedelta(days=1)
                    
                elif "tuần trước" in item_lower or "1 tuần" in item_lower:
                    target_date = today - timedelta(weeks=1)
                    
                elif "tháng trước" in item_lower or "1 tháng" in item_lower:
                    # Tính trung bình 30 ngày cho 1 tháng
                    target_date = today - timedelta(days=30)
                    
                elif "năm trước" in item_lower or "năm" in item_lower:
                    # Tìm số năm (ví dụ "2 năm trước")
                    years = re.search(r'\d+', item)
                    num_years = int(years.group(0)) if years else 1
                    target_date = today - timedelta(days=365 * num_years)
                    
                else:
                    # Nếu không khớp cái nào, để giá trị mặc định hoặc None
                    target_date = today 
                date_str = target_date.strftime('%d/%m/%Y')
            ls.append(date_str)

        self.data[fieldDate] = ls




    #Chuẩn hóa giá tị None, field nào toàn None thì sẽ bị loại bỏ
    def standardNone(self, fields):
        for field in fields:
            ls = []
            for item in self.data[field]:
                item = str(item)
                item = item.strip()
                if item =="_" or item == "---":
                    item = None
                ls.append(item)
            if len(ls):
                self.data[field] = ls
            else :
                self.data = self.data.drop(columns=field)

    def standardType(self, fieldType):
        N = len(self.data[fieldType])
        type = ["Cần bán căn hộ chung cư"] *N
        self.data[fieldType] = type

    def standardIcon(self, fields):
        for field in fields:
            ls = []
            for item in self.data[field]:
                if item == "/publish/img/check.gif":
                    ls.append("Có")
                else:
                    ls.append("Không")
            self.data[field] = ls

    def strip(self, fields):
        for field in fields:
            ls = []
            for item in self.data[field]:
                if item:
                    item = str(item)
                    item = item.strip()
                    item = re.sub("\n", "", item)
                ls.append(item)
            self.data[field] = ls

    def standardUnit(self, field, unit):
        ls = []
        for item in self.data[field]:
            if(item):
                item = item.strip()
                item = item + unit
            ls.append(item)
        self.data[field] = ls

    def processValueNull(self, fields, values):
        for field, value in zip(fields, values):
            ls = []
            for item in self.data[field]:
                if pd.isna(item) or pd.isnull(item):
                    item = value
                elif len(item.strip()) == 0:
                    item = value
                ls.append(item)
            self.data[field] = ls

    def standardArea(self, fieldArea):
        def clean_square(x):
            if pd.isna(x) or x == "":
                return 0.0
            s = str(x).replace(',', '.')
            # Tìm số nguyên hoặc số thực
            match = re.search(r'(\d+(?:\.\d+)?)', s)
            if match:
                return float(match.group(1))
            return 0.0

        # Sử dụng .apply() của pandas để đạt hiệu suất cao hơn vòng lặp for
        self.data[fieldArea] = self.data[fieldArea].apply(clean_square)



class StandardBatdongsan123(StandardCommon):
    def __init__(self, data):
        self.data = data

    def addField(self, fields, values):
        N = len(self.data)
        for field, value in zip(fields, values):
            ls = []
            for i in range(N):
                ls.append(value)
            self.data[field] = ls


PATH_BDS123 = "../crawler/merged_bds123.csv"
bds123 = pd.read_csv(PATH_BDS123, encoding = 'utf-8', dtype={'phone_contact': str}, nrows=6000, index_col=0)
bds123['phone_contact'] = bds123['phone_contact'].apply(lambda x: '0' + x if x != 'nan' else x)
bds123['phone_contact'] = bds123['phone_contact'].astype(str).str.zfill(10)

# 2. Hàm để chèn dấu chấm vào các vị trí 4 và 8
def format_phone(phone):
    if len(phone) == 10:
        return f"{phone[:4]}.{phone[4:7]}.{phone[7:]}"
    return phone # Trả về nguyên bản nếu số không đủ độ dài chuẩn

# 3. Áp dụng vào cột phone_contact
bds123['phone_contact'] = bds123['phone_contact'].apply(format_phone)

bds123 = StandardBatdongsan123(bds123)
bds123.sliceAddress("address")
bds123.standardDate("date")
bds123.standardPrice("price", "acreage")
bds123.standardArea("acreage")
bds123.addField(["terrace", "parking", "kitchen", "juridical", "floor"], ["không", "có", "có","Sổ hồng/ Sổ đỏ", "None"])
bds123.strip(["title"])
bds123.processValueNull(["direction", "province", "price", "bedroom", "bathroom"], ["None", "None", "0", "None", "None"])
bds123.dropDuplicate(["province", "acreage", "price", "bedroom", "project", "bathroom"])

bds123.data.to_csv("bds123_clean.csv", index=False)