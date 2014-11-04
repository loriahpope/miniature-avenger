var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var List = mongoose.model('List');
var Item = mongoose.model('Item');

/* GET home page. */
router.get('/', function(req, res) {
	res.redirect('/list');
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
		createdBy: req.body.creator,
		items: [],
		updated_at : Date.now()
	}).save(function(err, list, count){
		console.log('buy these things', list, count, err);
		res.redirect('/list');
	});
});

router.get('/list/:slug', function(req, res) {
	var current = req.params.slug;
	List.findOne({slug: current}, function(err, list, count){
			res.render('item', {
				title: list.name,
				items: list.items
			});
	});
});

router.post('/list/:slug', function(req, res){
	req.body.slug = req.params.slug;

	var newItem = new Item({
		itemName: req.body.itemName,
		quantity: req.body.quantity,
		checked: false,
		slug: req.body.slug
	});

	List.findOneAndUpdate({slug: req.body.slug}, {$push:{items:newItem}}, function(err, list, count){
		res.redirect('/list/'+req.body.slug);
	});
});

router.post('/item/', function(req, res) {
	var checkedItem = req.body.itemCheckbox;

	console.log("checked: " + checkedItem);
	var slug = req.body.slug[0];

		List.findOne({slug: slug}, function(err, list, count){
		for(var i = 0; i < list.items.length; i++){
			
			if(list.items[i].itemName == checkedItem){
				list.items[i].checked = true;
				list.save(function(saveErr, saveList, saveCount){
					console.log(saveList);
				});
			}
		}
		res.redirect('/list/'+slug);
	});

});

module.exports = router;
