// Get all of our fake login data
var data = require('../data.json');

exports.view = function(req, res){
	console.log(data);
	res.render('add-goal', data);
};