const openMenu = document.getElementById("openMenu");
const closeMenu = document.getElementById("closeMenu");
const menuOverlay = document.getElementById("menuOverlay");

const modalOverlay = document.getElementById("modalOverlay");
const modalClose = document.getElementById("modalClose");
const modalContent = document.getElementById("modalContent");

const lightModeBtn = document.getElementById("lightModeBtn");
const darkModeBtn = document.getElementById("darkModeBtn");

const roomViewBtn = document.getElementById("roomViewBtn");
const tileViewBtn = document.getElementById("tileViewBtn");

const roomView = document.getElementById("roomView");
const tileView = document.getElementById("tileView");

const muteToggle = document.getElementById("muteToggle");

const interactiveGuide = document.getElementById("interactiveGuide");
const guideText = document.getElementById("guideText");
const guideBox = document.getElementById("interactiveGuideBox");

const roomHitboxArea = document.getElementById("roomHitboxArea");

let isMuted = false;

/* guide state */
const guideMessages = [
    "This room is interactive ✦ feel free to explore",
    "Don't want to click around? Change the view in the menu"
];

let guideStep = 0;
let guideSequenceTimeout = null;
let guideFadeTimeout = null;
let guideSwapTimeout = null;

/* menu */

if (openMenu && menuOverlay)
{
    openMenu.addEventListener("click", () =>
    {
        menuOverlay.classList.remove("hidden");
        hideInteractiveGuide();
    });
}

if (closeMenu && menuOverlay)
{
    closeMenu.addEventListener("click", () =>
    {
        menuOverlay.classList.add("hidden");
    });
}

if (menuOverlay)
{
    menuOverlay.addEventListener("click", (event) =>
    {
        if (event.target === menuOverlay)
        {
            menuOverlay.classList.add("hidden");
        }
    });
}

/* modal */

function openModal(modalName)
{
    const section = document.getElementById(`${modalName}-content`);

    if (!section || !modalContent || !modalOverlay)
    {
        return;
    }

    modalContent.innerHTML = section.innerHTML;
    modalOverlay.classList.remove("hidden");

    if (menuOverlay)
    {
        menuOverlay.classList.add("hidden");
    }

    hideInteractiveGuide();

    if (modalName === "plants")
    {
        setupPlantAnimation();
    }

    if (modalName === "photos")
    {
        setupPhotoGallery();
    }
}

function closeModal()
{
    if (modalOverlay)
    {
        modalOverlay.classList.add("hidden");
    }
}

document.querySelectorAll("[data-modal]").forEach((button) =>
{
    button.addEventListener("click", () =>
    {
        openModal(button.dataset.modal);
    });
});

if (modalClose)
{
    modalClose.addEventListener("click", closeModal);
}

if (modalOverlay)
{
    modalOverlay.addEventListener("click", (event) =>
    {
        if (event.target === modalOverlay)
        {
            closeModal();
        }
    });
}

/* themes */

function setLightMode()
{
    document.body.classList.remove("theme-dark");
    document.body.classList.add("theme-light");

    if (lightModeBtn) lightModeBtn.classList.add("active-toggle");
    if (darkModeBtn) darkModeBtn.classList.remove("active-toggle");
}

function setDarkMode()
{
    document.body.classList.remove("theme-light");
    document.body.classList.add("theme-dark");

    if (darkModeBtn) darkModeBtn.classList.add("active-toggle");
    if (lightModeBtn) lightModeBtn.classList.remove("active-toggle");
}

if (lightModeBtn)
{
    lightModeBtn.addEventListener("click", setLightMode);
}

if (darkModeBtn)
{
    darkModeBtn.addEventListener("click", setDarkMode);
}

/* guide */

function clearGuideTimers()
{
    clearTimeout(guideSequenceTimeout);
    clearTimeout(guideFadeTimeout);
    clearTimeout(guideSwapTimeout);
}

function hideInteractiveGuide()
{
    if (!interactiveGuide || !guideBox)
    {
        return;
    }

    clearGuideTimers();
    guideBox.classList.remove("fade-swap");
    interactiveGuide.classList.add("hidden-guide");
}

