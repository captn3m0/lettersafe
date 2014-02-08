
/*
 * GET home page.
 */

module.exports = function(db){
	return {
		index: function(req, res){
			res.render('index', { title: 'Express' });
		}
	};
}