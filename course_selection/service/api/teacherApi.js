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

// 查询成绩表
router.get('/showgrade', (req, res) => {
    var sql = $sql.grade.show;
    var params = req.query;
    console.log(params);
    conn.query(sql, [params.gh,params.xq], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

// 查询课程
router.get('/showcourse', (req, res) => {
    var sql = $sql.tcourse.show;
    var params = req.query;
    console.log(params);
    conn.query(sql, [params.gh,params.xq], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

// 修改成绩
router.post('/updategrade', (req, res) => {
    var sql = $sql.grade.update;
    var params = req.query;
    console.log(params);
    conn.query(sql, [params.pscj, params.kscj, params.xh, params.kh, params.gh], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});


//修改成绩比例
router.post('/updatecourse', (req, res) => {
    var sql = $sql.tcourse.update;
    var params = req.query;
    console.log(params);
    conn.query(sql, [params.bili, params.kh, params.gh], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

// 按课号查询
router.get('/selectgrade', (req, res) => {
    var sql = $sql.grade.select;
    var params = req.query;
    console.log(params);
    conn.query(sql, [params.kh,params.gh,params.xq], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

// 查询课表
router.get('/showtableMon', (req, res) => {
    var sql = $sql.tableMon.show;
    var params = req.query;
    console.log(params);
    conn.query(sql, [params.xq,params.gh,params.xq,params.gh,params.xq,params.gh,
        params.xq,params.gh,params.xq,params.gh], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

router.get('/showtableTue', (req, res) => {
    var sql = $sql.tableTue.show;
    var params = req.query;
    console.log(params);
    conn.query(sql, [params.xq,params.gh,params.xq,params.gh,params.xq,params.gh,
        params.xq,params.gh,params.xq,params.gh], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

router.get('/showtableWed', (req, res) => {
    var sql = $sql.tableWed.show;
    var params = req.query;
    console.log(params);
    conn.query(sql, [params.xq,params.gh,params.xq,params.gh,params.xq,params.gh,
        params.xq,params.gh,params.xq,params.gh], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

router.get('/showtableThu', (req, res) => {
    var sql = $sql.tableThu.show;
    var params = req.query;
    console.log(params);
    conn.query(sql, [params.xq,params.gh,params.xq,params.gh,params.xq,params.gh,
        params.xq,params.gh,params.xq,params.gh], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

router.get('/showtableFri', (req, res) => {
    var sql = $sql.tableFri.show;
    var params = req.query;
    console.log(params);
    conn.query(sql, [params.xq,params.gh,params.xq,params.gh,params.xq,params.gh,
        params.xq,params.gh,params.xq,params.gh], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

module.exports = router
