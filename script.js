/* =====================================================
   ELEMENTS
===================================================== */

const startScreen =
    document.getElementById("startScreen");

const startButton =
    document.getElementById("startButton");

const mainContent =
    document.getElementById("mainContent");

const music =
    document.getElementById("birthdayMusic");


/* =====================================================
   MUSIC
===================================================== */

music.volume = 0.30;


/* =====================================================
   START BUTTON
===================================================== */

startButton.addEventListener(
    "click",
    function () {

        /*
         * İstifadəçi düyməyə basdığı üçün
         * musiqi brauzer tərəfindən bloklanmır.
         */

        music.play().catch(
            function (error) {

                console.log(
                    "Musiqi başlatmaq mümkün olmadı:",
                    error
                );

            }
        );


        startScreen.classList.add(
            "hide"
        );


        mainContent.classList.add(
            "visible"
        );


        createBurst();


        setTimeout(
            function () {

                startScreen.style.display =
                    "none";

            },
            1400
        );

    }
);



/* =====================================================
   MOVING STARS
===================================================== */

const canvas =
    document.getElementById("stars");

const ctx =
    canvas.getContext("2d");


let particles = [];


function resizeCanvas() {

    canvas.width =
        window.innerWidth;

    canvas.height =
        window.innerHeight;

}


resizeCanvas();


window.addEventListener(
    "resize",
    resizeCanvas
);



class Star {

    constructor() {

        this.x =
            Math.random() *
            canvas.width;

        this.y =
            Math.random() *
            canvas.height;

        this.size =
            Math.random() *
            1.5 + .2;

        this.speed =
            Math.random() *
            .25 + .05;

        this.opacity =
            Math.random();

        this.direction =
            Math.random() > .5
                ? 1
                : -1;

    }


    update() {

        this.y -=
            this.speed;


        this.opacity +=
            this.direction * .004;


        if (this.opacity >= 1) {

            this.opacity = 1;

            this.direction = -1;

        }


        if (this.opacity <= .05) {

            this.opacity = .05;

            this.direction = 1;

        }


        if (this.y < -10) {

            this.y =
                canvas.height + 10;

        }

    }


    draw() {

        ctx.beginPath();

        ctx.arc(
            this.x,
            this.y,
            this.size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            `rgba(
                255,
                255,
                255,
                ${this.opacity}
            )`;

        ctx.shadowBlur = 10;

        ctx.shadowColor =
            "rgba(255,255,255,.7)";

        ctx.fill();

    }

}



for (
    let i = 0;
    i < 150;
    i++
) {

    particles.push(
        new Star()
    );

}



function animateStars() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    particles.forEach(
        function (star) {

            star.update();

            star.draw();

        }
    );


    requestAnimationFrame(
        animateStars
    );

}


animateStars();



/* =====================================================
   START PARTICLE BURST
===================================================== */

function createBurst() {

    for (
        let i = 0;
        i < 50;
        i++
    ) {

        const sparkle =
            document.createElement(
                "div"
            );


        sparkle.textContent =
            Math.random() > .5
                ? "✦"
                : "·";


        sparkle.style.position =
            "fixed";


        sparkle.style.left =
            "50%";


        sparkle.style.top =
            "50%";


        sparkle.style.zIndex =
            "100";


        sparkle.style.pointerEvents =
            "none";


        sparkle.style.color =
            "white";


        sparkle.style.fontSize =
            (
                Math.random() * 12 + 5
            ) + "px";


        document.body.appendChild(
            sparkle
        );


        const angle =
            Math.random() *
            Math.PI *
            2;


        const distance =
            Math.random() *
            400 + 100;


        const x =
            Math.cos(angle) *
            distance;


        const y =
            Math.sin(angle) *
            distance;


        sparkle.animate(
            [

                {
                    transform:
                        "translate(-50%, -50%) scale(0)",

                    opacity: 0

                },

                {

                    transform:
                        `translate(
                            calc(-50% + ${x}px),
                            calc(-50% + ${y}px)
                        ) scale(1)`,

                    opacity: 1

                },

                {

                    transform:
                        `translate(
                            calc(-50% + ${x * 1.4}px),
                            calc(-50% + ${y * 1.4}px)
                        ) scale(0)`,

                    opacity: 0

                }

            ],
            {

                duration:
                    1200 +
                    Math.random() * 1000,

                easing: "ease-out"

            }
        );


        setTimeout(
            function () {

                sparkle.remove();

            },
            2300
        );

    }

}



/* =====================================================
   MEMORY GALAXY
===================================================== */

const memoryStars =
    document.querySelectorAll(
        ".memory-star"
    );


const popup =
    document.getElementById(
        "memoryPopup"
    );


const popupImage =
    document.getElementById(
        "popupImage"
    );


const popupText =
    document.getElementById(
        "popupText"
    );


const closePopup =
    document.getElementById(
        "closePopup"
    );



memoryStars.forEach(
    function (star) {

        star.addEventListener(
            "click",
            function () {

                popupImage.src =
                    star.dataset.image;

                popupText.textContent =
                    star.dataset.text;


                popup.classList.add(
                    "show"
                );


                createMiniBurst();

            }
        );

    }
);



/* =====================================================
   CLOSE MEMORY
===================================================== */

closePopup.addEventListener(
    "click",
    function () {

        popup.classList.remove(
            "show"
        );

    }
);


popup.addEventListener(
    "click",
    function (event) {

        if (
            event.target === popup
        ) {

            popup.classList.remove(
                "show"
            );

        }

    }
);



/* =====================================================
   MINI BURST
===================================================== */

function createMiniBurst() {

    for (
        let i = 0;
        i < 20;
        i++
    ) {

        const sparkle =
            document.createElement(
                "span"
            );


        sparkle.textContent =
            "✦";


        sparkle.style.position =
            "fixed";


        sparkle.style.left =
            "50%";


        sparkle.style.top =
            "50%";


        sparkle.style.zIndex =
            "1000";


        sparkle.style.color =
            "#ffffff";


        sparkle.style.pointerEvents =
            "none";


        document.body.appendChild(
            sparkle
        );


        const angle =
            Math.random() *
            Math.PI *
            2;


        const distance =
            Math.random() *
            250 + 80;


        const x =
            Math.cos(angle) *
            distance;


        const y =
            Math.sin(angle) *
            distance;


        sparkle.animate(
            [

                {
                    transform:
                        "translate(-50%,-50%) scale(0)",

                    opacity: 0

                },

                {

                    transform:
                        `translate(
                            calc(-50% + ${x}px),
                            calc(-50% + ${y}px)
                        ) scale(1)`,

                    opacity: 1

                },

                {

                    transform:
                        `translate(
                            calc(-50% + ${x * 1.2}px),
                            calc(-50% + ${y * 1.2}px)
                        ) scale(0)`,

                    opacity: 0

                }

            ],
            {

                duration: 1000,

                easing: "ease-out"

            }
        );


        setTimeout(
            function () {

                sparkle.remove();

            },
            1100
        );

    }

}



/* =====================================================
   MOUSE LIGHT
===================================================== */

document.addEventListener(
    "mousemove",
    function (event) {

        const heroLight =
            document.querySelector(
                ".hero-light"
            );


        if (!heroLight)
            return;


        heroLight.style.left =
            (
                event.clientX - 300
            ) + "px";


        heroLight.style.top =
            (
                event.clientY - 300
            ) + "px";

    }
);
