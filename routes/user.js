var bcrypt = require('bcrypt');
var ursa = require('ursa');
var cryptr = require('cryptr');

module.exports = function(db){
  return {
    register: function(req,res){
      res.render("register", {title:"Register"});
    },
    login: function(req, res){
      res.render("login", {title:"Login"});
    },
    postLogin: function(req, res){
      var username = req.body.username.replace(/\W/g, '');
      db.collection('users').findOne({username:username}, function(err,data){
        if(data==null)
        {
          res.send("No such user");
        }
        //Now we check the password hash match
        else{
          bcrypt.compare(req.body.password, data.password, function(err, response){
            if(err) throw err;
            if(response){
              var crypto = new cryptr(req.body.password);
              var private_key = crypto.decrypt(data.keys.private);
              req.session.private_key = private_key;
              req.session.username = username;
              // res.redirect('/send');
              res.send("OK")
            }
            else{
              res.send("Fail")
            }
          });
        }
      })
    },
    postRegister: function(req, res){
      var keys = ursa.generatePrivateKey();
      //Generate the public private keypair
      var priv = ursa.createPrivateKey(keys.toPrivatePem('base64'), '', 'base64');
      var pub = ursa.createPublicKey(keys.toPublicPem('base64'), 'base64');

      var private_pem_key = priv.toPrivatePem('base64');
      //Now we encrypt the private key using another hashs
      var crypto = new cryptr(req.body.password);
      var encrypted_private_key = crypto.encrypt(private_pem_key)

      //generate the hash. 16 is the salt length
      var hash = bcrypt.hashSync(req.body.password, 16);
      var username = req.body.username.replace(/\W/g, '');
      db.collection('users').insert({
        username: username,
        password: hash,
        keys:
        {
          public: pub.toPublicPem('base64'),
          private:  encrypted_private_key
        }
      }, function(err, inserted){
        if(err){
          res.send('Fail');
          throw err;
          
        }
        res.send('User account registered for '+username+"@lettersafe.in");
      });
    }
  };
}