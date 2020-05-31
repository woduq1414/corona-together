from app.db import *
from flask_restful import Resource, reqparse
import bcrypt
from flask import request
import jwt
from config import SECRET_KEY
from datetime import datetime
from datetime import timedelta
from datetime import date
import requests
from bs4 import BeautifulSoup
from lxml import html
import matplotlib.pyplot as plt
from wordcloud import WordCloud
from krwordrank.word import KRWordRank
from krwordrank.sentence import summarize_with_sentences
# server.py
import pandas as pd
import re
import datetime as dt
from PIL import Image
import numpy as np

from flask import send_file


class GetData(Resource):

    def get(self):
        req = requests.get(
            'http://ncov.mohw.go.kr/bdBoardList_Real.do?brdId=1&brdGubun=11&ncvContSeq=&contSeq=&board_id=&gubun=')

        ## BeautifulSoup으로 html소스를 python객체로 변환하기
        ## 첫 인자는 html소스코드, 두 번째 인자는 어떤 parser를 이용할지 명시.
        ## 이 글에서는 Python 내장 html.parser를 이용했다.
        # soup = BeautifulSoup(html, 'html.parser')
        tree = html.fromstring(req.content)
        confirmed = tree.xpath('//*[@id="content"]/div/div[2]/table/tbody/tr/td[1]/text()')[0]
        recovered = tree.xpath('//*[@id="content"]/div/div[2]/table/tbody/tr/td[2]/text()')[0]
        tested = tree.xpath('//*[@id="content"]/div/div[4]/table/tbody/tr/td[6]/text()')[0]

        start_date = date(2020, 1, 20)

        return {
            "confirmed": int(confirmed.replace(",", "")),
            "recovered": int(recovered.replace(",", "")),
            "tested": int(tested.replace(",", "")),
            "day": (date.today() - start_date).days
        }


class GetWordCloud(Resource):

    def get(self):
        def get_absoulute_path(path):
            script_dir = os.path.dirname(__file__)  # <-- absolute dir the script is in
            rel_path = path
            abs_file_path = os.path.join(script_dir, rel_path)
            return abs_file_path

        import os
        tagName = request.args.get("tagName", "")
        print(request.args)
        # tagName = "학생"
        tag = Tag.query.filter_by(tagName=tagName).first()
        if tag is None:
            return {"error": "태그를 찾을 수 없습니다."}, 404
        tagSeq = tag.seq
        lis = []
        for _ in Difficult.query.filter_by(tagSeq=tagSeq).all():
            lis.append(_.content)
            lis.append(_.title)
        for _ in Cheer.query.filter_by(tagSeq=tagSeq).all():
            lis.append(_.content)
        print(lis)
        font_path = 'NanumBarunGothic.ttf'
        circle_mask = np.array(Image.open(get_absoulute_path("circle_mask.png")))
        wordcloud = WordCloud(
            font_path=font_path,
            width=800,
            height=800,
            mask=circle_mask,
            background_color="rgba(255, 255, 255, 1)",
            mode="RGBA"
        )
        beta = 0.9  # PageRank의 decaying factor beta
        max_iter = 10
        wordrank_extractor = KRWordRank(
            min_count=2,  # 단어의 최소 출현 빈도수 (그래프 생성 시)
            max_length=10,  # 단어의 최대 길이
            verbose=True
        )
        keywords, rank, graph = wordrank_extractor.extract(lis, beta, max_iter)
        # keywords, sents = summarize_with_sentences(lis, num_keywords=100, num_keysents=10)
        print(keywords)

        for word, r in sorted(keywords.items(), key=lambda x: x[1], reverse=True)[:30]:
            print('%8s:\t%.4f' % (word, r))

        result = wordcloud.generate_from_frequencies(keywords)
        try:
            result = wordcloud.generate_from_frequencies(keywords)
        except:
            return {"error" : "데이터가 부족합니다."}, 404

        array = result.to_array()
        print(type(array))  # numpy.ndarray
        print(array.shape)  # (800, 800, 3)
        fig = plt.figure(figsize=(10, 10))
        plt.imshow(array, interpolation="bilinear")
        plt.axis("off")
        # plt.show()

        filepath = get_absoulute_path(f"./images/{tagName}.png")
        fig.savefig(filepath)
        script_dir = os.path.dirname(__file__)  # <-- absolute dir the script is in
        return send_file(
            filepath,
            mimetype='image/png',
            attachment_filename='snapshot.png',
            cache_timeout=0
        )
