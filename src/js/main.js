$(function() {

	$('.big-field').find('input').on('focus',function(){
		$('.big-field').removeClass('focus');
		$(this).parent('.big-field').addClass('focus');
		return false;
	});

	// hide/show text
	$('.spoiler-body').hide();
	$('.spoiler-trigger').on('click', function(e){
		e.preventDefault();
		$(this).toggleClass('active').next().stop().slideToggle(200);
	});

// $('select').select2({
// 	minimumResultsForSearch: Infinity //отключает поиск в селекте
// });

	// init plugin bootstrap datepicker
	if ($('.datetimepicker').length) {
		$('.datetimepicker').datepicker({
			format: "dd.mm.yyyy",
			language: "ru",
			autoclose: true,
			toggleActive: true
		}).on('changeDate', function() {
			console.log('done');
		});
	};

	// init plugin jquery mask
	if ($('.data-form').length) {
		$('input[name="passport"]').mask('0000-000000');
		$('input[name="subdivision"]').mask('000-000');
		$('input[name="snils"]').mask('000-000-000-00');
	};


	// Select
	$('.select__trigger').click(function(){
		var dropBlock = $(this).parent().find('.select__drop');
		
		$('.select__drop').removeClass('active').slideUp(200);

		if( dropBlock.is(':hidden') ) {
			dropBlock.slideDown(200);

			$(this).addClass('active');

			$('.select__drop').find('li').click(function(){
				var parent = $(this).parent().parent();
					parent.find('input').val($(this).data('item-id'));
					parent.find('.select__trigger').removeClass('active').html($(this).text());

					dropBlock.slideUp(200);

				// $('#noticeFilter').submit();
			});

		} else {
			$(this).removeClass('active');
			dropBlock.slideUp(200);
		}
		$(document).on('click',function(){
			$('.select__drop').removeClass('active').slideUp(200);
		});
		return false;
	});


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
		var validator = $('.form').on('init.field.bv', function(e, data) {
				// $(e.target)  --> The field element
				// data.bv      --> The FormValidation instance
				// data.field   --> The field name
				// data.element --> The field element
				if ($('.data-form').length) {
					var $elem = data.element,
						$parent = $elem.parent();

					$parent.append('<i class="bulit-success"></i>');
				};

			}).bootstrapValidator({
			// ignore: 'input[type=hidden]',
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
				},
				date: {
					validators: {
						date: {
							format: 'DD.MM.YYYY',
							message: 'Некорректная дата'
						}
					}
				},
				place: {
					validators: {
						notEmpty: {
							message: "Заполните поле"
						}
					}
				},
				passport: {
					validators: {
						notEmpty: {
							message: "Заполните поле. 10 цифр"
						}
					}
				},
				// checkbox: {
				// 	validators: {
				// 		notEmpty: {
				// 			message: "Поставьте галочку"
				// 		}
				// 	}
				// },
				// gender: {
				// 	validators: {
				// 		notEmpty: {
				// 			message: "Выберите ваш пол"
				// 		}
				// 	}
				// },
				issued: {
					validators: {
						notEmpty: {
							message: "Заполните поле"
						},
						stringLength: {
							max: 240,
							message: 'Не больше 240 символов'
						}
					}
				},
				subdivision: {
					validators: {
						notEmpty: {
							message: "Заполните поле. 6 цифр"
						}
					}
				},
				education: {
					validators: {
						notEmpty: {
							message: "Заполните выпадающий список"
						}
					}
				},
				snils: {
					validators: {
						notEmpty: {
							message: "Заполните поле. 11 цифр"
						}
					}
				},
				street: {
					validators: {
						notEmpty: {
							message: "Заполните поле. 11 цифр"
						},
						stringLength: {
							max: 50,
							message: 'Не больше 50 символов'
						}
					}
				}
			}
		});


	// validate number phone
	function phoneValidate() {

		var phone = $.trim($('input[name="phone.region"]').val()) + $.trim($('input[name="phone.number"]').val());
		
		// if (phone.length == 10) {
		// 	alert('Valid');
		// }
	}
	
	$('.phone input').on('keypress', function (e) {
		if ([0, 8, 13, 38, 40].indexOf( e.which ) < 0 && (e.which < 48 || e.which > 57)) {
			return false;
		}
	});
	
	$('input[name="phone.region"]').on('keyup', function (e) {
		if ($.trim($(this).val()).length == 3) {
			$('input[name="phone.number"]').focus();
			phoneValidate();
		}
	});
	
	$(".phone--number").on('keyup', function (e) {
		if ($.trim($(this).val()).length == 7) {
			phoneValidate();
		}
	});



}); // end jquery