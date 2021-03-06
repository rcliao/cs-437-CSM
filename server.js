var express = require('express'),
    app = express.createServer(),
    db = require('mongojs').connect('csm');
    
app.configure(function () {
	app.use(express.favicon());
	app.use(express.bodyParser());
	app.use(express.logger('dev'));  //tiny, short, default
	app.use(app.router);
	app.use(express.static(__dirname + '/app'));
	app.use(express.errorHandler({dumpExceptions: true, showStack: true, showMessage: true}));
});

var email   = require("./node_modules/emailjs/email");
var emailServer  = email.server.connect({
   user: 'cs437test@gmail.com',
   password: 'cs437email',
   host:    "smtp.gmail.com",
   ssl:     true
});

var Imap = require('imap'),
    inspect = require('util').inspect;

var imap = new Imap({
  user: 'cs437test@gmail.com',
  password: 'cs437email',
  host: 'imap.gmail.com',
  port: 993,
  secure: true
});

/* Helpers */

//To allow use ObjectId or other any type of _id
var objectId = function (_id) {
    if (_id.length === 24 && parseInt(db.ObjectId(_id).getTimestamp().toISOString().slice(0,4), 10) >= 2010) {
        return db.ObjectId(_id);
    }
    return _id;
};

//Function callback
var fn = function (req, res) {
    res.contentType('application/json');
    var fn = function (err, doc) {
        if (err) {
            if (err.message) {
                doc = {error : err.message};
            } else {
                doc = {error : JSON.stringify(err)};
            }
        }
        if (typeof doc === "number" || req.params.cmd === "distinct") { doc = {ok : doc}; }
        res.send(doc);
    };
    return fn;
};

function show(obj) {
  return inspect(obj, false, Infinity);
}

function die(err) {
  console.log('Uh oh: ' + err);
  process.exit(1);
}

function openInbox(cb) {
  imap.connect(function(err) {
    if (err) die(err);
    imap.openBox('INBOX', true, cb);
  });
}

function openSent(cb) {
  imap.connect(function(err) {
    if (err) die(err);
    imap.openBox('[Gmail]/Sent Mail', true, cb);
  });
}

function openTrash(cb) {
  imap.connect(function(err) {
    if (err) die(err);
    imap.openBox('[Gmail]/Trash', true, cb);
  });
}

var sentJSONs = [];
var mailJSONs = [];
var trashJSONs = [];

function inboxOpen(callback) {
  openInbox(function(err, mailbox) {
    mailJSONs = [];
    if (err) die(err);
    imap.search([ 'ALL', ['SINCE', 'Febury 7, 2013'] ], function(err, results) {
      if (err) die(err);
      imap.fetch(results,
        { headers: ['from', 'to', 'subject', 'date'],
          cb: function(fetch) {
            fetch.on('message', function(msg) {
              var mailJSON = {};
              console.log('Saw message no. ' + msg.seqno);
              var body = '';
              msg.on('headers', function(hdrs) {
                mailJSON.from = hdrs.from;
                mailJSON.to = hdrs.to;
                mailJSON.date = hdrs.date;
                mailJSON.subject = hdrs.subject;
                console.log('Headers for no. ' + msg.seqno + ': ' + show(hdrs));
              });
              msg.on('end', function() {
                console.log('Finished message no. ' + msg.seqno);
                mailJSON.flags = msg.flags;
                mailJSON.date = msg.date;
                mailJSON.uid = msg.uid;
                mailJSONs.push(mailJSON);
                console.log('UID: ' + msg.uid);
                console.log('Flags: ' + msg.flags);
                console.log('Date: ' + msg.date);
              });
            });
          }
        }, function(err) {
          if (err) throw err;
          console.log('Done fetching all messages!');
          imap.logout();
          callback();
        }
      );
    });
  });
}

