



const computerBtn = document.getElementById("computerBtn");
const easelBtn = document.getElementById("easelBtn");
const photoBtn = document.getElementById("photoBtn");
const boardBtn = document.getElementById("boardBtn");
const skateBtn = document.getElementById("skateBtn");
const booksBtn = document.getElementById("booksBtn");
const sewBtn = document.getElementById("sewBtn");
const plantBtn = document.getElementById("plantBtn");

computerBtn.addEventListener("click", () =>
{
    document.getElementById("projects").scrollIntoView({ behavior: "smooth" });
});

easelBtn.addEventListener("click", () =>
{
    document.getElementById("art").scrollIntoView({ behavior: "smooth" });
});

photoBtn.addEventListener("click", () =>
{
    document.getElementById("photos").scrollIntoView({ behavior: "smooth" });
});

boardBtn.addEventListener("click", () =>
{
    document.getElementById("about").scrollIntoView({ behavior: "smooth" });
});

skateBtn.addEventListener("click", () =>
{
    document.getElementById("hobbies").scrollIntoView({ behavior: "smooth" });
});

booksBtn.addEventListener("click", () =>
{
    document.getElementById("blog").scrollIntoView({ behavior: "smooth" });
});

sewBtn.addEventListener("click", () =>
{
    document.getElementById("hobbies").scrollIntoView({ behavior: "smooth" });
});

plantBtn.addEventListener("click", () =>
{
    document.getElementById("plants").scrollIntoView({ behavior: "smooth" });
});







const modalData = {
    about: {
        title: "About Me",
        content: `
            <p>Hi, I’m Judy Henry, though I usually go by Jaye in creative spaces.</p>

            <p>I’m currently studying Cyber Criminology at Florida State University, a program that blends both computer science and criminology.</p>

            <p>Most of my work right now is focused on front-end development and UX/UI design. I like building things that are useful, visually interesting, and interactive.</p>

            <p>A lot of the visuals on this site were drawn by hand by me, because I love mixing art with technology.</p>
        `
    },

    projects: {
        title: "Projects",
        content: `
        <h3>Jayetech.dev – Personal Portfolio Website</h3>
        <p>This website is my first full project built with HTML, CSS, and JavaScript. I designed and illustrated the visual assets myself, which made the process especially fun since it allowed me to combine art and development in one project.</p>
        <p>Because I had previously used HTML when building small pages for cybersecurity assignments, the structure felt familiar, and it was a great starting point for learning more about CSS layout and interactive elements with JavaScript. This project helped me better understand how front-end technologies work together to create a functional and personalized website.</p>
        <p><a href="https://github.com/jayetech-dev/jayetech.dev" target="_blank">Github</a></p>

        <h3>GameStation</h3>
        <p>This is a Flutter app I built that includes Tic-Tac-Toe and Minesweeper. I created the project while learning Flutter and Dart, and it became a fun way to combine UI development with algorithmic problem solving. The Minesweeper implementation uses <strong>Breadth-First Search (BFS)</strong> and <strong>Queues</strong> to reveal tiles correctly. Building this app made me realize how much I enjoy learning new frameworks and experimenting with mobile development.</p>
        <p><a href="https://github.com/jayetech-dev/gamestation" target="_blank">Github</a></p>

        <h3>In progress</h3>
            <ul>
                <li>Website - A typewriter-style writing prompt generator</li>
                <li>Website - A virtual museum website using Blender and web technologies</li>
                <li>Website - UI Focused Creative website concepts (bakery & children's book themed projects)</li>
                <li>Flutter App - ideas still being planned</li>
            </ul>
            <p></p>
        `
    },

    hobbies: {
        title: "Hobbies",
        content: `
            <ul>
                <li>Yoga</li>
                <li>Ice skating</li>
                <li>Sewing</li>
                <li>Crocheting</li>
                <li>Painting</li>
                <li>Digital illustration</li>
                <li>Going for a walk with my dog</li>
                <li>Switch games/li>
            </ul>
            
            <p>A lot of these hobbies shaped the way I think about creativity and design.</p>
        `
    },

skills: {
    title: "Skills and Education",
    content: `

    <div class="skills-columns">

    <div class="skills-block">
    <h4>Skills</h4>
        <ul class="skill-tags">
            <li>HTML</li>
            <li>CSS</li>
            <li>JavaScript</li>
            <li>C++</li>
            <li>Python</li>
            <li>C#</li>
            <li>Flutter / Dart</li>
            <li>Java</li>
            <li>Rasberry PI</li>
        </ul>
    </div>

    <div class="skills-block">
        <h4>Areas of Focus</h4>
        <ul class="skill-tags">
            <li>Front End Development</li>
            <li>UX/UI Design</li>
            <li>Full Stack Developement</li>
            <li>Cyber Security</li>
        </ul>
    </div>
    
    <div class="skills-block">
    <h4>Computer Science</h4>
        <ul>
            <li>Introduction to programming in UNIX</li>
            <li>Data Structures & Algorithms I & II</li>
            <li>Computer Organization I</li>
            <li>Operating Systems</li>
            <li>Full Application Developement in C#</li>
            <li>Advanced Programming in Java</li>

        </ul>
    </div>

    <div class="skills-block">
    <h4>Cyber Security</h4>
    <ul>
        <li>Computer Security Fundamentals</li>
        <li>Offensive Computer Security</li>
        <li>Cybercrime Forensics</li>
        <li>Computer & Network System Administration</li>

    </ul>
    </div>

    <div class="skills-block">
    <h4>Criminal Justice</h4>
    <ul>
        <li>Criminal Justice</li>
        <li>Criminology</li>
        <li>Cybercrime Detection & Forensics</li>
        <li>Criminal Justice Systems Responses to Cybercrime</li>
        <li>Juvenile Justice</li>
        <li>Victimology</li>
        <li>White Collar Crime</li>
        <li>Research Methods in Criminology</li>
    </ul>
    </div>

    <div class="skills-block">

    <h4>Math Background</h4>
    <ul>
        <li>Discrete Math I & II</li>
        <li>Calculus I & II</li>
        <li>Applied Statistics for Engineers</li>
    </ul>

    </div>

    <h4>Activites</h4>
    <ul>
        <li>ACM [Association for Computing Machinery] Social Chair | FSU Chapter</li>
        <li>Fall and Spring Coding Compeititions | FSU</li>
        <li>Mutiple CyberSecurity CTF Competitions | FSU</li>
    </ul>

    </div>

</div>

`
},
    art: {
        title: "Latest art",
        content: `
        <div class="art-slider">

            <img src="assets/images/photos/art1.png">
        `
    },

    photos: {
        title: "Photos",
        content: `
        <div class="photo-slider">

            <img src="assets/images/photos/photo1.jpeg">
            <img src="assets/images/photos/photo2.jpeg">
            <img src="assets/images/photos/photo3.jpeg">

        </div>
        `
    },

    plants: {
    title: "Oh no, I forgot to water my plant, can you help me!?!?",
    content: `
        <div class="plant-scene">
            
            <img src="assets/images/art-plant-small.png" class="plant-img plant-small" id="plantSmall">
            <img src="assets/images/art-plant.png" class="plant-img plant-grown hidden-plant" id="plantGrown">
            <img src="assets/images/art-watercan.png" class="water-can" id="waterCan">
            <button class="plant-water-btn" id="waterPlantBtn">Water plant</button>
        </div>
    `
},

    contact: {
        title: "Contact",
        content: `
            <p>If you're interested in collaborating, hiring me for a freelance project, or discussing an idea, feel free to reach out!</p>
            <p><a href="https://www.linkedin.com/in/judyhenry/" target="_blank">LinkedIn</a></p>
            <p><a href="https://github.com/Jayetech-dev/" target="_blank">Github</a></p>
            <p><a href="mailto:judypat99@gmail.com">Email Me</a>
        `
    },

    blog: {
        title: "Blog",
        content: `
            <p> ~No posts yet... check back in a couple days!~</p>
        `
    }
};





