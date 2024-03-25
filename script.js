const menubar = document.querySelector("#menu");
const Navbar = document.querySelector(".navbar");
menubar.onclick = () => {
  menubar.classList.toggle("bx-x");
  Navbar.classList.toggle("active");
};
const section = document.querySelectorAll("section");
const navlink = document.querySelectorAll("header nav a");
window.onscroll = () => {
  section.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");
    if (top > offset && top < offset + height) {
      sec.classList.add("start-animation");
      navlink.forEach((links) => {
        links.classList.remove("active");
        document
          .querySelector("header nav a[href*=" + id + "]")
          .classList.add("active");
      });
    }
  });
  var header = document.querySelector(".header");
  header.classList.toggle("sticky", window.scrollY > 100);
  menubar.classList.remove("bx-x");
  Navbar.classList.remove("active");
};
document
  .getElementById("contactForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;

    if (!fullName) {
      alert("Please enter your full name.");
      return;
    }

    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!phoneRegex.test(phone)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    if (!subject) {
      alert("Please enter a subject.");
      return;
    }

    if (!message) {
      alert("Please enter your message.");
      return;
    }

    const contactMessages =
      JSON.parse(localStorage.getItem("contactMessages")) || [];
    contactMessages.push({
      fullName,
      email,
      phone,
      subject,
      message,
      date: new Date().toISOString(),
    });
    localStorage.setItem("contactMessages", JSON.stringify(contactMessages));

    alert("Message sent successfully!");
    document.getElementById("contactForm").reset();
  });
