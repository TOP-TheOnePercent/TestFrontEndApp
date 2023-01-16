$(function() {
    var currentPageName=document.location.pathname.match(/[^\/]+$/)[0];
	if(currentPageName=='UserPage.html'){
		//separate this functionality to function.
		var userId = qs('id');
		console.log('userId',userId);
		var userDetailUrl= "http://localhost:85/api/login/"+userId+"?type=json";
		console.log('userDetailUrl',userDetailUrl);
		FetchAPIData(userDetailUrl, 'LoadDetailPage');
	}
});

function GetLoginCredentials(){
	var emailId = $('#txtEmailId').val();
	var password = $('#txtPassword').val();
	var loginUrl= "http://localhost:85/api/login/"+emailId+"/"+password+"?type=json";
	console.log('loginUrl',loginUrl);
	FetchAPIData(loginUrl, 'RedirectDetailPage');
}

//document.location.pathname.match(/[^\/]+$/)[0]



function GetWelcomeText(){
	var name = $('#txtName').val();
	var apiUrl = "http://localhost:85/api/welcome/"+name+"?type=json";
	FetchAPIData(apiUrl);
}

function qs(key) {
    key = key.replace(/[*+?^$.\[\]{}()|\\\/]/g, "\\$&"); // escape RegEx meta chars
    var match = location.search.match(new RegExp("[?&]"+key+"=([^&]+)(&|$)"));
    return match && decodeURIComponent(match[1].replace(/\+/g, " "));
}
function Act(value, action){
	
	// similar behavior as an HTTP redirect
	//window.location.replace("http://stackoverflow.com");
	console.log('action',action);
	console.log('value',value);
	if(action == 'RedirectDetailPage'){
		//window.navigate("UserPage.html?id="+value.Id);
		window.location.href = "http://localhost:83/UserPage.html"+"?id="+value.Id;
	}
	if(action == 'LoadDetailPage'){
		$('#spnName').html(value.FirstName);
		$('#spnFullName').html(value.LastName + ' '+value.FirstName);
		$('#spnAge').html(value.Age);
	}
	
}

// calls the api server.
function FetchAPIData(url, action){	
	fetch(url)
  .then(response => {
    //handle response            
    return response.json();
  })
  .then(data => {
    //handle data
    console.log('data',data);
	Act(data, action);
  })
  .catch(error => {
    //handle error
  });
}



