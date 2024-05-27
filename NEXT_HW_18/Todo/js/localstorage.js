const username = document.querySelector('.username')
const usernameWrapper = document.querySelector('.usernameWrapper')
const header = document.querySelector('#header')

const setUserName = () =>{
    window.localStorage.setItem('username', username.value)
    checkUserName()
}

const checkUserName = () => {
    const checkName = window.localStorage.getItem('username');
    if(checkName){
        header.classList.remove('hidden'); // hidden 클래스를 제거하고
        usernameWrapper.classList.add('hidden'); // username 입력을 숨깁니다.
        header.innerHTML = `${checkName}의 Todo List <button style="width: 10%" type="button" onclick="resetUserName()">초기화</button>`;
    }
    else{
        header.classList.add('hidden'); // header를 숨기고
        usernameWrapper.classList.remove('hidden'); // username 입력을 보여줍니다.
    }
}


const resetUserName = () =>{
    window.localStorage.removeItem('username')
    username.value = null;
    checkUserName();

}

window.addEventListener('load', checkUserName);