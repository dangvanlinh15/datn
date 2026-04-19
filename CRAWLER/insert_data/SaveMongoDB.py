from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import pandas as pd

uri = "mongodb+srv://admin:admin@datn.je3wi9v.mongodb.net/?appName=datn"
# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))
# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    db = client['test']
    file_path = 'all_data_after_deduplication.csv'
    data = pd.read_csv(file_path,  encoding = 'utf-8')
    data = data.sample(frac=1).reset_index(drop=True)
    data_dict = data.to_dict(orient='records')
    print("data_dict", data_dict)
    # Chọn hoặc tạo một collection trong MongoDB
    collection = db['posts']
    # # Insert dữ liệu vào MongoDB
    collection.insert_many(data_dict)
    print("Dữ liệu đã được import vào MongoDB.")
except Exception as e:
    print(e)