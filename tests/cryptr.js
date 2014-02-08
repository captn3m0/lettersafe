var cryptr = require('cryptr');
var ursa = require('ursa');
var keys = ursa.generatePrivateKey();
//Generate the public private keypair
var priv = ursa.createPrivateKey(keys.toPrivatePem('base64'), '', 'base64');
var private_pem_key = priv.toPrivatePem('base64');
console.log(private_pem_key);

cryptr = new cryptr('nemo');

var private_locked_key = cryptr.encrypt(private_pem_key)

var decrypted = cryptr.decrypt(private_locked_key);

console.log(decrypted);