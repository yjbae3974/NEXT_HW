from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
from datetime import datetime
import csv


chromedriver_path = '/Users/baeyeonjun/Desktop/NEXT/Session/NEXT_Session_6/chromedriver-mac-arm64/chromedriver'

user_data_dir = '/Users/baeyeonjun/Desktop/NEXT/Session/NEXT_Session_6/cash'

chrome_options = Options()
chrome_options.add_argument(f'user-data-dir={user_data_dir}')
service = Service(executable_path=chromedriver_path)

driver = webdriver.Chrome(service=service, options=chrome_options)

driver.get('https://www.all-con.co.kr/list/contest/1/3?sortname=cl_order&sortorder=asc&stx=&sfl=&t=1&ct=&sc=&tg=')


# scrl_once = driver.find_element(By.TAG_NAME, 'body').send_keys(Keys.PAGE_DOWN)
# scrl_end = driver.execute_script("window.scrollTo(0, document.body.scrollHeight)")
# chartbtn.click()
# scrl_once
# scrl_end

time.sleep(3)

# today = datetime.now().strftime('%Y%m%d')
# file = open(f'{today}진행중인공모전.csv', mode = 'w', newline='')
# writer = csv.writer(file)
# writer.writerow(["rank","title","singer"])

infos = driver.find_elements(By.XPATH, '//*[@id="tbl-list"]/tr/td[1]/a')
print(infos)
for i, info in enumerate(infos, start = 1):
    rank = i
    title = info.find_element(By.XPATH, f'/html/body/div[2]/div/div/div[3]/table/tbody/tr[{i}]/td[1]/a').text
    #/html/body/div[2]/div/div/div[3]/table/tbody/tr[2]/td[1]/a
    juchae = info.find_element(By.XPATH, f'/html/body/div[2]/div/div/div[3]/table/tbody/tr[{i}]/td[2]').text
    gigan = info.find_element(By.XPATH, f'/html/body/div[2]/div/div/div[3]/table/tbody/tr[{i}]/td[3]').text
    status = info.find_element(By.XPATH, f'/html/body/div[2]/div/div/div[3]/table/tbody/tr[{i}]/td[4]/span').text
    print(rank, title, juchae, gigan, status)
    # print(rank, title, singer)
    #writer.writerow([rank,title,singer])

#file.close()


