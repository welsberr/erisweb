/*
ERIS: Event Recorder Information System for the Web
Copyright 2016 by Wesley R. Elsberry (MIT License)
Based on ERIS v.107, Copyright 1996 by Wesley R. Elsberry, version in Turbo Pascal.
*/

// Getting time: code taken from Chris GW Green's StackOverflow answer
// http://stackoverflow.com/questions/4874408/better-way-of-getting-time-in-milliseconds-in-javascript
window.performance = window.performance || {};
performance.now = (function() {
    return performance.now       ||
        performance.mozNow    ||
        performance.msNow     ||
        performance.oNow      ||
        performance.webkitNow ||            
        Date.now  /*none found - fallback to browser default */
})();

/* ----------------------------------------------------------------------
ERIS object definition
---------------------------------------------------------------------- */
function ERIS(){
    // About object to be returned if parameter isn't passed
    var about = {
        Version: 0.5,
        Author: "Wesley R. Elsberry",
        Created: "April, 2016",
        Updated: "July, 2016"
    };

    if (undefined == window.erisregistry){
        // erisregistry is a global hash to map DOM elements to
        // ERIS objects. This is needed for event handlers, to
        // link controls back to the ERIS object, since
        // 'this' for an event handler is just the element that
        // triggered the event.
        window.erisregistry = {};
    }

    if (window === this){
        var eris = new ERIS();
	if (undefined == window.erisregistry['globaleris']){
	    window.erisregistry['globaleris'] = eris;
	}
	eris.dateobj = new Date();
	console.log("created data object", eris.dateobj);
	console.log("now", eris.dateobj.getTime(), performance.now());
	return eris;
    }
}

ERIS.prototype = {

    logdisplayid: 'eventlogger',

    dateobj: null,

    isEris: function(){
	return true;
    },

    active: false,

    keysq: [],

    keytime: null,

    basetime: performance.timing.navigationStart,

    tokens: {
	13 : 'accept',  // Enter
	8 : 'delete',  // Backspace
	27 : 'activetoggle', // ESC
	37 : 'delete',  // Left-arrow
	46 : 'delete',  // Delete
	127 : 'delete',	 // Delete (ASCII)
    },

    log: [],

    checkq: function(){

    },

    // To be called on keydown events
    inputTimeHandler: function(e){
	// Early-binding of time
	var ms = performance.now(); // get the time as soon as possible

	// Figure out self, if needed
	var self = this;
	if ((undefined == self.isEris) || (!self.isEris())){
	    // Get it from registry
	    self =  window.erisregistry['globaleris'];
	}

	var keyvalue = e.keyCode;
	var action = self.tokens[keyvalue];
	console.log("action for", keyvalue, action);


	    if ((self.keytime == null) && ('delete' != action) && ('deactivate' != action)){
		self.keytime = ms;
		console.log("time bound", ms, performance.timing.navigationStart); 
	    }


	switch (action){
	case 'delete':
	    e.preventDefault();

	    self.log.pop();
	    self.keytime = null;
	    console.log("applied deletion to log", self.log);
	    break;

	case 'activetoggle':
	    e.preventDefault();
	    self.keytime = null;
	    self.active = !self.active;
	    console.log("ERIS active toggled", self.active);
	    break;

	default:
	    break;
	}

    },

// Check if a character is a valid initial character for any token
isValidInitialChar: function(char) {
    // Figure out self, if needed.
    var self = this;
    if ((undefined == self.isEris) || (!self.isEris())){
        // Get it from registry
        self =  window.erisregistry['globaleris'];
    }

    for (var token in this.tokens) {
        if (token.startsWith(char)) {
            return true;
        }
    }
    return false;
},
	
// To be called on keypress events
inputCharHandler: function(e){
    var self = this;
    if ((undefined == self.isEris) || (!self.isEris())){
        // Get it from registry
        self =  window.erisregistry['globaleris'];
    }

    if (!self.active) return;  // Exit early if not active

    var charstr = String.fromCharCode(e.charCode);
    var keyvalue = e.keyCode;

    var action = self.tokens[keyvalue];

    if (action) {
        switch (action) {
        case 'accept':
            var eventtuple = [self.keysq.join(""), self.keytime];
            self.log.push(eventtuple);
            self.keysq = [];
            self.keytime = null;
            break;
        case 'delete':
            e.preventDefault();
            self.log.pop();
            self.keysq = [];
            self.keytime = null;
            break;
        case 'activetoggle':
            e.preventDefault();
            self.active = !self.active;
            self.keysq = [];
            self.keytime = null;
            break;
        }
    } else {
        // If the queue is empty and the character is not a valid initial character, reset
        if (self.keysq.length === 0 && !self.isValidInitialChar(charstr)) {
            self.keysq = [];
            self.keytime = null;
        } else {
            self.keysq.push(charstr);
        }
    }
}, // inputCharHandler()

    acceptQueue: function(){
	// This function takes whatever is in the key queue,
	// joins it, and uses the bound time to make an entry.
    },

    inputClickHandler: function(){
	// Figure out self, if needed.
	var self = this;
	// if (!self.isEris()){
	if ((undefined == self.isEris) || (!self.isEris())){
	    // Get it from registry
	    self =  window.erisregistry['globaleris'];
	}
	
    },

    processQueue: function(self){
	// Figure out self, if needed.
	var self = this;
	// if (!self.isEris()){
	if ((undefined == self.isEris) || (!self.isEris())){
	    // Get it from registry
	    self =  window.erisregistry['globaleris'];
	}

	// Figure out if queue contents can be resolved
	if (self.active){

	}

    },

    installListeners: function(){
	// Figure out self, if needed.
	var self = this;
	// if (!self.isEris()){
	if ((undefined == self.iEris) || (!self.isEris())){
	    // Get it from registry
	    self =  window.erisregistry['globaleris'];
	}

	window.addEventListener("keydown", self.inputTimeHandler, false);
	window.addEventListener("keypress", self.inputCharHandler, false);
	//window.addEventListener("keyup", dealWithKeyboard, false);
    },


    displayLog: function(){
	// Figure out self, if needed.
	var self = this;
	// if (!self.isEris()){
	if ((undefined == self.iEris) || (!self.isEris())){
	    // Get it from registry
	    self =  window.erisregistry['globaleris'];
	}

	displayelement = document.getElementById(self.logdisplayid);
	if (0 < self.log.length) {
	    var ihstr = "<hr /><br />"

	    for (var ii=self.log.length - 1; ii >= 0; ii--){
		ihstr = ihstr + self.log[ii][0] + "&nbsp;&nbsp;" + new Date(self.log[ii][1] + self.basetime).toISOString() +" <br />";
	    } // for log
	    ihstr = ihstr + "<hr />";
	    displayelement.innerHTML = ihstr;
	} // if log length
	else {
	    displayelement.innerHTML = "<hr /><br /><hr />";
	    
	}
    },
    
    installDisplayUpdater: function(){
	// Figure out self, if needed.
	var self = this;
	// if (!self.isEris()){
	if ((undefined == self.iEris) || (!self.isEris())){
	    // Get it from registry
	    self =  window.erisregistry['globaleris'];
	}

	self.displayintervalometer = setInterval(self.displayLog, 200);
	
    },
}

