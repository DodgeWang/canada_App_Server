var mysql = require('../../config/mysql');
var encryption = require("../func/encryption");


/**
 * 查询用户列表
 * @param  {number}   page   查询页数     
 * @param  {number}   size   查询条数     
 * @param  {Function} callback 回调函数
 * @return {null}
 */
exports.getList = function(page,size,callback) {
   var limit_Start = (page - 1) * size; 
   mysql.query({
        sql: "SELECT id,username FROM tbl_user order by id desc limit :limit_Start,:size",
        params  : {
           "limit_Start": limit_Start,
           "size": size
        }
    }, function(err, rows) {
        if (err) {
            callback(err, null);
        }

        if (rows && rows.length > 0) {
            callback(null, rows);
        } else {
            callback(null, []);
        }
    })
}



/**
 * 重置用户密码
 * @param  {number}   userId   用户ID     
 * @param  {Function} callback 回调函数
 * @return {null}
 */
exports.resetPassword = function(userId,callback) {
   var newPass = encryption.md5('123456',32);
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