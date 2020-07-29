const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/my_database', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const Schema = mongoose.Schema; 

const userSchema = new Schema({
    name : {
        type : String,
        require : true
    },
    email : {
        type : String,
        require : true
    },
    password : {
        type : String,
        require : true
    },
    createTime : {
        type : String,
        default : Date.now
    },
    gender : {
        type : Number,
        enum : [-1, 0, 1],
        default : -1
    },
    birthday : {
        type : Date,
        default : ''
    },
    bio : {
        type : String,
        default : ''
    },
    status : {
        type : Number,
        enum : [0, 1, 2],
        default : 0
    }
})
//  在这位置可以挂载方法到Schema上

module.exports = mongoose.model('User', userSchema);