function sentOpen(callback) {
 openSent(function(err, mailbox) {
  sentJSONs = [];
  if (err) die(err);
  imap.search([ 'ALL', ['SINCE', 'Febury 5, 2013'] ], function(err, results) {
      if (err) die(err);
      imap.fetch(results,
        { headers: ['from', 'to', 'subject', 'date'],
          body: true,
          cb: function(fetch) {
            fetch.on('message', function(msg) {
              var mailJSON = {};
              console.log('Saw message no. ' + msg.seqno);
              msg.on('headers', function(hdrs) {
                mailJSON.from = hdrs.from;
                mailJSON.to = hdrs.to;
                mailJSON.date = hdrs.date;
                mailJSON.subject = hdrs.subject;
                console.log('Headers for no. ' + msg.seqno + ': ' + show(hdrs));
              });
              msg.on('end', function() {
                console.log('Finished message no. ' + msg.seqno);
                mailJSON.flags = msg.flags;
                mailJSON.date = msg.date;
                sentJSONs.push(mailJSON);
                console.log('UID: ' + msg.uid);
                console.log('Flags: ' + msg.flags);
                console.log('Date: ' + msg.date);
              });
            });
          }
        }, function(err) {
          if (err) throw err;
          console.log('Done fetching all messages!');
          imap.logout();
          callback();
        }
      );
    });
  });
}

function trashOpen(callback) {
 openTrash(function(err, mailbox) {
  trashJSONs = [];
  if (err) die(err);
  imap.search([ 'ALL', ['SINCE', 'Febury 5, 2013'] ], function(err, results) {
      if (err) die(err);
      imap.fetch(results,
        { headers: ['from', 'to', 'subject', 'date'],
          body: true,
          cb: function(fetch) {
            fetch.on('message', function(msg) {
              var trashJSON = {};
              console.log('Saw message no. ' + msg.seqno);
              msg.on('headers', function(hdrs) {
                trashJSON.from = hdrs.from;
                trashJSON.to = hdrs.to;
                trashJSON.date = hdrs.date;
                trashJSON.subject = hdrs.subject;
                console.log('Headers for no. ' + msg.seqno + ': ' + show(hdrs));
              });
              msg.on('end', function() {
                console.log('Finished message no. ' + msg.seqno);
                trashJSON.flags = msg.flags;
                trashJSON.date = msg.date;
                trashJSONs.push(trashJSON);
                console.log('UID: ' + msg.uid);
                console.log('Flags: ' + msg.flags);
                console.log('Date: ' + msg.date);
              });
            });
          }
        }, function(err) {
          if (err) throw err;
          console.log('Done fetching all messages!');
          imap.logout();
          callback();
        }
      );
    });
  });
}

var mailDetailJSON = {};

function inboxOpenOne(emailID, callback) {
  openInbox(function(err, mailbox) {
  if (err) die(err);
  mailDetailJSON = {};
  imap.search([ 'ALL', ['SINCE', 'Febury 7, 2013'], ['UID', emailID] ], function(err, results) {
      if (err) die(err);
      imap.fetch(results,
        { headers: ['from', 'to', 'subject', 'date'],
          body: true,
          cb: function(fetch) {
            fetch.on('message', function(msg) {
              console.log('Saw message no. ' + msg.seqno);
              var body = '';
              msg.on('headers', function(hdrs) {
                mailDetailJSON.from = hdrs.from;
                mailDetailJSON.to = hdrs.to;
                mailDetailJSON.date = hdrs.date;
                mailDetailJSON.subject = hdrs.subject;
                console.log('Headers for no. ' + msg.seqno + ': ' + show(hdrs));
              });
              msg.on('data', function(chunk) {
                body += chunk.toString('utf8');
              });
              msg.on('end', function() {
                console.log('Finished message no. ' + msg.seqno);
                mailDetailJSON.flags = msg.flags;
                mailDetailJSON.date = msg.date;
                mailDetailJSON.uid = msg.uid;
                mailDetailJSON.body = show(body);
                console.log('UID: ' + msg.uid);
                console.log('Flags: ' + msg.flags);
                console.log('Date: ' + msg.date);
              });
            });
          }
        }, function(err) {
          if (err) throw err;
          console.log('Done fetching all messages!');
          imap.logout();
          callback();
        }
      );
    });
  });
}

