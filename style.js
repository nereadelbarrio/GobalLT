(function (blink) {
	'use strict';

	var GobalLTtyle = function () {
			blink.theme.styles.basic.apply(this, arguments);
		},
		page = blink.currentPage;

	GobalLTtyle.prototype = {
		//BK-15873 añadimos el estilo basic como parent para la herencia de los estilos del CKEditor
		parent: blink.theme.styles.basic.prototype,
		bodyClassName: 'content_type_clase_GobalLT',
		extraPlugins: ['cambridge_dropdown', 'blink_video_inline'],
		ckEditorStyles: {
			name: 'GobalLT',
			styles: [
				{ name: 'Título 1', element: 'h4', attributes: { 'class': 'bck-title1'} },
				{ name: 'Título part1', element: 'h4', attributes: { 'class': 'bck-title2'} },
				{ name: 'Título part2', element: 'h4', attributes: { 'class': 'bck-title3'} },
				{ name: 'Título part3', element: 'h4', attributes: { 'class': 'bck-title4'} },
				{ name: 'Título part4', element: 'h4', attributes: { 'class': 'bck-title5'} },
				{ name: 'Título part5', element: 'h4', attributes: { 'class': 'bck-title6'} },
				{ name: 'Título part6', element: 'h4', attributes: { 'class': 'bck-title7'} },
				{ name: 'Título rojo', element: 'h4', attributes: { 'class': 'bck-title8'} },
				{ name: 'Título verde', element: 'h4', attributes: { 'class': 'bck-title9'} },
				{ name: 'Título morado', element: 'h4', attributes: { 'class': 'bck-title10'} },
				{ name: 'Título video', element: 'h4', attributes: { 'class': 'titlevideo'} },
				{ name: 'Subtítulo', element: 'span', attributes: { 'class': 'bck-enfasis-1'} },
				{ name: 'Azul', element: 'span', attributes: { 'class': 'bck-enfasis-2'} },
				{ name: 'Cuadrado', element: 'span', attributes: { 'class': 'bck-enfasis-3'} },
				{ name: 'Negro', element: 'span', attributes: { 'class': 'bck-enfasis-4'} },

				{ name: 'Caja negra', type: 'widget', widget: 'blink_box', attributes: { 'class': 'box-negra' } },
				{ name: 'Caja learning', type: 'widget', widget: 'blink_box', attributes: { 'class': 'box-learning' } },
				{ name: 'Caja useful', type: 'widget', widget: 'blink_box', attributes: { 'class': 'box-useful' } },
				{ name: 'Caja azul', type: 'widget', widget: 'blink_box', attributes: { 'class': 'box-azul' } },
				{ name: 'Caja amarilla', type: 'widget', widget: 'blink_box', attributes: { 'class': 'box-amarilla' } },
				{ name: 'Caja Exam Task', type: 'widget', widget: 'blink_box', attributes: { 'class': 'box-actividad' } },
				{ name: 'Caja Ideas Focus', type: 'widget', widget: 'blink_box', attributes: { 'class': 'box-tip' } },
				{ name: 'Caja verde', type: 'widget', widget: 'blink_box', attributes: { 'class': 'box-verde' } },
				{ name: 'Caja writing', type: 'widget', widget: 'blink_box', attributes: { 'class': 'box-writing' } },


				{ name: 'Lista Ordenada Alpha roja', element: 'ol', attributes: { 'class': 'bck-ol' } },
				{ name: 'Lista Ordenada Alpha negra', element: 'ol', attributes: { 'class': 'bck-ol-4' } },
				{ name: 'Lista Ordenada Alpha azul', element: 'ol', attributes: { 'class': 'bck-ol-6' } },
				{ name: 'Lista Ordenada Numeral Azul', element: 'ol', attributes: { 'class': 'bck-ol-3' } },
				{ name: 'Lista Ordenada Lower-Alpha', element: 'ol', attributes: { 'class': 'bck-ol-5' } },
				{ name: 'Lista Desordenada Morada', element: 'ul', attributes: { 'class': 'bck-ul-2' } },
				{ name: 'Lista Desordenada Azul', element: 'ul', attributes: { 'class': 'bck-ul-3' } },

				{ name: 'Desplegable 2', type: 'widget', widget: 'blink_dropdown', attributes: { 'class': 'desplegable-2' } }
			]
		},

		init: function () {
			//BK-15873 Utilizamos this.parent declarada al inicio de la clase
			this.parent.init.call(this);
			this.addActivityTitle();
			if(window.esWeb) return;
			this.formatCarouselindicators();
			this.addSlideNavigators();
		},

		removeFinalSlide: function () {
			//BK-15873 Utilizamos this.parent declarada al inicio de la clase
			this.parent.removeFinalSlide.call(this, true);
		},

		setCanvasSize: function (index) {
			if (blink.windowWidth < 1024) return;
			var prefix = 't'+index,
				slide = window[prefix+'_slide'],
				$slide = $('#transp' + index),
				slideHeight = $slide.closest('.item-container').show().height(),
				slideWidth = $slide.width(),
				$canvas = $slide.find('#canvas-wrapper canvas');

			if (slide && slide.isConcatenate) {
				$canvas.hideBlink();
			} else {
				$canvas.attr({height: slideHeight});
				if(typeof blink.tools.manager.tools.pencil !== 'undefined'){
					if(slideWidth){
						blink.tools.manager.tools.pencil.setCanvasSize(prefix, slideHeight, slideWidth);
					}else{
						blink.tools.manager.tools.pencil.setCanvasHeight(prefix, slideHeight);
					}
				}
				redrawCanvas();
			}
		},

		addActivityTitle: function () {
			if (!blink.courseInfo || !blink.courseInfo.unit) return;
			$('.libro-left').find('.title').html(function () {
				return $(this).html() + ' > ' + blink.courseInfo.unit;
			})
		},

		formatCarouselindicators: function () {
			var $navbarBottom = $('.navbar-bottom'),
				$carouselIndicators = $('.slider-indicators').find('li');

			$carouselIndicators.tooltip('destroy');

			var navigatorIndex = 0;
			for (var index = 0; index < window.secuencia.length; index++) {
				var slide = eval('t'+index+'_slide'),
					slideTitle = slide.title;

				if (slide.isConcatenate) continue;

				$navbarBottom.find('li').eq(navigatorIndex).html('<span>'+stripHTML(slideTitle)+'</span>');
				navigatorIndex++;

			};

			$navbarBottom
				.attr('class', 'publisher-navbar')
				.wrapInner('<div class="navbar-content"></div>')
				.find('ol')
					.wrap('<div id="top-navigator"/>');

			if (!blink.hasTouch) {
				$navbarBottom
					.find('ol').find('span')
						.tooltip({
							placement: 'bottom',
							container: 'body'
						});
			}
		},

		//BK-15873 Se quita la funcion getEditorStyles para que la herede de parent

		bindEventsToEditor: function (editor) {
			editor.on('paste', function (event) {
				event.data.dataValue = event.data.dataValue.replace(/ style="[a-zA-Z0-9:;\.\s\(\)\-\,]*"/gi, '');
			});
		}
	};

	GobalLTtyle.prototype = _.extend({}, new blink.theme.styles.basic(), GobalLTtyle.prototype);

	blink.theme.styles.GobalLT = GobalLTtyle;

})( blink );

