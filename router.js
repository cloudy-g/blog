let express = require('express');
let handle = require('./model/handle');
let bodyParser = require('body-parser');

let router = express.Router();

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

router
    .get('/', (req,res) => {
        // console.log();
        res.render('index.html', {
            user : req.session.data
        })
    })
    .get('/register', (req, res) => {
        res.render('register.html');
    })
    .post('/register', urlencodedParser ,(req, res) => {
        handle.register(req, (err, data) => {
            if (err) {
                res.json(err).status(500);
                return;
            }
            res.json(data).status(200);
        })
    })
    .get('/login', (req, res) => {
        res.render('login.html');
    }) 


module.exports = router;
