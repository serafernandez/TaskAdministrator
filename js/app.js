window.datastore = require('nedb')
window.db = {}



// Vistas
window.ViewAgregarTarea = Backbone.View.extend({
	events:{
		"click .btn":"ponerTarea",
		"keypress input":"controlTeclaPresionada"
	},
	initialize:function(config){
		this.$el=config.$el;
	},
	render:function(){

	},
	ponerTarea:function(e){
		if($('#inputAgregar').val()!=""){
			//$('#inputAgregar').val("")
			idPrevio=Math.floor((Math.random()*1000000)+1)
			window.colPorHacer.guardar($('#inputAgregar').val(), 5, idPrevio)
			window.colPorHacer.add({titulo:$('#inputAgregar').val(), nivel:5, _id:idPrevio})
		}
	},
	controlTeclaPresionada:function(e){
		if(e.which===13)
			this.ponerTarea()
	}
});
window.ViewListas = Backbone.View.extend({
	events:{
		"sortstop #ulPorHacer, #ulHaciendo, #ulHechas":"guardarTarea"
	},
	initialize:function(config){
		this.$el=config.$el
		var self=this
		window.colPorHacer.on('add', function(model){
			$(self.$el).find('#ulPorHacer').append(window.templates.tempTareas(model.toJSON()))
		})
		window.colHaciendo.on('add', function(model){
			$(self.$el).find('#ulHaciendo').append(window.templates.tempTareas(model.toJSON()))
		})
		window.colHechas.on('add', function(model){
			$(self.$el).find('#ulHechas').append(window.templates.tempTareas(model.toJSON()))
		})
	},
	render: function(){

	},
	guardarTarea: function(e, ui){
		//console.log(e)
		elemento=$('#'+e.toElement.id).parent()[0].id
		console.log(elemento);
	}
});


// Colecciones
window.CollTareasPorHacer = Backbone.Collection.extend({
	guardar:function(titulo, nivel, idPrevio){
		debugger;
		window.db.tareas.insert({titulo:titulo, nivel:nivel, columna:"porHacer"}, function(err, doc){
			$('#'+idPrevio).attr('id', doc._id);
		})
	},
	actualizarColumna:function(id){
		window.db.tareas.update({_id:id}, {$set:{columna:'porHacer'}}, {}, function(err, num){})
	}
})
window.CollTareasHaciendo = Backbone.Collection.extend({
	actualizarColumna:function(id){
		window.db.tareas.update({_id:id}, {$set:{columna:'haciendo'}}, {}, function(err, num){})
	}
})
window.CollTareasHechas = Backbone.Collection.extend({
	actualizarColumna:function(id){
		window.db.tareas.update({_id:id}, {$set:{columna:'hechas'}}, {}, function(err, num){})
	}
})

$(document).ready(function(){
	window.templates={};
	window.templates.tempTareas = _.template($('#templateTarea').html());

	$( "#ulPorHacer, #ulHaciendo, #ulHechas" ).sortable({
    	connectWith: ".listasConectadas"
    }).disableSelection();

    window.colPorHacer = new window.CollTareasPorHacer({})
    window.colHaciendo = new window.CollTareasHaciendo({})
    window.colHechas = new window.CollTareasHechas({})

    window.viewAgregarTarea = new window.ViewAgregarTarea({
    	$el:$('#agregarTarea'),
    });
    window.viewListas = new window.ViewListas({
    	$el:$('#listas')
    })

    window.db.tareas = new window.datastore({filename:"db/tareas.db"})
	window.db.tareas.loadDatabase();

	window.db.tareas.find({columna:"porHacer"}, function(err, docs){
		for(i=0; i<docs.length; i++)
			window.colPorHacer.add(docs[i])
	})
	window.db.tareas.find({columna:"haciendo"}, function(err, docs){
		for(i=0; i<docs.length; i++)
			window.colHaciendo.add(docs[i])
	})
	window.db.tareas.find({columna:"hechos"}, function(err, docs){
		for(i=0; i<docs.length; i++)
			window.colHechos.add(docs[i])
	})
})