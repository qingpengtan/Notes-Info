//window.onload=window.onresize=function(){
var main1_play = document.getElementById('main1_play');
var main1_play_ul = main1_play.getElementsByTagName('ul')[0];
var main1_play_ul_li = main1_play_ul.getElementsByTagName('li');
var main1_play_point = document.getElementById('main1_play_point');
var main1_play_point_li = main1_play_point.getElementsByTagName('li');
//		main1_play_ul.innerHTML=main1_play_ul.innerHTML+main1_play_ul.innerHTML;
var main1_play_left = document.getElementById('main1_play_left');
var main1_play_right = document.getElementById('main1_play_right');

for(var i = 0; i < main1_play_point_li.length; i++) {
	main1_play_point_li[i].index = i;
	main1_play_point_li[i].onclick = function() {

		var target = -this.index * 800;
		startMove2(main1_play_ul, {
			left: target
		});
		pic = this.index;
		square = this.index;
		fortest();
	}
}

function fortest() {
	for(var i = 0; i < main1_play_point_li.length; i++) {
		main1_play_point_li[i].className = "";
	}
	main1_play_point_li[square].className = 'green';
}
main1_play.onmouseover = main1_play_left.onmouseout = main1_play_right.onmouseout = function() {
	mouse(main1_play_left, main1_play_right, 70);
	clearInterval(timer);
}
main1_play.onmouseout = function() {
	mouse(main1_play_left, main1_play_right, 0);
	timer = setInterval(play, 2000);
}
main1_play_left.onmouseover = main1_play_right.onmouseover = function(event) {
		mouse(main1_play_left, main1_play_right, 100);
		stopEvent(event);
	}
	//左右点击
var pic = 0;
var square = 0;
main1_play_left.onclick = function() {
	if(pic == 0) {
		pic = main1_play_ul_li.length - 1;
		main1_play_ul.style.left = -pic * 800 + "px";
	}
	pic--;
	var target = -pic * 800;
	startMove2(main1_play_ul, {
		left: target
	});
	if(square > 0) {
		square--;
	} else {
		square = main1_play_ul_li.length - 2;
	}
	fortest();
}
main1_play_right.onclick = function() {
	play();
}
timer = setInterval(play, 2000);

function play() {
	if(pic == main1_play_ul_li.length - 1) {
		pic = 0;
		main1_play_ul.style.left = 0;
	}
	pic++;
	var target = -pic * 800;
	startMove2(main1_play_ul, {
		left: target
	});
	if(square < main1_play_ul_li.length - 2) {
		square++;
	} else {
		square = 0;
	}
	fortest();
}
//------------以上为轮播-------------------
var side_left = document.getElementById('side_left');
var side_right = document.getElementById('side_right');
var side_left_top = side_left.offsetTop - 60;
var head_ul = document.getElementById("head_ul");
var head_li = head_ul.getElementsByTagName('li');
var cover = document.getElementById('cover');
var aside_point = document.getElementById('aside_point');
var pointLis = aside_point.getElementsByTagName('li');
var mains = document.getElementsByTagName('section');
var body = document.getElementsByTagName('body')[0];
var returnTop = document.getElementById('returnTop');
var globals = 0;
var flagScroll = true;
var side_right_top = side_right.offsetTop;
var pointTime = null;
//导航栏和侧边栏鼠标事件
var current = 0;
var otarget = 0;
for(var i = 0; i < head_li.length; i++) {
	head_li[i].onmouseover = function() {
		otarget = this.offsetLeft;
		startMove2(cover, {
			left: otarget
		});
	}
	head_li[i].onmouseout = function() {
		otarget = current;
		startMove2(cover, {
			left: otarget
		});
	}
	head_li[i].head_li_index = i;
	head_li[i].onclick = function() {
//		current = this.offsetLeft;
		globals = this.head_li_index;
		myClick();
	}
	pointLis[i].point = i;
	pointLis[i].onclick = function() {
		globals = this.point;
		myClick();
	}
}

function forScroll() {
	for(var i = 0; i < head_li.length; i++) {
		head_li[i].style.background = "";
	}
	head_li[globals].style.background = '#ADFF2F';
	for(var i = 0; i < pointLis.length; i++) {
		pointLis[i].style.background = 'green';
	}
	pointLis[globals].style.background = 'deepskyblue';
}

