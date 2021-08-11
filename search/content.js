var urlParams = new URLSearchParams(location.search); // Get Search Request
var searchReq = urlParams.get("id");
document.addEventListener('DOMContentLoaded', (event) => {
    var resultsElem = document.getElementById("search-result");
    var contentElem = document.getElementById("search-content");
    fetch(`https://corsproxy.insert-name.repl.co/asset/get?id=${searchReq}`).then(data => data.json())
    .then((data) => {
        var assetInfo = data.asset;
        console.log(assetInfo);
        resultsElem.style.backgroundImage = `url(${assetInfo.background})`;
        contentElem.innerHTML = `
        <div id="tag-container" class="package-tags">
        <div class="tag"> multiplayer </div>
        </div>
        <h1 class="package-name">${assetInfo.title}</h1>
        <img class="package-thumb" src="${assetInfo.thumb}">
        <div class="package-author">
        <h2 class="package-title"> Author Info:</h2> <span> Incomplete </span>
        </div>
        <h2 class="package-title">DESCRIPTION</h2>
        <pre class="package-desc">${assetInfo.description}</pre>
        <div class="package-stats">
            <div class="package-stat-item">
                <h3 class="stat-title"> Players Now </h3>
                <h2 class="stat-number"> ${assetInfo.usersNow} </h2>            
            </div>
            <div class="package-stat-item">
                <h3 class="stat-title"> Players Today </h3>
                <h2 class="stat-number"> ${assetInfo.usersDay} </h2>
            </div>
            <div class="package-stat-item">
                <h3 class="stat-title"> Players This Month </h3>
                <h2 class="stat-number"> ${assetInfo.usersMonth} </h2>   
            </div>
        </div>
        `;
        var tagCollection = document.getElementById("tag-container");
    for(var i = 0; i < assetInfo.tags.length; i++) {
        var tagElem = document.createElement("div");
        tagElem.classList.add("tag");
        tagElem.innerText = assetInfo.tags[i];
        tagCollection.appendChild(tagElem);

    }
    })
});