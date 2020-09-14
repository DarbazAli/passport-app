const express = require('express')
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;



const app = express();

app.listen(3000, () => console.log("Listening on 3000"))

// setup template engine
app.set('views', './views');
app.set('view engine', 'pug');

// serve static files
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


// setup session
app.use(session({
    secret: 'my_top_secret',
    resave: true,
    saveUninitialized: true
}))


// setup passport middlware setup
app.use(passport.initialize());
app.use(passport.session());



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

    .post(passport.authenticate('local', {
        failureRedirect: '/login',
        successRedirect: '/dashboard'
    }))


passport.use( new localStrategy( 
    (username, password, done) => {
        if ( username == 'test@gmail.com' && password == '1234') {
            return done(null, {username: 'test@gmail.com'})
        }

        else {
           return done(null, false)
        }
    }
 ))


 passport.serializeUser((user, done) =>  {
     done(null, user.username)
 })

 passport.deserializeUser((username, done) => {
     done(null, {username: username})
 })

app
    .route('/dashboard')
    .get( isLoggedIn, (req, res) => res.render('dashboard'))




function isLoggedIn(req, res, next) {
    if ( req.isAuthenticated()) {
        return next()
    }

    else {
       return res.redirect('/login')
    }
}