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

	project:	BIM
	module: 	uiPartProperties
	desc: 
	usage:
	by: 		Andrew Siddeley 
	started:	19-Jan-2017
	
*/


define(
// load dependencies...
// loading widgetCell defines wCell widget in jquery.
['jquery', 'kernel/widgetCell'],

// then do...
function($, wc){

var UiFeatures={
	
	div$:null,
	
	access:function(part){
		if (typeof part=='undefined' || part==null){return false;}
		
		//reset counters and hide widgets
		this.reset();
		
		//var feature={name:'n', valu:this.x, type:'t', onChange:function(part, revisedvalu){}};
		var ff=part.handler.getFeatures(part);
		var f, i;
		for (label in ff){
			f=ff[label];
			
			switch(f.widget){
				case('point3d'):
					this.wCellinit(label, f.valu, f.onChange, part);
					break;
				case('real'):
					this.wCellinit(label, f.valu, f.onChange, part);
					break;
				case('text'):
					this.wCellinit(label, f.valu, f.onChange, part);
					break;
				default:
					this.wCellinit(label, f.valu, f.onChange, part);
			}		
		}		
	},
	
	init:function(div$){
		this.div$=div$;
		div$.text('features..').addClass('bimFeatures');
		return this; //to allow chaining
	},
	
	//funciton to respond to onPick event triggered by uiPicker
	onInput:function(ev, data){
		//BIM.fun.log('uiFeature.onInput '+data);
	},

	onPick:function(ev, picks){
		//access features of the last bim part picked...
		if (picks.length>0){
			//To work properly as event handler, use 'BIM.ui.features' instead of 'this' 
			BIM.ui.features.access(picks[picks.length-1]);
		} else {
			BIM.ui.features.wCellreset();
		}
	},

	reset:function(){
		this.wCellreset();
	},
	
	////////////////////////
	//widgets for feature editing
	
	//text editor
	wCell:[], //storage
	wCelli:0, //index
	wCellinit:function(label, valu, onChange, part){
		if (this.wCelli==this.wCell.length){
			var div$=$('<div></div>');
			this.div$.append(div$);
			div$.wCell().hide();
			this.wCell.push(div$);
		};
		$(this.wCell[this.wCelli++]).wCell('vlca', valu, label, onChange, part).show();	
	},
	wCellreset:function(){
		this.wCelli=0;
		this.wCell.forEach(function(item){item.hide();});
	},
	


};

return UiFeatures;

});