function myClick() {
	clearInterval(pointTime);
	flagScroll = false;
	forScroll();
	var mytarget = globals * mains[0].offsetHeight;
	pointTime = setInterval(function() {
		if(scroll().top == globals * mains[0].offsetHeight) {
			flagScroll = true;
			clearInterval(pointTime);
		}
		var cur = parseInt(scroll().top);
		speed = (mytarget - cur) / 6;
		speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
		window.scrollTo(0, (speed + cur));
	}, 30);
}
returnTop.onclick = function() {
	globals = 0;
	myClick();
}
window.onscroll = function() {
	console.log(flagScroll+"---")
	if(scroll().top >= side_left_top) {
		side_left.className = "side_left fix"
	} else {
		side_left.className = "side_left";
	}
	target = scroll().top + side_right_top;
	if(scroll().top >= mains[0].offsetHeight) {
		returnTop.style.display = 'block';
	} else {
		returnTop.style.display = 'none';
	}
	console.log('test');
	startMove2(side_right, {
		top: parseInt(target + 50)
	});
	if(flagScroll){
//				globals = scroll().top / mains[0].offsetHeight;
//				if((globals%1)>0.35){
//					globals=Math.ceil(globals);
//					clearInterval(pointTime);
//				pointTime = setInterval(function() {
//				if(scroll().top == globals * mains[0].offsetHeight) {
//					clearInterval(pointTime);
//				}
//				var cur = parseInt(scroll().top);
//				speed = (globals * mains[0].offsetHeight - cur) / 6;
//				speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
//				window.scrollTo(0,(speed+cur));
//			}, 30);}
		globals = parseInt(scroll().top / mains[0].offsetHeight);
		if(globals>4){globals = 4;}
		}
		current = head_li[globals].offsetLeft;
		startMove2(cover, {
			left: current
		});
	forScroll();
}

function scroll() {
	if(window.pageXOffset != null) {
		return {
			left: window.pageXOffset,
			top: window.pageYOffset
		}
	} else if(document.compatMode == "CSS1Compat") {
		return {
			left: document.documentElement.scrollLeft,
			top: document.documentElement.scrollTop
		}
	}
	return {
		left: document.body.scrollLeft,
		top: document.body.scrollTop
	}
}

//-----------------以上为侧边栏和导航栏滚动------------
var main2_scroll = document.getElementById('main2_scroll');
var scroll_content = document.getElementById('scroll_content');
var scrollbar = document.getElementById('scrollbar');
var bar = document.getElementById('bar');
bar.style.height = (main2_scroll.offsetHeight / scroll_content.offsetHeight) * scrollbar.offsetHeight + 'px';
var dis = 0;
bar.onmousedown = function(event) {
	var event = event || window.event;
	var t = event.clientY - this.offsetTop; //得到滚动条外边界距离值
	document.onmousemove = function(event) {
		var event = event || window.event;
		dis = event.clientY - t; //得到滚动条一次滚动的距离
		if(dis < 0) {
			dis = 0;
		} else if(dis > scrollbar.offsetHeight - bar.offsetHeight) {
			dis = scrollbar.offsetHeight - bar.offsetHeight;
		}
		bar.style.top = dis + 'px';
		//				scroll_content.style.top = -dis + 'px';
		scroll_content.style.top = -dis / (scrollbar.offsetHeight - bar.offsetHeight) * (scroll_content.offsetHeight - main2_scroll.offsetHeight) + "px";
	}
	document.onmouseup = function() {
		document.onmousemove = null;
	}
}
scrollbar.onclick = function(event) {
	var event = event || window.event;
	//鼠标距离 - 滚动条高度 - 滚动条外距离
	dis = event.clientY - bar.offsetHeight - (main2_scroll.offsetParent.offsetTop - scroll().top);
	if(dis < 0) {
		dis = event.clientY - (bar.offsetTop + main2_scroll.offsetParent.offsetTop - scroll().top);
		dis = bar.offsetTop + dis;
	}
	dis = parseInt(dis);
	startMove2(bar, {
		top: dis
	});
	startMove2(scroll_content, {
		top: parseInt(-dis / (scrollbar.offsetHeight - bar.offsetHeight) * (scroll_content.offsetHeight - main2_scroll.offsetHeight))
	});
}

