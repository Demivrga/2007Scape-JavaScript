			// The site we're going to post data to.
			var site = "http://services.runescape.com/m=hiscore_oldschool/index_lite.ws?player=";
			
			// Disable button Function, this makes the submit button unusable and grey'd out.
			function disableButton(location) {
				document.getElementById(location).className = "btn btn-secondary btn-sm disabled";
				document.getElementById(location).disabled=true;
			}
			
			// This is how we renable the button
			function enableButton(location, buttonType) {
				document.getElementById(location).className = "btn btn-"+buttonType+" btn-sm";
				document.getElementById(location).disabled=false;
			}
			
			// Updating the information query
			function setStatus(Information) {
				document.getElementById("availability").innerHTML = Information
			}
			
			// This is where we post data to the site from the username field
			function getHighScores(where) {

				if (where == "REGULAR") {
					var site = "http://services.runescape.com/m=hiscore_oldschool/index_lite.ws?player=";
					var location = "REGULAR";
					var buttonType = "success";
				} else if (where == "IRON") {
					var site = "http://services.runescape.com/m=hiscore_oldschool_ironman/index_lite.ws?player=";
					var location = "IRON";
					var buttonType = "primary";
				} else if (where == "ULTIMATE") {
					var site = "http://services.runescape.com/m=hiscore_oldschool_ultimate/index_lite.ws?player=";
					var location = "ULTIMATE";
					var buttonType = "secondary";
				} else if (where == "HARDCORE") {
					var site = "http://services.runescape.com/m=hiscore_oldschool_hardcore_ironman/index_lite.ws?player=";
					var location = "HARDCORE";
					var buttonType = "danger";
				} else if (where == "SEASONAL") {
					var site = "http://services.runescape.com/m=hiscore_oldschool_seasonal/index_lite.ws?player=";
					var location = "SEASONAL";
					var buttonType = "secondary";
				}
				
				var username = document.getElementById("username").value;
				var username = username.replace(/[`~!@#$%^&*()|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
				var sendname = username.replace(/ /gi, '%20')
				setStatus("Getting Highscore Data..");
				disableButton(location);
				$.post('check.php', { url: site+sendname }, function(content) {
					if (content.includes("<br />")) {
						setStatus("Player not found, Try again!")
						enableButton(location, buttonType);
					} else {
						setStatus("Displaying Stats for: '"+username+"'")
						enableButton(location, buttonType);
						content = content.split("\n");
						attack = content[1]+",attack";
						defence = content[2]+",defence";
						strength = content[3]+",strength";
						hitpoints = content[4]+",hitpoints";
						ranged = content[5]+",ranged";
						prayer = content[6]+",prayer";
						magic = content[7]+",magic";
						cooking = content[8]+",cooking";
						woodcutting = content[9]+",woodcutting";
						fletching = content[10]+",fletching";
						fishing = content[11]+",fishing";
						firemaking = content[12]+",firemaking";
						crafting = content[13]+",crafting";
						smithing = content[14]+",smithing";
						mining = content[15]+",mining";
						herblore = content[16]+",herblore";
						agility = content[17]+",agility";
						thieving = content[18]+",thieving";
						slayer = content[19]+",slayer";
						farming = content[20]+",farming";
						runecrafting = content[21]+",runecrafting";
						hunter = content[22]+",hunter";
						construction = content[23]+",construction";
					
						var levels = [attack, defence, strength, hitpoints, ranged, prayer, magic, cooking, woodcutting, fletching, fishing, firemaking, crafting, smithing, mining, herblore, agility, thieving, slayer, farming, runecrafting, hunter, construction];
					
						levels.forEach(function(level) {
							level = level.toString().split(",");
							document.getElementById("highscores").style.marginTop="20px";
							document.getElementById("highscore_top").style.marginTop="10px";
							document.getElementById("highscores").style.width="45%";
							document.getElementById("highscores").style.height="100%";
							document.getElementById("highscores").style.borderStyle="solid none solid none";
							document.getElementById("highscores").style.borderColor="#83714d";
							document.getElementById(level[3]).innerHTML = level[1]+"<br><img src='/img/"+level[3]+".png' alt='"+level[3]+"' title='"+level[1]+" "+level[3]+"'>";
						});
					}

					// Enable this line below for debugging
					//setStatus(status)
				});
			}