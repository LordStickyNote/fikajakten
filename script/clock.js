const clock = document.getElementById("clock");

function updateClock() {
  clock.textContent = new Date().toLocaleTimeString("sv-SE", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

updateClock();
setInterval(updateClock, 1000);
