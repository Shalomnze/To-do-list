// selecting elements
const form = document.getElementById("todoform")
const todoInput = document.getElementById("newtodo")
const todosListEl = document.getElementById("todos-list")

//creating a variable
let todos = []
let EditTodoId = -1;



// Submitting form
// The event listener submit fires a fuction event and this event takes in  event.preventdefault which prevents our form from refreshing our page
// prevent default and savetodo

form.addEventListener("submit" , function(event){
    event.preventDefault();

savetodo();
    // console.log("submit");


renderTodos();
})



//each todo saved in my aarray is going to be an object 
//we're saving both the unchecked ,checked value & color
//Colors are randomly generated
//we push our todo into our array
//changes your input and already existing input to uppercase then compares them to see if theyre the same


//save todo
function savetodo(){
    const todoValue = todoInput.value;


    //check if the todo is empty
    const isEmpty = todoValue === "";

    //check for duplicate todos
  const isDuplicate = todos.some((todo) => todo.value.toUpperCase() === todoValue.toUpperCase());
     

    if(isEmpty) {
        alert("todo's input is empty");
    }

    else if(isDuplicate){
   alert("todo already exist");
    }
    else {
    if(EditTodoId >=0 ){
        todos = todos.map((todo, index) => ({
                ...todo,
                value: index === EditTodoId ? todoValue : todo.value,
            }));
            EditTodoId = -1;
    }
    else{todos.push({
        value: todoValue,
        checked: false,
        color: "#" + Math.floor(Math.random()*16777215).toString(16),
    }
)}
    
    todoInput.Value ="";

    }
 }
   
//rendering the todos to our index.html
function renderTodos(){

    
    //clear the html elements from index.html before rendering by equating the innerhtml to an empty string :
    
    todosListEl.innerHTML = ""

    //Rendering
    //the data-action makes it possible to add a "function" be it to edit or check or delete
    //this todo.forEach is a callback function, the callback takes the first parament as the element & the second parameter is going to be our index (0,1,2,3,4 etc)
    todos.forEach((todo, index) =>{
        todosListEl.innerHTML += 
    
        `<div class="todo" id="${index}">

            <i
            class="bi ${todo.checked ?  "bi-check-circle-fill" : "bi-circle" }"
            style = "color : ${todo.color}"
            data-action="check"
            ></i>
            <p class="" data-check="check">${todo.value}</p>
            <i class="bi bi-pencil-square" data-action="edit"></i>
            <i class="bi bi-trash" data-action="delete"></i>

        </div>`

    })

}

//add an eventlistener for the buttons for all the todos by adding it to the element
//each todo is identifed by its id
todosListEl.addEventListener("click", (event) =>{
    const target = event.target;
    const parentElement = target.parentNode;


    if (parentElement.className !== "todo") return;
    
    //todo id
    const todo = parentElement;
    const todoId = Number (todo.id);

    //to target the actions
    const action = target.dataset.action

    action === "check" && checkTodo(todoId);
    action === "edit" && EditTodo(todoId);
    // action === "delete" && deleteTodo(todoId);
});

// creating our checkTodo function

function checkTodo (todoId){
    todos = todos.map((todo, index) => ({
                // the spread opperator copies the properties from the old todo
                ...todo,
                checked : index === todoId ? !todo.checked : todo.checked,
    }))
    renderTodos();
}


// creating our edit function


//we wanty to change our todoInput

function editTodo (todoId){
    
todoInput.value = todos[todoId].value;
EditTodoId = todoId;

}