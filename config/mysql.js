

var mysql = require('mysql');
var config = require('./config');
var mysqlPool = null;


/**
 * init mysql pool
 * @return {null} 
 */
function initMysqlPool () {
    mysqlPool = mysql.createPool(config.database);
}


/**
 * do mysql query
 * @param  {object}   sqlReq   the sql request obj
 * @param  {Function} callback the callback func
 * @return {null}            
 */
exports.query = function (sqlReq, callback) {
    console.log(sqlReq)
    //sql, params
    if (!mysqlPool) {
        initMysqlPool();
    }

    if (!sqlReq) {
        throw new DBError("the sqlReq is null");
    }

    var sql_pattern = sqlReq.sql || "";
    if (sql_pattern.length === 0) {
        throw new DBError("the sql is empty");
    }

    mysqlPool.getConnection(function (err, connection) {

        if (err) {
            throw err;
        }

        connection.config.queryFormat = function (query, values) {
            if (!values) return query;
            return query.replace(/\:(\w+)/g, function (txt, key) {
              if (values.hasOwnProperty(key)) {
                return this.escape(values[key]);
              }
              return txt;
            }.bind(this));
        };

        connection.query(sql_pattern, sqlReq.params, function (err, rows) {
            connection.release();   //连接不再使用时返回到连接池
            return callback(err, rows);
        });
    });
};