var todosList = {
  todos: [], // Set the Todo list as an array
  
  // display each task in the list complete with it's status
  //displayTodos: function() {
  //  if (this.todos.length === 0) { // check to see if list is empty
  //    console.log('Todo List is empty!!');
  //  } else {
  //    console.log ('My Todos:');
  //    for (var i = 0; i < this.todos.length; i++) { // repeat loop for full length of list
  //      if (this.todos[i].completed === true) {
  //        console.log('(x)', this.todos[i].todoText); // print completed item
  //      } else {
  //        console.log('( )', this.todos[i].todoText); // print incomplete item
  //      }
  //    }
  //  }
  //},
  
  // add a new Todo object to the list with an uncompleted status
  addTodo: function(todoText) { //add a new task to the end of the list
    this.todos.push({
      todoText: todoText, // Add text of the todo item
      completed: false // set the completed state
    });
  },
  
  // change Todo text to new text value
  changeTodo: function(position, todoText) { // select position to change and new text to enter
    this.todos[position].todoText = todoText;
  },
  
  // remove a Todo task from the list
  deleteTodo: function(position) {
    this.todos.splice(position, 1);  // starting position and number of entries to splice/delete
  },
  
  // change the completed status of the task
  toggleCompleted: function(position) { // select position to change
    var todo = this.todos[position];
    todo.completed = !todo.completed;
  },
  
  // Toggle all tasks to completed or uncompleted
  toggleAll: function () {
    var totalTodos = this.todos.length;
    var completedTodos = 0;
    
    this.todos.forEach(function(todo) {
      if (todo.completed === true) {
        completedTodos++;
      }
    });
    
    this.todos.forEach(function(todo) {
      //case 1: If everything's true, make everything false
      if (completedTodos === totalTodos) {
        todo.completed = false;
      // Case 2: Otherwise make everything false
      } else{
        todo.completed = true;
      }
    });
  }
}

//neat grouping of functions for easy recognition on html button 'onclick' attribute
var handlers={ 
  addTodo: function(){
    var addTodoTextInput = document.getElementById('addTodoTextInput');
    todosList.addTodo(addTodoTextInput.value);
    addTodoTextInput.value = "";
    view.displayTodos();
  },
  changeTodo: function(){
    var changeTodoPositionInput = document.getElementById('changeTodoPositionInput');
    var changeTodoTextInput = document.getElementById('changeTodoTextInput');
    todosList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
    changeTodoPositionInput.value = "";
    changeTodoTextInput.value = "";
    view.displayTodos();
  },
  deleteTodo: function(position){
    //var deleteTodoPositionInput = document.getElementById('deleteTodoPositionInput');
    todosList.deleteTodo(position);
    //deleteTodoPositionInput.value = "";
    //todosList.deleteTodo(position);
    view.displayTodos();
  },
  toggleCompleted: function(){
    var toggleCompletedPositionInput = document.getElementById('toggleCompletedPositionInput');
    todosList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);
    toggleCompletedPositionInput.value = "";
    view.displayTodos();
  },
  toggleAll: function(){
  todosList.toggleAll();
  view.displayTodos()
  }
};

//update and refresh display of todo list on each change
var view = {
  displayTodos: function(){
    var todosUl = document.querySelector('ul');
    todosUl.innerHTML = "";
        
    todosList.todos.forEach(function(todo, position) {
      var todoLi = document.createElement('li');
      var todoTextWithCompletion = '';
      
      if(todo.completed===true) {
        todoTextWithCompletion = '(x) ' + todo.todoText;
      } else {
        todoTextWithCompletion = '( ) ' + todo.todoText;
      };
      
      todoLi.id = position;
      todoLi.textContent = todoTextWithCompletion;
      todoLi.appendChild(this.createDeleteButton());
      todosUl.appendChild(todoLi);
    }, this);
  },
  
  createDeleteButton: function() {
    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'deleteButton';
    return deleteButton;
  },
  
  setUpEventListeners: function() {
    var todosUl = document.querySelector('ul');

    todosUl.addEventListener('click', function(event) {
      // get the element clicked on
      var elementClicked = event.target;

      // Check if elementClicked is a delete button
      if (elementClicked.className === 'deleteButton') {
      // Run handlers.deleteTodo(position).
        handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
      }
    });
  }  
};
  
view.setUpEventListeners();
   

