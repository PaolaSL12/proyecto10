
import { Login } from "../Login/login";
import { Events } from "../Events/Events";
import { MyEvents } from "../myEvents/myEvents";
import { Register } from "../register/register";
import "./Header.css";
import { getAttendees } from "../attendees/attendees";
import { newEvent } from "../newEvents/newEvents";

export const header = () => {
  const header = document.querySelector("header");
  header.innerHTML = "";

  const nav = document.createElement("nav");
  const lNav = document.createElement("div");
  const rNav = document.createElement("div");

  lNav.className = "L";
  rNav.className = "R";

  const eventos = document.createElement("a");
  eventos.textContent = "Eventos";
  eventos.href = "#";

  const myEvents = document.createElement("a");
  myEvents.href = "#";
  myEvents.textContent = "MyEvents";
  myEvents.className = "none"

  const attendees = document.createElement("a");
  attendees.href = "#";
  attendees.textContent = "Attendees";
  attendees.className = "none"

  const newEvents = document.createElement("a");
  newEvents.href = "#";
  newEvents.textContent = "NewEvent";
  newEvents.className = "none"

  const register = document.createElement("a");
  register.textContent = "Register";
  register.href = "#";

  const login = document.createElement("a");
  login.textContent = "Login";
  login.href = "#";
  

  eventos.addEventListener("click", () => {
    Events();
  });

  myEvents.addEventListener("click", () => {
    MyEvents();
  })

  attendees.addEventListener("click", () => {
    getAttendees();
  })

newEvents.addEventListener("click", () => {
    newEvent();
})

  register.addEventListener("click", () => {
    Register();
  });

  login.addEventListener("click", () => {
    if (!localStorage.getItem("token") && login.textContent === "Login") {
      Login();
    }
    if (localStorage.getItem("token") && login.textContent === "Logout") {
      localStorage.clear();
      window.location.reload();
      register.className = "";

      header();
      Events();
    }
  });

  if (localStorage.getItem("token") && login.textContent === "Login") {
    login.textContent = "Logout";
    register.className = "none";
    myEvents.className = ""
    if (JSON.parse(localStorage.getItem("user")).rol === "admin") {
        attendees.className = "";
        newEvents.className = ""
    }
  }


  lNav.append(eventos, myEvents, attendees, newEvents);
  rNav.append(register, login);
  nav.append(lNav, rNav);
  header.append(nav);
};
