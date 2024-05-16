const todoList = document.querySelector('#todo-list');
const submitbtn = document.querySelector('.submitBtn');
const todoInput = document.querySelector('#content');

const loadTodos = () => {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.forEach((todo, index) => {
        addTodoToList(todo, index);
    });
};

const addTodoToList = (todo, index) => {
    const li = document.createElement('li');
    li.innerHTML = `${todo} <button class='delete-todo' data-index='${index}'>삭제하기</button>`;
    todoList.appendChild(li);
    li.querySelector('.delete-todo').addEventListener('click', deleteTodo);
};

const addTodo = (e) => {
    e.preventDefault();
    const todo = todoInput.value.trim();
    if (todo) {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos.push(todo);
        localStorage.setItem('todos', JSON.stringify(todos));
        addTodoToList(todo, todos.length - 1);
        todoInput.value = ''; // 입력 필드 초기화
    }
};

const saveTodo = (todo) => {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
};

const deleteTodo = (e) => {
    const index = e.target.getAttribute('data-index'); // data-index 속성을 사용하여 인덱스를 가져옴
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.splice(index, 1); // 해당 인덱스의 할 일 제거
    localStorage.setItem('todos', JSON.stringify(todos));
    e.target.parentNode.remove(); // UI에서 li 요소 제거
};

// 이벤트 리스너 추가
submitbtn.addEventListener('click', addTodo);
window.addEventListener('load', loadTodos);
