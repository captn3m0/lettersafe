module.exports = function(db){
	return {
		index: function(req, res){
			res.render('index', { title: 'LetterSafe' });
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
		},
		send: function(req, res){
			if(req.session.username == undefined)
				res.redirect('/login');
			res.render('send', {title:"Compose Email", username:req.session.username})
		},
		sendpost: function(req, res){
			var send_email = require('../lib/send_email');
			send_email.send({
				to:req.body.to,
				from:req.body.from+"@lettersafe.in",
				text:req.body.text,
				subject:"Hello world"
			})
			db.collection('emails').insert({
				user: req.session.username,
	            timestamp: Date.now(),
	            label: 'sent',
	            msg: req.body.text
			}, function(err, data){
				if(err) throw err;
				console.log(data);
			})
			res.send("Email sent");	
		}
	};
}