function setImap() {

}

var authorized = false;

/* Routes */

app.post('settings/email', function(req, res) {
  var emailAddress = req.body.email.address;
  var password = req.body.email.password;
});

app.post('/auth/login', function(req, res) {
	authorized = true;
	res.send(200);
});

app.post('/auth/logout', function(req, res) {
	authorized = false;
	res.send(200);
});

app.get('/api/sent', function(req, res) {
  res.contentType('application/json');
  var sendmails = function() {
    res.send(sentJSONs);
  };
  sentOpen(sendmails);
});

app.get('/api/inbox', function(req, res) {
  res.contentType('application/json');
  var sendmails = function() {
    res.send(mailJSONs);
  };
  inboxOpen(sendmails);
});

app.get('/api/trash', function(req, res) {
  res.contentType('application/json');
  var sendmails = function () {
    res.send(trashJSONs);
  };
  trashOpen(sendmails);
});

app.get('/api/inbox/:emailID', function(req, res) {
  res.contentType('application/json');
  var sendmail = function () {
    res.send(mailDetailJSON);
  };
  inboxOpenOne(req.params.emailID, sendmail);
});

app.post('/api/email/sendMail', function(req, res) {
  console.log(req.body);
  emailServer.send(req.body);
});

app.get('/api/emailcount/inbox', function(req, res) {
  res.contentType('application/json');
  imap.connect(function(err) {
    if (err) die(err);
    imap.status('INBOX', function(err, box){
      res.send(JSON.stringify(box.messages.unseen));
        
    });
  });
});

// Query
app.get('/api/:collection', function(req, res) {
  var item, sort = {}, qw = {};
  for (item in req.query) {
      req.query[item] = (typeof +req.query[item] === 'number' && isFinite(req.query[item])) 
          ? parseFloat(req.query[item],10) 
          : req.query[item];
      if (item != 'limit' && item != 'skip' && item != 'sort' && item != 'order' && req.query[item] != "undefined" && req.query[item]) {
          qw[item] = req.query[item]; 
      }
  }  
  if (req.query.sort) { sort[req.query.sort] = (req.query.order === 'desc' || req.query.order === -1) ? -1 : 1; }
  db.collection(req.params.collection).find(qw).sort(sort).skip(req.query.skip).limit(req.query.limit).toArray(fn(req, res))
});

// Read
app.get('/api/:collection/:id', function(req, res) {
	db.collection(req.params.collection).findOne({_id:objectId(req.params.id)}, fn(req, res))
});

// Save
app.post('/api/:collection', function(req, res) {
    if (req.body._id) { req.body._id = objectId(req.body._id);}
    db.collection(req.params.collection).save(req.body, {safe:true}, fn(req, res));
});

// Delete
app.del('/api/:collection/:id', function(req, res) {
    db.collection(req.params.collection).remove({_id:objectId(req.params.id)}, {safe:true}, fn(req, res));
});

//Group
app.put('/api/:collection/group', function(req, res) {
    db.collection(req.params.collection).group(req.body.keys, req.body.cond, req.body.initial, req.body.reduce, req.body.finalize, fn(req, res))
});

// MapReduce
app.put('/api/:collection/mapReduce', function(req, res) {
    if (!req.body.options) {req.body.options  = {}};
    req.body.options.out = { inline : 1};
    req.body.options.verbose = false;
    db.collection(req.params.collection).mapReduce(req.body.map, req.body.reduce, req.body.options, fn(req, res));    
});

// Command (count, distinct, find, aggregate)
app.put('/api/:collection/:cmd',  function (req, res) {
    if (req.params.cmd === 'distinct') {req.body = req.body.key}
    db.collection(req.params.collection)[req.params.cmd](req.body, fn(req, res)); 
});

app.listen(8000, function() {
    console.log("Listening on 8000");
});