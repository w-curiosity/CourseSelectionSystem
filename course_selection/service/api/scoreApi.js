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

// 增加换算
router.post('/addscore', (req, res) => {
    var sql = $sql.score.add;
    var params = req.body;
    console.log(params);
    conn.query(sql, [params.scno, params.scorerange, params.score], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

// 查询全部换算
router.get('/showscore', (req, res) => {
    var sql = $sql.score.show;
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
router.get('/selectscore', (req, res) => {
    var sql = $sql.score.select;
    var params = req.query;
    console.log(params);
    conn.query(sql, [params.scno], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

// 删除
router.post('/delscore', (req, res) => {
    var sql = $sql.score.del;
    var params = req.query;
    console.log(params);
    conn.query(sql, [params.scno], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

// 修改
router.post('/updatescore', (req, res) => {
    var sql = $sql.score.update;
    var params = req.query;
    console.log(params);
    conn.query(sql, [params.scorerange, params.score,
        params.scno], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

module.exports = router;