function setGuideMessage(message)
{
    if (!guideText || !guideBox)
    {
        return;
    }

    guideBox.classList.add("fade-swap");

    guideSwapTimeout = setTimeout(() =>
    {
        guideText.textContent = message;
        guideBox.classList.remove("fade-swap");
    }, 180);
}

function advanceGuide()
{
    if (!interactiveGuide || interactiveGuide.classList.contains("hidden-guide"))
    {
        return;
    }

    guideStep += 1;

    if (guideStep >= guideMessages.length)
    {
        hideInteractiveGuide();
        return;
    }

    setGuideMessage(guideMessages[guideStep]);

    guideSequenceTimeout = setTimeout(() =>
    {
        advanceGuide();
    }, 2600);
}

function startInteractiveGuide()
{
    if (!interactiveGuide || !guideText || !guideBox)
    {
        return;
    }

    clearGuideTimers();

    guideStep = 0;
    guideText.textContent = guideMessages[0];
    guideBox.classList.remove("fade-swap");
    interactiveGuide.classList.remove("hidden-guide");

    guideSequenceTimeout = setTimeout(() =>
    {
        advanceGuide();
    }, 2600);

    guideFadeTimeout = setTimeout(() =>
    {
        hideInteractiveGuide();
    }, 5600);
}

/* switching views */

function showRoomView()
{
    if (roomView) roomView.classList.add("active-view-panel");
    if (tileView) tileView.classList.remove("active-view-panel");

    if (roomViewBtn) roomViewBtn.classList.add("active-toggle");
    if (tileViewBtn) tileViewBtn.classList.remove("active-toggle");

    startInteractiveGuide();
}

function showTileView()
{
    if (tileView) tileView.classList.add("active-view-panel");
    if (roomView) roomView.classList.remove("active-view-panel");

    if (tileViewBtn) tileViewBtn.classList.add("active-toggle");
    if (roomViewBtn) roomViewBtn.classList.remove("active-toggle");

    hideInteractiveGuide();
}

if (roomViewBtn)
{
    roomViewBtn.addEventListener("click", showRoomView);
}

if (tileViewBtn)
{
    tileViewBtn.addEventListener("click", showTileView);
}

/* mute */

if (muteToggle)
{
    muteToggle.addEventListener("click", () =>
    {
        isMuted = !isMuted;
        muteToggle.textContent = isMuted ? "🔇" : "🔊";
    });
}

/* global clicks */

document.addEventListener("click", (event) =>
{
    const clickedInsideGuide = interactiveGuide && interactiveGuide.contains(event.target);

    if (clickedInsideGuide)
    {
        clearGuideTimers();
        advanceGuide();
        return;
    }

    if (
        event.target.closest(".room-object") ||
        event.target.closest(".tile-button") ||
        event.target.closest("#openMenu") ||
        event.target.closest(".nav-btn") ||
        event.target.closest(".view-toggle") ||
        event.target.closest(".mini-toggle")
    )
    {
        hideInteractiveGuide();
    }
});

/* esc */

document.addEventListener("keydown", (event) =>
{
    if (event.key === "Escape")
    {
        closeModal();

        if (menuOverlay)
        {
            menuOverlay.classList.add("hidden");
        }

        hideInteractiveGuide();
    }
});

/* plant animation */

function setupPlantAnimation()
{
    const waterBtn = document.getElementById("waterPlantBtn");
    const waterCan = document.getElementById("waterCan");
    const plantSmall = document.getElementById("plantSmall");
    const plantGrown = document.getElementById("plantGrown");

    if (!waterBtn || !waterCan || !plantSmall || !plantGrown)
    {
        return;
    }

    if (waterBtn.dataset.bound === "true")
    {
        return;
    }

    let plantIsGrown = false;

    waterBtn.addEventListener("click", () =>
    {
        if (!plantIsGrown)
        {
            waterCan.classList.add("show");

            setTimeout(() =>
            {
                waterCan.classList.add("pour");
            }, 100);

            setTimeout(() =>
            {
                plantSmall.classList.add("hidden-plant");
                plantGrown.classList.remove("hidden-plant");
                plantIsGrown = true;
                waterBtn.textContent = "Reset plant";
            }, 900);

            setTimeout(() =>
            {
                waterCan.classList.remove("pour");
            }, 1400);

            setTimeout(() =>
            {
                waterCan.classList.remove("show");
            }, 1900);
        }
        else
        {
            plantGrown.classList.add("hidden-plant");
            plantSmall.classList.remove("hidden-plant");
            plantIsGrown = false;
            waterBtn.textContent = "Water plant";
        }
    });

    waterBtn.dataset.bound = "true";
}

