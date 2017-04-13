/************************************************************

	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.

	This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.

	project:	BIM united FC
	module: 	PartsUI
	by: 		Andrew Siddeley 
	started:	16-Feb-2017
	
*/


define(
// load dependencies...
['jquery', 'jquery-ui', 'babylon', 'united/FeaturesUI' ],

// then do...
function($, $$, babylon, FeaturesUI ){

var PartsUI=function(board, title){
	// Inherit from UI, call super constructor
	FeaturesUI.call(this, board, title); 
	BIM.input('_restock'); 
	return this;
};

// Inherit the UI prototype
PartsUI.prototype=Object.create(FeaturesUI.prototype);
PartsUI.prototype.constructor=PartsUI;

var PP=PartsUI.prototype;

PP.addControlgroup=function(partHandler){
	var cg$=$('<div></div>').addClass('ui-widget-content');
	this.div$.append(cg$);
	
	//main creater
	this.addPartCreaterButton(cg$, partHandler.bimType, partHandler.create);
	
	//alternate creaters
	for (var n in partHandler.creaters){
		this.addPartCreaterButton(cg$, n, partHandler.creaters[n]);
	};

	//wigetize cg$, google jquery-ui controlgroup for documentation
	//items indicates what widgets to apply
	cg$.controlgroup({items:{button:'button'}});
};
	
PP.addPartCreaterButton=function(cg$, n, fn){
	//n - name of part
	//fn - creater function of part
	//cg$ - jquery wrapped element to contain buttons
	var onClick=function(ev){ 
		//eval creater function fn, and set cMesh to is (current Mesh).
		BIM.get.cMesh(fn());
		//message to uiFeatures to expose new mesh features
		BIM.input('_meshAdded');
	};
	var b$=$('<button></button>').addClass('ui-widget-content').text(n);
	b$.on('click', onClick);
	cg$.prepend(b$);
};

	
	
	
// override UI
PP.getEvents=function(){
	return { 
		bimInput:{name:'bimInput',  data:this, handler:this.onInput },
		bimRestock:{name:'bimRestock', data:this, handler:this.onRestock }
	};
};

//inherited from UI but overriden
PP.onInput=function(event, input){ 
	//don't use keyword 'this' here as it will refer to the event caller's context, not uiPicker
	switch(input){
	case 'ap':
	case 'parts': ev.data.toggle(); break;
	case 'events':
		//keys - Array of event names
		var keys=Object.keys(ev.data.getEvents()); 
		ev.data.log('// Parts UI\n' + keys.join("\n"));
		break;	
	case 'keywords':
		var keys=['ap', 'parts', 'events', 'keywords', '_restock'];
		ev.data.log('// Blackboard UI\n' + keys.join("\n"));
		break;		
	case '_restock':	BIM.fun.trigger('bimRestock', [BIM.partsLib]); break;
	}		
};
	
PP.onRestock=function(ev, lib){
	//beware of meaning of keyword 'this' inside event handlers!
	//TODO - remove any existing controlgroup from divs
	for (var i in lib){ev.data.addControlgroup(lib[i]);}		
};
	
return PartsUI;

});
