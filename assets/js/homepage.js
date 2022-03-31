var getUserRepos = function(user) {
   var apiUrl = "http://api.github.com/users/" + user + "/repos";
   fetch(apiUrl).then(function(response) {
       response.json().then(function(data) {
        console.log(data);
       });
});
};
getUserRepos("serendipbrity");