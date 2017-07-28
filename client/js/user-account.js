function displayErrors(errors) {
  $("#info");
  errors.forEach(function(message) {
    $("#title").prepend('<div class="usa-alert usa-alert-error" role="alert"><div class="usa-alert-body"><p class="usa-alert-text">' + message + '</p></div>');
  });
}


$(function() {
  url = window.location.href;
  email = url.substring(url.lastIndexOf('/') + 1);
  $.get("/user-info/"+email).done(function(res) {
    if (res.success) {
      if(res.user){
      	$("#email").html(res.user.email);
      	$("#password").html(res.user.password);
      }else{
	$("#title").html("<div class='usa-alert usa-alert-error'>could not find user!</div>"); 
      	$("#info").html("");
      }  
    }
  }).fail(function(err) {
     var errorsToArray = Object.keys(err.responseJSON.errors).reduce(function(a,b) {
      return a.concat(err.responseJSON.errors[b]);
     }, []);
     displayErrors(errorsToArray);
  });

})
