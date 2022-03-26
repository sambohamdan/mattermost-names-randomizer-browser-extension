// render saved names
function renderer(savedNamesWrapper, entry, key) {
    savedNamesWrapper[0].children.length > 0 && savedNamesWrapper.empty();
    let cachedResponse = getFromLocalStorage(entry, key);
    let hasKeySavedNames = (cachedResponse && cachedResponse.length > 0);
    hasKeySavedNames && getFromLocalStorage(entry, key).forEach(function (item, index) {
        let randomLocation = Math.ceil(Math.random() * index);
        savedNamesWrapper[0].insertAdjacentHTML("beforeend", "<li style='--animation-order: " + randomLocation + ";'>" + item + "</li>");
    });
}

// save entered names
function save(entry, key, value) {
    addToLocalStorageObject(entry, key, value)
}

function showResetButton($resetSelections) {
    var currentChannelName = getCurrentChannelName();
    if (isCurrentKeyIsFound("saved-names", currentChannelName)) {
        getFromLocalStorage("saved-names", currentChannelName).length > 0 ? $resetSelections.css("display", "inline-block") : $resetSelections.css("display", "none");
    } else {
        $resetSelections.css("display", "none");
    }
}

function showFinishEditModeButton($finishEditMode) {
    var currentChannelName = getCurrentChannelName();
    if (isMainEntryDefined() && isCurrentKeyIsFound("saved-names", currentChannelName)) {
        getFromLocalStorage("saved-names", currentChannelName).length > 0 ? $finishEditMode.css("display", "inline-block") : $finishEditMode.css("display", "none");
    } else {
        $finishEditMode.css("display", "none");
    }
}

function canShuffleBtnRender($startShuffling) {
    var currentChannelName = getCurrentChannelName();
    if (isMainEntryDefined() && isCurrentKeyIsFound("saved-names", currentChannelName)) {
        getFromLocalStorage("saved-names", currentChannelName).length > 1 ? $startShuffling[0].removeAttribute("disabled") : $startShuffling[0].setAttribute("disabled", true);
    } else {
        $startShuffling[0].setAttribute("disabled", true);
    }
}
