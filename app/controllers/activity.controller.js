var activity = require('../proxy/activity.proxy');
var resUtil = require("../libs/resUtil");
var config = require('../../config/env/statusConfig');

/**
 * 获取首页活动
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}        
 */
exports.homeActivity = function(req, res, next) {
    activity.classify(function(err, obj) {
        if (err) {
            return res.json(resUtil.generateRes(null, config.statusCode.SERVER_ERROR));
        }
        if (obj === null) {
            return res.json(resUtil.generateRes(null, config.statusCode.STATUS_OK));
        }

        var data = []
        
        getActivity(0,obj,data,res)
    })

}


function getActivity(i,obj,data,res) {  
    var item = {};
    item.name = obj[i].name;
    activity.ListById(obj[i].id, function(err, rows) {
        if (err) {
            return res.json(resUtil.generateRes(null, config.statusCode.SERVER_ERROR));
        }
        item.list = rows;
        data.push(item);
        if (i === obj.length - 1) {
            return res.json(resUtil.generateRes(data, config.statusCode.STATUS_OK));
        }else{
            i+=1;
            return getActivity(i,obj,data,res)
        }
    })
}