module.exports = function(db){
	return {
		index: function(req, res){
			res.render('index', { title: 'Express' });
		},
		gettestemail: function(req,res){
			res.render('testemail', {title: "Send test email"});
		},
		posttestemail: function(req, res){
			var send_email = require('../lib/send_email');
			send_email.send({
				to:req.body.to,
				from:req.body.from,
				text:req.body.text,
				subject:"Hello world"
			})
			res.send("Email sent");
		}
	};
}