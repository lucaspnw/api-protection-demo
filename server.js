#!/usr/bin/nodejs

var dnsd = require('dnsd')
var http = require('http');
var pkg = require('./package.json');

var dnsserver = dnsd.createServer(dnshandler)
dnsserver.zone('example.com', 'ns1.example.com', 'us@example.com', 'now', '2h', '30m', '2w', '10m')
      .listen(pkg.config.dns_listen_port, pkg.config.dns_listen_address)
console.log('DNS Server running at ' + pkg.config.dns_listen_address + ':' + pkg.config.dns_listen_port)
 
function dnshandler(req, res) {
	  console.log('%s:%s/%s %j', req.connection.remoteAddress, req.connection.remotePort, req.connection.type, req)
	 
	  var question = res.question[0]
	    , hostname = question.name
	    , length = hostname.length
	    , ttl = 1
	 
	  if(question.type == 'A') {
		      res.answer.push({name:hostname, type:'A', data:pkg.config.dns_resolve_to, 'ttl':ttl})
		    }
	  res.end()
}

console.log('HTTP Server running at ' + pkg.config.http_listen_address + ':' + pkg.config.http_listen_port);


//create a server object:
http.createServer(httphandler).listen(pkg.config.http_listen_port);
	
function httphandler(req, res) {
  res.write('Hi!'); //write a response to the client
  res.end(); //end the response
}

