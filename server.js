// require express and other modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');
    db = require('./models');

// configure bodyParser (for receiving form data)
app.use(bodyParser.urlencoded({ extended: true }));

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

// /************
//  * DATABASE *
//  ************/

// // our database is an array for now with some hardcoded values
// var todos = [
//   { _id: 7, task: 'Laundry', description: 'Wash clothes' },
//   { _id: 27, task: 'Grocery Shopping', description: 'Buy dinner for this week' },
//   { _id: 44, task: 'Homework', description: 'Make this app super awesome!' }
// ]

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
  query in the request. COMPLETE THIS ENDPOINT LAST. */

  var searchTodos = req.query.q;
  console.log(searchTodos);

  //callback for finding the items that match the query
  function search(items) {
    if ( items.task.toLowerCase().includes( searchTodos.toLowerCase() ) || items.description.toLowerCase().includes( searchTodos.toLowerCase() ) ) {
      return true;
    }
  }

  var todoResult = todos.filter(search);
  console.log(todoResult);

  res.json({ data : todoResult });

});

app.get('/api/todos', function index(req, res) {
  // This endpoint responds with all of the todos
  db.Todo.find({}, function(err, results){
    res.json(results);
  })

});

app.post('/api/todos', function create(req, res) {
  /* This endpoint will add a todo to our "database"
  and respond with the newly created todo. */

  // create new todo with form data (`req.body`)
  var newTodo = req.body;

  let todo = new db.Todo(newTodo);
  todo.save(function(err, savedTodo){
    console.log(err);
    res.json(savedTodo);
  });

});

app.get('/api/todos/:id', function show(req, res) {
  /* This endpoint will return a single todo with the
  id specified in the route parameter (:id) */

  // get todo id from url param
  var todoId = req.params.id;

  db.Todo.findById(todoId, function(err, foundTodo){
    console.log(err);
    res.json(foundTodo);
  })

});

app.put('/api/todos/:id', function update(req, res) {
  /* This endpoint will update a single todo with the
  id specified in the route parameter (:id) and respond
  with the newly updated todo. */

  // get todo id from url param
  var todoId = req.params.id;

  db.Todo.findOneAndUpdate({ _id: todoId }, { $set: { task: req.body.task, description: req.body.description } }, { new: true }, function (err, todo) {
    console.log(err);
    res.json(todo);
  });

});

app.delete('/api/todos/:id', function destroy(req, res) {
  /* This endpoint will delete a single todo with the
  id specified in the route parameter (:id) and respond
  with success. */

  // get todo id from url param
  var todoId = req.params.id;

  db.Todo.findOneAndRemove({
    _id: todoId
  }).then(todo => {
    res.json(todo);
  });

});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function() {
  console.log('Server running on http://localhost:3000');
});
