const YOUR_CLIENT_ID = "572390389874-s2tuht5ajor9e479haqv9hs7vhpgs8vf.apps.googleusercontent.com";

//Initialize google auth object
function start() {
  gapi.load('auth2', function() {
    auth2 = gapi.auth2.init({
      client_id: 'YOUR_CLIENT_ID.apps.googleusercontent.com',
      // Scopes to request in addition to 'profile' and 'email'
      //scope: 'additional_scope'
      scope: 'email'
    });
  });
}

$('#signinButton').click(function() {
  auth2.grantOfflineAccess().then(signInCallback);
});



function signInCallback(authResult) {
  if (authResult['code']) {

    // Hide the sign-in button now that the user is authorized, for example:
    $('#signinButton').attr('style', 'display: none');

    // Send the code to the server
    $.ajax({
      type: 'POST',
      url: 'localhost:3000/storeauthcode',
      // Always include an `X-Requested-With` header in every AJAX request,
      // to protect against CSRF attacks.
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      },
      contentType: 'application/octet-stream; charset=utf-8',
      success: function(result) {
        // Handle or verify the server response.
      },
      processData: false,
      data: authResult['code']
    });
  } else {
    // There was an error.
  }
}

