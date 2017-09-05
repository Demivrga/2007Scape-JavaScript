var site = "http://2007scape.net:331/check?username=";
var names = ['Deadly', 'Demonly', 'MizzaTcha', 'Zezima', 'DemonicLyly', '', '', '']
var i = 1;
var amount = 8;
function listWait() {
	setTimeout(function () {
			$.post('check.php', { url: site+names[i] }, function(status) {
				console.log(names[i]+": "+status);
			});
		i+=1;
		if (i < amount) {
			listWait();
		}
	}, 5000)
}

listWait();
