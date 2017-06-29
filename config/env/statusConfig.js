module.exports = {
    statusCode: {
        STATUS_OK: {
        	code:0,
        	msg:'成功'
        },
        STATUS_NOTFOUND: {
        	code:1,
        	msg:'没有找到相关数据'
        }, //means data not found not url request
        STATUS_SERVER_ERROR: {
        	code:2,
        	msg:'服务器错误'
        },
        STATUS_INVAILD_PARAMS: {
        	code:3,
        	msg:'上传参数错误'
        },
        STATUS_DBERROR: {
        	code:4,
        	msg:'数据库错误'
        },
        STATUS_PASSERROR: {
            code:-1,
            msg:'旧密码不正确，修改失败'
        },
    },
    AdminStatus: {
       SUCCESS: {
           code:0,
           msg:'登陆成功'
       },
       USER_ERROR: {
           code:1001,
           msg: '登陆用户不存在'
       },
       PASSWORD_ERROR: {
           code:1002,
           msg: '密码错误'
       },
       EXIT_SUCCESS:{
           code:0,
           msg: '成功退出'
       },
       RESET_SUCCESS: {
           code:0,
           msg: '密码修改成功'
       },
       RESET_ERROR: {
           code:1003,
           msg: '密码不正确'
       }
    }
}