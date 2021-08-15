function Search() {
    var searchBar = document.getElementById('search-bar');
    location.href = "./?search=" + searchBar.value;
    
}
document.addEventListener('DOMContentLoaded', (event) => {
    function sortChanged() {
        if(!this.checked) return;
        localStorage.setItem("sortBy" , this.value);
        console.log(this.value);
        location.reload();
    }
    var sortValues = document.getElementsByClassName("order-radio");
    for(var i = 0; i < sortValues.length; i++) {
        sortValues[i].addEventListener("click", sortChanged);
    }


    const contentElem = document.getElementById("content");
    contentElem.innerHTML = "";
    document.getElementById("search-form")                   // If you hit enter while search bar in focus
    .addEventListener("submit", function(event) {
        event.preventDefault();
        Search()
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
    // Gamemode sort by
    var sortValues = document.getElementsByClassName("order-radio");
    if(!localStorage.getItem("sortBy")) {
        sortValues[0].checked = true; // If no radio is selected, select popular
    } else {
        for(var i = 0; i < sortValues.length; i++) {
            if(sortValues[i].value == localStorage.getItem("sortBy")) {
                sortValues[i].checked = true;
                sortValues[i].parentElement.style.background = "#3472e6";
            } 
        }
    }
    for(var i = 0; i < sortValues.length; i++) {
        if(sortValues[i].checked) {
            var orderType = sortValues[i].value;
        }
    }
var urlParams = new URLSearchParams(location.search); // Get Search Request
var searchReq = urlParams.get("search");
if(!searchReq) {
    fetch("https://corsproxy.insert-name.repl.co/asset/list?type=gamemode&order=" + orderType).then(data => data.json())
    .then((data) => {
        if (data.size == 0) { // No Results
            console.log("Error Loading!");
            document.getElementById("error-loading").style.display = "block";
        }
        for (var i = 0; i < data.length; i++) {
            createTile(data[i].title, data[i].summary, data[i].thumb, data[i].org.ident, data[i].ident);
        }
        console.log(`Loaded ${data.length} Tiles by Sort-Type of ${orderType}`)
    })
} else {
    fetch("https://corsproxy.insert-name.repl.co/asset/list?type=gamemode&order=" + orderType +"&search=" + searchReq).then(data => data.json())
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

