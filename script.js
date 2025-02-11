var wheel = $("#wheel");

        var border = parseInt(wheel.css("border-width"));
        // var radius = Math.min(window.innerWidth, window.innerHeight) * 0.7 / 2;
        var radius = 250;
        var center = radius - border / 2;
        var total = 22;
        var slice = 1 * Math.PI / total;


        TweenLite.set(wheel, {
            width: (radius * 2) - border,
            height: (radius * 2) - border,
            xPercent: -50,
            yPercent: -50
        });


        for (var i = 0; i < total; i++) {
            createBox(i);
        }

        Draggable.create(wheel, {
            type: "rotation",
            throwProps: true,
            inertia: true,
            bounds: { minRotation: -90, maxRotation: 90 },
            onClick: function (e) {
                var num = e.target.dataset.num;
                if (num) { console.log("Clicked Box " + num); }
            },
            onThrowUpdate: function () {
                $('#object').text(this)
                console.log(this)
            },
            liveSnap: liveSnap

        });

        function liveSnap(value) {

            const offset = value * -1;



            // console.log(offset);

            const percentage = ((offset + 90) / 180);


            // console.log(percentage)

            if (value > -85 && value < 85) {
                boxTimeline.totalProgress(percentage);
                boxTimeline2.totalProgress(percentage);
            }

            $('#value').text(percentage)
            return value;
        }

        function createBox(i) {

            var num = i + 1;
            var hue = i / total * 360;
            var angle = i * slice - 1.5;

            var x = center + radius * Math.sin(angle);
            var y = center - radius * Math.cos(angle);

            var box = $("<div class='box box-" + i + "' />").attr("data-num", num).appendTo(wheel);
            var internalBox = $("<div class='internalBox' />").text(num).appendTo(box);

            TweenLite.set(box, {
                rotation: angle + "_rad",
                xPercent: -50,
                yPercent: -50,
                x: x,
                y: y
            });

            TweenLite.set(internalBox, {
                backgroundColor: "hsl(" + hue + ",100%,50%)",
            });

        }

        const generateTimeline = () => {

            const boxes = document.querySelectorAll('.box .internalBox');

            // console.log(boxes);

            const boxTimeline = gsap.timeline({ paused: true });

            [...boxes].map((box) => {
                // console.log(box);

                boxTimeline.to(box, { duration: 0.3, yPercent: -40, ease: 'expo.out' }, '-=0.16');
                boxTimeline.to(box, { duration: 0.3, yPercent: 0, ease: 'expo.in' }, '-=0');
            })

            boxTimeline.totalProgress(0.5);
            // boxTimeline2.totalProgress(0.5);
            return boxTimeline;

        }

        var boxTimeline = generateTimeline();
        // boxTimeline.play();

        const generateTimelineSmallBox = () => {

            const boxes = document.querySelectorAll('.smallBox');

            // console.log(boxes);

            const boxTimeline = gsap.timeline({ paused: true });

            [...boxes].map((box) => {
                // console.log(box);

                boxTimeline.to(box, { duration: 0.3, yPercent: -70, ease: 'expo.out' }, '-=0.16');
                boxTimeline.to(box, { duration: 0.3, yPercent: 0, ease: 'expo.in' }, '-=0');
            })

            return boxTimeline;

        }

        var boxTimeline2 = generateTimelineSmallBox();