document.addEventListener("DOMContentLoaded", () => {
  // grab all the html tags
  const searchForm = document.querySelector("#github-form")
  const searchInput = document.querySelector("#search")
  const userList = document.querySelector("#user-list")
  const reposList = document.querySelector("#repos-list")
  const searchUrl = "https://api.github.com/search/users?q="
  const reposUrl = "https://api.github.com/users/"
  const dropdown = document.createElement("select")
  const userOption = document.createElement("option")
  const repoOption = document.createElement("option")
  dropdown.id = "dropdown"
  userOption.innerText = "User"
  repoOption.innerText = "Repo"
  dropdown.append(userOption, repoOption)
  searchForm.append(dropdown)

  // listen to the search form
  searchForm.addEventListener("submit", (event) => {
    event.preventDefault()
    userList.innerHTML = ""
    reposList.innerHTML = ""
    if (dropdown.value === "User") {
      // grab the search input value
      // search the API
      fetch(`${searchUrl}${searchInput.value}`)
        .then(resp => resp.json())
        .then(data => {
          data.items.forEach(user => {
            console.log(user)
            // create a li
            const newUser = document.createElement("li")
            // create p for name
            const username = document.createElement("a")
            username.innerHTML = `${user.login}<br>`
            username.href = user.html_url
            username.target = "blank"
            newUser.append(username)
            // add an img for avatar
            const avatar = document.createElement("img")
            avatar.src = user.avatar_url
            avatar.height = 150
            avatar.width = 150
            newUser.append(avatar)
            userList.append(newUser)
            avatar.addEventListener("click", () => {
              reposList.innerHTML = ""
              fetch(`${reposUrl}${user.login}/repos?per_page=100`)
                .then(resp => resp.json())
                .then(repos => repos.forEach(repo => {
                  const repoList = document.createElement("li")
                  repoList.innerHTML = `<a href= ${repo.html_url} target = "blank">${repo.name}</a>`
                  reposList.append(repoList)
                }))
            })
          })
        })
    } else {
      fetch(`https://api.github.com/search/repositories?q=${searchInput.value}&per_page=100`)
        .then(resp => resp.json())
        .then(repos => repos.items.forEach(repo => {
          console.log(repo)
          const repoList = document.createElement("li")
          repoList.innerHTML = `<a href= ${repo.html_url} target = "blank">${repo.name}</a>`
          reposList.append(repoList)
        })
        )
    }
  })
})