var mongoose = require('mongoose'), URLSlugs = require('mongoose-url-slugs');

//my schema goes here!

var List = new mongoose.Schema({
	name: String,
	createdBy: String,
	items: [Item],
	updated_at: Date
});

List.plugin(URLSlugs('name'));

var Item = new mongoose.Schema({
	name: String,
	quantity: Number,
	checked: {type: Boolean, default:false}
});

mongoose.model('List', List);
mongoose.model('Item', Item);





mongoose.connect('mongodb://localhost/grocerydb');