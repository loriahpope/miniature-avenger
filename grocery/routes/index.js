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
		createdBy: req.user,
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
				slug: list.name,
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
	var slug = req.body.slugName[0];

	console.log(typeof(checkedItem));

	var isSelected = req.body.isChecked;
	console.log("is selected: " + isSelected);

	List.findOne({slug: slug}, function(err, list, count){
			for(var i = 0; i < list.items.length; i++){
				var listItem = list.items[i].itemName;
				if(listItem == checkedItem){
					console.log('yo');
					list.items[i].checked = true;
				};
			};
		res.redirect('/list/'+slug);
	});
});

/*router.post('/item/check', function(req, res){
	console.log('yo');
	var checkedItem = req.body.itemCheckbox;
	console.log("checked: " + checkedItem);
	var currentSlug = req.body.slugName;
	console.log("slug: " + currentSlug);
	List.find({items: {checked:checkedItem}}, function(err, list, count) {
		console.log(list);
	});
	var url = req.url;
	console.log('url: ' + url);
	res.redirect('/')

});*/

module.exports = router;