$(document).ready(function () {

    $('.item').find('.header').find('.title')
		.filter(function () {
			return $(this).find('.empty').length;
		}).hideBlink();

    $('.item').find('.header').find('.title')
		.filter(function () {
			return !$(this).find('.empty').length;
		})
		.each(function () {
			var $header = $(this).find('h3');
			$header.length && $header.html($header.html().replace(' ', ''));
		});


        $('.bck-tooltip').popover('destroy');
	$('.bck-tooltip').popover({
  					html:true,
                    placement: 'auto top',
                    trigger: 'click',
                    container: 'body'
                });

	$('#actividad').on('slide.bs.carousel', function (event) {
		$('.bck-tooltip').popover('hide');
	});

	$('#actividad').on('slid.bs.carousel', function (event) {
		$('.bck-tooltip').popover('hide');
	});

        $(".js-slider-item").on('scroll', function (e) {
                $('.bck-tooltip').popover('hide');
        });

        $('.slider-control').on('tap, click', function(e){
                $('.bck-tooltip').popover('hide');
        });

	$(".bck-cam-button").toggle(
		function(){
			$(this).parent('.bck-cam-dropdown').addClass('open').find(".bck-cam-dropdown-content").slideDown(300);
    	},
    	function(){
    		$(this).parent('.bck-cam-dropdown').removeClass('open').find(".bck-cam-dropdown-content").slideUp(300);
    	}
	);
});
