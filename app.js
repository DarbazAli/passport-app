const express = require('express')
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const localStrategy = require('passport-local');



const app = express();

app.listen(3000, () => console.log("Listening on 3000"))

// setup template engine
app.set('views', './views');
app.set('view engine', 'pug');

// serve static files
app.use(express.static(__dirname + '/public'));


// setup session
app.use(session({
    secret: 'my_top_secret',
    resave: true,
    saveUninitialized: true
}))

// create the home url
app.get('/', (req, res) => {
    res.render('index', {title: 'Home', message: "Hello There"})
})

app.get('/about', (req, res) => {
    res.render('about')
})


app
    .route('/login')
    .get((req, res) => res.render('login'))


app
    .route('/dashboard')
    .get((req, res) => res.render('dashboard'))