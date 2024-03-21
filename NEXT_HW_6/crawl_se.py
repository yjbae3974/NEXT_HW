from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from bs4 import BeautifulSoup
import time

# Chrome WebDriver 경로 설정
chrome_driver_path = '/Users/baeyeonjun/Documents/GitHub/NEXT_HW/NEXT_HW_6/chromedriver-mac-arm64/chromedriver'

# Selenium을 사용하여 웹 페이지 열기
options = Options()
options.add_argument("--headless")  # 브라우저를 화면에 표시하지 않음 (headless 모드)
driver = webdriver.Chrome(options=options, executable_path=chrome_driver_path)
url = 'https://www.all-con.co.kr/list/contest/1/1?sortname=cl_order&sortorder=asc&stx=&sfl=&t=1&ct=&sc=&tg='
driver.get(url)

# 페이지가 로드되는 동안 대기
time.sleep(5)

# 현재 페이지의 HTML 가져오기
html = driver.page_source

# BeautifulSoup을 사용하여 HTML을 파싱
soup = BeautifulSoup(html, 'html.parser')

# 원하는 요소를 CSS 선택자로 찾기
contest_titles = soup.select('#tbl-list > tr > td.title.is_star > a')

# 텍스트 정보를 출력
for title in contest_titles:
    print(title.text)

# Selenium 종료
driver.quit()

