document.addEventListener('DOMContentLoaded', (event) => {
    fetch("https://CORS.insert-name.repl.co/https:/api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=D060F6B1C706DABC0E97B1FACD926023&steamids=76561198161943355,76561198057710762").then(data=>data.json())
    .then((steamUsers) => {
    steamUsers = steamUsers.response.players;
    console.log(steamUsers);
    creditElems = document.getElementsByClassName("credit-box");
    for(var i = 0; i < steamUsers.length; i++) {
        steamUser = steamUsers[i];
        creditElems[i].innerHTML = `
        <h2 style="text-align:center;">
            <img src="${steamUser.avatarmedium}" style="margin: auto;">
            <br>
            ${steamUser.personaname}
        </h2>
        <p class="contributions"></p>
        `;
        creditElems[i].href = steamUser.profileurl;
        if(steamUser.steamid == "76561198057710762") document.getElementsByClassName("contributions")[i].innerHTML = `Current Version of Sbox Explorer (Maintained)`;
        if(steamUser.steamid == "76561198161943355") document.getElementsByClassName("contributions")[i].innerHTML = `Depricated Version of <a class="hyper" href="https://explorer.sboxed.com/">Sbox Explorer</a> (Original)`;
    }
    })
});