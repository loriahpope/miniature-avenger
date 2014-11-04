var mongoose = require('mongoose'), URLSlugs = require('mongoose-url-slugs');

//my schema goes here!

var Item = new mongoose.Schema({
	itemName: String,
	quantity: Number,
	checked: Boolean,
	slug: String
});

var List = new mongoose.Schema({
	name: String,
	createdBy: String,
	items: [Item],
	updated_at: Date
});

List.plugin(URLSlugs('name'));

mongoose.model('List', List);
mongoose.model('Item', Item);





mongoose.connect('mongodb://localhost/grocerydb');