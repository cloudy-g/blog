const fs = require('fs');
const User = require('./db');
var hash = require('object-hash');

//  展示首页
// const showIndex = (req, callback) => {
// }
// 注册用户
const register = (req, callback) => {
    let body = req.body;
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
//  登录
const login = async (req, callback) => {
    let data = req.body;
    // console.log(data);
    data.password = hash(data.password);
    const res =  (() => {
        return new Promise((resolve, reject) => {
            User.findOne({
                $and : [
                    {name : data.name},
                    {password : data.password}
                ]
            }, (err, data) => {
                if (err) {
                    reject(err);
                }
                resolve(data);
            })
        })
    })();
    res. 
        then((data) => {
            if (data) {
                req.session.data = data;
                callback(null, {
                    err_code : 0,
                    message : 'ok'
                })
            } else {
                callback(null, {
                    err_code : 200,
                    message : '用户名或密码不正确'
                })
            }
            
        }, (err) => {
            callback({
                err_code : 500,
                message : '服务器异常'
            })
        })
}






module.exports = {
    register,
    login,
}
