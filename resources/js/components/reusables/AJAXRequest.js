export function AJAXPostRequest(data, URL, callback, callingComponent){
	const xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
	  if (this.readyState == 4 && this.status == 200) {
	    callback(this.responseText, callingComponent);
	  }
	};
	xhttp.open('POST', URL, true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.setRequestHeader(
		'X-CSRF-TOKEN',
		document.querySelector('meta[name="csrf-token"]').getAttribute('content')
	);
	xhttp.send(data);		
}

export function AJAXGetRequest(data, URL, callback, callingComponent){
	;	
}