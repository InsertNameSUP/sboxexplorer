document.addEventListener('DOMContentLoaded', (event) => {
    const contentElem = document.getElementById("content");
function createTile(title, description, image, org, id) {
    var newTile = document.createElement("div")
    newTile.classList.add("tile");
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
  })

