$(document).ready(function () {
    let toolbarWrapper;
    let iconContent = document.createElement("button");
    let tries = 0;
    let modalMarkup = "<div id='myModal' class='modal-randomizer is-hidden'> <div class='modal-content'> <span class='close'>&times;</span> <h3 class='headline'>Names Randomizer</h3> <div class='form'> <label for='name'>Please insert a name</label> <input name='name' id='name'> <button id='add'>Add</button> <div class='toggles-wrapper'><div class='toggle-wrapper'><label for='toggle-fetch-names'>Get current channel's users ? </label><div class='toggle r'><input type='checkbox' id='toggle-fetch-names' class='toggler toggle-fetch-names'><div class='knobs'></div><div class='layer'></div></div></div> <div class='toggle-wrapper active-edit-mode-wrapper'><label for='active-edit-mode'>Active Edit Mode ? </label><div class='toggle r'><input type='checkbox' id='active-edit-mode' class='toggler active-edit-mode'><div class='knobs'></div><div class='layer'></div></div></div></div></div><span class='edit-mode-background is-hidden'></span><ol class='saved-names'> </ol> <button id='shuffle-btn' disabled>Shuffle</button> <button class='reset-selections is-hidden' id='reset-selections'>Reset</button> <button class='finish-edit-mode is-hidden' id='finish-edit-mode'>Save Changes</button></div> </div>";
    let modalStyles = "<style> @keyframes animateIn {0% {opacity: 0;transform: scale(0.6) translateY(-8px);}100% {opacity: 1;}} #mattermost-name-randomizer { padding: 0 4px; } #myModal button { transition: background .2s ease-in-out; border: 0; cursor: pointer; padding: 0.5rem 1rem; background-color: #1e325c; color: #fff; border-width: 1px; } #myModal button#add { color: #fff; border-radius: 100px; font-size: 14px; background-color: #3da050; border: 0; } #myModal button#add:hover { background-color: #3db887; } #myModal .form input#name { color: #000; padding: 6px 8px; border-radius: 5px; border: 1px solid #000; } #myModal .form input#name:active { outline: 0; } .is-hidden { display: none; } .is-displayed { display: block; } .modal-randomizer #shuffle-btn:not([disabled]) { color: #000; background: #fff; margin-right: 8px;} .modal-randomizer #shuffle-btn:hover {background-color: #3da050; color: #fff;} .modal-randomizer #shuffle-btn[disabled] {background: grey; cursor: no-drop;} .modal-randomizer #reset-selections {background-color: #d24b4e; display: none;} .modal-randomizer h3.headline {text-align: center;} .modal-randomizer .form {padding-top: 32px;} .modal-randomizer .form label {display: block;} .modal-randomizer .saved-names li { animation-name: animateIn;animation-duration: 250ms;animation-delay: calc(var(--animation-order) * 50ms);animation-fill-mode: both;animation-timing-function: ease-in-out;} .modal-randomizer .saved-names li::-moz-selection {background: red;} .modal-randomizer .saved-names li::selection {background: red;} .modal-randomizer .saved-names { caret-color: red; display: flex; flex-direction: column; flex-wrap: wrap; max-height: 50vh; font-size: 16px; padding: 32px 16px;} .modal-randomizer { position: fixed; z-index: 50; padding-top: 100px; left: 0; top: 0; width: 100%; height: 100%; overflow: auto; background-color: rgb(0, 0, 0); background-color: rgba(0, 0, 0, 0.4); } .modal-randomizer .modal-content { color: #fff;   background: linear-gradient(170deg, rgba(49, 57, 73, 0.8) 20%, rgba(49, 57, 73, 0.5) 20%, rgba(49, 57, 73, 0.5) 35%, rgba(41, 48, 61, 0.6) 35%, rgba(41, 48, 61, 0.8) 45%, rgba(31, 36, 46, 0.5) 45%, rgba(31, 36, 46, 0.8) 75%, rgba(49, 57, 73, 0.5) 75%), linear-gradient(45deg, rgba(20, 24, 31, 0.8) 0%, rgba(41, 48, 61, 0.8) 50%, rgba(82, 95, 122, 0.8) 50%, rgba(133, 146, 173, 0.8) 100%) #313949; margin: auto; padding: 20px; border: 1px solid #1E325C; width: 60%; } .modal-randomizer #reset-selections:hover { background: #d21a00;} .modal-randomizer .close { color: #fff; float: right; font-size: 28px; font-weight: bold; opacity: .8;} .modal-randomizer .close:focus { color: #000; text-decoration: none; cursor: pointer; } #myModal.start-selections { position: absolute; height: unset; width: unset; background-color: unset; top: 100px; left: 60%; transform: translateX(-50%); z-index: 50; padding-top: 16px; } .modal-randomizer .finish-selections { display: none; } .modal-randomizer .start-selections h3.start-selections, .modal-randomizer .start-selections button#start-selections { display: none; } .modal-randomizer .start-selections .finish-selections { display: block; } .knobs, .layer{position: absolute;top: 0;right: 0;bottom: 0;left: 0;} .toggles-wrapper {margin-top: 16px; display: flex; justify-content: space-evenly;} .toggle-wrapper.active-edit-mode-wrapper {z-index: 10;} .toggle-wrapper {margin-top: 16px;} .toggle{position: relative;width: 70px;height: 25px; overflow: hidden;}.toggle.r, .toggle.r .layer{z-index: 0; border-radius: 100px;}.toggle.b2{border-radius: 2px;} .toggler{position: relative;width: 100%;height: 100%;padding: 0;margin: 0;opacity: 0;cursor: pointer;z-index: 3;}.knobs{z-index: 2;}.layer{width: 100%;background-color: #ebf7fc;transition: 0.3s ease all;z-index: 1;} .toggle .knobs:before{content: 'NO';position: absolute;top: 4px;left: 4px;width: 23px;height: 18px;color: #fff;font-size: 10px;font-weight: bold;text-align: center;line-height: 1;padding: 4px 0;background-color: #F44336;border-radius: 50%;transition: 0.3s ease all, left 0.3s cubic-bezier(.18, .89, .35, 1.15);}.toggle .toggler:active + .knobs:before{width: 46px;border-radius: 100px;} .toggle .toggler:checked:active + .knobs:before{margin-left: -26px;}.toggle .toggler:checked + .knobs:before{content: 'YES';left: 42px;background-color: #03A9F4;}.toggle .toggler:checked ~ .layer{background-color: #fcebeb;} .edit-mode-background {width: 100%;height: 100%; position: fixed; top: 0; bottom: 0; left: 0; right: 0;background-color: rgba(0, 0, 0, 0.6);} button#finish-edit-mode:hover {background-color: #3da050; color: #fff;} button#finish-edit-mode { isolation: isolate; z-index: 5; position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%); background: #fff; color: #000;}</style>";
    let $startShuffling;
    let $resetSelections;

    /**
     * Try to initialize Mattermost header toolbar. If any of the element required to correctly define the trigger is not rendered
     * yet, try again later
     */
    function tryToInitHeaderToolbar() {
        toolbarWrapper = $("#channel-header .flex-parent");
        tries++;

        if (toolbarWrapper.length === 0) {
            if (tries > 30) {
                console.error('Initializing header toolbar took too long!');
                return;
            }
            setTimeout(tryToInitHeaderToolbar, 500);
        } else {
            renderRandomizerInHeader(toolbarWrapper);
        }
    }

    function renderRandomizerInHeader(toolbarWrapper) {
        let firstChild = toolbarWrapper.find(".flex-child");
        let $head = $("head");
        let $body = $(document.body);
        
        $head[0].insertAdjacentHTML("beforeend", modalStyles);
        $body[0].insertAdjacentHTML("beforeend", modalMarkup);
        iconContent.innerHTML = "Randomizer";
        iconContent.id = "mattermost-name-randomizer";
        iconContent.className += "is-hidden channel-header__icon";

    
        // preadd the hidden trigger on initial load.
        insertAfter(firstChild[0], iconContent);
        let randomizerTrigger = toolbarWrapper.find("#mattermost-name-randomizer");
        isCurrentPathIsChannel() && randomizerTrigger.addClass("is-displayed").removeClass("is-hidden");

        function onUrlChange() {
            if (isCurrentPathIsChannel()) {
                randomizerTrigger.length <= 0 && firstChild.after(iconContent);
                randomizerTrigger.addClass("is-displayed").removeClass("is-hidden");
            } else {
                if (randomizerTrigger.length <= 0) {
                    firstChild.after(iconContent)
                } else {
                    randomizerTrigger.addClass("is-hidden").removeClass("is-displayed");
                }
            }
        }

        let lastUrl = location.href;
        new MutationObserver(() => {
            const url = location.href;
            if (url !== lastUrl) {
                lastUrl = url;
                onUrlChange();
            }
        }).observe(document, {subtree: true, childList: true});

        let $modal = $body.find('#myModal');
        let savedNamesWrapper = $modal.find(".saved-names")
        let addNameBtn = $modal.find("button#add");
        let addNameField = $modal.find("input#name");
        let fetchNamesToggle = $modal.find("input.toggle-fetch-names");
        let activeEditModeToggle = $modal.find("input.active-edit-mode");
        let editModeBackground = $modal.find("span.edit-mode-background");
        let finishEditMode = $modal.find("#finish-edit-mode")
       

        // Get the <span> element that closes the modal
        let $closeModal = $modal.find('.close');

        // Get Start Selections button.
        $startShuffling = $modal.find('#shuffle-btn');

        // Get Finish Selections button.
        $resetSelections = $modal.find('#reset-selections');

        // When the user clicks on <span> (x), close the modal
        $closeModal.on('click', () => {
            $modal.addClass('is-hidden').removeClass("is-displayed");
            fetchNamesToggle[0].checked = false;
        });

        // pre-render saved names
        if (isMainEntryDefined()) {
            if (Object.keys(JSON.parse(localStorage.getItem(STORAGE_ENTRY))).includes(getCurrentChannelName())) {
                if (getFromLocalStorage(STORAGE_ENTRY, getCurrentChannelName()).length > 0) {
                    showResetButton($resetSelections);
                    renderer(savedNamesWrapper, STORAGE_ENTRY, getCurrentChannelName())
                }
                canShuffleBtnRender($startShuffling);
            }
        }

        // Listeners
        randomizerTrigger.on('click', function() {
            savedNamesWrapper[0].children.length > 0 && savedNamesWrapper.empty();
            $modal.addClass('is-displayed');
            isMainEntryDefined() && renderer(savedNamesWrapper, STORAGE_ENTRY, getCurrentChannelName());
            canShuffleBtnRender($startShuffling);
        });

        addNameBtn.on('click', function() {
            var enteredName = addNameField[0].value !== "" ? addNameField[0].value : "";
            if(enteredName) {
                save(STORAGE_ENTRY, getCurrentChannelName(), enteredName);
                // once its saved, call a render for live updates
                renderer(savedNamesWrapper, STORAGE_ENTRY, getCurrentChannelName());
            }

            addNameField[0].value = "";
            addNameField[0].focus();
            showResetButton($resetSelections);
            canShuffleBtnRender($startShuffling);
        });

        // When the user clicks anywhere outside of the modal, close it
        $(window).on('click', function (event) {
            if (event.target === $modal[0]) {
                $modal.addClass('is-hidden').removeClass("is-displayed");
                fetchNamesToggle[0].checked = false;
            }
        });

        // shuffle items
        $startShuffling.on('click', function () {
           shufflelistitems(savedNamesWrapper);
        });

        $resetSelections.on('click', function () {
            resetSpecificEntryInLocalStorage(STORAGE_ENTRY, getCurrentChannelName());
            savedNamesWrapper[0].children.length > 0 && savedNamesWrapper.empty();
            $resetSelections.css("display", "none");
            canShuffleBtnRender($startShuffling);
            fetchNamesToggle[0].checked = false;
        });

        $modal.find("input#name").on('keypress', function (event) {
            if (event.keyCode === 13) {
                addNameBtn[0].click();
            }
        });

        fetchNamesToggle.on('click', function () {
            if (this.checked) {
                fetchCurrentUsers().then(data => {
                    data.forEach(function (item) {
                        save(STORAGE_ENTRY, getCurrentChannelName(), item.first_name);
                    });
                    renderer(savedNamesWrapper, STORAGE_ENTRY, getCurrentChannelName());
                    showResetButton($resetSelections);
                    canShuffleBtnRender($startShuffling);
                });
            }
        });

        activeEditModeToggle.on('click', function () {
            if (this.checked) {
                savedNamesWrapper[0].setAttribute("contenteditable", true);
                $body.find("#post_textbox")[0].setAttribute("disabled", true);
                editModeBackground.addClass("is-displayed").removeClass("is-hidden");
                finishEditMode.addClass("is-displayed").removeClass("is-hidden");
            } else {
                savedNamesWrapper[0].removeAttribute("contenteditable");
                $body.find("#post_textbox")[0].removeAttribute("disabled");
                editModeBackground.addClass("is-hidden").removeClass("is-displayed");
                finishEditMode.addClass("is-hidden").removeClass("is-displayed");
            }
        });

        finishEditMode.on('click', function () {
            activeEditModeToggle[0].checked = false;
            editModeBackground.addClass("is-hidden").removeClass("is-displayed");
            savedNamesWrapper[0].removeAttribute("contenteditable");
            $body.find("#post_textbox")[0].removeAttribute("disabled");
            
            // save changes into Storage
            let listItems = savedNamesWrapper[0].children;
            resetSpecificEntryInLocalStorage(STORAGE_ENTRY, getCurrentChannelName());
            for(const item of listItems) {
                save(STORAGE_ENTRY, getCurrentChannelName(), item.innerText);
            }

            finishEditMode.addClass("is-hidden").removeClass("is-displayed");
        });
    }

    // Entry point.
    tryToInitHeaderToolbar();
});
