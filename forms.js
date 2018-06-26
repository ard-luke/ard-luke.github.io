/* Some JS hacks to make forms more functional */

$( document ).ready(function() {

	/* populate year, month and range options */
	for(var y = 2018; y > 1940; y--){
		$('select.year-range').append('<option value="' + y + '">' + y + '</option>');
	}
	
	for(var m = 1; m < 13; m++){
		$('select.month-range').append('<option value="' + m + '">' + m + '</option>');
	}
	
	for(var d = 1; d < 32; d++){
		$('select.day-range').append('<option value="' + d + '">' + d + '</option>');
	}
	
	$('select[name="month"]').on('change',function(){
		var curMonth = $(this).val();
		
		if(curMonth == 2){
			$('select.day-range').html('<option>Day</option>');
			for(var d = 1; d < 30; d++){
				$('select.day-range').append('<option value="' + d + '">' + d + '</option>');
			}
		}
	});
	
	
	/* typeahead.js stuff */
	var substringMatcher = function(strs) {
	  return function findMatches(q, cb) {
	    var matches, substringRegex;
	
	    // an array that will be populated with substring matches
	    matches = [];
	
	    // regex used to determine if a string contains the substring `q`
	    substrRegex = new RegExp(q, 'i');
	
	    // iterate through the pool of strings and for any string that
	    // contains the substring `q`, add it to the `matches` array
	    $.each(strs, function(i, str) {
	      if (substrRegex.test(str)) {
	        matches.push(str);
	      }
	    });
	
	    cb(matches);
	  };
	};
	
	var sports = ['Cross Country', 'Softball', 'Tennis', 'Baseball', 'Basketball', 'Golf', 'Soccer', 'Wrestling', 'Swimming & Diving' ];
	
	var industries = ['Engineering Services', 'Management', 'Consulting Services', 'Local Government', 'State Government', 'Federal Government', 'Agriculture'];
	
	$('.varsity-sports input').tagsinput({
		typeaheadjs: {
			hint: true,
			highlight: true,
			minLength: 1,
			name: 'sports',
			source: substringMatcher(sports)
		}
	});
	
	$('.industries input').tagsinput({
		typeaheadjs: {
			hint: true,
			highlight: true,
			minLength: 1,
			name: 'industries',
			source: substringMatcher(industries)
		}
	});
	
	/* delete button */	
	$('.btn-delete.btn-primary').on('click', function(){
		
		$(this).hide();
		$(this).siblings('.btn-delete-confirmation-msg').show();
		
		return;
	});
	
	$('.btn-delete-cancel').on('click', function(){
		$('.btn-delete-confirmation-msg').hide();
		$('.btn-delete.btn-primary').show();
	})
	
	$('.btn-delete-confirm').on('click', function(){
		$('.btn-delete-confirmation-msg').hide();
		$(this).parent().parent().parent().parent().parent().parent().parent().modal('hide');
	});

	/* EDUCATION MODAL HACKS */
	
	$('a.edit-education').on('click', function(){
		
		$('.btn-delete.btn-primary').show();
		$('.btn-delete-confirmation-msg').hide();
		
		$('#modalEducation').find('h5').html('Edit Education');
		
		$('select[name="education-type"]').val('high-school').change();
		
		var curHS = $('#cur-name').text();
		var curYear = $('#cur-year').text();
		
		$('.college-form').hide();
		$('.hs-form').show();
		
		$('#del-education').show();
		
		$('input[name="hs-name"]').val(curHS);
	
		$('select[name="class-year"]').val(curYear).change();
		
		$('#modalEducation').find('form').each(function(){
			$(this).data('serialized', $(this).serialize())
		})
		.on('change input', function(){
			$('#modalEducation')
				.find('button.save-btn')
					.prop('disabled', $('#modalEducation').find('form').serialize() == $('#modalEducation').find('form').data('serialized'));
		})
		.find('button.save-btn')
			.prop('disabled', true)
		;
		
		return;
	});
	
	$('a.add-new-education').on('click', function(){
		
		$('#modalEducation').find('h5').html('New Education');
		
		$('select[name="education-type"]').val('college').change();
		$('#del-education').hide();
		return;
	});
	
	$('select[name="education-type"]').on('change',function(){
		$('.edit-form-footer').hide();
	   if($(this).val()=="high-school")
	   {
	    	$('.college-form').hide();
	        $('.hs-form').show();
	   }
	   else
	   {
	        $('.college-form').show();
	        $('.hs-form').hide();
	   }
	});
	
	$('a#add-new-experience').on('click', function(){
		$('#current-work').prop('checked', true);
		$('#primary-employment-toggle').addClass('active');
		$('input#end-date').hide();
		$('label#end-date-label span').hide();
		$('div#end-date').show();
	});
	
	$('#current-work').change(function(){
		if(this.checked){
			$('input#end-date').hide();
			$('div#end-date').show();
			$('label#end-date-label span').hide();
			$('div#work-address').show();
		}
		else{
			$('input#end-date').show();
			$('div#end-date').hide();
			$('label#end-date-label span').show();
			$('div#work-address').hide();
		}
	})
		
	$('a#add-new-experience-inline').on('click', function(){
		var containingDiv = $(this).parent().parent().parent()
		
		containingDiv.append('<!-- new job --> <div class="card-content-stacked-info col-12"> <div class="logo-wrapper"></div> <div class="info-wrapper"> <div class="info-group" style="display: none;"> <div class="title"><span id="job-title"></span><a id="edit-inline"><i class="fas fa-pencil-alt"></i></a></div> <div id="institution"></div> <div id="location"></div> <div id="time-employed"></div> </div> <form class="no-gutters edit-inline-form" style="display: block;"> <div class="col-12 edit-text"> <input type="text" name="title" placeholder="Job Title"><a class="inline-save-btn" style="float: right; font-size: 1.125rem; margin-left: 1rem;"><i class="fas fa-check"></i></a><a class="inline-cancel-btn" style="float: right; font-size: 1.125rem; margin-left: 1rem;"><i class="fas fa-times"></i></a><a class="inline-delete-btn" style="float: right; font-size: 1.125rem;"><i class="far fa-trash-alt"></i></a> </div> <div class="col-12 edit-text"> <input type="text" name="institution" placeholder="Institution Name"> </div> <div class="col-12 edit-text"> <input type="text" name="location" placeholder="Location"> </div> <div class="col-12 edit-select"> <select class="year-range" name="start-year"> <option>Start Year</option> </select> <select class="year-range" name="end-year"> <option>End Year</option> </select> <div class="helper-text"> Currently employed here? <button type="button" class="btn btn-xs btn-toggle" data-toggle="button" aria-pressed="true" autocomplete="off"><div class="handle"></div></button> </div> </div> </form> </div> </div>');
		containingDiv.append($(this).parent().parent());
		return;
	});
	
	$('a#edit-inline').on('click', function(){
		
		
		var wrapper = $(this).parent().parent().parent().parent();
		
		wrapper.addClass('stretched');
	
		var theForm = $(this).parent().parent().siblings('form');
		var theEntry = $(this).parent().parent()
		
		var toBeEdited = theEntry;
		
		var jobTitle = toBeEdited.find('#job-title').text();
		var jobInstitution = toBeEdited.find('#institution').text();
		var jobLocation = toBeEdited.find('#location').text();
		var jobTime = toBeEdited.find('#time-employed').text();
		
		
		theForm.find('input[name="title"]').val(jobTitle);
		theForm.find('input[name="institution"]').val(jobInstitution);
		theForm.find('input[name="location"]').val(jobLocation);
		
		if(jobTime == 'Currently Employed'){
			theForm.find('select').addClass('uneditable');
			theForm.find('.btn-toggle').addClass('active');
		}
		else{
			var jobRange = jobTime.split("-");
			theForm.find('select[name="start-year"]').val(jobRange[0]).change();
			theForm.find('select[name="end-year"]').val(jobRange[1]).change();
		}
		
		theEntry.hide();
		theForm.show();
		
		return;
	});
	
	$('a#edit-group-inline').on('click', function(){
		$(this).hide();
		$(this).siblings('a').show();
		
		
		var infoGroup = $(this).parent().parent();
		
		if(infoGroup.hasClass('life-event')){
			var curEventTitle = infoGroup.find('#life-event-title')
			var curEventTitleStr = curEventTitle.html();
			curEventTitle.html('<select name="life-event-title"><option>Select Event</option><option>Award</option><option>Birth/Adoption</option><option>In Memory</option><option>Marriage/Union</option></select>')
			$('select[name="life-event-title"]').val(curEventTitleStr).change();
		}
		
		$(this).parent().parent().find('span#group-info-field').each(function(){
			var infoField = $(this);
			var infoFieldStr = $(this).html();
			infoField.html('<input type="text" value="' + infoFieldStr + '">');
		})
	})
	

	$('a#edit-inline-names').on('click', function(){

		var fullname = $('#names-full.card-content-category-info');
		var fullnameStr = fullname.html();
		var nickname = $('#names-nickname.card-content-category-info');
		var nicknameStr = nickname.html();
		var nameAtGrad = $('#names-lastname-at-grad.card-content-category-info');
		var nameAtGradStr = nameAtGrad.html();
		
		fullname.html('<input type="text" value="' + fullnameStr + '">');
		nickname.html('<input type="text" value="' + nicknameStr + '">');
		nameAtGrad.html('<input type="text" value="' + nameAtGradStr + '">');
		
		$(this).hide();
		$(this).siblings('a').show();
		
	})

});
