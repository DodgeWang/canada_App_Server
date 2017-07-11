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
        console.log("thisData",obj)
        if (obj !== null) {
            data = {
                surname: obj.surname, //姓
                given_name: obj.given_name, //名
                student_num: obj.student_num, //学号
                grade: obj.grade, //年级
                gender: obj.gender==="Male"?"boy":"girl", //性别
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
 exports.getMarkList = function(req, res, next){
    if (!req.query.studentNum) return res.json(resUtil.generateRes(null, config.statusCode.STATUS_INVAILD_PARAMS));
    var stuNum = req.query.studentNum;
    student.getInfo(stuNum, function(err, obj) {
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
 * 通过学生学号查询学生的课程列表
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}        
 */
 exports.lessonList = function(req, res, next){
    if (!req.query.studentNum) return res.json(resUtil.generateRes(null, config.statusCode.STATUS_INVAILD_PARAMS));
    var stuNum = req.query.studentNum;
    student.lessonList(stuNum, function(err, obj) {
        if (err) {
            return res.json(resUtil.generateRes(null, config.statusCode.SERVER_ERROR));
        }
        var data = [];
        if (obj !== null) {
            for(var i = 0; i < obj.length; i++){
               var lesObj = {};
               lesObj.pNum= obj[i].p;
               lesObj.pName = obj[i][obj[i].p+'_name'];
               lesObj.pCode = obj[i][obj[i].p];
               lesObj.absence = obj[i][obj[i].p+'_absence'];
               lesObj.late = obj[i][obj[i].p+'_late'];
               lesObj.startDate = dateStr(obj[i].start_date);
               lesObj.endDate = dateStr(obj[i].end_date);
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
 * 通过学生学号和课程编号查询学生的课程详情
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}        
 */
 exports.lessonInfo = function(req, res, next){
    console.log('xiangqing')
    if (!req.query.studentNum || !req.query.pNum) return res.json(resUtil.generateRes(null, config.statusCode.STATUS_INVAILD_PARAMS));
    var stuNum = req.query.studentNum;
    student.lessonInfo(stuNum, req.query.pNum,function(err, obj) {
      console.log(obj)
        if (err) {
            return res.json(resUtil.generateRes(null, config.statusCode.SERVER_ERROR));
        }
        var data = {};
        if (obj !== null) {
               data.pNum= obj.p;
               data.pName = obj[obj.p+'_name'];
               data.pCode = obj[obj.p];
               data.absence = obj[obj.p+'_absence']?obj[obj.p+'_absence']:0;
               data.late = obj[obj.p+'_late']?obj[obj.p+'_late']:0;
               data.startDate = dateStr(obj.start_date);
               data.endDate = dateStr(obj.end_date);
               data.startTime = obj.start_time;
               data.endTime = obj.end_time;
               data.weekly = obj.weekly; 
        }
        res.json(resUtil.generateRes(data, config.statusCode.STATUS_OK));
    })

 }


/**
 * 时间转换为固定类型
 * @param  {object}   date  日期
 * @return {null}        
 */
function dateStr(date){
    var year = date.getFullYear();
    var month = (date.getMonth()+1) < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1;
    var date = date.getDate() < 10 ? '0'+date.getDate() : date.getDate();
    return year+'/'+month+'/'+date;
}



