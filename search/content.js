var urlParams = new URLSearchParams(location.search); // Get Search Request
var searchReq = urlParams.get("id");
document.addEventListener('DOMContentLoaded', (event) => {
    var resultsElem = document.getElementById("search-result");
    var contentElem = document.getElementById("search-content");
    fetch(`https://corsproxy.insert-name.repl.co/asset/get?id=${searchReq}`).then(data => data.json())
    .then((data) => {
        if (data.size == 0) {
            console.log("Error Loading!");
            document.getElementById("error-loading").style.display = "block";
        }
        var assetInfo = data.asset;
        console.log(assetInfo);
        var assetUpdated = Math.round(((new Date() - (new Date(new Date().getTime() - new Date(1627987211).getTime()))) / 1000 / 60 / 60))
        if(assetUpdated => 24) { // Decide between Updated Days or Updated Hours Ago
            assetUpdated = Math.round(assetUpdated/24) + " Day(s) ago";
        } else {
            assetUpdated = assetUpdated + " Hour(s) ago";
        }
        if(assetInfo.download.type == "upload") {
            var download = `Ext-Download (${Math.round(assetInfo.download.size/1000000)}MB)`;
            if(Math.round(assetInfo.download.size/1000000) <= 0) download = `Ext-Download (<1MB)`;
        }
        if(assetInfo.download.type == "github") var download = `Github`;
        if (!assetInfo.org.description.length) assetInfo.org.description = "N/A"; // No Description?
        resultsElem.style.backgroundImage = `url(${assetInfo.background})`;
        contentElem.innerHTML = `
        <div id="tag-container" class="package-tags">
        <div class="tag"> multiplayer </div>
        </div>
        <h1 class="package-name">${assetInfo.title}</h1>
        <div style="display: flex;">
            <img class="package-thumb" src="${assetInfo.thumb}">
            <div class="package-author">
            <h2 class="package-title"> Author Info:</h2>
            <span class="package-desc"><h3 class="package-subtitle">Author Name:</h3>  ${assetInfo.org.title}</span>
            <br>
            <span class="package-desc"><h3 class="package-subtitle">Author Description:</h3>  ${assetInfo.org.description}</span>
            <br>
            <span class="package-desc"><h3 class="package-subtitle">Last Updated:</h3>  ${assetUpdated}</span>
            <br>
            <span class="package-desc"><h3 class="package-subtitle">Src-Code: </h3><a class="hyper" href="${assetInfo.download.url}"> ${download}</a></span>
            
            </div>
        </div>
        <h2 class="package-title">Description</h2>
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