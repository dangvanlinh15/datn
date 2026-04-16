
import pandas as pd
import numpy as np
import re

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
        for item in self.data[fieldDate]:
            date = re.sub('-','/',item)
            date = re.search(r'\d{2}/\d{2}/\d{4}', date)
            if (date):
                date = date.group(0)
            else:
                if "Hôm nay" in item:
                    date = "27/11/2023"
                if "Hôm qua" in item:
                    date = "26/11/2023"
            ls.append(date)
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

class StandardNhadat24h(StandardCommon):
    def __init__(self, data):
        self.data = data

    def standardDirect(self, field):
        ls = []
        for item in self.data[field]:
            item = item.strip()
            if item == "Không xác định":
                item = None
            ls.append(item)
        self.data[field] = ls

    def standardAddress(self, field):
        ls = []
        for item in self.data[field]:
            item = str(item)
            item = item.strip()
            item = re.sub("\n+", "", item)
            item = re.sub(' +', " ", item)
            ls.append(item)
        self.data[field] = ls

PATH_NHA_DAT_24H= "../crawler/nhadat24h.csv"
nhadat24h = pd.read_csv(PATH_NHA_DAT_24H, encoding="utf-8", dtype={'phone_contact': str})
nhadat24h['phone_contact'] = nhadat24h['phone_contact'].astype(str).str.zfill(10)

# 2. Hàm để chèn dấu chấm vào các vị trí 4 và 8
def format_phone(phone):
    if len(phone) == 10:
        return f"{phone[:4]}.{phone[4:7]}.{phone[7:]}"
    return phone # Trả về nguyên bản nếu số không đủ độ dài chuẩn

# 3. Áp dụng vào cột phone_contact
nhadat24h['phone_contact'] = nhadat24h['phone_contact'].apply(format_phone)
nd24h = StandardNhadat24h(nhadat24h)

nd24h.sliceAddress("address")
nd24h.standardDate("date")
nd24h.standardPrice("price", "ground_area")
nd24h.standardArea("ground_area")
nd24h.standardNone(["juridical"])
nd24h.standardDirect("direct")
nd24h.processValueNull(["description","juridical", "province", "price", "bedroom", "direct", "floor"], ["None", "Sổ đỏ", "None", "0", "None", "None", "None"])
nd24h.dropDuplicate(['province', 'direct', 'price', 'ground_area', 'usable_area', 'kitchen', 'livingroom', 'name_project', 'specific_address'])

nd24h.data.to_csv("nhadat24h_clean.csv", index=False)
