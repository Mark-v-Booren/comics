
const track = document.getElementById("image-track");

let isMouseDown = false; // Declare isMouseDown as a variable.

window.onmousedown = (e) => {
    isMouseDown = true;
    track.dataset.mouseDownAt = e.clientX;
    track.dataset.prevPercentage = parseFloat(track.dataset.percentage) || 0;

};

window.onmousemove = (e) => {
    if (!isMouseDown) return;

    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX;
    const maxDelta = window.innerWidth / 2;

    const percentage = (mouseDelta / maxDelta) * -100;
    let nextPercentage = parseFloat(track.dataset.prevPercentage) + percentage;
    nextPercentage = Math.min(nextPercentage, 0);
    nextPercentage = Math.max(nextPercentage, -100);

    track.dataset.percentage = nextPercentage;



    track.animate({transform: `translate(${nextPercentage}%, -50%)`},{duration:1200, fill:"forwards"});

    for (const image of track.getElementsByClassName("image")) {
        image.animate({objectPosition: `${nextPercentage + 100}% -50%`},{duration : 1200, fill:"forwards"});
    }
  
};

window.onmouseup = () => {
    isMouseDown = false;
    // track.dataset.percentage = "0";
    track.dataset.prevPercentage = track.dataset.percentage;
};

