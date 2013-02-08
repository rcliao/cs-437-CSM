var  fs = require('fs')
    , db = require('mongojs').connect('csm');

db.collection('users').count( function (erros, doc) {
    if (doc == 0) {
        var users = JSON.parse(fs.readFileSync(__dirname+'/sampledata/users.json').toString());
        users.forEach(function (user) { 
            db.collection('users').insert(user, function (err, doc) { 
                if (err) {throw err;}
            });
        });
        console.log('Users load to MongoDB');
    }
	var users = JSON.parse(fs.readFileSync(__dirname+'/sampledata/emails.json').toString());
    users.forEach(function (email) { 
        db.collection('emails').insert(email, function (err, doc) { 
            if (err) {throw err;}
        });
    });
    console.log('Emails load to MongoDB');
	
});