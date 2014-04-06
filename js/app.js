/*var _ = require('underscore')._,
	Backbone = require('backbone')
*/

// Vistas
window.ViewAgregarTarea = Backbone.View.extend({
	events:{
		"click .btn":"ponerTarea"
	},
	initialize:function(config){
		this.$el=config.$el;
	},
	render:function(){

	},
	ponerTarea:function(e){
		console.log("LAlalela")
	}
})
window.ViewListas = Backbone.View.extend({
	events:{
		"sort li.tarea":"guardarTarea"
	},
	initialize:function(config){

	},
	render: function(){

	},
	guardarTarea: function(e){
		console.log('lalal')
	}
})


// Colecciones
window.CollTareas = Backbone.Collection.extend({

})


$(document).ready(function(){
	window.templates={};

	$( "#ulPorHacer, #ulHaciendo, #ulHecho" ).sortable({
    	connectWith: ".listasConectadas"
    }).disableSelection();

    window.viewAgregarTarea = new window.ViewAgregarTarea({
    	$el:$('#ponerTarea')
    })
})