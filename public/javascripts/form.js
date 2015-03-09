$(document).ready(function() {

	var validationRules = {
		username: { identifier : 'username',
			rules: [ { type : 'empty', prompt : 'Please enter a username' } ] },
		email: { identifier : 'email',
			rules: [ { type : 'email', prompt : 'Please enter a valid email address' } ] },
		password: { identifier : 'password',
			rules: [ { type : 'empty', prompt : 'Please enter a password' },
				{ type : 'length[6]', prompt : 'Your password must be at least 6 characters' }
			] },
		passwordConfirm: { identifier : 'confirm-password',
			rules: [ { type : 'empty', prompt : 'Please confirm your password' },
				{ type : 'match[password]', prompt : 'Password doesn\'t match' }
			] }
	};

	var settings = {
		onSuccess: function() {
			$('.ui.form').addClass('loading');
		}
	};

	$('.ui.form').form(validationRules, settings);	

});
