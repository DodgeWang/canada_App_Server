var mysql = require('../../config/mysql');

/**
 * 获取活动分类      
 * @param  {Function} callback 回调函数
 * @return {null}
 */
exports.classify = function(callback) {
   mysql.query({
        sql: "SELECT * FROM tbl_indexclassification",
        params  : {}
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
 * 获取指定分类下活动列表 
 * @param  {number} id 分类id 
 * @param  {number} id 分类id     
 * @param  {Function} callback 回调函数
 * @return {null}
 */
exports.ListById = function(id,callback) {
   mysql.query({
        sql: "SELECT * FROM tbl_campusactivities WHERE classifyId = :id order by id desc limit 4",
        params  : {
        	"id":id
        }
    }, function(err, rows) {
        if (err) {
            callback(err, null);
        }
        if (rows && rows.length > 0) {
            callback(null, rows);
        } else {
            callback(null, []);
        }
    })
}


/**
 * 获取所有活动列表    
 * @param  {Function} callback 回调函数
 * @return {null}
 */
exports.allList = function(callback) {
   mysql.query({
        sql: "SELECT tbl_indexclassification.name,tbl_campusactivities.* FROM tbl_indexclassification,tbl_campusactivities WHERE tbl_indexclassification.id=tbl_campusactivities.classifyId order by id desc",
        params  : {}
    }, function(err, rows) {
        if (err) {
            callback(err, null);
        }
        if (rows && rows.length > 0) {
            callback(null, rows);
        } else {
            callback(null, []);
        }
    })
}
