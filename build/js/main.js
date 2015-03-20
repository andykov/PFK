$(function() {
	
	var app = {
		 
		initialize : function () {          
			this.modules();
			this.setUpListeners();
		},
 
		modules: function () {
 
		},
 
		setUpListeners: function () {
			$('form').on('submit', app.submitForm);
			$('form').on('keydown', 'label, input', app.removeError);
		},
 
		submitForm: function (e) {
			e.preventDefault();

			var form = $(this),  // Текущая форма
				submitBtn = form.find('input[type="submit"]'); // кнопка submit текущей формы
			console.log(submitBtn);
			// если форма не валидна, вернуть false
			if (app.validateForm(form) === false) return false;

			submitBtn.prop('disabled', 'disabled');
		},

		validateForm: function (form) {
			var inputs = form.find('input:not([type="submit"])') // выбираем инпуты
				valid = true; // типо по умолчанию форма валидна

			$.each(inputs, function(index, val) {
				var input = $(val),
					val = input.val(),
					formGroup = input.parents('.form-group'),
					label = formGroup.find('label');

				if (val.length === 0) { // если юзер ничего не ввел
					input.wrap('<div class="field_with_errors"></div>');
					label.wrap('<div class="field_with_errors"></div>');
					valid = false;
				} else {
					input.removeClass('field_with_errors');
					label.removeClass('field_with_errors');
				}
			});
				// валидный или не валидный
				return valid;
		},

		removeError: function () {
			$(this).parent().removeClass('field_with_errors');
		}
		 
	}
 
	app.initialize();

	// Select
	$('.select__trigger').click(function(){
		var dropBlock = $(this).parent().find('.select__drop');

		if( dropBlock.is(':hidden') ) {
			dropBlock.slideDown(200);

			$(this).addClass('active');

			$('.select__drop').find('li').click(function(){
				var selectResult = $(this).text();

				$(this).parent().parent().find('input').val(selectResult);
				$(this).parent().parent().find('.select__trigger').removeClass('active').html(selectResult);

				dropBlock.slideUp(200);
			});

		} else {
			$(this).removeClass('active');
			dropBlock.slideUp(200);
		}
		return false;
	});

	// hide/show text
	$('.spoiler-body').hide();
	$('.spoiler-trigger').on('click', function(e){
		e.preventDefault();
		$(this).toggleClass('active').next().stop().slideToggle(200);
	})

	// Select all
	var elCheck = $('.checkbox').find('input');

	$('#selectAll').find('input').on('change',function() {
		var check = this.checked;
		elCheck.prop('checked',check);

		if (elCheck.prop('checked') == true) {
			$('.checkbox').addClass('active');
		} else {
			$('.checkbox').removeClass('active');
		};
	});

	elCheck.on('change',function() {
		$(this).parent().toggleClass('active');
		$('#selectAll').find('input').removeAttr('checked');   

		if($(".checkbox").find('input:checked').length == elCheck.length) {
			$('#selectAll input').prop('checked','checked');
		}
	});

	$('.radio').on('click', function(){
		var elRadioLabel = $('.radio'),
			elRadioInput = elRadioLabel.find('input');

		if ($(this).find('input').prop('checked') == true) {
			elRadioLabel.removeClass('active');
			elRadioInput.removeAttr('checked')
			$(this).addClass('active').find('input').attr('checked','checked' );
			// alert('1');
		}
		// $(this).addClass('active').find('input').prop('checked',true);
	});

// // RadioButton
// $('.radio').each(function(){
// 	$(this).on('click', function(){
// 		// Заносим текст из нажатого дива в переменную
// 		var valueRadio = $(this).html();
// 		// Находим любой активный переключатель и убираем активность
// 		$(this).parent().find('.radio').removeClass('active');
// 		// Нажатому диву добавляем активность
// 		$(this).addClass('active');
// 		// Заносим значение объявленной переменной в атрибут скрытого инпута
// 		$(this).parent().find('input').val(valueRadio);
// 	});
// });


}); // end jquery