var main2_right_scroll = document.getElementById('main2_right_scroll');
var smallBar = main2_right_scroll.getElementsByTagName('a')[0];
var main2_clip = document.getElementById('main2_clip');
var main2_scroll_cover = document.getElementById('main2_scroll_cover');
var distance = 0;
var test = main2_clip.offsetLeft;
smallBar.onmousedown = function(event) {
	var event = event || window.event;
	var t = event.clientX - this.offsetLeft;
	document.onmousemove = function(event) {
		var event = event || window.event;
		distance = event.clientX - t;
		//				alert(distance);
		if(distance < 0) {
			distance = 0;
		} else if(distance > main2_right_scroll.offsetWidth - 10) {
			distance = main2_right_scroll.offsetWidth - 10;
		}
		smallBar.style.left = distance + 'px';
		//				main2_clip.style.left = main2_right_scroll.offsetLeft+ distance + "px";
		main2_clip.style.left = test + distance + "px";
		main2_scroll_cover.style.width = distance + 'px';
		main2_clip.innerHTML = parseInt(distance / (main2_right_scroll.offsetWidth - 10) * 100);

	}
	document.onmouseup = function() {
		document.onmousemove = null;
	}
}
smallBar.onclick = bar.onclick = function(event) {
	stopEvent(event);
}
main2_right_scroll.onclick = function(event) {
		var event = event || window.event;
		distance = event.clientX - smallBar.offsetWidth - (main2_right_scroll.offsetLeft + main3.offsetLeft);
		if(distance < 0) {
			distance = 0;
		}
		smallBar.style.left = distance + "px";
		main2_clip.style.left = test + distance + "px";
		main2_scroll_cover.style.width = distance + 'px';
		main2_clip.innerHTML = parseInt(distance / (main2_right_scroll.offsetWidth - 10) * 100);
	}
	//--------------以上为滚动条-----------------------
var main3 = document.getElementById('main3');
var main3_drag = document.getElementById("main3_drag");
main3_drag.onmousedown = function(event) {
		var event = event || window.event;
		//鼠标位置- 父元素边距-子元素边距
		var x = event.clientX - main3.offsetLeft - main3_drag.offsetLeft;
		var y = event.clientY - (main3.offsetTop - scroll().top) - main3_drag.offsetTop;
		//			alert(x+","+y);
		document.onmousemove = function(event) {
			var event = event || window.event;
			//鼠标位置 - 鼠标在子元素中的位置-父元素的边距，因为鼠标位置包括父元素的边距
			main3_drag.style.left = event.clientX - x - main3.offsetLeft + 'px';
			main3_drag.style.top = event.clientY - y - (main3.offsetTop - scroll().top) + "px";
			if(main3_drag.offsetLeft < 0) {
				main3_drag.style.left = 0;
			} else if(main3_drag.offsetLeft > (main3.offsetWidth - main3_drag.offsetWidth)) {
				main3_drag.style.left = (main3.offsetWidth - main3_drag.offsetWidth) + "px";
			}
			if(main3_drag.offsetTop < 0) {
				main3_drag.style.top = 0;
			} else if(main3_drag.offsetTop > (main3.offsetHeight - main3_drag.offsetHeight)) {
				main3_drag.style.top = (main3.offsetHeight - main3_drag.offsetHeight) + "px";
			}
		}
		document.onmouseup = function() {
			document.onmousemove = null;
		}
	}
	//----------------以上为拖动-------------
	//----------------以下为大小图轮播----------------------
function getByClass(oParent, sClass) {
	var aEle = oParent.getElementsByTagName('*');
	var aResult = [];
	for(var i = 0; i < aEle.length; i++) {
		if(aEle[i].className == sClass) {
			aResult.push(aEle[i]);
		}
	}
	return aResult;
}
var main4_content = document.getElementById('main_content');
var oBtnPrev = getByClass(main4_content, "main4_content_left")[0];
var oBtnNext = getByClass(main4_content, "main4_content_right")[0];

var main4_small = document.getElementById('main4_small');
var smallUl = main4_small.getElementsByTagName('ul')[0];
var smallLis = main4_small.getElementsByTagName('li');
var bigLis = main4_content.getElementsByTagName('li');
var now = 0;
for(var i = 0; i < smallLis.length; i++) {
	smallLis[i].args = i;
	smallLis[i].onclick = function() {
		if(now == this.args) {
			return;
		}
		now = this.args;
		tab();
	}
}

