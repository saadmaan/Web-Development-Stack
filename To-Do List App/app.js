//selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//event listener
document.addEventListener("DOMContentLoaded", getTodos)
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);
//function
function addTodo(event){
	//console.log("hello");
	//prevent form from submitting
	event.preventDefault();
	//todoDiv
	const todoDiv = document.createElement('div');
	todoDiv.classList.add('todo');
	//create li
	const newTodo = document.createElement('li');
	newTodo.classList.add('todo-item');
	newTodo.innerText = todoInput.value;
	todoDiv.appendChild(newTodo);
	// Add Todo to localstorage
	savelocalTodos(todoInput.value);
	//check mark button
	const completedButton = document.createElement('button');
	completedButton.innerHTML = '<i class = "fas fa-check"></i>';
	completedButton.classList.add('complete-btn');
	todoDiv.appendChild(completedButton);
	//trash button
	const trashButton = document.createElement('button');
	trashButton.innerHTML = '<i class = "fas fa-trash"></i>';
	trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);
    //append to list
    todoList.appendChild(todoDiv);
     todoInput.value = "";
}

function deleteCheck(e) {
	const item = e.target;
	//delete todo
    if(item.classList[0] === 'trash-btn'){
        const todo = item.parentElement;
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener("transitionend", function(){
        	todo.remove();
        } )
    	
    }

    //check mark
    if(item.classList[0] === 'complete-btn'){
        const todo = item.parentElement;
    	todo.classList.toggle("completed");
    }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function(todo){
  	switch (e.target.value){
  		case 'all':
  		  todo.style.display = 'flex';
  		  break;
  		case 'completed':
  		  if (todo.classList.contains('completed')){
  		  	 todo.style.display = 'flex';
  		  }else todo.style.display = 'none';
  		break;
  		case 'uncompleted':
  		  if (todo.classList.contains('completed')){
  		  	 todo.style.display = 'none';
  	      }else todo.style.display = 'flex';
  	    break;
  }});
}

function savelocalTodos(todo){
	let todos;
	if (localStorage.getItem("todostest")=== null){
		todos = [];
	}
	else {
		todos = JSON.parse(localStorage.getItem("todostest"));
	}
	todos.push(todo);
	localStorage.setItem("todostest", JSON.stringify(todos));
}

function getTodos(){
	let todos;
	if (localStorage.getItem("todostest")=== null){
		todos = [];
	}
	else {
		todos = JSON.parse(localStorage.getItem("todostest"));
	}
	todos.forEach(function(todo){
	//todoDiv
	const todoDiv = document.createElement('div');
	todoDiv.classList.add('todo');
	//create li
	const newTodo = document.createElement('li');
	newTodo.classList.add('todo-item');
	newTodo.innerText = todo;
	todoDiv.appendChild(newTodo);
	// Add Todo to localstorage
	//savelocalTodos(todo);
	//check mark button
	const completedButton = document.createElement('button');
	completedButton.innerHTML = '<i class = "fas fa-check"></i>';
	completedButton.classList.add('complete-btn');
	todoDiv.appendChild(completedButton);
	//trash button
	const trashButton = document.createElement('button');
	trashButton.innerHTML = '<i class = "fas fa-trash"></i>';
	trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);
    //append to list
    todoList.appendChild(todoDiv);

	});
}

function removeLocalTodos(todo){
	let todos;
	if (localStorage.getItem("todostest")=== null){
		todos = [];
	}
	else {
		todos = JSON.parse(localStorage.getItem("todostest"));
	}
	const todoIndex = todo.children[0].innerText;
	todos.splice(todos.indexOf(todoIndex), 1);
	localStorage.setItem("todostest", JSON.stringify(todos));
}