var ursa = require('ursa');
var fs = require('fs');

// create a pair of keys (a private key contains both keys...)
var keys = ursa.generatePrivateKey();

var priv = ursa.createPrivateKey(keys.toPrivatePem('base64'), '', 'base64');
var pub = ursa.createPublicKey(keys.toPublicPem('base64'), 'base64');
console.log(pub.toPublicPem('base64'));

// encrypt, with the private key, then decrypt with the public
var data = new Buffer('hello world');

var enc = pub.encrypt(data);

var unenc = priv.decrypt(enc);
console.log(unenc.toString('ascii'));