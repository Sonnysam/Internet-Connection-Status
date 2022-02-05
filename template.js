const image = document.getElementById('image');
const statusDisplay = document.getElementById('status');
const bg = document.getElementById('main');


function setColor() {
    bgColor.classList.add('online');
}
async function connectionStatus() {
    try {
        const fetchResult = await fetch('https://images.unsplash.com/photo-1638913662380-9799def8ffb1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60?time=' + (new Date()).getTime());

        image.src = "images/online.png";
        setColor();
        return fetchResult.status >= 200 && fetchResult.status < 300;
    }   catch (error) {
        
        statusDisplay.textContent = "Oops your internet connection is down";
        image.src = "images/offline.png";
        bgColor.classList.remove('online');
    }
}


// Monitor Connection

setInterval(async () => {
    const result = await connectionStatus();
    if (result) {
        statusDisplay.textContent = "Welcome Back, you're Online";
        setColor(); 
    } 
}, 5000);

// Check Connection When Page Loads

window.addEventListener("load", async (event) => {
    if (connectionStatus()) {
        statusDisplay.textContent = "You're Online";
    } else{
        statusDisplay.textContent = "You're Offline";
    }
})