/* photos */

function setupPhotoGallery()
{
    const thumbs = document.querySelectorAll(".photo-thumb-btn");

    if (!thumbs.length)
    {
        return;
    }

    thumbs.forEach((thumb) =>
    {
        if (thumb.dataset.bound === "true")
        {
            return;
        }

        thumb.addEventListener("click", () =>
        {
            const img = thumb.querySelector("img");

            if (img)
            {
                window.open(img.src, "_blank");
            }
        });

        thumb.dataset.bound = "true";
    });
}

/* room info */

async function loadRoomData()
{
    if (!roomHitboxArea)
    {
        return;
    }

    try
    {
        const response = await fetch("./room-data.json");

        if (!response.ok)
        {
            throw new Error("Could not load room-data.json");
        }

        const items = await response.json();
        renderRoomObjects(items);
    }
    catch (error)
    {
        console.error(error);
    }
}

function renderRoomObjects(items)
{
    if (!roomHitboxArea)
    {
        return;
    }

    roomHitboxArea.innerHTML = "";

    items.forEach((item) =>
    {
        const button = document.createElement("button");
        button.className = "room-object";
        button.type = "button";

        if (item.left) button.style.left = item.left;
        if (item.right) button.style.right = item.right;
        if (item.top) button.style.top = item.top;
        if (item.bottom) button.style.bottom = item.bottom;
        if (item.width) button.style.width = item.width;
        if (item.height) button.style.height = item.height;

        if (item.label && item.action !== "pet" && item.id !== "lamp" && item.id !== "window" && item.id !== "plants")
        {
            const pill = document.createElement("span");
            pill.className = "object-pill";
            pill.textContent = item.label;
            button.appendChild(pill);
        }

        if (item.action === "modal")
        {
            button.addEventListener("click", () =>
            {
                openModal(item.target);
            });
        }

        if (item.action === "link")
        {
            button.addEventListener("click", () =>
            {
                window.location.href = item.target;
            });
        }

        if (item.action === "toggle-lamp")
        {
            button.addEventListener("click", toggleLamp);
        }

        if (item.action === "toggle-window")
        {
            button.addEventListener("click", toggleWindow);
        }

        if (item.action === "pet")
        {
            const bubble = document.createElement("span");
            bubble.className = "dog-bubble";
            button.appendChild(bubble);

            let currentMessage = -1;

            button.addEventListener("click", () =>
            {
                if (!Array.isArray(item.messages) || item.messages.length === 0)
                {
                    return;
                }

                currentMessage = (currentMessage + 1) % item.messages.length;
                bubble.textContent = item.messages[currentMessage];

                bubble.classList.remove("show");
                void bubble.offsetWidth;
                bubble.classList.add("show");

                clearTimeout(button._bubbleTimer);
                button._bubbleTimer = setTimeout(() =>
                {
                    bubble.classList.remove("show");
                }, 2200);
            });
        }

        roomHitboxArea.appendChild(button);
    });
}

function toggleLamp()
{
    const lampOff = document.getElementById("lampOff");
    const darkOverlay = document.getElementById("darkOverlay");

    if (lampOff) lampOff.classList.toggle("hidden");
    if (darkOverlay) darkOverlay.classList.toggle("hidden");
}

function toggleWindow()
{
    const windowDay = document.getElementById("windowDay");
    const windowNight = document.getElementById("windowNight");

    if (windowDay) windowDay.classList.toggle("hidden");
    if (windowNight) windowNight.classList.toggle("hidden");
}

/* start */

showRoomView();
loadRoomData();

if (document.body.classList.contains("theme-dark"))
{
    if (darkModeBtn) darkModeBtn.classList.add("active-toggle");
}
else
{
    if (lightModeBtn) lightModeBtn.classList.add("active-toggle");
}