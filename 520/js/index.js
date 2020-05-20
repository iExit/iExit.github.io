$(function () {
	$('#yes').click(function () {
		modal('我就知道曦曦小妞你一定会接受的。(^_^)', function () {
			$('.page_one').addClass('hide');
			$('.page_two').removeClass('hide');
			typeWrite();
			fireworks();
		});
	});
	$('#no').click(function () {
		modal('明人不说暗话！', A);
	});
});

function A() {
	modal('520我喜欢你！', B);
}

function B() {
	modal('我知道你在等我这一句话', C);
}

function C() {
	modal('请您不要拒绝我', D);
}

function D() {
	modal('拒绝我，不存在的', E);
}

function E() {
	modal('这辈子都不可能让你离开我', F);
}

function F() {
	modal('跟我走吧', G);
}

function G() {
	modal('我会做菜菜', H);
}

function H() {
	modal('我会哄觉觉', I);
}

function I() {
	modal('曦曦小妞，爱你么么哒！', J)
}

function J() {
	modal('给疼你加个期限是：一生；给守你加个期限是：一世；给恋你加个期限是：一辈子；给爱你加个期限是：一万年。', function () {
		typeWrite();
		fireworks();
	});
}

function fireworks() {
	$('.page_one').addClass('hide');
	$('.page_two').removeClass('hide');
	$('.page_two').fireworks({
		sound: false,
		opacity: 0.3,
		width: '100%',
		height: '100%'
	});
}

function modal(content, callback) {
	var tpl = '<div class="container">' +
		'<div class="mask"></div>' +
		'<div class="modal">' +
		'<p>' + content + '</p>' +
		'<button type="button" id="confirm" class="confirm">确定</button>' +
		'</div>' +
		'</div>';
	$('body').append(tpl);
	$(document).on('click', '.confirm', function () {
		$('.container').remove();
		callback();
	});
}

var myWords = '有人说，人的一生会遇到2920万人，而两个人相爱的概率只有0.000049。' +
	'在这茫茫人海中，两个人能相遇就是一种幸运，能相爱更是一种难得。所以，我很庆幸上天让我遇见了你。' +
	'你肯定是偷偷作弊了，要不怎么会在我心里得满分。'+	
	'在我眼里，你永远比别人温柔一点儿，美丽一点儿，善良一点儿，纯朴一点儿。520我爱你，我要让你开心一点儿，甜蜜一点儿，幸福一点儿！';
var x = 0;
var speed = 100;
var current = 0;

function typeWrite() {
	$('.type_words').html(myWords.substring(0, x++) + '_');
	var timer = setTimeout("typeWrite()", speed);
	if (x == myWords.length) {
		x = myWords.length;
		clearTimeout(timer)
	}
}