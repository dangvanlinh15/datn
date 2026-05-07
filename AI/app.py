from flask import Flask, render_template, request
from flask_cors import CORS
import pandas as pd
import random
import json

app = Flask(__name__)
CORS(app)
file_stopword = 'vietnamese-stopwords.txt'

my_file = open(file_stopword, "r", encoding="utf-8")

# reading the file
data = my_file.read()

# replacing end splitting the text
# when newline ('\n') is seen.
stop_words = data.split("\n")
my_file.close()

dataset = pd.read_csv("all_data_after_deduplication.csv")
dataset = dataset.fillna('')

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel

import pandas as pd

# Biểu diễn mỗi sách dưới dạng vector TF-IDF
tfidf_vectorizer = TfidfVectorizer(stop_words=stop_words)
# tfidf_matrix = tfidf_vectorizer.fit_transform(dataset['title'])
tfidf_matrix = tfidf_vectorizer.fit_transform(dataset['title'] + dataset['description'] + dataset['province'])


# Xử lý ngôn ngữ tự nhiên cho hồ sơ sở thích của người dùng
def preprocess_text(text):
    # Tokenize
    words = text.split(' ')
    # Loại bỏ stop words và dấu câu
    filtered_tokens = [word for word in words if word not in stop_words]
    return ' '.join(filtered_tokens)


@app.route("/get")
def get_bot_response():
    user_profile_text = request.args.get('msg')
    preprocessed_profile = preprocess_text(user_profile_text)

    # Biểu diễn hồ sơ sở thích dưới dạng vector TF-IDF
    user_profile = tfidf_vectorizer.transform([preprocessed_profile])

    cosine_similarities = linear_kernel(tfidf_matrix, user_profile).flatten()
    sorted_houses = sorted(list(enumerate(cosine_similarities)), key=lambda x: x[1], reverse=True)
    if sorted_houses[0][1] > 0.99:
        top_indices = [index for index, score in sorted_houses[1:11]]
    else:
        top_indices = [index for index, score in sorted_houses[:10]]
    rs = dataset.loc[top_indices].to_dict(orient='records')

    rs = json.dumps(rs, ensure_ascii=False)
    return rs


@app.route('/post_data', methods=['POST'])
def post_data():
    try:
        # Lấy dữ liệu từ request
        title = request.json['title']
        description = request.json['description']
        province = request.json['province']

        preprocessed_profile = preprocess_text(title+description+province)

        # Biểu diễn hồ sơ sở thích dưới dạng vector TF-IDF
        user_profile = tfidf_vectorizer.transform([preprocessed_profile])

        cosine_similarities = linear_kernel(tfidf_matrix, user_profile).flatten()
        sorted_houses = sorted(list(enumerate(cosine_similarities)), key=lambda x: x[1], reverse=True)
        print(sorted_houses[0][1])
        if sorted_houses[0][1] > 0.99:
            top_indices = [index for index, score in sorted_houses[1:11]]
        else:
            top_indices = [index for index, score in sorted_houses[:10]]
        rs = dataset.loc[top_indices].to_dict(orient='records')

        rs = json.dumps(rs, ensure_ascii=False)
        return rs

    except Exception as e:
        # Xử lý ngoại lệ nếu có lỗi
        response = {'status': 'error', 'message': str(e)}
        return json.dumps(response), 400


# #
# #
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
