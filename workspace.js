const viewport = document.getElementById("workspaceViewport");
const board = document.getElementById("workspaceBoard");

const modal = document.getElementById("postModal");
const modalContent = document.getElementById("postModalContent");
const modalClose = document.getElementById("postModalClose");

let pieces = [];
let posts = [];

let isPanning = false;
let isDraggingPiece = false;
let activePiece = null;

let startX = 0;
let startY = 0;

let currentX = -180;
let currentY = -120;
let panStartX = 0;
let panStartY = 0;

let pieceStartLeft = 0;
let pieceStartTop = 0;

let moved = false;

function clamp(value, min, max)
{
    return Math.min(Math.max(value, min), max);
}

function updateBoardPosition()
{
    if (window.innerWidth <= 900)
    {
        board.style.transform = "none";
        return;
    }

    const viewportRect = viewport.getBoundingClientRect();
    const maxX = 0;
    const maxY = 0;
    const minX = Math.min(0, viewportRect.width - board.offsetWidth);
    const minY = Math.min(0, viewportRect.height - board.offsetHeight);

    currentX = clamp(currentX, minX, maxX);
    currentY = clamp(currentY, minY, maxY);

    board.style.transform = `translate(${currentX}px, ${currentY}px)`;
}

function bringPieceToFront(piece)
{
    let highest = 1;

    document.querySelectorAll(".scrap-piece").forEach((item) =>
    {
        const z = parseInt(window.getComputedStyle(item).zIndex) || 1;
        if (z > highest)
        {
            highest = z;
        }
    });

    piece.style.zIndex = highest + 1;
}

function buildModalHTML(post)
{
    const paragraphs = post.content
        .map((paragraph) => `<p>${paragraph}</p>`)
        .join("");

    return `
        <h2>${post.title}</h2>
        <p class="post-date">${post.date}</p>
        ${paragraphs}
    `;
}

function createPhotoPiece(post)
{
    const button = document.createElement("button");
    button.className = `scrap-piece photo-piece ${post.template}`;
    button.dataset.postId = post.id;
    button.setAttribute("aria-label", `Open ${post.title}`);

    button.style.left = post.left;
    button.style.top = post.top;
    button.style.width = post.width;
    button.style.transform = `rotate(${post.rotation})`;

    button.innerHTML = `
        <img src="${post.image}" alt="${post.alt}" draggable="false">
        <span class="scrap-label">${post.label}</span>
    `;

    return button;
}

function createNotePiece(post)
{
    const button = document.createElement("button");
    button.className = `scrap-piece note-piece ${post.template}`;
    button.dataset.postId = post.id;
    button.setAttribute("aria-label", `Open ${post.title}`);

    button.style.left = post.left;
    button.style.top = post.top;
    button.style.width = post.width;
    button.style.transform = `rotate(${post.rotation})`;

    button.innerHTML = `
        <div class="note-inner">
            <h3>${post.noteTitle}</h3>
            <p>${post.noteText}</p>
        </div>
    `;

    return button;
}



function renderPosts()
{
    posts.forEach((post) =>
    {
        let piece;

        if (post.type === "photo")
        {
            piece = createPhotoPiece(post);
        }
        else
        {
            piece = createNotePiece(post);
        }

        board.appendChild(piece);
    });

    pieces = Array.from(document.querySelectorAll(".scrap-piece"));
    attachPieceEvents();
}

function attachPieceEvents()
{
    pieces.forEach((piece) =>
    {
        piece.addEventListener("dragstart", (event) =>
        {
            event.preventDefault();
        });

        piece.addEventListener("pointerdown", (event) =>
        {
            if (window.innerWidth <= 900)
            {
                return;
            }

            event.stopPropagation();

            activePiece = piece;
            isDraggingPiece = true;
            moved = false;

            const boardRect = board.getBoundingClientRect();
            const pieceRect = piece.getBoundingClientRect();

            startX = event.clientX;
            startY = event.clientY;

            pieceStartLeft = pieceRect.left - boardRect.left;
            pieceStartTop = pieceRect.top - boardRect.top;

            bringPieceToFront(piece);
            piece.classList.add("dragging-piece");
            piece.setPointerCapture(event.pointerId);
        });

        piece.addEventListener("pointermove", (event) =>
        {
            if (!isDraggingPiece || activePiece !== piece)
            {
                return;
            }

            const dx = event.clientX - startX;
            const dy = event.clientY - startY;

            if (Math.abs(dx) > 4 || Math.abs(dy) > 4)
            {
                moved = true;
            }

            if (!moved)
            {
                return;
            }

            let newLeft = pieceStartLeft + dx;
            let newTop = pieceStartTop + dy;

            const maxLeft = board.offsetWidth - piece.offsetWidth;
            const maxTop = board.offsetHeight - piece.offsetHeight;

            newLeft = clamp(newLeft, 0, maxLeft);
            newTop = clamp(newTop, 0, maxTop);

            piece.style.left = `${newLeft}px`;
            piece.style.top = `${newTop}px`;
        });

        piece.addEventListener("pointerup", (event) =>
        {
            if (activePiece === piece)
            {
                piece.releasePointerCapture(event.pointerId);
                piece.classList.remove("dragging-piece");

                setTimeout(() =>
                {
                    isDraggingPiece = false;
                    activePiece = null;
                }, 0);
            }
        });

        piece.addEventListener("click", (event) =>
        {
            if (moved)
            {
                event.preventDefault();
                event.stopPropagation();
                moved = false;
                return;
            }

            const postId = piece.dataset.postId;
            const post = posts.find((item) => item.id === postId);

            if (post)
            {
                modalContent.innerHTML = buildModalHTML(post);
                modal.classList.remove("hidden");
            }
        });
    });
}

/* board panning */
viewport.addEventListener("pointerdown", (event) =>
{
    if (window.innerWidth <= 900)
    {
        return;
    }

    if (event.target.closest(".scrap-piece"))
    {
        return;
    }

    isPanning = true;
    moved = false;
    startX = event.clientX;
    startY = event.clientY;
    panStartX = currentX;
    panStartY = currentY;

    viewport.classList.add("dragging");
});

window.addEventListener("pointermove", (event) =>
{
    if (!isPanning)
    {
        return;
    }

    const dx = event.clientX - startX;
    const dy = event.clientY - startY;

    if (Math.abs(dx) > 3 || Math.abs(dy) > 3)
    {
        moved = true;
    }

    currentX = panStartX + dx;
    currentY = panStartY + dy;

    updateBoardPosition();
});

window.addEventListener("pointerup", () =>
{
    isPanning = false;
    viewport.classList.remove("dragging");
});

/* modal */
modalClose.addEventListener("click", () =>
{
    modal.classList.add("hidden");
});

modal.addEventListener("click", (event) =>
{
    if (event.target === modal)
    {
        modal.classList.add("hidden");
    }
});

document.addEventListener("keydown", (event) =>
{
    if (event.key === "Escape")
    {
        modal.classList.add("hidden");
    }
});

async function loadWorkspaceData()
{
    try
    {
        const response = await fetch("workspace-data.json");

        if (!response.ok)
        {
            throw new Error("Could not load workspace-data.json");
        }

        posts = await response.json();
        renderPosts();
        updateBoardPosition();
    }
    catch (error)
    {
        console.error(error);
    }
}

window.addEventListener("resize", updateBoardPosition);
window.addEventListener("load", loadWorkspaceData);