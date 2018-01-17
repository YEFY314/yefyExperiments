/**
 * Created by yefen on 2017/12/29.
 */
var express = require('express');
var router = express.Router();
var xlsx = require("node-xlsx");
var fs = require("fs");

/* GET home page. */
router.get('/line', function(req, res, next){
    res.render('test');
});

router.post('/postData', function (req, res, next){
    var data = JSON.parse(req.body.data);
    console.log(data);
        var sheet = [{
            name:'sheet1',
            data:data
        }];
        var buffer = xlsx.build(sheet);
        var option = {flag:'w'};
        fs.writeFile('D:/code/yefyExperiments/yefyExperiments/resultData/'+data[0][0]+'.xlsx', buffer,option, function (err) {
            if(err) throw err;
            console.log("finished!");
        });
    res.json(JSON.stringify("nihao"));
});

module.exports = router;