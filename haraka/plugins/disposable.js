exports.hook_rcpt = function (next, connection, params) {
    var rcpt = params[0];
    this.loginfo("Got recipient: " + rcpt);
    this.loginfo(rcpt);
    console.dir(rcpt);
    next();
}
