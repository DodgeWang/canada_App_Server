
var user = require('../app/controllers/user.controller');
var student = require('../app/controllers/student.controller');

module.exports = function(app) {
    app.get('/user/list',user.getList); //获取用户列表
    app.get('/api/studentInfo',student.getInfo); //获取学生基本信息
}