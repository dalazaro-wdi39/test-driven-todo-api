// require express and other modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

// configure bodyParser (for receiving form data)
app.use(bodyParser.urlencoded({ extended: true }));

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

/************
 * DATABASE *
 ************/

// our database is an array for now with some hardcoded values
var todos = {
  data: [
    { _id: 7, task: 'Laundry', description: 'Wash clothes' },
    { _id: 27, task: 'Grocery Shopping', description: 'Buy dinner for this week' },
    { _id: 44, task: 'Homework', description: 'Make this app super awesome!' }
  ]
};

/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 *
 * The comments below give you an idea of the expected functionality
 * that you need to build. These are basic descriptions, for more
 * specifications, see the todosTest.js file and the outputs of running
 * the tests to see the exact details. BUILD THE FUNCTIONALITY IN THE
 * ORDER THAT THE TESTS DICTATE.
 */

app.get('/api/todos/search', function search(req, res) {
  /* This endpoint responds with the search results from the
   * query in the request. COMPLETE THIS ENDPOINT LAST.
   */

  console.log(req.query);


  var q = req.query.q;
  // if req is an ID number
  var qInt = parseInt(req.query.q);

  var foundQuery = todos.data.filter(function (todo) {
    return todo._id === q;
  })[0];


  res.send();

});

app.get('/api/todos', function index(req, res) {
  /* This endpoint responds with all of the todos
   */
  res.json(todos);
});

app.post('/api/todos', function create(req, res) {
  /* This endpoint will add a todo to our "database"
   * and respond with the newly created todo.
   */

   // create new todo with form data (`req.body`)
   var newTodo = req.body;

   // set sequential id (last id in `todos` array + 1)
   if (todos.data.length > 0) {
     newTodo._id = todos.data[todos.data.length - 1]._id + 1;
   } else {
     newTodo._id = 1;
   }

   // add newTodo to `todos` array
   todos.data.push(newTodo);

   // send newTodo as JSON response
   res.json(newTodo);


});

app.get('/api/todos/:id', function show(req, res) {
  /* This endpoint will return a single todo with the
   * id specified in the route parameter (:id)
   */

    // get todo id from url params (`req.params`)
    var todoId = parseInt(req.params.id);

    // find todo to by its id
    var foundTodo = todos.data.filter(function (todo) {
      return todo._id === todoId;
    })[0];


   // send foundTodo as JSON response
   res.json(foundTodo);

});

app.put('/api/todos/:id', function update(req, res) {
  /* This endpoint will update a single todo with the
   * id specified in the route parameter (:id) and respond
   * with the newly updated todo.
   */

    // get todo id from url params (`req.params`)
    var todoId = parseInt(req.params.id);

    // find todo to update by its id
    var todoUpdate = todos.data.filter(function (todo) {
      return todo._id === todoId;
    })[0];

    // update the todo's task
    todoUpdate.task = req.body.task;

    // update the todo's description
    todoUpdate.description = req.body.description;

    res.json(todoUpdate);
});

app.delete('/api/todos/:id', function destroy(req, res) {
  /* This endpoint will delete a single todo with the
   * id specified in the route parameter (:id) and respond
   * with success.
   */

  // get todo id from url params (`req.params`)
  var todoId = parseInt(req.params.id);

  // find todo to delete by its id
  var todoDelete = todos.data.filter(function (todo) {
      return todo._id === todoId;
  })[0];

  // remove todo from `todos` array
  todos.data.splice(todos.data.indexOf(todoDelete), 1);

  // send back deleted todo
  res.json(todoDelete);

});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(3000, function() {
  console.log('Server running on http://localhost:3000');
});
