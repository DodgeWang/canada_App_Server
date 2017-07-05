var user = require('../proxy/user.proxy');
var resUtil  = require("../libs/resUtil");
var config = require('../../config/env/statusConfig');
var encryption = require("../func/encryption");




/**
 * 用户登录
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}        
 */
exports.login = function(req, res, next) {
    if (!req.body.username || !req.body.password) return res.json(resUtil.generateRes(null, config.statusCode.STATUS_INVAILD_PARAMS));
    
    user.login(req.body.username, function(err, rows) {
        if (err) {
            return res.json(resUtil.generateRes(null, config.statusCode.SERVER_ERROR));
        }
        if(rows === null){
            return res.json(resUtil.generateRes(null, config.AdminStatus.USER_ERROR));
        }

        var password = encryption.md5(req.body.password,32);
        if(password == rows.password){
            //登陆账号密码都正确
            req.session.userInfo = rows;
            var data = {
                id:rows.id,
                username:rows.username,
                studentId:rows.studentId
            }
            res.json(resUtil.generateRes(data, config.AdminStatus.SUCCESS));
        }else{
            //登陆密码错误
            res.json(resUtil.generateRes(null, config.AdminStatus.PASSWORD_ERROR));
        }  
    })

}

/**
 * 修改用户密码
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}        
 */
exports.resetPassword = function(req, res, next){
    if(!req.body.oldpassword  || !req.body.newpassword) return res.json(resUtil.generateRes(null, config.statusCode.STATUS_INVAILD_PARAMS));

    if(encryption.md5(req.body.oldpassword,32) !== req.session.userInfo.password){
        res.json(resUtil.generateRes(null, config.AdminStatus.PASSWORD_ERROR));
    }

    var userId = req.session.userInfo.id;
    var newpass = req.body.newpassword;

    user.resetPassword(userId, newpass, function(err) {
        if (err) {
            return res.json(resUtil.generateRes(null, config.statusCode.SERVER_ERROR));
        }
        res.json(resUtil.generateRes(null, config.statusCode.STATUS_OK));
    })

}






