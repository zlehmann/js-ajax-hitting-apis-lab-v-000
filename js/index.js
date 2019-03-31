// your code here
function getRepositories() {
  let username = document.getElementById('username').value;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayRepositories);
  req.open('GET', 'https://api.github.com/users/' + username + '/repos');
  req.send();
}

function displayRepositories() {
  var repos = JSON.parse(this.responseText);
  console.log(repos);
  const repoList = `<ul>${repos
    .map(
      r =>
        '<li>' +
        r.name +
        ' - <a href="' + r.html_url + '">Repo link</a>' +
        ' - <a href="#" data-repo="' + r.name + '" onclick="getCommits(this)">Get Commits</a></li>'
    )
    .join('')}</ul>`;
  document.getElementById('repositories').innerHTML = repoList;
}

function getCommits(el) {
  let username = document.getElementById('username').value;
  const name = el.dataset.repo;
  console.log(name);
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayCommits);
  req.open('GET', 'https://api.github.com/repos/' + username +'/' + name + '/commits');
  req.send();
}

function displayCommits() {
  const commits = JSON.parse(this.responseText);
  console.log(commits);
  const commitsList = `<ul>${commits
    .map(
      commit =>
        '<li><strong>' +
        commit.author.login +
        '</strong> - ' +
        commit.commit.author.name + ' - ' +
        commit.commit.message +
        '</li>'
    )
    .join('')}</ul>`;
  document.getElementById('details').innerHTML = commitsList;
}
