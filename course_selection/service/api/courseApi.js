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

// 增加课程
router.post('/addc', (req, res) => {
    var sql = $sql.course.add;
    var params = req.body;
    console.log(params);
    conn.query(sql, [params.kh, params.km, params.xf, params.xs,
                    params.yxh], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

// 开课
router.post('/addo', (req, res) => {
    var sql = $sql.O.add;
    var params = req.body;
    console.log(params);
    conn.query(sql, [params.xq, params.kh, params.gh, params.sksj], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

// 查询全部课程
router.get('/showc', (req, res) => {
    var sql = $sql.course.show;
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

// 查询全部课程
router.get('/showo', (req, res) => {
    var sql = $sql.O.show;
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

// 按课号查询课程
router.get('/selectc', (req, res) => {
    var sql = $sql.course.select;
    var params = req.query;
    console.log(params);
    conn.query(sql, [params.kh], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

// 按学期查询开课
router.get('/selecto', (req, res) => {
    var sql = $sql.O.select;
    var params = req.query;
    console.log(params);
    conn.query(sql, [params.xq], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

// 当前学期获取
router.get('/selectxq', (req, res) => {
    var sql = $sql.currentxq.select;
    var params = req.query;
    console.log(params);
    conn.query(sql,[params.currentxq],function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            console.log(result)
            jsonWrite(res, result);
        }
    })
});


// 删除课程
router.post('/delc', (req, res) => {
    var sql = $sql.course.del;
    var params = req.query;
    console.log(params);
    conn.query(sql, [params.kh], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

// 删除开课
router.post('/delo', (req, res) => {
    var sql = $sql.O.del;
    var params = req.query;
    console.log(params);
    conn.query(sql, [params.kh,params.gh], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

// 修改课程
router.post('/updatec', (req, res) => {
    var sql = $sql.course.update;
    var params = req.query;
    console.log(params);
    conn.query(sql, [params.xf, params.xs,
        params.yxh, params.kh], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

// 修改课程
router.post('/updateo', (req, res) => {
    var sql = $sql.O.update;
    var params = req.query;
    console.log(params);
    conn.query(sql, [params.xq, params.sksj,
        params.kh, params.gh], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

// 修改当前学期
router.post('/updatecurrent', (req, res) => {
    var sql = $sql.currentxq.update;
    var params = req.query;
    console.log(params);
    conn.query(sql, [params.currentxq], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});


//student
// 查询全部开课课程
router.get('/showoc', (req, res) => {
    var sql = $sql.O.showc;
    var params = req.query;
    console.log(params);
    conn.query(sql, [params.xq,params.xh,params.xh], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});
//选课
router.post('/adde', (req, res) => {
    var sql = $sql.E.add;
    var params = req.query;
    console.log(params);
    conn.query(sql, [params.xh, params.xq, params.kh, params.gh, params.pscj, 
                     params.kscj, params.zpcj], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});
//显示已选课
router.get('/showe', (req, res) => {
    var sql = $sql.E.show;
    var params = req.query;
    console.log(params);
    conn.query(sql, [params.xh,params.xq], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

//显示已完成课程
router.get('/showe1', (req, res) => {
    var sql = $sql.E.show1;
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

//显示未完成课程
router.get('/showe2', (req, res) => {
    var sql = $sql.E.show2;
    var params = req.query;
    console.log(params);
    conn.query(sql, [params.xh,params.xh], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});
//按课号查询开课
router.get('/selectkh', (req, res) => {
    var sql = $sql.O.selectk;
    var params = req.query;
    console.log(params);
    conn.query(sql, [params.kh], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});
//退课
router.post('/dele', (req, res) => {
    var sql = $sql.E.del;
    var params = req.query;
    console.log(params);
    conn.query(sql, [params.kh,params.xh,params.xq], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

// 查询课表
router.get('/showstableMon', (req, res) => {
    var sql = $sql.stableMon.show;
    var params = req.query;
    console.log(params);
    conn.query(sql, [params.xq,params.xh,params.xq,params.xh,params.xq,params.xh,
        params.xq,params.xh,params.xq,params.xh], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

router.get('/showstableTue', (req, res) => {
    var sql = $sql.stableTue.show;
    var params = req.query;
    console.log(params);
    conn.query(sql, [params.xq,params.xh,params.xq,params.xh,params.xq,params.xh,
        params.xq,params.xh,params.xq,params.xh], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

router.get('/showstableWed', (req, res) => {
    var sql = $sql.stableWed.show;
    var params = req.query;
    console.log(params);
    conn.query(sql, [params.xq,params.xh,params.xq,params.xh,params.xq,params.xh,
        params.xq,params.xh,params.xq,params.xh], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

router.get('/showstableThu', (req, res) => {
    var sql = $sql.stableThu.show;
    var params = req.query;
    console.log(params);
    conn.query(sql, [params.xq,params.xh,params.xq,params.xh,params.xq,params.xh,
        params.xq,params.xh,params.xq,params.xh], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

router.get('/showstableFri', (req, res) => {
    var sql = $sql.stableFri.show;
    var params = req.query;
    console.log(params);
    conn.query(sql, [params.xq,params.xh,params.xq,params.xh,params.xq,params.xh,
        params.xq,params.xh,params.xq,params.xh], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

//新增
// 查询
router.get('/show1', (req, res) => {
    var sql = $sql.course.show1;
    var params = req.query;
    console.log(params);
    conn.query(sql, [params.xq], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

// 按课号
router.get('/selectc1', (req, res) => {
    var sql = $sql.course.select1;
    var params = req.query;
    console.log(params);
    conn.query(sql, [params.kh], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

module.exports = router;


