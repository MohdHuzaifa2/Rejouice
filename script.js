function init() {
    gsap.registerPlugin(ScrollTrigger);
 
 // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll
 
 const locoScroll = new LocomotiveScroll({
   el: document.querySelector("#main"),
   smooth: true,
   smoothMobile: true
 });
 // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
 locoScroll.on("scroll", ScrollTrigger.update);
 
 // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
 ScrollTrigger.scrollerProxy("#main", {
   scrollTop(value) {
     return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
   }, // we don't have to define a scrollLeft because we're only scrolling vertically.
   getBoundingClientRect() {
     return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
   },
   // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
   pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
 });


 
 
// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();
}
init();

function page1Animation() {
    let cursor = document.querySelector(".cursor");

document.querySelector(".page1").addEventListener("mouseenter", (e) => {
    gsap.to(cursor, {
        x: e.pageX+((e.pageX/(innerWidth/2)-1)*100), 
        y: e.pageY+((e.pageY/(innerHeight/2)-1)*80)
    })
    cursor.classList.add("active");
})
document.addEventListener("mousemove", (e) => {
    gsap.to(cursor, {
        x: e.pageX+((e.pageX/(innerWidth/2)-1)*100), 
        y: e.pageY+((e.pageY/(innerHeight/2)-1)*80)
    })
})
}
page1Animation();

function page2Animation() {
    gsap.from(".page2 .about-inshort p span, .page2-header .based-in span", {
        translateY: "100%",
        duration: 0.5,
        stagger: 0.25,
        scrollTrigger: {
            trigger: ".page2 .about-inshort p span, .page2-header .based-in span",
            scroller: "#main",
            // markers: true,
            toggleActions: "restart reverse restart none",
            start: "top 80%",
        }
    })
    
    gsap.from(".page2 .line-separator", {
        width: 0,
        duration: 1.5,
        scrollTrigger: {
            trigger: ".page2 .line-separator",
            scroller: "#main",
            // markers: true,
            toggleActions: "restart reverse restart none", 
            //              onEnter onLeave onEnterBack onLeaveBack
            start: "top 80%"
        }
    })
    gsap.from(".page2 .about-us .line span", {
        translateY: "100%",
        duration: 0.5,
        stagger: 0.25,
        scrollTrigger: {
            trigger: ".page2 .about-us .line",
            scroller: "#main",
            // markers: true,
            toggleActions: "restart none none none",
            //              onEnter onLeave onEnterBack onLeaveBack
            start: "top 90%",
            // end: "top -20%"
        }
    })
    
}
page2Animation();

function page3Animation() {
    let galleryItems = document.querySelectorAll(".gallery-item");

    galleryItems.forEach(item => {
        item.addEventListener("mouseenter", () => {
            gsap.to(item.querySelector("img:first-of-type"), {
                opacity: 0,
                duration: 0.25
            })
            item.querySelector("video").currentTime = 0;
            item.querySelector("video").play();
        })
        item.addEventListener("mouseleave", () => {
            gsap.to(item.querySelector("img:first-of-type"), {
                opacity: 1,
                duration: 0.25
            })
            var playPromise = item.querySelector("video").play();
            playPromise.then(_ => {
                // Automatic playback started!
                // Show playing UI.
                // We can now safely pause video...
                item.querySelector("video").pause();
              })
              .catch(error => {
                // Auto-play was prevented
                // Show paused UI.
                console.log(error);
              });
        })
    })

    gsap.from(".page3-headings h2 span", {
        translateY: "100%",
        duration: 0.5,
        stagger: 0.25,
        scrollTrigger: {
            trigger: ".page3-headings h2 span",
            scroller: "#main",
            // markers: true,
            // start: "top 95%",
            toggleActions: "restart reset restart reset",
        }
    })
}
// page3Animation();

function page4Animation() {
    gsap.from(".page4 .about-inshort p span", {
        translateY: "100%",
        duration: 0.5,
        stagger: 0.25,
        scrollTrigger: {
            trigger: ".page4 .about-inshort p span",
            scroller: "#main",
            // markers: true,
            toggleActions: "restart reverse restart none",
            start: "top 80%",
        }
    })
    
    gsap.from(".page4 .line-separator", {
        width: 0,
        duration: 1.5,
        scrollTrigger: {
            trigger: ".page4 .line-separator",
            scroller: "#main",
            // markers: true,
            toggleActions: "restart reverse restart none", 
            //              onEnter onLeave onEnterBack onLeaveBack
            start: "top 80%"
        }
    })
    gsap.from(".page4 .about-us .line span", {
        translateY: "100%",
        duration: 0.5,
        stagger: 0.25,
        scrollTrigger: {
            trigger: ".page4 .about-us .line span",
            scroller: "#main",
            // markers: true,
            toggleActions: "restart none none reset",
            //              onEnter onLeave onEnterBack onLeaveBack
            start: "top 90%",
            end: "top -20%"
        }
    })
}
page4Animation();