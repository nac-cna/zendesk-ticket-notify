/**	
	Poll the Zendesk API to check for unassigned tickets & return the total, if any
	(use Node Express with async/await middleware & refreshes a webpage with results)
**/


var config = require('./config');
var fs = require('fs');
var zd = require('node-zendesk');
var bodyParser = require('body-parser');

var client = zd.createClient({
  username:  config.auth.username,
  token:     config.auth.token,
  remoteUri: config.auth.remoteUri
});

var observer = {
  error: console.error,
  next: function(status, body, response, result, nextPage) {
	bodyParser.json();
	
	for (var i=0; i< body.length; i++ ) {
		//console.log(body[i].assignee_id);
		if(body[i].assignee_id == null){
			console.log(body[i].subject);
		}
	}
  }
};

client.tickets.listRecent(observer);
