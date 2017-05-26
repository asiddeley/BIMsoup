/************************************************************
	license:

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

	
	project:	BIM united FC (Function Collection)
	module: 	voxelite
	desc: 
	author: 	Andrew Siddeley 
	started:	24-Mar-2017
	
****************************************************************/
// Define a Module with Simplified CommonJS Wrapper...
// see http://requirejs.org/docs/api.html#cjsmodule
define( function(require, exports, module){

var babylon=require('babylon');
var $=require('jquery');
var nameable=require('features/nameable');
var positionFeature=require('features/positionFeature');
var pickable=require('features/pickable');
var mcGrowable=require('features/mcGrowable');

//DEP, use: var bimType=instanceOf (new Voxelite());
//	bimType:'Voxel', 
	
// Constructor - Used only once below  
// Voxelite() - returns a voxelite {obj}, the handler with Static methods
var Voxelite=function(featureFunctions){
	//Inheritance Vs Mixin - Build elements and parts by extending Handler OR NOT?
	//PRO: all handlers begin by extending ElementHandler (alias EH) which creates addFM method
	//CON: should be possible to assemble handlers at runtime with BIM.fun.featurize() i.e.
	//creating handlers on the fly and adding bimability to any Babylon mesh
	//Inheritance code - add optional featureFunctions to Voxelite handler
	//Handler.call(this, featureFunctions);
	
	this.bimType='Voxelite';
	this.desc='A 10 unit cube, that can be placed at 10 unit coordinates.';
	this.featureMakers=[
		nameable, //name:nameFE(mesh)
		//desc:new userFeature('Desc', 'A 10 unit cube, that can be placed at 10 unit coordinates.'),
		positionFeature,
		pickable,
		mcGrowable
	];
	//AS-IS
	//feature is a function that consctucts a feature {} scoped to a mesh
	//PROPOSE
	//feature is a static {} with 2 significant functions engage(mesh)
};

//inherit prototype from UI
//Voxelite.prototype=Object.create(Handler.prototype);
//Voxelite.prototype.constructor=Handler;

var __=Voxelite.prototype;	
	
__.setScene=function(scene){ 

	//__.BIM.func.dependency(babylon.StandardMaterial, 'voxelTexture', scene)
	var m=new babylon.StandardMaterial("voxelTexture", scene);
	m.diffuseTexture = new babylon.Texture("textures/voxelTextures.png", scene);
	m.uScale=1.0;
	m.vScale=1.0;
	//m.backFaceCulling=true;

	var options={
		width:10,
		height:10,
		depth:10,
		faceUV:[
			//faceUV order is: z+, z-, x+. x-, y+, y-
			//BABYLON.Vector4(uLL, vLL, uUR, vUR)
			new BABYLON.Vector4(9/16, 3/16, 8/16, 2/16), //sides
			new BABYLON.Vector4(8/16, 2/16, 9/16, 3/16), //note flip uUR, vUR, uLL, vLL
			new BABYLON.Vector4(9/16, 2/16, 10/16, 3/16),
			new BABYLON.Vector4(9/16, 2/16, 10/16, 3/16),
			new BABYLON.Vector4(11/16, 2/16, 12/16, 3/16), //grass top		
			new BABYLON.Vector4(10/16, 2/16, 11/16, 3/16), //dirt bottom		
		]
	};		
	
	var mesh=BABYLON.MeshBuilder.CreateBox('voxelite', options, scene);
	mesh.material=m;	

	//add bim handler to babylon mesh object
	mesh.bimHandler=this;
	mesh.bimData={};
	
	//BIM.fun.featurize(mesh, [
	//	pickable,
	//	mcGrowable
	//], scene);
	//nameable(mesh).setScene(scene); //nameable setScene NA
	//peekableFC(mesh).init(this); //adds the getFeature func
	//pickable(mesh).setScene(scene); //initialize the property
	mcGrowable(mesh).setScene(scene); //allows voxelite to grow by adding instances off a picked face

	//return the new mesh that was added to the scene
	return mesh;
};
//created by BIM.fun.featurize()
__.getFeatures=function(mesh) {
	// Returns a fresh hash of features:
	// {name:{feature}, position:{feature}...}
	// A feature is a hash scoped to a particular mesh like this:
	// {label:'name', valu:mesh.variable, onFeatureChange:fn(ev,mesh,res){...}, editor:featureEditer}
	// return $.extend({},name.getFeature(mesh) );
	return {
		name:nameable(mesh), //name:nameFE(mesh)
		//desc:description(),
		position:positionFeature(mesh),
		pickable:pickable(mesh),
		growable:mcGrowable(mesh)
		
		//pokeLeft:variousFeatureActions(mesh),
		//pokeRight:customFeatureActions(mesh),
		//pickable:pickActionFeature(mesh), //allows mesh to be picked by featureUI
		//peekable:peekAF(mesh), //
	}
}


//var voxelite=new Voxelite();
//one voxelite handler for all voxelite meshes
//return voxelite;

//usage: 
//voxeliteHandler=new Voxelite(); 
//voxeliteHandler.setScene(scene); //to add a new bimType to the scene
return Voxelite;
});