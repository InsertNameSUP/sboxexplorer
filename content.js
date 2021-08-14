function Search() {
    var searchBar = document.getElementById('search-bar');
    location.href = "./?search=" + searchBar.value;
}
document.addEventListener('DOMContentLoaded', (event) => {
    const contentElem = document.getElementById("content");
    contentElem.innerHTML = "";
    document.getElementById("search-bar")                   // If you hit enter while search bar in focus
    .addEventListener("keyup", function(event) {
        event.preventDefault();
        if (event.key == "Enter") {
            document.getElementById("search-button").click();
        }
    });
    function createTile(title, description, image, org, id) {
        var newTile = document.createElement("div")
        newTile.classList.add("tile");
        if(image == "") image = "./images/tile-placeholder.jpg";
        newTile.innerHTML = `
        <a href="./search/?id=${org}.${id}">
            <img class="tile-thumb" src="${image}">
            <div class="tile-info">
            <div class="tile-title">${title}</div>
            </div>
        </a>
        `;
        contentElem.appendChild(newTile);
    }
var urlParams = new URLSearchParams(location.search); // Get Search Request
var searchReq = urlParams.get("search");
if(!searchReq) {
    fetch("https://corsproxy.insert-name.repl.co/asset/list?type=gamemode&order=trending").then(data => data.json())
    .then((data) => {
        if (data.size == 0) {
            console.log("Error Loading!");
            document.getElementById("error-loading").style.display = "block";
        }
        for (var i = 0; i < data.length; i++) {
            createTile(data[i].title, data[i].summary, data[i].thumb, data[i].org.ident, data[i].ident);
        }
    })
} else {
    fetch("https://corsproxy.insert-name.repl.co/asset/list?type=gamemode&search=" + searchReq).then(data => data.json())
    .then((data) => {
        if (data.size == 0) {
            console.log("Error Loading!");
            document.getElementById("error-loading").style.display = "block";
        }
        console.log(data);
        if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                createTile(data[i].title, data[i].summary, data[i].thumb, data[i].org.ident, data[i].ident);
            }
        } else {
            contentElem.innerHTML = `<div class="no-results"> <h1> No Results Found </h1></div>`;
            contentElem.style.backgroundImage = "url(./images/noresults.jpg)"
            contentElem.style.height = "100vh";
        }      
    })   
}
  })

