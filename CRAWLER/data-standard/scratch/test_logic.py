import pandas as pd 

df = pd.read_csv("nhadat24h_clean.csv")
# tôi cần check giá trị duy nhất cột province
print(df["province"].unique())