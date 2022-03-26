const STORAGE_ENTRY = "saved-names";

function isMainEntryDefined() {
    return !!localStorage.getItem(STORAGE_ENTRY);
}

function getFromLocalStorage(name, key) {  
    // Get the existing data
    return JSON.parse(localStorage.getItem(name))[key];
}


function isCurrentChannelKeyIsRegistered(existing, name, key) {
    existing === null && localStorage.setItem(name, JSON.stringify({}));
    if (existing && !Object.keys(existing).includes(getCurrentChannelName())) {
        var cachedResponse = JSON.parse(localStorage.getItem(name));
        if (cachedResponse) {
            cachedResponse[key] = [];
            localStorage.setItem(name, JSON.stringify(cachedResponse));
            return false;
        }
    }
}

function isCurrentKeyIsFound (entry, key) {
    let cachedResponse = JSON.parse(localStorage.getItem(entry));
    return !!Object.keys(cachedResponse).find(currentKey => currentKey === key);
}

function resetSpecificEntryInLocalStorage(name, key) {
    let cachedResponse = JSON.parse(localStorage.getItem(name));
    isCurrentKeyIsFound(name, key) && delete cachedResponse[key];
    localStorage.setItem(name, JSON.stringify(cachedResponse));
}

function addToLocalStorageObject(name, key, value) {
    // Get the existing data
    let existing = JSON.parse(localStorage.getItem(STORAGE_ENTRY));
   
    // check if the key is not already registered
    isCurrentChannelKeyIsRegistered(existing, name, key);

    // If no existing data, create an array
    // Otherwise, convert the localStorage string to an array
    existing = existing ? getFromLocalStorage(name, key) : [];

    // Add new data to localStorage Array and filter out any doublicate
    (existing.indexOf(value) > -1) ? existing : existing.push(value);

    // pull pre-defined key
    let getFreshData = JSON.parse(localStorage.getItem(STORAGE_ENTRY));
    let toSave;
    if (Object.keys(getFreshData).includes(getCurrentChannelName())) {
        toSave = {...getFreshData, [key]: existing}
    } else {
        // prepare data to be saved
        toSave = {
            ...getFreshData,
            [key]: existing
        };
    }

    // Save back to localStorage
    localStorage.setItem(name, JSON.stringify(toSave));
}