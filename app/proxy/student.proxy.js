var mysql = require('../../config/mysql');

/**
 * 通过学生学号查询学生的基本信息
 * @param  {number}   stuNum   学生学号        
 * @param  {Function} callback 回调函数
 * @return {null}
 */
exports.getInfo = function(stuNum,callback) {
   mysql.query({
        sql: "SELECT * FROM tbl_studentinfo WHERE student_num=:stuNum order by id desc",
        params  : {
           "stuNum": stuNum
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
 * 通过学生学号查询学生的课程列表
 * @param  {number}   stuNum   学生学号        
 * @param  {Function} callback 回调函数
 * @return {null}
 */
exports.lessonList = function(stuNum,callback) {
   mysql.query({
        sql: "SELECT tbl_studentinfo.*, tbl_lesson.* FROM tbl_studentinfo,tbl_lesson WHERE tbl_studentinfo.student_num=:stuNum order by tbl_studentinfo.id desc limit 3",
        params  : {
           "stuNum": stuNum
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
 * 通过学生学号和课程编号查询学生的课程详情
 * @param  {number}   stuNum   学生学号 
 * @param  {String}   pNum   课程编号        
 * @param  {Function} callback 回调函数
 * @return {null}
 */
exports.lessonInfo = function(stuNum,pNum,callback) {
   mysql.query({
        sql: "SELECT tbl_studentinfo.*, tbl_lesson.* FROM tbl_studentinfo,tbl_lesson WHERE tbl_studentinfo.student_num=:stuNum AND tbl_lesson.p=:pNum order by tbl_studentinfo.id desc",
        params  : {
           "stuNum": stuNum,
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