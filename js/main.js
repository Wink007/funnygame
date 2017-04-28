/*$(document).ready(function  () {
	$(".choose_cup").on('click', function () {
		$(this).animate({marginTop: "-30px"}, 500);
		$(this).animate({marginTop: "5px"}, 500);
	});
});*/

angular.module('app', []);
angular.module('app').controller('mainCtrl', MainCtrl);

function MainCtrl () {
	var mc = this;
	const initState = [
	  { id: 0, empty: true, choosed: false, open: false, background: 'background_color_0', chance : '1/3' },
	  { id: 1, empty: true, choosed: false, open: false, background: 'background_color_1', chance : '1/3' },
	  { id: 2, empty: true, choosed: false, open: false, background: 'background_color_2', chance : '1/3' },
	];
	mc.cups = initState.slice(0);
	mc.showText = false;
	mc.count = 0;
	mc.win = 0;
	mc.gameOver = true;
	mc.showHints = false;

	mc.btnDisabled = false;

	activate();

	function activate() {
		const filledCup = Math.floor(Math.random()*3);
		mc.gameOver = false;
		mc.cups.map(function (cup) {
			if (filledCup === cup.id) cup.empty = false; 
		});
		mc.btnDisabled = true;
	};

	mc.reset = function () {
		mc.cups.forEach(function (cup, index) {
			cup.open = false;
			cup.empty = true;
			cup.choosed = false;
			cup.chance = '1/3';
			cup.background = 'background_color_' + index;
		});
		setTimeout(activate, 1000);
	};
	mc.chooseCup = function (id) {
		if (mc.gameOver) {
            mc.cups.filter(function(cup) {
                return !cup.open;
            }).forEach(function(cup) {
                cup.open = true;
            });
			return;
		}
		const choosedCups = mc.cups.filter(function (cup) {
			return cup.choosed; 
		}).length;

		if (choosedCups === 0) {
			mc.cups[id].choosed = true;
			/*mc.cups[id].lable = 'img/arrow.gif';*/
			mc.showText = true;
			mc.cups.find(function (cup) {
				return cup.id !== id && cup.empty === true;
			}).open = true;
			calculateChance ();
			mc.showHints && changeBackground ();
		} else {
			mc.cups[id].open = true;
			mc.showText = false;
			mc.btnDisabled = false;
			mc.gameOver = true;
			mc.count++;
			if (mc.cups[id].empty === false) {
				mc.win++;
			}
		};
		
	};
	function calculateChance () {
		mc.cups.forEach(function (cup) {
			
			if (cup.choosed) {
				cup.chance = '1/3';
				
			} else {
				if (cup.open) {
					cup.chance = '0';
				} else {
					cup.chance = '2/3';
				}
			}

		});
	}
	function changeBackground () {
		mc.cups.forEach(function (cup) {
			if(!cup.choosed) cup.background = 'background_animate';
			console.log('qq');
		});
	}
};