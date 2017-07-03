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






/**
 * 通过学生ID查询学生的课程列表
 * @param  {number}   stuId   学生ID         
 * @param  {Function} callback 回调函数
 * @return {null}
 */
exports.lessonList = function(stuId,callback) {
   mysql.query({
        sql: "SELECT tbl_studentinfo.*, tbl_lesson.* FROM tbl_studentinfo,tbl_lesson WHERE tbl_studentinfo.id=:Id",
        params  : {
           "Id": stuId
        }
    }, function(err, rows) {
        if (err) {
            callback(err, null);
        }

        if (rows && rows.length > 0) {
            callback(null, rows);
        } else {
            callback(null, null);
        }
    })
}



/**
 * 通过学生ID和课程编号查询学生的课程详情
 * @param  {number}   stuId   学生ID 
 * @param  {String}   pNum   课程编号        
 * @param  {Function} callback 回调函数
 * @return {null}
 */
exports.lessonInfo = function(stuId,pNum,callback) {
   mysql.query({
        sql: "SELECT tbl_studentinfo.*, tbl_lesson.* FROM tbl_studentinfo,tbl_lesson WHERE tbl_studentinfo.id=:Id AND tbl_lesson.p=:pNum",
        params  : {
           "Id": stuId,
           "pNum": pNum
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