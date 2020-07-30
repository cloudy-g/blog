let express = require('express');
let handle = require('./model/handle');
let bodyParser = require('body-parser');

let router = express.Router();

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

router
    .get('/', (req,res) => {
        res.render('index.html', {
            user : req.session.data
        })
    })
    .get('/logout', (req, res) => {
        req.session.data = null;
        res.redirect('/');
    })
    .get('/register', (req, res) => {
        res.render('register.html');
    })
    .post('/register', urlencodedParser ,(req, res, next) => {
        handle.register(req, (err, data) => {
            if (err) {
               return next(err);
            }
            res.json(data).status(200);
        })
    })
    .get('/login', (req, res) => {
        res.render('login.html');
    }) 
    .post('/login', urlencodedParser, (req, res, next) => {
        handle.login(req, (err, data) => {
            if (err) {
                return next(err);
            }
            res.json(data).status(200);
        })
    })
    


module.exports = router;
