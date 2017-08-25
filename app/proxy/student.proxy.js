var mysql = require('../../config/mysql');

/**
 * 通过学生学号查询学生的基本信息
 * @param  {number}   stuNum   学生学号        
 * @param  {Function} callback 回调函数
 * @return {null}
 */
exports.getInfo = function(stuNum, callback) {
    mysql.query({
        sql: "SELECT * FROM tbl_studentinfo WHERE student_num=:stuNum order by id desc",
        params: {
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
exports.lessonList = function(stuNum, callback) {
    mysql.query({
        sql: "SELECT tbl_studentinfo.*, tbl_lesson.* FROM tbl_studentinfo,tbl_lesson WHERE tbl_studentinfo.student_num=:stuNum order by tbl_studentinfo.id desc limit 4",
        params: {
            "stuNum": stuNum
        }
    }, function(err, rows) {
        if (err) {
            callback(err, null);
        }

        if (rows && rows.length > 0) {
            var data = []
            for (var i = 0; i < rows.length; i++) {
                if (rows[i].p === 'p4') continue;
                data.push(rows[i])
            }

            for (var i = 0; i < data.length - 1; i++) {
                for (var j = 0; j < data.length - i - 1; j++) {
                    if (Number(data[j].p.slice(1)) > Number(data[j + 1].p.slice(1))) {
                        var str = data[j];
                        data[j] = data[j + 1];
                        data[j + 1] = str;
                    }
                }
            }

            callback(null, data);
        } else {
            callback(null, null);
        }
    })
}



/**
 * 通过学生ID查询学生的语言课
 * @param  {number}   id   学生id       
 * @param  {Function} callback 回调函数
 * @return {null}
 */

exports.languageLes = function(id, callback) {
    mysql.query({
        sql: "SELECT tbl_lessonName.*, tbl_lesson.* FROM tbl_lessonName,tbl_lesson WHERE tbl_lessonName.code='AAAAA' AND tbl_lesson.p='p4' order by tbl_lessonName.id desc limit 1",
        params: {
            "id": id
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
exports.lessonInfo = function(stuNum, pNum, callback) {
    mysql.query({
        sql: "SELECT tbl_studentinfo.*, tbl_lesson.* FROM tbl_studentinfo,tbl_lesson WHERE tbl_studentinfo.student_num=:stuNum AND tbl_lesson.p=:pNum order by tbl_studentinfo.id desc",
        params: {
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


/**
 * 获取课程和对应课程名        
 * @param  {Function} callback 回调函数
 * @return {null}
 */
exports.lessonName = function(callback) {
    mysql.query({
        sql: "SELECT * FROM tbl_lessonName order by id desc",
        params: {}
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