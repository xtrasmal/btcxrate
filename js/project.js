
if(typeof _btc.trace !="function"){
	_btc.trace = new Function;
}

(function(){

	_btc.onDomReady(function(){

		if(_btc.autostart){
			_btc.go();
		}

	})

})();



_btc.go = function(){
	function createCORSRequest(method, url) {
		var xhr = new XMLHttpRequest();
		if ("withCredentials" in xhr) {
			// XHR for Chrome/Firefox/Opera/Safari.
			xhr.open(method, url, true);
		} else if (typeof XDomainRequest != "undefined") {
			// XDomainRequest for IE.
			xhr = new XDomainRequest();
			xhr.open(method, url);
		} else {
			// CORS not supported.
			xhr = null;
		}
		return xhr;
	}


	// Make the actual CORS request.
	function makeCorsRequest() {
	
		var url = 'http://api.coindesk.com/v1/bpi/currentprice.json';

		var xhr = createCORSRequest('GET', url);
		if (!xhr) {
			alert('CORS not supported');
			return;
		}
		// Response handlers.
		xhr.onload = function() {
			var text = xhr.responseText;
			_btc.init(JSON.parse(text));
		};

		xhr.onerror = function() {
			alert('Woops, there was an error making the request.');
		};

		xhr.send();

		if(_btc.autorefresh){
			var interval = _btc.refreshinterval * 60000;
			clearTimeout(_btc.timeoutId);
			_btc.timeoutId = setTimeout(function(){makeCorsRequest();}, interval);
		}
	}
	makeCorsRequest();
}

_btc.init = function(data){
	_btc.xrates = {};
	_btc.errors = [];
	_btc.time = {};
	_btc.exchanges = {};

	_btc.trace("btc xrate init success");
	_btc.trace(data);


	if(data) {

		// Store the results
		_btc.results = data;

		// Add BTC to results
		 _btc.results.bpi['BTC'] = {};
		
		var nodes = _btc.Sizzle("[data-btcxrate]");

		_btc.trace("Found "+ nodes.length + " DOM elements to convert");

		if(nodes.length > 0){
			_btc.processNodes(nodes);
		}

	} else {
		// Service error here, report and do nothing
		_btc.errors.push(data.meta);
	
	}

	if(_btc.errors.length > 0){
		_btc.trace(_btc.errors);
	}
}

_btc.processNodes = function(nodes){
	
	for(i=0; i<nodes.length;i++){
		var currentNode = nodes[i];
		var nodeDone = false;

		if(_btc.Sizzle.matchesSelector(currentNode, "[data-btcxrate-lastupdated]") && !nodeDone){
			_btc.trace(_btc.results.time);
			currentNode.innerHTML = _btc.results.time.updateduk;
			nodeDone = true;
		}

		if(!nodeDone){
			var dataItems = {};
			var calculatedValue;
			dataItems.from = currentNode.getAttribute("data-btcxrate-from");
			dataItems.to = currentNode.getAttribute("data-btcxrate-to");
			dataItems.value = currentNode.getAttribute("data-btcxrate-value");
			dataItems.tofixed = currentNode.getAttribute("data-btcxrate-tofixed");
			dataItems.usecomma = _btc.Sizzle.matchesSelector(currentNode, "[data-btcxrate-usecomma]");
			dataItems.multiplier = currentNode.getAttribute("data-btcxrate-multiplier");
			calculatedValue = _btc.calculateValue(dataItems);

			if(calculatedValue){
				currentNode.innerHTML = calculatedValue;
			}

			nodeDone = true;
		}
	}
}

_btc.calculateValue = function (dataItems){

	var returnValue = null;

	_btc.trace(dataItems);

	// Test from/to
	if(!dataItems.from || typeof _btc.results.bpi[dataItems.from] == 'undefined'){
		_btc.errors.push("From currency ("+dataItems.from+") was not found in xrate object");
		return false;
	}

	if(!dataItems.to || typeof _btc.results.bpi[dataItems.to] == 'undefined'){
		_btc.errors.push("To currency ("+dataItems.to+") was not found in xrate object");
		return false;
	}

	// Normalize value
	
	dataItems.value = (dataItems.value) ? dataItems.value.replace(",", ".") : 1;

	if(dataItems.from == 'BTC'){
		returnValue = (parseFloat(dataItems.value) * _btc.results.bpi[dataItems.to].rate_float); 
	} else {
		returnValue = (parseFloat(dataItems.value) / _btc.results.bpi[dataItems.from].rate_float);
	}

	if(dataItems.multiplier){
		returnValue = returnValue * parseFloat(dataItems.multiplier);
	} else if(_btc.multiplier){
		returnValue = returnValue * parseFloat(_btc.multiplier);
	}

	if(dataItems.tofixed){
		returnValue = returnValue.toFixed(parseFloat(dataItems.tofixed));
	} else {
		if(dataItems.from == 'BTC'){
			returnValue = returnValue.toFixed(_btc.currencytofixed);
		} else if(_btc.btctofixed) {
			returnValue = returnValue.toFixed(_btc.btctofixed);
		}
	}

	


	if(returnValue){
		returnValue = returnValue+"";
		if(dataItems.usecomma){
			return returnValue.replace(".",",");
		} else {
			return parseFloat(returnValue);
		}
	} else {
		return false;
	}

}

// _btc.go = function(){
// 	_btc.removeScript();
// 	var btc = document.createElement('script'); btc.type = 'text/javascript'; btc.async = true;
//     btc.src = _btc.api + "?callback=_btc.init";
//     btc.setAttribute("rel", "BTCXRATE");
//     var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(btc, s);
//     if(_btc.autorefresh){
//     	var interval = _btc.refreshinterval * 60000;
//     	interval = (interval > 60000) ? interval : 60000;
//     	clearTimeout(_btc.timeoutId);
//     	_btc.timeoutId = setTimeout(function(){_btc.go()}, interval);
//     }
// }

// _btc.removeScript = function(){
// 	var scripts = document.getElementsByTagName('script');
// 	for(var i=scripts.length-1;i>=0;i--){	
// 		if(scripts[i].getAttribute("rel") == "BTCXRATE"){
// 			scripts[i].parentNode.removeChild(scripts[i]);
// 		}
// 	}
// }















