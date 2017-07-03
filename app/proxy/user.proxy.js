var mysql = require('../../config/mysql');
var encryption = require("../func/encryption");



/**
 * 根据用户名查询用户信息  
 * @param  {String} username 回调函数  
 * @param  {Function} callback 回调函数
 * @return {null}
 */
exports.login = function(username,callback) {
   mysql.query({
        sql: "SELECT * FROM tbl_user WHERE username=:username",
        params  : {
           "username": username
        }
    }, function(err, rows) {
        if (err) {
            callback(err, null);
        }

        if (rows && rows.length > 0) {
            callback(null, rows[0]);
        } else {
            callback(null, null);
        }
    })
}




/**
 * 重置用户密码
 * @param  {number}   userId   用户ID
 * @param  {String}   newpass   用户新密码        
 * @param  {Function} callback 回调函数
 * @return {null}
 */
exports.resetPassword = function(userId,newpass,callback) {
   var newPass = encryption.md5(newpass,32);
   // var sqls = "UPDATE tbl_user SET password='" + newPass + "' WHERE id=" + userId;
   mysql.query({
        sql: "UPDATE tbl_user SET password = :newPass WHERE id = :userId",
        params  : {
           "newPass": newPass,
           "userId": userId
        }
    }, function(err, rows) {
        if (err) {
            callback(err);
        }
        callback(null);
    })
}