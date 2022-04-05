var issueContainerEl = document.querySelector("#issues-container");


var getRepoIssues = function(repo) {
    console.log(repo);
    // create variable to hold query
    var apiUrl = "http://api.github.com/repos/" + repo + "/issues?direction=asc";

    fetch(apiUrl).then(function(response) {
       // request was successful
       if (response.ok) {
           response.json().then(function(data){
               displayIssues(data);
               
           });
       }
       else {
           console.log(response);
           alert("There was a problem with your request!");
    }
 });
};

var displayIssues = function(issues) {
    if (issues.length === 0) {
        issueContainerEl.textContent = "This repo has no open issues!";
        return;
    }

    // loop over given issues
    for (var i = 0; i < issues.length; i ++) {
        // create a link to take users to the issue on github
        var issueEl = document.createElement("a");
        issueEl.classList = "list-item flex-row justify-space-between align-center";
        issueEl.setAttribute("href", issues[i].html_url);
        // open the link in new tab instead of replacing current page
        issueEl.setAttribute("target", "_blank");

        // create span to hold issue title
        var titleEl = document.createElement("span");
        titleEl.textContent = issues[i].title;

        // append to container
        issueEl.appendChild(titleEl);
        // create a type element
        var typeEl = document.createElement("span");

        // create if issue is an actual issue or a pull request
        if (issues[i].pull_request) {
            typeEl.textContent = "(Pull request)";
        } else {
            typeEl.textContent = "(Issue)";
        }

        //append to container
        issueEl.appendChild(typeEl);
        //append to the dom
        issueContainerEl.appendChild(issueEl);
    }
};

getRepoIssues("facebook/react");