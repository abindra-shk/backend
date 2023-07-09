const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const todoRoutes = require('./modules/todo/todo.routes');
const app = express();
const router = express.Router();
const todoController = require('./modules/todo/todo.controller')
app.listen(8081, () => {
    console.log(`API is listening on port 8081`);
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

router.get('/',(req, res) => {
    res.send(`<h2>Hello from</h2>`);
});

router.get('/test',(req, res) => {
    res.send(`<h2>Hello this is test route</h2>`);
});

router.get('/test/:id/:bd',(req, res) => {
    res.send(`<h2>Hello this is test ${req.params.id}</h2>`);
});

router.post('/product',(req, res) => {
    console.log(req.body);
    res.send(`<h2>Hello this is test </h2>`);
});

router.post('/card',(req, res) => {
    console.log(req.body);
    res.send(`<h2>Welcome to card </h2>`);
});
// router.put('/product',updateProduct);
// router.put('/card',updateCard);

mongoose.connect("mongodb+srv://abindrashakya:abs12345678@firstproject.9lljnan.mongodb.net");
const database = mongoose.connection;
database.on('error', (error) => {
    console.log(error)
});
app.use('/todo',todoRoutes)
// router.get('/todo', todoController.getAllTodo);
// router.post('/todo', todoController.createTodo);
// router.put('/todo/:id', todoController.updateTodo);
// router.delete('/todo/:id', todoController.deleteTodo);

database.once('connected', () => {
    console.log('Database Connected');
});

app.use("/", router);
