const username = document.querySelector('.username')
const usernameWrapper = document.querySelector('.usernameWrapper')
const header = document.querySelector('#header')

const setUserName = () =>{
    window.localStorage.setItem('username', username.value)
    checkUserName()
}

const checkUserName = () =>{
    const checkName = window.localStorage.getItem('username')
    if(checkName){
        header.classList.toggle('hidden')
        usernameWrapper.classList.toggle('hidden')
        header.innerHTML = `${checkName}의 Todo List <button style="width: 10%" type="button" onclick="resetUserName()">초기화</button>`

    }
    else{
        header.classList.toggle('hidden')
        usernameWrapper.classList.toggle('hidden')
    }
}


const resetUserName = () =>{
    window.localStorage.removeItem('username')
    username.value = null;
    checkUserName();

}