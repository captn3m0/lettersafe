module.exports = function(db){
  return {
    register: function(req,res){

    },
    login: function(req, res){
      res.render("login", {title:"Login"})
    },

    postLogin: function(req, res){
      console.log(req.body.username);
      console.log(req.body.password)
    },
    postRegister: function(req, res){

    }
  };
}