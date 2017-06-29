var mysql = require('../../config/mysql');

/**
 * 通过学生ID查询学生的基本信息
 * @param  {number}   stuId   学生ID         
 * @param  {Function} callback 回调函数
 * @return {null}
 */
exports.getInfo = function(stuId,callback) {
   mysql.query({
        sql: "SELECT * FROM tbl_studentinfo WHERE id=:Id",
        params  : {
           "Id": stuId
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
