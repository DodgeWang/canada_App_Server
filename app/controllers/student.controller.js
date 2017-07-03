var student = require('../proxy/student.proxy');
var resUtil = require("../libs/resUtil");
var config = require('../../config/env/statusConfig');

/**
 * 通过学生Id查询学生的基本信息
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}        
 */
exports.getInfo = function(req, res, next) {
    if (!req.query.studentId) return res.json(resUtil.generateRes(null, config.statusCode.STATUS_INVAILD_PARAMS));
    var stuId = Number(req.query.studentId);
    student.getInfo(stuId, function(err, obj) {
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
                gender: obj.gender, //性别
                birthday: obj.birthday.getFullYear()+'-'+(obj.birthday.getMonth()+1)+'-'+obj.birthday.getDate(), //生日
                oen_num: obj.oen_num, //oen学号
                advisory_group: obj.advisory_group //导师
            }
        }
        res.json(resUtil.generateRes(data, config.statusCode.STATUS_OK));
    })

}


/**
 * 通过学生Id查询学生的成绩单
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}        
 */
 exports.getMarkList = function(req, res, next){
    if (!req.query.studentId) return res.json(resUtil.generateRes(null, config.statusCode.STATUS_INVAILD_PARAMS));
    var stuId = Number(req.query.studentId);
    student.getInfo(stuId, function(err, obj) {
        if (err) {
            return res.json(resUtil.generateRes(null, config.statusCode.SERVER_ERROR));
        }
        var data = null;
        if (obj !== null) {
            console.log(obj)
            data={
                accumulatedCredit: obj.accumulated_credit, //已得积分
                lessonList: [{
                    pCode:obj.p1,
                    pName:obj.p1_name,
                    pMark:obj.p1_mark,
                },{
                    pCode:obj.p2,
                    pName:obj.p2_name,
                    pMark:obj.p2_mark,
                },{
                    pCode:obj.p3,
                    pName:obj.p3_name,
                    pMark:obj.p3_mark,
                }]
            }
        }
        res.json(resUtil.generateRes(data, config.statusCode.STATUS_OK));
    })

 }


/**
 * 通过学生Id查询学生的课程列表
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}        
 */
 exports.lessonList = function(req, res, next){
    if (!req.query.studentId) return res.json(resUtil.generateRes(null, config.statusCode.STATUS_INVAILD_PARAMS));
    var stuId = Number(req.query.studentId);
    student.lessonList(stuId, function(err, obj) {
        if (err) {
            return res.json(resUtil.generateRes(null, config.statusCode.SERVER_ERROR));
        }
        var data = [];
        if (obj !== null) {
            console.log(obj)
            for(var i = 0; i < obj.length; i++){
               var lesObj = {};
               lesObj.p= obj[i].p;
               lesObj.pName = obj[i][obj[i].p+'_name'];
               lesObj.pCode = obj[i][obj[i].p];
               lesObj.absence = obj[i].absence;
               lesObj.late = obj[i].late;
               lesObj.startDate = obj[i].start_date;
               lesObj.endDate = obj[i].end_date;
               lesObj.startTime = obj[i].start_time;
               lesObj.endTime = obj[i].end_time;
               lesObj.weekly = obj[i].weekly;
               data.push(lesObj)
            }
           
        }
        res.json(resUtil.generateRes(data, config.statusCode.STATUS_OK));
    })

 }


 /**
 * 通过学生Id和课程编号查询学生的课程列表
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}        
 */
 exports.lessonInfo = function(req, res, next){
    if (!req.query.studentId || !req.query.pNum) return res.json(resUtil.generateRes(null, config.statusCode.STATUS_INVAILD_PARAMS));
    var stuId = Number(req.query.studentId);
    student.lessonInfo(stuId, req.query.pNum,function(err, obj) {
        if (err) {
            return res.json(resUtil.generateRes(null, config.statusCode.SERVER_ERROR));
        }
        var data = [];
        if (obj !== null) {
               var lesObj = {};
               lesObj.pNum= obj.p;
               lesObj.pName = obj[obj.p+'_name'];
               lesObj.pCode = obj[obj.p];
               lesObj.absence = obj.absence;
               lesObj.late = obj.late;
               lesObj.startDate = obj.start_date;
               lesObj.endDate = obj.end_date;
               lesObj.startTime = obj.start_time;
               lesObj.endTime = obj.end_time;
               lesObj.weekly = obj.weekly;
               data.push(lesObj)  
        }
        res.json(resUtil.generateRes(data, config.statusCode.STATUS_OK));
    })

 }



