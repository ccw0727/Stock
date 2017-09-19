var express = require('express');
var router = express.Router();
var db = require('./lib/db.js');
var sql = require('mssql');
/* GET shedule page. */
router.get('/', function(req, res, next) {
	//若只輸入companys就轉到1101
	sql.connect(db,function(err){
		if(err) console.log(err);
		var request = new sql.Request();
		request.input('code',sql.NVarChar(50),req.query.code);
		request.query("SELECT * FROM Schedule WHERE code=@code",function(err,result){
			if(err){
				console.log(err);
				res.send(err);
			}
			console.log(result.recordset);
			sql.close();
			res.render('./Schedule', {title:'股起勇氣',data: result.recordset });
		});
	});
});
/*GET shedule page*/
// router.get('/:code',function(req,res,next){
// 	sql.connect(db,function(err){
// 		if(err) console.log(err);
// 		var request = new sql.Request();
// 		request.input('code',sql.NVarChar(50),req.params.code);
// 		request.query("SELECT * FROM Schedule WHERE code=@code",function(err,result){
// 			if(err){
// 				console.log(err);
// 				res.send(err);
// 			}
// 			sql.close();
// 			res.render('./Schedule', {title:'股起勇氣',data: result.recordset });
// 		});
// 	});
// });


module.exports = router;