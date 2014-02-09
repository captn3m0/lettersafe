module.exports = function(db){
  return {
    json: function(req,res){
      var username = req.session.username;
      db.collection('emails').find({user:username}).toArray(function(err,data){
        if(data==null){
          res.send("No mails found");
        }
        else{
          res.json(data);
        }
      });
    }
  };
}