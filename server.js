#!/usr/bin/nodejs

var dnsd = require('dnsd')
var http = require('http');
var pkg = require('./package.json');
var authorization = require('auth-header');
var token = require('parse-bearer-token');
var jwt_decode = require('jwt-decode');

var dnsserver = dnsd.createServer(dnshandler)
dnsserver.zone('example.com', 'ns1.example.com', 'us@example.com', 'now', '2h', '30m', '2w', '10m')
      .listen(pkg.config.dns_listen_port, pkg.config.dns_listen_address)
 
function dnshandler(req, res) {
	  console.log('DNS FROM: %s:%s/%s %j', req.connection.remoteAddress, req.connection.remotePort, req.connection.type, req)
	 
	  var question = res.question[0]
	    , hostname = question.name
	    , length = hostname.length
	    , ttl = 1
	 
	  if(question.type == 'A') {
		      res.answer.push({name:hostname, type:'A', data:pkg.config.dns_resolve_to, 'ttl':ttl})
		    }
	  res.end()
}



//create a server object:
http.createServer(httphandler)
	.listen(pkg.config.http_listen_port);
	
function httphandler(req, res) {
	console.log('HTTP FROM: %s:%s', req.connection.remoteAddress, req.connection.remotePort)


	if(typeof req.headers.authorization === 'string') {
		var auth = authorization.parse(req.headers.authorization);
		if(auth.scheme == 'Basic') {
			var buf = new Buffer(auth.token, 'base64');
			auth.basic_creds = buf.toString('utf8');
		}
		if(auth.scheme == 'Bearer') {
			decodedBearer =  jwt_decode(auth.token);
			
			
			try { 
				eval('auth.bearer_decoded = jwt_decode(auth.token)')
			} catch(e) {
				auth.bearer_decoded = "DECODE ERROR";
				auth.bearer_decode_error = JSON.stringify(e.message);
				
			}
		}

	} else {
		var auth = { scheme: 'NONE' }
	}


	res.write('<pre>\n<b>Howdy!</b>\n\nYour Request Details:\n\t' + req.method + ' ' + req.url  + '\nYour Source IP:' + req.connection.remoteAddress + "\nHeaders:\n" + JSON.stringify(req.headers,null,'\t') + "\nAuthorization data I can decode:\n" + JSON.stringify(auth,null,"\t") + '\n</pre>\n'); //write a response to the client
  res.end(); //end the response
}
console.log('DNS Server running at ' + pkg.config.dns_listen_address + ':' + pkg.config.dns_listen_port);
console.log('HTTP Server running at ' + pkg.config.http_listen_address + ':' + pkg.config.http_listen_port);
console.log('DNS will resolve everything to: ' + pkg.config.dns_resolve_to);

