var student = require('../proxy/student.proxy');
var resUtil = require("../libs/resUtil");
var config = require('../../config/env/statusConfig');

/**
 * 通过学生学号查询学生的基本信息
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}        
 */
exports.getInfo = function(req, res, next) {
    if (!req.query.studentNum) return res.json(resUtil.generateRes(null, config.statusCode.STATUS_INVAILD_PARAMS));
    var stuNum = req.query.studentNum;
    student.getInfo(stuNum, function(err, obj) {
        if (err) {
            return res.json(resUtil.generateRes(null, config.statusCode.SERVER_ERROR));
        }
        var data = null;
        if (obj !== null) {
            data = {
                surname: obj.surname, //姓
                given_name: obj.given_name, //名
                student_num: obj.student_num, //学号
                grade: obj.grade, //年级
                gender: obj.gender === "Male" ? "boy" : "girl", //性别
                birthday: obj.birthday, //生日
                oen_num: obj.oen_num, //oen学号
                advisory_group: obj.advisory_group //导师
            }
        }
        res.json(resUtil.generateRes(data, config.statusCode.STATUS_OK));
    })

}


/**
 * 通过学生学号查询学生的成绩单
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}        
 */
exports.getMarkList = function(req, res, next) {
    if (!req.query.studentNum || !req.query.studentId) return res.json(resUtil.generateRes(null, config.statusCode.STATUS_INVAILD_PARAMS));
    var stuNum = req.query.studentNum;
    var stuId = req.query.studentId;

    student.lessonName(function(err, rows) {
        if (err) {
            return res.json(resUtil.generateRes(null, config.statusCode.SERVER_ERROR));
        }
        student.getInfo(stuNum, function(err, obj) {
            if (err) {
                return res.json(resUtil.generateRes(null, config.statusCode.SERVER_ERROR));
            }
            var dataList = [];
            if (obj != null) {
                dataList = [{
                    pCode: obj.p1 != null ? obj.p1 : "无",
                    pName: pname(obj.p1, rows),
                    pMark: obj.p1_mark != null ? obj.p1_mark : "0",
                }, {
                    pCode: obj.p2 != null ? obj.p2 : "无",
                    pName: pname(obj.p2, rows),
                    pMark: obj.p2_mark != null ? obj.p2_mark : "0",
                }, {
                    pCode: obj.p3 != null ? obj.p3 : "无",
                    pName: pname(obj.p3, rows),
                    pMark: obj.p3_mark != null ? obj.p3_mark : "0",
                }]
            }
            res.json(resUtil.generateRes(dataList, config.statusCode.STATUS_OK));


        })
    })

}




/**
 * 通过学生学号查询学生的课程列表
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}        
 */
exports.lessonList = function(req, res, next) {
    if (!req.query.studentNum || !req.query.studentId) return res.json(resUtil.generateRes(null, config.statusCode.STATUS_INVAILD_PARAMS));
    var stuNum = req.query.studentNum;
    var stuId = req.query.studentId;

    student.lessonName(function(err, nameList) {
        if (err) {
            return res.json(resUtil.generateRes(null, config.statusCode.SERVER_ERROR));
        }

        student.lessonList(stuNum, function(err, obj) {
            if (err) {
                return res.json(resUtil.generateRes(null, config.statusCode.SERVER_ERROR));
            }
            console.log(obj)
            var data = [];
            if (obj !== null) {
                for (var i = 0; i < obj.length; i++) {
                    var lesObj = {};
                    lesObj.type = 0;
                    lesObj.pNum = obj[i].p;
                    lesObj.pName = pname(obj[i][obj[i].p], nameList);
                    lesObj.pCode = obj[i][obj[i].p] != null ? obj[i][obj[i].p] : "无";
                    lesObj.startDate = dateStr(obj[i].start_date);
                    lesObj.endDate = dateStr(obj[i].end_date);
                    lesObj.startTime = obj[i].start_time;
                    lesObj.endTime = obj[i].end_time;
                    lesObj.weekly = obj[i].weekly;
                    data.push(lesObj)
                }
            }

            student.languageLes(stuId, function(err, rows) {
                if (err) {
                    return res.json(resUtil.generateRes(null, config.statusCode.SERVER_ERROR));
                }
                if (rows !== null) {
                    var lesObj = {};
                    lesObj.type = 1;
                    lesObj.pName = rows[0].name;
                    lesObj.pCode = rows[0].code;
                    lesObj.startDate = dateStr(rows[0].start_date);
                    lesObj.endDate = dateStr(rows[0].end_date);
                    lesObj.startTime = rows[0].start_time;
                    lesObj.endTime = rows[0].end_time;
                    lesObj.weekly = rows[0].weekly;
                    data.push(lesObj)
                }
                console.log(data)
                res.json(resUtil.generateRes(data, config.statusCode.STATUS_OK));
            })
        })

    })



}


/**
 * 通过学生学号和课程编号查询学生的课程详情
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}        
 */
exports.lessonInfo = function(req, res, next) {
    if (!req.query.studentNum || !req.query.pNum) return res.json(resUtil.generateRes(null, config.statusCode.STATUS_INVAILD_PARAMS));
    var stuNum = req.query.studentNum;
    student.lessonInfo(stuNum, req.query.pNum, function(err, obj) {
        if (err) {
            return res.json(resUtil.generateRes(null, config.statusCode.SERVER_ERROR));
        }

        if (obj === null) {
            return res.json(resUtil.generateRes(null, config.statusCode.STATUS_OK));
        } else {
            student.lessonName(function(err, rows) {
                if (err) {
                    return res.json(resUtil.generateRes(null, config.statusCode.SERVER_ERROR));
                }
                var data = {
                    pNum: obj.p,
                    pName: pname(obj[obj.p], rows),
                    pCode: obj[obj.p] != null ? obj[obj.p] : '无',
                    absence: obj[obj.p + '_absence'] ? obj[obj.p + '_absence'] : 0,
                    late: obj[obj.p + '_late'] ? obj[obj.p + '_late'] : 0,
                    startDate: dateStr(obj.start_date),
                    endDate: dateStr(obj.end_date),
                    startTime: obj.start_time,
                    endTime: obj.end_time,
                    weekly: obj.weekly
                };

                res.json(resUtil.generateRes(data, config.statusCode.STATUS_OK));
            })

        }
    })

}


/**
 * 时间转换为固定类型
 * @param  {object}   date  日期
 * @return {null}        
 */
function dateStr(date) {
    var year = date.getFullYear();
    var month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
    var date = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    return year + '/' + month + '/' + date;
}


//课程名
function pname(pCode, list) {
    if (list == null || pCode == null) return '无';
    for (var i = 0; i < list.length; i++) {
        if (pCode.slice(0, 5) === list[i].code) return list[i].name;
    }
    return '无';
}