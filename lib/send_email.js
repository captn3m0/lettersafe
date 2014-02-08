var email   = require("emailjs").server.connect({
    user:    "matt", 
    password: "test", 
    host:    "localhost",
    port: 587,
    user:"matt",
    pass:"test"
});

module.exports = email;