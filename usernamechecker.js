			// The site we're going to post data to.
			var site = "http://2007scape.net:331/check?username=";

			// Disable button Function, this makes the submit button unusable and grey'd out.
			function disableButton() {
				document.getElementById("usernamesubmit").className = "btn btn-primary disabled";
				document.getElementById("usernamesubmit").disabled=true;
			}

			// This is how we renable the button
			function enableButton() {
				document.getElementById("usernamesubmit").className = "btn btn-primary";
				document.getElementById("usernamesubmit").disabled=false;
			}

			// Updating the information query
			function setStatus(Information) {
				document.getElementById("availability").innerHTML = Information
			}

			// This is where we post data to the site from the username field
			function checkUsername() {
				var username = document.getElementById("username").value;
				var username = username.replace(/[`~!@#$%^&*()|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
				var sendname = username.replace(/ /gi, '%20');
				setStatus("Checking Username please wait!");
				disableButton();
				$.post('check.php', { url: site+sendname }, function(status) {
					
					if(status == "OK") {
						setStatus("'"+username+"' is available");
						enableButton();
					} else if(status == "NOK") {
						setStatus("'"+username+"' is NOT available");
						enableButton();
					} else if(status == "UGLY") {
						setStatus("Name seems to contain profanity, is not likely available");
						enableButton();
					} else if(status == "ERR") {
						setStatus("We've encountered an error, try again later!");
						enableButton();
					} else if(status == null) {
						setStatus("NPE: We've encountered an error, try again later!");
						enableButton();
					}else if(username == "") {
						setStatus("You did not enter a username!");
						enableButton();
					} else {
						console.log(status)
						setStatus("Something went wrong, please consult Demonly")
						enableButton();
					}
					// Enable this line below for debugging
					//setStatus(status)
				});
			}
