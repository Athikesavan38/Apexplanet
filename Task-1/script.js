window.onload = function () {
  let name = "";
  while (!name || name.trim() === "") {
    name = prompt("Enter the name to wish:");
  }
  const heading = document.getElementById("birthday-heading");
  heading.innerText = `🎉 Happy Birthday, ${name.trim()}! 🎉`;
};

function sendCard() {
  alert("🎂 Your birthday card has been sent!");
}

function openPopup() {
  document.getElementById("overlay").style.display = "block";
  document.getElementById("popup").style.display = "block";
}

function closePopup() {
  document.getElementById("overlay").style.display = "none";
  document.getElementById("popup").style.display = "none";
}