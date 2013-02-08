var express = require('express'),
    app = express.createServer(),
    db = require('mongojs').connect('csm');

var MailParser = require("mailparser").MailParser,
    mailparser = new MailParser();
    
app.configure(function () {
	app.use(express.favicon());
	app.use(express.bodyParser());
	app.use(express.logger('dev'));  //tiny, short, default
	app.use(app.router);
	app.use(express.static(__dirname + '/app'));
	app.use(express.errorHandler({dumpExceptions: true, showStack: true, showMessage: true}));
});

var Imap = require('imap'),
    inspect = require('util').inspect;

var imap = new Imap({
  user: 'user@gmail.com',
  password: 'password',
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

var mailJSONs = [];

function inboxOpen() {
  openInbox(function(err, mailbox) {
  if (err) die(err);
  imap.search([ 'ALL', ['SINCE', 'Febury 7, 2013'] ], function(err, results) {
    if (err) die(err);
    imap.fetch(results,
      { headers: ['from', 'to', 'subject', 'date'],
        body: true,
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
            msg.on('data', function(chunk) {
              body += chunk.toString('utf8');
            });
            msg.on('end', function() {
              console.log('Finished message no. ' + msg.seqno);
              mailJSON.flags = msg.flags;
              mailJSON.date = msg.date;
              mailJSON.body = body;
              mailJSONs.push(mailJSON);
              console.log('UID: ' + msg.uid);
              console.log('Flags: ' + msg.flags);
              console.log('Date: ' + msg.date);
              console.log('Body: ' + body);
            });
          });
        }
      }, function(err) {
        if (err) throw err;
        console.log('Done fetching all messages!');
        imap.logout();
      }
    );
  });
  });
}

var sentJSONs = [];

function sentOpen() {
 openSent(function(err, mailbox) {
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
            var body = '';
            msg.on('headers', function(hdrs) {
              mailJSON.from = hdrs.from;
              mailJSON.to = hdrs.to;
              mailJSON.date = hdrs.date;
              mailJSON.subject = hdrs.subject;
              console.log('Headers for no. ' + msg.seqno + ': ' + show(hdrs));
            });
            msg.on('data', function(chunk) {
              body += chunk.toString('utf8');
            });
            msg.on('end', function() {
              console.log('Finished message no. ' + msg.seqno);
              mailJSON.flags = msg.flags;
              mailJSON.date = msg.date;
              mailJSON.body = body;
              sentJSONs.push(mailJSON);
              console.log('UID: ' + msg.uid);
              console.log('Flags: ' + msg.flags);
              console.log('Date: ' + msg.date);
              console.log('Body: ' + body);
            });
          });
        }
      }, function(err) {
        if (err) throw err;
        console.log('Done fetching all messages!');
        imap.logout();
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
  sentOpen();
  res.send(sentJSONs);
});

app.get('/api/inbox', function(req, res) {
  res.contentType('application/json');
  inboxOpen();
  res.send(mailJSONs);
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