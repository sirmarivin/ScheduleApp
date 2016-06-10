// JavaScript Document
//stuff
/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */   

var ls = localStorage


function clientListClick(){
	$('.frontButtons').fadeOut(300);
	$('#clientListBox').animate({'opacity':1,'z-index':30})
	$('#backList').animate({'opacity':1,'z-index':80})
	populateClients();
}
function backList(){
	$('#clientListBox').animate({'opacity':0,'z-index':0})
	$('#backList').animate({'opacity':0,'z-index':0})
	$('.frontButtons').fadeIn(300);
}
function addClient(time,name,make,model,number,address,boughtKey,complete){
	var key = null
	var box = null
	if(parseInt(boughtKey)){
		key = '<div class = "white key"></div>'	
	}
	else{
		key = '<div class = "black key"></div>'
	}
	if(parseInt(complete)){
		box = '<div class = "check box"></div>'	
	}
	else{
		box = '<div class = "uncheck box"></div>'	
	}
	var output = '<div id = '+time+' class = "clientGuy"> Time: '+time.substring(0,21)+'<br/>Name: '+name+'<br/>Make/Model: '+make+'<br />'+
            'Year: '+model+'<br />Phone: <a href="tel:+'+number+'"  onClick="simpleLinkClick("tel:+'+number+'")">'+number+'</a><br />'+
            'Address: <a onClick="linkClick("My Location to '+address+'") ">'+checkLength(address)+'</a><div class = "theX"></div></div>'
	return output + key + box
}

function checkLength(address){
	if(address.length > 16){
		address = address.substring(0,16) + "..."	
	}
	return address
}


function newClientClick(){
	$('.frontButtons').fadeOut(300);
	$('#client').animate({'opacity':1,'z-index':30})
	$('#name').focus()
}
function backClient(){
	$('#client').animate({'opacity':0,'z-index':0})
	$('.frontButtons').fadeIn(300);
}
function submitClient(){
	if($(':focus').is($('#name'))){
		$('#make').focus()	
	}
	else if($(':focus').is($('#make'))){
		$('#model').focus()	
	}
	else if($(':focus').is($('#model'))){
		$('#number').focus()	
	}
	else if(document.getElementById('name').value != "" &&
			document.getElementById('address').value != "" &&
			document.getElementById('make').value != "" &&
			document.getElementById('model').value != "" &&
			document.getElementById('number').value != ""){
				var key = Date.now().toString().substring(0,21)
				var theItem = [document.getElementById('name').value,
							   document.getElementById('make').value,
							   document.getElementById('model').value,
							   document.getElementById('number').value,
							   document.getElementById('address').value,
							   0,0]
				localStorage.setItem(key,theItem);
				window.alert('Client added.');
				$('.inputBox').val('')
				$('#client').animate({'opacity':0,'z-index':0})
				populateClients()
				$('#clientListBox').animate({'opacity':1,'z-index':30})
				$('#backList').animate({'opacity':1,'z-index':80})
				
			}
	else{
		window.alert('Fill in all blanks, idiot.')	
	}
}

function checkNumLength(num){
	if(num == 10){
		if(document.getElementById('number').value.length >= num){
			$('#address').focus();
		}
	}
	else{
		if(document.getElementById('model').value.length >= num){
			$('#number').focus();	
		}
	}
}

function populateClients(){
	var output = ""
	for(i = 0; i < localStorage.length; i++){
		var key = localStorage.key(i)
		var it = localStorage.getItem(key)
		var name = it.substring(0,getPosition(it,',',1))
		var make = it.substring(getPosition(it,',',1)+1,getPosition(it,',',2))
		var model = it.substring(getPosition(it,',',2)+1,getPosition(it,',',3))
		var number = it.substring(getPosition(it,',',3)+1,getPosition(it,',',4))
		var address = it.substring(getPosition(it,',',4)+1,getPosition(it,',',5))
		var boughtKey = it.substring(getPosition(it,',',5)+1,getPosition(it,',',6))
		var complete = it.substring(getPosition(it,',',6)+1)
		output += addClient(key.substring(3),name,make,model,number,address,boughtKey,complete)
	}
	document.getElementById('clientListBox').innerHTML = output
}

function getPosition(str, m, i) {
   return str.split(m, i).join(m).length;
}

$('#client').submit(function () {
	return false;
});

$('body').on('click', '.theX', function(){
	var key = localStorage.key($(this).index('.theX'))
	localStorage.removeItem(key)
	populateClients();
})


//controls key changing
$('body').on('click', '.key', function () {
	if($(this).hasClass('black')){
     $(this).removeClass('black').addClass('white')
	}
	else{
     $(this).removeClass('white').addClass('black')
	}
	var key = localStorage.key($(this).index('.key'))
	var before = localStorage.getItem(key)
	var pre = before.substring(0,getPosition(before,',',5)+1)
	var num = before.substring(getPosition(before,',',5)+1,getPosition(before,',',6))
	var after = before.substring(getPosition(before,',',6))
	if(!parseInt(num)){
		localStorage.setItem(key,pre+'1'+after)
	}
	else{
		localStorage.setItem(key,pre+'0'+after)	
	}
});

//controls box changing
$('body').on('click', '.box', function () {
	if($(this).hasClass('check')){
     $(this).removeClass('check').addClass('uncheck')
	}
	else{
     $(this).removeClass('uncheck').addClass('check')
	}
	var key = localStorage.key($(this).index('.box'))
	var before = localStorage.getItem(key)
	var pre = before.substring(0,getPosition(before,',',6)+1)
	var num = before.substring(getPosition(before,',',6)+1)
	if(!parseInt(num)){
		localStorage.setItem(key,pre+'1')
	}
	else{
		localStorage.setItem(key,pre+'0')	
	}
});

function simpleLinkClick(url){
	window.open(url)
}

function linkClick(address){
	window.open("http://maps.google.com/?q="+address,'_blank','location=no','closebuttoncaption=Return')
}
