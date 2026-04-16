import pandas as pd
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
                    date = "15/03/2026"
                if "Hôm qua" in item:
                    date = "14/03/2026"
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



class StandardIbatdongsan(StandardCommon):
    def __init__(self, data):
        self.data = data
        self.baseURL = "http://i-batdongsan.com"

    def standardLinkImage(self, field):
        ls = []
        for item in self.data[field]:
            item = self.baseURL + str(item)
            ls.append(item)
        self.data[field] = ls

PATH_IBAT_DONG_SAN = "../crawler/merged_ibds.csv"
ibatdongsan = pd.read_csv(PATH_IBAT_DONG_SAN, encoding = 'utf-8')

ibds = StandardIbatdongsan(ibatdongsan)
ibds.sliceAddress("address")
ibds.standardDate("date")
ibds.standardPrice("price", "area")
ibds.standardNone(["diningroom", "direct", "floor", "kitchen", "parking", "terrace", "width", "juridical", "length", "world_highway", "bedroom"])
ibds.standardIcon(["diningroom", "kitchen", "parking", "terrace"])
ibds.standardLinkImage("link_image")
ibds.standardArea("area")
ibds.processValueNull(["direct","bedroom", "price", "floor", "juridical", "length","width", "world_highway", "province"],["None","None", "0", "None", "Sổ hồng", "0m", "0m", "0m","None"])
ibds.dropDuplicate(['province', 'type', 'direct', 'price', 'length', 'width', 'area', 'bedroom', 'floor', 'world_highway'])
ibds.data.to_csv("ibds_clean.csv", index=False)
