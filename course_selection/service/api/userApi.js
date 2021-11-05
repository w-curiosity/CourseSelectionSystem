var models = require('../db/db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../db/sqlMap');

var conn = mysql.createConnection(models.mysql);

conn.connect();

var jsonWrite = function(res, ret) {
    if(typeof ret === 'undefined') {
        res.send('err');
    } else {
        console.log(ret);
        res.send(ret);
    }
}

var dateStr = function(str) {
    return new Date(str.slice(0,7));
}

// 增加学生
router.post('/addstu', (req, res) => {
    var sql = $sql.stu.add;
    var params = req.body;
    console.log(params);
    conn.query(sql, [params.xh, params.xm, params.xb, params.csrq,
                    params.jg, params.sjhm, params.yxh, params.pw], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

// 增加教师
router.post('/addt', (req, res) => {
    var sql = $sql.teacher.add;
    var params = req.body;
    console.log(params);
    conn.query(sql, [params.gh, params.xm, params.xb, params.csrq,
                    params.xl, params.jbgz, params.yxh, params.pw], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});



// 增加学生/教师login
router.post('/add_login', (req, res) => {
    var sql = $sql.login.add;
    var params = req.query;
    console.log(params);
    conn.query(sql, [params.username, params.password, params.role_id, 
                     params.role_name], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});


// 查询全部学生
router.get('/showstu', (req, res) => {
    var sql = $sql.stu.show;
    var params = req.body;
    console.log(params);
    conn.query(sql, [params.queryParam], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

// 查询全部老师
router.get('/showt', (req, res) => {
    var sql = $sql.teacher.show;
    var params = req.body;
    console.log(params);
    conn.query(sql, [params.queryParam], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

// 查询角色
router.get('/showroles', (req, res) => {
    var sql = $sql.roles.show;
    var params = req.body;
    console.log(params);
    conn.query(sql, [params.queryParam], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

// 查询权限
router.get('/showrights', (req, res) => {
    var sql = $sql.rights.show;
    var params = req.body;
    console.log(params);
    conn.query(sql, [params.queryParam], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

// 按学号查询
router.get('/selectstu', (req, res) => {
    var sql = $sql.stu.select;
    var params = req.query;
    console.log(params);
    conn.query(sql, [params.xh], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

// 按工号查询
router.get('/selectt', (req, res) => {
    var sql = $sql.teacher.select;
    var params = req.query;
    console.log(params);
    conn.query(sql, [params.gh], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

// 按姓名查询
router.get('/selecttxm', (req, res) => {
    var sql = $sql.teacher.select2;
    var params = req.query;
    console.log(params);
    conn.query(sql, [params.xm], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

// 删除学生
router.post('/delstu', (req, res) => {
    var sql = $sql.stu.del;
    var params = req.query;
    console.log(params);
    conn.query(sql, [params.xh], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

// 删除学生\教师login
router.post('/del_login', (req, res) => {
    var sql = $sql.login.del;
    var params = req.query;
    console.log(params);
    conn.query(sql, [params.username], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});


// 删除教师
router.post('/delt', (req, res) => {
    var sql = $sql.teacher.del;
    var params = req.query;
    console.log(params);
    conn.query(sql, [params.gh], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});



// 管理员修改学生
router.post('/updatestu', (req, res) => {
    var sql = $sql.stu.update;
    var params = req.query;
    console.log(params);
    conn.query(sql, [params.xb, params.csrq,params.jg, params.sjhm, 
                     params.yxh, params.xh], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});


// 学生修改学生
router.post('/stu_updatestu', (req, res) => {
    var sql = $sql.stu.stu_update;
    var params = req.query;
    console.log(params);
    conn.query(sql, [params.xb, params.csrq, params.jg, params.sjhm,
                     params.yxh, params.pw, params.xh], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

// 修改教师
router.post('/updatet', (req, res) => {
    var sql = $sql.teacher.teacher_update;
    var params = req.query;
    console.log(params);
    conn.query(sql, [params.xb, params.csrq,params.xl, params.jbgz,
                     params.yxh, params.pw, params.gh], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

// 教师修改教师
router.post('/teacher_updatet', (req, res) => {
    var sql = $sql.teacher.update;
    var params = req.query;
    console.log(params);
    conn.query(sql, [params.xb, params.csrq,params.xl, params.jbgz,
                     params.yxh, params.pw, params.gh], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});



// 登陆密码修改
router.post('/login_update', (req, res) => {
    var sql = $sql.login.update;
    var params = req.query;
    console.log(params);
    conn.query(sql, [params.password, params.username,], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});




//登录接口
router.post('/login', (req, res) => {
    var sql_pwd = $sql.user.find_all;
    var params = req.body;
    console.log(params);
    conn.query(sql_pwd, params.username, function(err, result) {
        if (err) {
            console.log(err);
        }
        // console.log(result);
        if (result[0] === undefined) {
            res.send('-1')   //查询不出username，data 返回-1
        } else {
            var resultArray = result[0];
            console.log(resultArray.password);
            if(resultArray.password === params.password) {
                //密码匹配的话打印
                jsonWrite(res, result);
                //console.log(resultArray.role_id);
            } else {
                res.send('0') 
            }
        }
    })
});


module.exports = router;


