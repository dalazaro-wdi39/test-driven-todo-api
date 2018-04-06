// wait for DOM to load before running JS
$(document).ready(function() {

  // base API route
  const baseUrl = '/api/todos';

  // array to hold todo data from API
  let allTodos = [];

  // element to display list of todos
  const $todosList = $('#todos-list');

  // form to create new todo
  const $createTodo = $('#create-todo');

  // compile handlebars template
  const source = $('#todos-template').html();
  const template = Handlebars.compile(source);

  // helper function to render all todos to view
  // note: we empty and re-render the collection each time our todo data changes
  function render() {
    // empty existing todos from view
    $todosList.empty();

    // pass `allTodos` into the template function
    const todosHtml = template({ todos: allTodos });

    // append html to the view
    $todosList.append(todosHtml);
  };

  // GET all todos on page load
  $.ajax({
    method: "GET",
    url: baseUrl,
    success: function onIndexSuccess(json) {
      console.log(json);

      // assign `allTodos` array the data (json.data) from API
      allTodos = json.reverse();

      // render all todos to view
      render();
    }
  });

  // listen for submit even on form
  $createTodo.on('submit', function (event) {
    event.preventDefault();

    // serialze form data
    const newTodo = $(this).serialize();

    // POST request to create new todo
    $.ajax({
      method: "POST",
      url: baseUrl,
      data: newTodo,
      success: function onCreateSuccess(json) {
        // add new todo to `allTodos`
        allTodos.unshift(json);
        
        // render all todos to view
        render();
      }
    });

    // reset the form
    $createTodo[0].reset();
    $createTodo.find('input').first().focus();
    
  });

  // add event-handlers to todos for updating/deleting
  $todosList

    // for update: submit event on `.update-todo` form
    .on('submit', '.update-todo', function (event) {
      event.preventDefault();

      // find the todo's id (stored in HTML as `data-id`)
      const todoId = $(this).closest('.todo').attr('data-id');

      // find the todo to update by its id
      const todoUpdate = allTodos.find( todo => {
        return todo._id == todoId;
      });

      // serialze form data
      const updatedTodo = $(this).serialize();

      // PUT request to update todo
      $.ajax({
        type: 'PUT',
        url: baseUrl + '/' + todoId,
        data: updatedTodo,
        success: function onUpdateSuccess(json) {
          // replace todo to update with newly updated version (json)
          allTodos.splice(allTodos.indexOf(todoUpdate), 1, json);
          
          render();
        }
      });
    })

    // for delete: click event on `.delete-todo` button
    .on('click', '.delete-todo', function (event) {
      event.preventDefault();
      console.log('delete clicked!');

      // find the todo's id (stored in HTML as `data-id`)
      const todoId = $(this).closest('.todo').attr('data-id');

      // find the todo to delete by its id
      const todoToDelete = allTodos.find( todo => {
        if (todo._id == todoId) {
          return todo;
        };
      });

      // DELETE request to delete todo
      $.ajax({
        type: 'DELETE',
        url: baseUrl + '/' + todoId,
        success: function onDeleteSuccess(json) {
          // remove deleted todo from all todos
          allTodos.splice(allTodos.indexOf(todoToDelete), 1);

          console.log('deleted!');

          // render all todos to view
          render();
        }
      });
    });

});
