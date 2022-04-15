// reference whole <form>
var userFormEl = document.querySelector("#user-form");
// reference <input> in form
var nameInputEl = document.querySelector("#username");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");

// when we submit the form then we get the value from <input> via nameInputEl
var formSubmitHandler = function(event) {
    event.preventDefault();
// store the value is its own var. trim in case of extra space on input
  var username = nameInputEl.value.trim();
// if there is a value, pass data to getUserRepos() as an argument
  if (username) {
      getUserRepos(username);
      //then clear input
      nameInputEl.value = "";
  } else {
      alert("Please enter a Github username");
  }
};

var getUserRepos = function(user) {
   var apiUrl = "http://api.github.com/users/" + user + "/repos";

   fetch(apiUrl).then(function(response) {
       // request was successful
       if (response.ok){
       response.json().then(function(data) {
        displayRepos(data, user);
       });
    } else {
        alert("Error: Github User Not Found");
    }
    })
    .catch(function(error) {
       alert("Unable to connect to Github");
    });
};

// search term is the user input
var displayRepos = function(repos, searchTerm) {
    // check if api returned any repos
    if (repos.length === 0) {
        repoContainerEl.textContent = "No repositories found.";
        return;
    }
    console.log(repos);
    console.log(searchTerm);
    // clear old content
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;
    // loop over repos
    for (var i = 0; i < repos.length; i++) {
        //format repo name
        var repoName = repos[i].owner.login + "/" + repos[i].name;

        // create a container for each repo
        var repoEl = document.createElement("a");
        repoEl.classList = "list-item flex-row justify-space-between align-center";
        repoEl.setAttribute("href", "./single-repo.html?repo=" + repoName);
        // create a span element to hold repositoy name
        var titleEl = document.createElement("span");
        titleEl.textContent = repoName;

        //append to container
        repoEl.appendChild(titleEl);

        //create a status element
        var statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center";

        //check if the current repo has issues or not
        if (repos[i].open_issues_count > 0) {
            // if (there are) issues > 0 (per repo), display number of issues w a red x
            statusEl.innerHTML =
            "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + "issues(s)";
        }else {
            //if no issues, display blue check
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }
        // append to container
        repoEl.appendChild(statusEl);

        //append to the dom
        repoContainerEl.appendChild(repoEl);
    }
};

userFormEl.addEventListener("submit", formSubmitHandler);

