import requests
from bs4 import BeautifulSoup
from openpyxl import Workbook

url = 'https://quotes.toscrape.com/'

# 해당 URL에 GET 요청을 보냄
response = requests.get(url)

wb = Workbook()
ws = wb.active
ws.append(['순번', '어록','위인'])

# 응답 코드가 200(성공)인지 확인
if response.status_code == 200:
    # BeautifulSoup을 사용하여 HTML을 파싱
    for i in range(1,10):
        url = f'https://quotes.toscrape.com/page/{i}'
        response = requests.get(url)
        soup = BeautifulSoup(response.text, 'html.parser')
        quotes = soup.select('body > div > div:nth-child(2) > div.col-md-8 > div > span:first-child')
        by_who = soup.select('body > div > div:nth-child(2) > div.col-md-8 > div > span:nth-child(2) > small')

        quotes = list(map(lambda x: x.text.strip(), quotes))
        by_who = list(map(lambda x: x.text.strip(), by_who))
        for i, (quotes, by_who) in enumerate(zip(quotes, by_who), start = 1):
            ws.append([i, quotes, by_who])
    filename = '어록 모음집.xlsx'
    wb.save(filename)
    
else:
    print('페이지를 가져오는데 실패했습니다.')
