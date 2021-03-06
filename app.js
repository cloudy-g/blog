let path = require('path');
let express = require('express');
let router = require('./router');
let session = require('express-session');

let app = express();

app.use('/public/', express.static(path.join(__dirname, '/public')));
app.use('/node_modules', express.static(path.join(__dirname, '/node_modules')));

app.engine('html', require('express-art-template'));
app.set('views', path.join(__dirname, '/views'));

// app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: 'gyblog',
    resave: false,
    saveUninitialized: false
//   cookie: { secure: true }
}))

app
    .use(router)
    .use((req, res) => {
        res.render('404.html');
    })
    .use((err, req, res, next) => {
            res.json({
                message: err.message,
                err_code : 500
            }).status(500);
    })
    .listen(3000, () => {
        console.log('http://localhost:3000');
    })