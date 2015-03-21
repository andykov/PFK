$(function() {

	$('.big-field').find('input').on('focus',function(){
		$('.big-field').removeClass('focus');
		$(this).parent('.big-field').addClass('focus');
		return false;
	});

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
		}
	});


	// VALIDATION
		var validator = $('form').bootstrapValidator({
			fields: {
				'email.login': {
					validators: {
						notEmpty: {
							message: "Пожалуйста, введите email",
						},
						emailAddress: {
							message: "Некорректный email адрес"
						}
					}
				},
				email: {
					validators: {
						emailAddress: {
							message: "Некорректный email адрес"
						}
					}
				},
				person: {
					validators: {
						notEmpty: {
							message: "Пожалуйста, введите ФИО"
						}
					}
				},
				password: {
					validators: {
						notEmpty: {
							message: "Пожалуйста, введите пароль"
						}
					}
				},
				confirmpassword: {
					validators: {
						notEmpty: {
							message: "Повторите пароль"
						},
						identical: {
							field: "password",
							message: "Пароли не совпадают"
						}
					}
				}
			}
		});


}); // end jquery