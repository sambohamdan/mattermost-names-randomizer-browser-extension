function fetchCurrentUsers() {
    let currentChannelKey = Object.keys(localStorage).filter(v => v.startsWith("focalboardLastViewedChannel"));
    let currentChannelID = localStorage.getItem(currentChannelKey);
    let baseUrl = window.location.origin;
    return fetch(`${baseUrl}/api/v4/users?in_channel=${currentChannelID}&page=0&per_page=100&sort=status&active=true`)
        .then(response => response.json());
}

//handle shuffles
function shufflelistitems (listWrapper) {
    for (var i = listWrapper[0].children.length; i >= 0; i--) {
        listWrapper[0].appendChild(listWrapper[0].children[Math.random() * i | 0]);
    }
};

function isCurrentPathIsChannel() {
    const temp = window.location.pathname.split("/");
    return temp[2].includes("channels");
}

function getCurrentChannelName() {
    const temp = window.location.pathname.split("/");
    return isCurrentPathIsChannel() ? temp[3] : undefined
}
