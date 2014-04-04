var _ = require('underscore')._,
	Backbone = require('backbone')

$(document).ready(function(){
	window.templates= {};
	$( "#ulPorHacer, #ulHaciendo, #ulHecho" ).sortable({
      connectWith: ".listasConectadas"
    }).disableSelection();
})