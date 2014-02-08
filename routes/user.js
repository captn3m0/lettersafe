var bcrypt = require('bcryptjs');
var ursa = require('ursa');
var endecrypt = require("endecrypt");
module.exports = function(db){
  return {
    register: function(req,res){
      res.render("register", {title:"Register"});
    },
    login: function(req, res){
      res.render("login", {title:"Login"});
    },

    postLogin: function(req, res){
    },
    postRegister: function(req, res){
      var keys = ursa.generatePrivateKey();
      //Generate the public private keypair
      var priv = ursa.createPrivateKey(keys.toPrivatePem('base64'), '', 'base64');
      var pub = ursa.createPublicKey(keys.toPublicPem('base64'), 'base64');

      var private_pem_key = priv.toPrivatePem('base64');
      //Now we encrypt the private key using another hashs

      var private_key_hash = bcrypt.hashSync(req.body.password, 8);
      endecrypt.encrypt(private_pem_key, private_key_hash, function(err,private_key_locked){
        if(err) throw err;
        //generate the hash. 16 is the salt length
        var hash = bcrypt.hashSync(req.body.password, 16);
        var username = req.body.username.replace(/\W/g, '');
        db.collection('users').insert({
          username: username,
          password: hash,
          keys:
          {
            public: pub.toPublicPem('base64'),
            private: private_key_locked.toString('base64')
          }
        }, function(err, inserted){
          if(err) throw err;
          res.send('User account registered for '+username+"@lettersafe.in");
        });
        
      })
    }
  };
}