max = int(input('숫자게임 최댓값을 입력해주세요: '))
min = 0
cnt = 1
while True:
    mid = (min + max) // 2
    boolean = str(input(f"당신이 생각한 숫자는 {mid}입니까? \n 제가 맞췄다면 '맞음', 제가 제시한 숫자보다 크다면 '큼', 제가 제시한 숫자보다 작다면 '작음'을 입력해주세요: "))
    if boolean == '큼':
        min = mid   
        cnt += 1
        continue
    elif boolean == '작음':
        max = mid
        cnt += 1
        continue
    elif boolean == '맞음':
        print(f'{cnt}번 만에 맞췄다.')
        break
    else:
        print('맞지 않는 값을 입력하셨습니다. 다시 입력해주세요.')
        continue
        
    