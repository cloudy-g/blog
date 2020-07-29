const fs = require('fs');
const User = require('./db');
var hash = require('object-hash');

//  展示首页
// const showIndex = (req, callback) => {
// }
// 注册用户
const register = (req, callback) => {
        let body = req.body;
    
    // new Promise((resolve, reject) => {
    //     User.findOne({
    //         $or : [{
    //             name : body.name
    //         },{
    //             email : body.email
    //         }]
    //     },(err, data) => {
    //         if (err) {
    //             reject(err);
    //         }
    //         resolve(body);
    //     })
    // })
    // .then((data) => {
    //     let user = new User(data);
    //     user.password = hash(user.password);
    //     user.save((err, data) => {
    //         if (err) {
    //             reject(err);
    //         }
    //         resolve(data);
    //     })
    // }, (err) => {
    //     callback({
    //         err_code : 1,
    //         message : '服务端异常'
    //     });
    // })

    User.findOne({
        $or : [{
            name : body.name
        },{
            email : body.email
        }]
    }, (err, data) => {
        if (err) {
            callback({
                err_code : 1,
                message : '服务端异常'
            });
            return;
        }
        if (data) {
            callback({
                err_code : 500,
                message : '邮箱或者用户名已经使用'
            })
            return;
        }
        let user = new User(body);
        user.password = hash(user.password);
        user.save((err, data) => {
            if (err) {
                callback(err);
                return;
            }
            req.session.data = data;
            callback(null, {
                err_code : 0,
                message : 'OK'
            });
        })

    })

}













module.exports = {
    register,
}
