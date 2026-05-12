import pandas as pd 

df = pd.read_csv("all_data_after_deduplication.csv")
print(df.info())

# search title co gia tri la BÁN ĐẤT LÔ GÓC 2 MẶT TIỀN NGÃ TƯ
df_search = df[df['phone_contact'].str.contains('0916.123.456')]
print(df_search.iloc[0]['link_image'])