function tab() {
	for(var i = 0; i < smallLis.length; i++) {
		smallLis[i].style.opacity = 0.6;
		bigLis[i].style.zIndex = 0;
	}
	smallLis[now].style.opacity = 1;
	bigLis[now].style.zIndex = 1;
	bigLis[now].style.height = 0;
	startMove2(bigLis[now], {
		height: 550
	});
	if(now == 0) {
		startMove2(smallUl, {
			left: 0
		});
	} else if(now == smallLis.length - 2) {
		startMove2(smallUl, {
			left: -(now - 2) * (smallLis[0].offsetWidth + 20)
		});
	} else if(now == smallLis.length - 1) {
		startMove2(smallUl, {
			left: -(now - 3) * (smallLis[0].offsetWidth + 20)
		});
	} else {
		startMove2(smallUl, {
			left: -(now - 1) * (smallLis[0].offsetWidth + 20)
		});
	}
}
oBtnNext.onclick = function() {
	now++;
	if(now == smallLis.length) {
		now = 0;
	}
	tab();
}
oBtnPrev.onclick = function() {
	now--;
	if(now == -1) {
		now = smallLis.length - 1;
	}
	tab();
}
var otimer = setInterval(oBtnNext.onclick, 2000);
main4_content.onmouseover = main4_small.onmouseover =
	oBtnNext.onmouseout = oBtnPrev.onmouseout = function() {
		mouse(oBtnPrev, oBtnNext, 70);
		clearInterval(otimer);
	}
main4_content.onmouseout = main4_small.onmouseout = function() {
	mouse(oBtnPrev, oBtnNext, 0);
	otimer = setInterval(oBtnNext.onclick, 2000);
}
oBtnNext.onmouseover = oBtnPrev.onmouseover = function(event) {
	mouse(oBtnPrev, oBtnNext, 100);
	stopEvent(event);
	clearInterval(otimer);
}

//-----------------以下为旋转木马-----------------
var main5_rotate = document.getElementById('main5_rotate');
var rotate_left = document.getElementById('rotate_left');
var rotate_right = document.getElementById('rotate_right');
var jsonLis = main5_rotate.getElementsByTagName('li');

var jsonDate = [{
	width: 650,
	height: 450,
	left: 10,
	top: 110,
	opacity: 40,
	z: 6
}, {
	width: 700,
	height: 500,
	left: 40,
	top: 90,
	opacity: 60,
	z: 7
}, {
	width: 750,
	height: 550,
	left: 70,
	top: 70,
	opacity: 80,
	z: 8
}, {
	width: 800,
	height: 600,
	left: 100,
	top: 50,
	opacity: 100,
	z: 9
}, {
	width: 750,
	height: 550,
	left: 180,
	top: 70,
	opacity: 80,
	z: 8
}, {
	width: 700,
	height: 500,
	left: 260,
	top: 90,
	opacity: 60,
	z: 7
}, {
	width: 650,
	height: 450,
	left: 340,
	top: 110,
	opacity: 40,
	z: 6
}];
var flag = true;
rotate_left.onclick = function() {
	change(false);
	flag = false;
}
rotate_right.onclick = function() {
	change(true);
	flag = false;
}

function change(flag) {
	if(flag) {
		jsonDate.unshift(jsonDate.pop());
	} else {
		jsonDate.push(jsonDate.shift());
	}
	for(var i = 0; i < jsonDate.length; i++) {
		startMove2(jsonLis[i], {
			width: jsonDate[i].width,
			height: jsonDate[i].height,
			top: jsonDate[i].top,
			left: jsonDate[i].left,
			opacity: jsonDate[i].opacity,
			zIndex: jsonDate[i].z
		}, function() {
			flag = true
		})
	}
}
change();

//}
main5_rotate.onmouseover = rotate_left.onmouseout = rotate_right.onmouseout = function() {
	mouse(rotate_left, rotate_right, 70);
}
main5_rotate.onmouseout = function() {
	mouse(rotate_left, rotate_right, 0);
}
rotate_left.onmouseover = rotate_right.onmouseover = function(event) {
	mouse(rotate_left, rotate_right, 100);
	stopEvent(event);
}

function mouse(prev, next, opacity) {
	startMove2(prev, {
		'opacity': opacity
	});
	startMove2(next, {
		'opacity': opacity
	});
}

function stopEvent(event) {
	var event = event || window.event;
	if(event.stopPropagation) {
		event.stopPropagation();
	} else {
		event.cancelBubble = true;
	}
}