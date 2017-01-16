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

	
	project:	BIMsoup
	desc:		(B)uilding(I)nformation(M)odel(s)ource(o)pen(u)tility(p)rogram 
		
	module: 	dashboard
	desc: 
	usage:

	by: 		Andrew Siddeley 
	started:	12-Jan-2017
	
*/


define(
// load dependencies...
['jquery'],

// then do...
function($){

	var handlers={

		'label':function(title, label, callback){
			//TODO
			//Set up control with callback and pass to blackboard
			//Create undo operation
			var contol=new jquery.widget();
			
			
		
			window.BIM.blackboard(control, 'control');
		},

		'point3d':function(title, point3d, callback){
			//callback(point3d);
		},
	
		'real':function(title, real, callback){
			//TODO
			//Set up control with callback and pass to blackboard
			//Create undo operation
			
			/*
			// this code not very good, stack will just grow.  No easy way to manage. Consider jqueryUI widgets instead
			window.BIM.stack.push(callback); //array of callback functions
			var num=window.BIM.stack.length;
			control='<div class="BIMcontrol">'+title + ' : ' real.toString()+
			'<button class="BIMcontrol" action="BIM.stack(" '+callbackNum+")>OK </button></div>"
			window.BIM.blackboard(control, 'control');
			*/
			
			
			
			//callback(real);  //called by control to update BIM part and related babylon element(s) 
		},
		

		
		'text':function(title, text, callback){
		
			//callback(text);
		},	
	
	};

	return handlers;
});

