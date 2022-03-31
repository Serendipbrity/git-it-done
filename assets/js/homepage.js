var getUserRepos = function() {
    fetch("http://api.github.com/users/octocat/repos");
};

getUserRepos();