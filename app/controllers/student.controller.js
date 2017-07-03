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
        	console.log(obj.birthday);
        	// console.log(obj.birthday.getFullYear())
        	// console.log(obj.birthday.getMonth());
        	// console.log(obj.birthday.getDay());
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
        var data = null;
        if (obj !== null) {
            // console.log(obj)
            // data={
            //     accumulatedCredit: obj.accumulated_credit, //已得积分
            //     lessonList: [{
            //         pCode:obj.p1,
            //         pName:obj.p1_name,
            //         pMark:obj.p1_mark,
            //     },{
            //         pCode:obj.p2,
            //         pName:obj.p2_name,
            //         pMark:obj.p2_mark,
            //     },{
            //         pCode:obj.p3,
            //         pName:obj.p3_name,
            //         pMark:obj.p3_mark,
            //     }]
            // }
        }
        res.json(resUtil.generateRes(data, config.statusCode.STATUS_OK));
    })

 }



