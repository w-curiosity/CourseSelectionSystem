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

// 增加院系
router.post('/addd', (req, res) => {
    var sql = $sql.D.add;
    var params = req.body;
    console.log(params);
    conn.query(sql, [params.yxh, params.mc, params.dz, params.lxdh], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

// 查询全部院系
router.get('/showd', (req, res) => {
    var sql = $sql.D.show;
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

// 按院系号查询
router.get('/selectd', (req, res) => {
    var sql = $sql.D.select;
    var params = req.query;
    console.log(params);
    conn.query(sql, [params.yxh], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

// 删除
router.post('/deld', (req, res) => {
    var sql = $sql.D.del;
    var params = req.query;
    console.log(params);
    conn.query(sql, [params.yxh], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

// 修改
router.post('/updated', (req, res) => {
    var sql = $sql.D.update;
    var params = req.query;
    console.log(params);
    conn.query(sql, [params.dz, params.lxdh,
        params.yxh], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

module.exports = router;


