var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var List = mongoose.model('List');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/list', function(req, res) {
	List.find(function(err, list, count) {
		res.render( 'list', {
			list: list
		});
	});
});

router.get('/list/create', function(req, res) {
  res.render('create');
});

router.post('/list/create', function(req, res) {
	console.log(req.body.list);
	new List({
		name: req.body.list,
		createdBy: req.user,
		items: [],
		updated_at : Date.now()
	}).save(function(err, list, count){
		console.log('buy these things', list, count, err);
		res.redirect('/list');
	});
});

module.exports = router;