const modal = document.getElementById("mainModal");
const modalTitle = document.getElementById("modalTitle");
const modalContent = document.getElementById("modalContent");
const closeModalBtn = document.getElementById("closeModalBtn");

function openModal(key)
{
    const entry = modalData[key];
    if (!entry) return;

    modalTitle.textContent = entry.title;
    modalContent.innerHTML = entry.content;
    modal.classList.remove("hidden");

    if (key === "plants")
    {
        setupPlantAnimation();
    }
}
document.querySelectorAll(".nav-btn").forEach((btn) =>
{
    btn.addEventListener("click", () =>
    {
        const section = document.getElementById("explore");

        section.scrollIntoView({
            behavior: "smooth"
        });

        setTimeout(() =>
        {
            openModal(btn.dataset.modal);
        }, 600);
    });
});
function closeModal()
{
    modal.classList.add("hidden");
}

closeModalBtn.addEventListener("click", closeModal);

modal.addEventListener("click", (event) =>
{
    if (event.target === modal)
    {
        closeModal();
    }
});


document.querySelectorAll(".tile-button").forEach((tile) =>
{
    tile.addEventListener("click", () =>
    {
        openModal(tile.dataset.modal);
    });
});


computerBtn.addEventListener("click", () => openModal("projects"));
easelBtn.addEventListener("click", () => openModal("art"));
photoBtn.addEventListener("click", () => openModal("photos"));
boardBtn.addEventListener("click", () => openModal("about"));
skateBtn.addEventListener("click", () => openModal("hobbies"));
booksBtn.addEventListener("click", () => openModal("skills"));
sewBtn.addEventListener("click", () => openModal("hobbies"));
plantBtn.addEventListener("click", () => openModal("plants"));




function setupPlantAnimation()
{
    const waterBtn = document.getElementById("waterPlantBtn");
    const waterCan = document.getElementById("waterCan");
    const plantSmall = document.getElementById("plantSmall");
    const plantGrown = document.getElementById("plantGrown");

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
}


