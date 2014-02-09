var fs   = require('fs');

exports.hook_queue = function(next, connection) {
    var MongoClient = require('../../node_modules/mongodb').MongoClient;
    MongoClient.connect('mongodb://127.0.0.1:27017/lettersafe', function(err, db) {
        if(err) throw err;
        
        var Transform = require('stream').Transform;

        var store = new Buffer('');

        var parser = new Transform();
        parser._write = function(data, encoding, done) {
          var buffer = (Buffer.isBuffer(data)) ? data : new Buffer(data, encoding);
          store = Buffer.concat([store, buffer]);
          done();
        };

        var rcpt = connection.transaction.rcpt_to[0];
        rcpt = rcpt.toString();

        parser.on('finish', function () {
          db.collection('emails').insert({
            user: rcpt,
            timestamp: Date.now(),
            label: 'inbox',
            msg: store.toString()
          }, function(err, inserted){
            if(err) throw err;
          });
          return next(OK);
        });

        connection.transaction.message_stream.pipe(parser);

    });
}