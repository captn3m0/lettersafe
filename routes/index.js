var ursa=require('ursa');
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
			if(req.session.username == undefined)
				res.redirect('/login');
			var send_email = require('../lib/send_email');
			send_email.send({
				to:req.body.to,
				from:req.session.username+"@lettersafe.in",
				text:req.body.text,
				subject:req.body.subject
			})
			db.collection('users').findOne({username:req.session.username}, function(err,data){
				if(err) throw err;
				if(data){
					var text = req.body.text;
					//var pub = ursa.createPublicKey(data.keys.public, 'base64');
					//text = pub.encrypt(req.body.text);
					db.collection('emails').insert({
						user: req.session.username,
			            timestamp: Date.now(),
			            label: 'sent',
			            msg: text
					}, function(err, data){
						if(err) throw err;
					})
					res.send("Email sent");
				}
				else{
					res.send("User not found")
				}
			})
		}
	};
}