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
        if(err){
            return res.json(resUtil.generateRes(null, config.statusCode.SERVER_ERROR));
        }
        if(obj === null){
        	return res.json(resUtil.generateRes(null, config.statusCode.STATUS_OK));
        }
        
        var data = []
        for(var i = 0; i <obj.length; i++){
        	(function(o,data,i){
                var item = {};
                item.name = o.name;
                activity.ListById(obj[i].id, function(err,rows){ 
                   if(err){
                     return res.json(resUtil.generateRes(null, config.statusCode.SERVER_ERROR));
                   }  	
                   item.list = rows;
                   data.push(item);
                   if(i === obj.length-1){
                     	// console.log(data)
                     	res.json(resUtil.generateRes(data, config.statusCode.STATUS_OK));
                   }   
                })     
        	})(obj[i],data,i)
        }     
    })

}