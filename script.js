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
let guideStep = 1;

let guideStepTimer1 = null;
let guideStepTimer2 = null;
let guideStepTimer3 = null;
let guideSwapTimer = null;

/*  menu  */

openMenu.addEventListener("click", () =>
{
    menuOverlay.classList.remove("hidden");
});

closeMenu.addEventListener("click", () =>
{
    menuOverlay.classList.add("hidden");
});

menuOverlay.addEventListener("click", (event) =>
{
    if (event.target === menuOverlay)
    {
        menuOverlay.classList.add("hidden");
    }
});

/*modal  */

function openModal(modalName)
{
    const section = document.getElementById(`${modalName}-content`);

    if (!section)
    {
        return;
    }

    modalContent.innerHTML = section.innerHTML;
    modalOverlay.classList.remove("hidden");
    menuOverlay.classList.add("hidden");
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
    modalOverlay.classList.add("hidden");
}

document.querySelectorAll("[data-modal]").forEach((button) =>
{
    button.addEventListener("click", () =>
    {
        openModal(button.dataset.modal);
    });
});

modalClose.addEventListener("click", closeModal);

modalOverlay.addEventListener("click", (event) =>
{
    if (event.target === modalOverlay)
    {
        closeModal();
    }
});

/* themessssss  */

function setLightMode()
{
    document.body.classList.remove("theme-dark");
    document.body.classList.add("theme-light");

    lightModeBtn.classList.add("active-toggle");
    darkModeBtn.classList.remove("active-toggle");
}

function setDarkMode()
{
    document.body.classList.remove("theme-light");
    document.body.classList.add("theme-dark");

    darkModeBtn.classList.add("active-toggle");
    lightModeBtn.classList.remove("active-toggle");
}

lightModeBtn.addEventListener("click", setLightMode);
darkModeBtn.addEventListener("click", setDarkMode);

/* switching views */

function showRoomView()
{
    roomView.classList.add("active-view-panel");
    tileView.classList.remove("active-view-panel");

    roomViewBtn.classList.add("active-toggle");
    tileViewBtn.classList.remove("active-toggle");

    startInteractiveGuide();
}

function showTileView()
{
    tileView.classList.add("active-view-panel");
    roomView.classList.remove("active-view-panel");

    tileViewBtn.classList.add("active-toggle");
    roomViewBtn.classList.remove("active-toggle");

    hideInteractiveGuide();
}

roomViewBtn.addEventListener("click", showRoomView);
tileViewBtn.addEventListener("click", showTileView);

/* mute */

muteToggle.addEventListener("click", () =>
{
    isMuted = !isMuted;
    muteToggle.textContent = isMuted ? "🔇" : "🔊";
});

/* esc */

document.addEventListener("keydown", (event) =>
{
    if (event.key === "Escape")
    {
        closeModal();
        menuOverlay.classList.add("hidden");
        hideInteractiveGuide();
    }
});

/*guide */

function clearGuideTimers()
{
    clearTimeout(guideStepTimer1);
    clearTimeout(guideStepTimer2);
    clearTimeout(guideStepTimer3);
    clearTimeout(guideSwapTimer);
}

function hideInteractiveGuide()
{
    if (!interactiveGuide)
    {
        return;
    }

    clearGuideTimers();
    interactiveGuide.classList.add("hidden-guide");
}

function swapGuideToStepTwo()
{
    if (!interactiveGuide || !guideText || !guideBox)
    {
        return;
    }

    clearTimeout(guideStepTimer1);
    clearTimeout(guideStepTimer2);

    guideStep = 2;
    guideBox.classList.add("fade-swap");

    guideSwapTimer = setTimeout(() =>
    {
        guideText.textContent = "↗ Prefer a simpler view? Use the top-right menu to switch modes";
        guideBox.classList.remove("fade-swap");
    }, 250);

    guideStepTimer3 = setTimeout(() =>
    {
        hideInteractiveGuide();
    }, 2600);
}

function startInteractiveGuide()
{
    if (!interactiveGuide || !guideText || !guideBox)
    {
        return;
    }

    clearGuideTimers();

    guideStep = 1;
    interactiveGuide.classList.remove("hidden-guide");
    guideBox.classList.remove("fade-swap");
    guideText.textContent = "Hover to explore ✦ Click to open";

    guideStepTimer1 = setTimeout(() =>
    {
        swapGuideToStepTwo();
    }, 2600);
}

/* click behaviors view */

document.addEventListener("click", (event) =>
{
    const clickedInsideGuide = interactiveGuide && interactiveGuide.contains(event.target);

    if (clickedInsideGuide)
    {
        if (guideStep === 1)
        {
            swapGuideToStepTwo();
        }
        else
        {
            hideInteractiveGuide();
        }

        return;
    }

    if (
        event.target.closest(".room-object") ||
        event.target.closest(".tile-button") ||
        event.target.closest("#openMenu") ||
        event.target.closest(".nav-btn")
    )
    {
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

/* photossss */

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

        if (item.label && item.action !== "pet" && item.id !== "lamp" && item.id !== "window" && item.id !=="plants")
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
            bubble.className = item.bubbleType === "dog" ? "dog-bubble" : "dog-bubble";
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

/* starttt */

showRoomView();
loadRoomData();

if (document.body.classList.contains("theme-dark"))
{
    darkModeBtn.classList.add("active-toggle");
}
else
{
    lightModeBtn.classList.add("active-toggle");
}