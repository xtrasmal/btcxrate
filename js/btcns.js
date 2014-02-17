var _btc = {};

_btc.errors = [];
_btc.results = {};
_btc.debug = false;
_btc.api = "//btc.local/api/";
_btc.timeoutId = null;
_btc.traceCounter = 0;
_btc.autostart = true;
_btc.autorefresh = false;
_btc.refreshinterval = 0.5;	// Minutes!
_btc.currencytofixed = 2;

_btc.trace = function(trace, level){
	if(!_btc.debug) {return;}
	try {
		// Create timestamp
		var d = new Date();
		//Create increment:
		var i = _btc.traceCounter; _btc.traceCounter++; 
			if(typeof console =='object') {
				if(typeof trace =='string' || typeof trace=="number" || typeof console.dir !='function'){	
					if(level && console[level]){
						console[level](i+") Trace: ["+d.getTime()+"] "+trace);
					} else {
						console.info(i+") Trace: ["+d.getTime()+"] "+trace);
					}
				}else {
					console.info(i+") Trace: ["+d.getTime()+"]");
					console.dir(trace);
				}
			}
	} catch (e) {}
}
