var timeout;

const scroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
});

// mouse move hone par circle skew krna hai and define min and max skew,
// value of skew should be proportional to the speed of movement of mouse
// after the mouse is stopped, skew should be removed



// function imgAnim() {
// query selector selects only one element, that's why we use querySelectorAll to return a NodeList
document.querySelectorAll(".elem").forEach(function (elem) {
    var rotate = 0;
    var diffrot = 0;

    elem.addEventListener("mouseleave", function (dets) {
        gsap.to(elem.querySelector("img"), {
            opacity: 0,
            ease: Power3,
            duration: 0.5,
        });
    });

    elem.addEventListener("mousemove", function (dets) {
        var diff = dets.clientY - elem.getBoundingClientRect().top;
        diffrot = dets.clientX - rotate;
        rotate = dets.clientX;
        gsap.to(elem.querySelector("img"), {
            opacity: 1,
            ease: Power3,
            top: diff,
            left: dets.clientX,
            rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),
        });
    });
});
// }

// imgAnim();

function curveCircle() {
    // define default scale value
    var xscale = 1;
    var yscale = 1;

    var xprev = 0;
    var yprev = 0;

    window.addEventListener("mousemove", function (dets) {
        // to prevent proper circle while mouse is moving
        clearTimeout(timeout);

        xscale = gsap.utils.clamp(0.7, 1.3, Math.abs(dets.clientX - xprev));
        yscale = gsap.utils.clamp(0.7, 1.3, Math.abs(dets.clientY - yprev));

        xprev = dets.clientX;
        yprev = dets.clientY;

        circleMouseFollower(xscale, yscale);

        // this is written to bring back proper circle when mouse is stopped
        timeout = setTimeout(function () {
            document.querySelector(
                "#mini-circle"
            ).style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1)`;
        }, 100);
    });
}

curveCircle();

function firstPageAnim() {
    var tl = gsap.timeline();

    tl.from("#nav", {
        y: "-10",
        opacity: 0,
        duration: 1.5,
        ease: Expo.easeInOut,
    })

        .to(".bounding-elem", {
            y: 0,
            ease: Expo.easeInOut,
            duration: 2,
            stagger: 0.2,
            delay: -1,
        })

        .from("#hero-footer", {
            y: -10,
            opacity: 0,
            ease: Expo.easeInOut,
            duration: 1.5,
            delay: -1,
        });
}

firstPageAnim();

function circleMouseFollower(xscale, yscale) {
    window.addEventListener("mousemove", function (dets) {
        document.querySelector(
            "#mini-circle"
        ).style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;
    });
}

circleMouseFollower();
