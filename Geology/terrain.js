/************************************************************
	legal:

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
	
	module: 	terrain
	project:	BIMunited
	ancestry: Model
	abstract: 	
	
	author: 	Andrew Siddeley 
	started:	14-Feb-2017
	
*************************************************************************/

define(
//Load dependencies...
['babylon', 'jquery', 'kernel/partModel'], 
  
//Then do this...
function(babylon, $, Model) {

//note Model=handler(1 static), model=data(many instances)  
var terrainHandler=$.extend( {}, Model, {

	
	// override
	'create':function(){ return $.extend( {}, Model.create(), terrailnData ); },

	// override
	'demo':function(num){
		//alert('demo:'+num);
		var that=this;
		switch(num){
			case 1: return that.demo1(); break;
			default: return that.demo1();			
		}
	},
	
	'demo1':function(){
		//demo 1
		//Arch model with some sphere

		var m=this.create();
		var v=babylon.Vector3;
		m.handler.addPart(m, Sphere.create({'name':'s1', 'radius':0.5, 'position':new v(0,0,0)}));
		m.handler.addPart(m, Sphere.create({'name':'s2', 'radius':1, 'position':new v(6,0,0)}));
		m.handler.addPart(m, Sphere.create({'name':'s3', 'radius':1.5, 'position':new v(0,6,0)}));
		m.handler.addPart(m, Sphere.create({'name':'s4', 'radius':2, 'position':new v(6,6,0)}));
		//alert('model demo1');
		return m;
	},

	disc:'Geology',
	type:'Terrain',
	typeAncestor:'Model'
	
});

// ArchModel inherits from Model
var terrainData={
	disc:'geology',
	handler:terrainHandler,
	
};


return terrainHandler;
});



