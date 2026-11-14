        let play = document.getElementById("play")
        let pause = document.getElementById("pause")
        let fast = document.getElementById("faster")
        let slower = document.getElementById("slower")
        let bigger = document.getElementById("bigger")
        let smaller = document.getElementById("smaller")
        let reset = document.getElementById("reset")

        let yingyang = document.getElementsByClassName("yingyang")[0]

        let states = {
            faster: false,
            slower: false,
            paused: false,
            playing: false,
            bigger: false,
            smaller: false
        };


        let duration = 1;
        let fasterbox = 1;
        let slowerbox = 1;
        let crntsize = 1;

    

        function updateReset() {
            let activeStates = Object.entries(states)
                .filter(x => x[1])
                .map(x => x[0]);

            if (activeStates.length === 0) {
                reset.textContent = "In its original state currently";
                reset.style.backgroundColor = "lightgreen";
                return;
            }

            reset.textContent = "It's " + activeStates.join(" and ");
            reset.style.backgroundColor = "rgb(225,60,60)";
        }

        function buttonshi() {
            if (yingyang.style.animationPlayState == "paused") {
                pause.style.boxShadow = "0px 0px 10px 5px lightgreen";
                play.style.boxShadow = "none";
                pause.textContent = "Paused"
                play.textContent = "Play";
            }

            if (yingyang.style.animationPlayState == "running") {
                play.style.boxShadow = "0px 0px 10px 5px lightgreen";
                pause.style.boxShadow = "none";
                play.textContent = "Playing";
                pause.textContent = "Pause";
            }
        }

        pause.addEventListener("click", () => {
            yingyang.style.animationPlayState = "paused";
            states.paused = true;
            states.playing = false;
            updateReset();
            buttonshi();
        })

        play.addEventListener("click", () => {
            yingyang.style.animationPlayState = "running";
            states.paused = false;
            states.playing = true;
            updateReset();
            buttonshi();
        })



        slower.addEventListener("click", () => {
            let aniduration = yingyang.getAnimations()[0];

            if (aniduration && duration > 0.25) {
                duration = Math.max(0.25, duration - 0.25);
                aniduration.playbackRate = duration;

                slowerbox += 3;
                slower.style.boxShadow =
                    `0px 0px 20px ${slowerbox}px white`;

                fasterbox = Math.max(0, fasterbox - 3);
                faster.style.boxShadow =
                    `0px 0px 20px ${fasterbox}px rgba(0, 0, 0, 0.7)`;
            }

            updateSpeedState();
        });


        faster.addEventListener("click", () => {
            let aniduration = yingyang.getAnimations()[0];

            if (aniduration && duration < 50) {
                duration = Math.min(50, duration + 0.75);
                aniduration.playbackRate = duration;

                fasterbox += 3;
                faster.style.boxShadow =
                    `0px 0px 20px ${fasterbox}px rgba(0, 0, 0, 0.7)`;

                slowerbox = Math.max(0, slowerbox - 3);
                slower.style.boxShadow =
                    `0px 0px 20px ${slowerbox}px white`;
            }

            updateSpeedState();
        });


        function updateSpeedState() {
            if (duration < 1) {
                states.slower = true;
                states.faster = false;
            }
            else if (duration > 1) {
                states.slower = false;
                states.faster = true;
            }
            else {
                states.slower = false;
                states.faster = false;
            }

            updateReset();
        }


        bigger.addEventListener("click", () => {
            if (crntsize < 2.5) {
                crntsize += 0.1;
                yingyang.style.scale = crntsize;
            }
            
            updateSizeState();
        })

        smaller.addEventListener("click", () => {
            if (crntsize > 0.11) {
                crntsize -= 0.1;
                yingyang.style.scale = crntsize;
            }

            updateSizeState();
        })


        function updateSizeState() {
            if (crntsize < 1) {
                states.smaller = true;
                states.bigger = false;
            }
            else if (crntsize > 1) {
                states.smaller = false;
                states.bigger = true;
            }
            else {
                states.smaller = false;
                states.bigger = false;
            }

            updateReset();
        }


        reset.addEventListener("click", () => {
            duration = 1;
            fasterbox = 1;
            slowerbox = 1;
            crntsize = 1;
            yingyang.style.scale = 1;
            states.faster = false;
            states.slower = false;
            states.paused = false;
            states.playing = false;
            states.bigger = false;
            states.smaller = false;

            let aniduration = yingyang.getAnimations()[0];
            if (aniduration) {
                aniduration.playbackRate = 1;
            }

            slower.style.boxShadow = "0px 0px 0px 0px";
            faster.style.boxShadow = "0px 0px 0px 0px";
            pause.style.boxShadow = "0px 0px 0px 0px";
            play.style.boxShadow = "0px 0px 0px 0px";

            yingyang.style.animationPlayState = "running";
            play.textContent = "Playing";
            pause.textContent = "Pause";
            updateReset();
        })