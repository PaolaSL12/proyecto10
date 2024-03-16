import { getlogged } from "../../components/logged";
import { MyEvents } from "../myEvents/myEvents";
import "./Events.css";

export const Events = async () => {
  const main = document.querySelector("main");

  main.innerHTML = "";

  const res = await fetch("http://localhost:3000/api/events/");
  const events = await res.json();

  const text = "Confirmar asistencia";

  PrintEvents(events, main, text);
};

export const PrintEvents = (events, contenedor, text) => {
  const divEvents = document.createElement("div");
  divEvents.className = "divEvents";

  for (const event of events) {
    const divEvent = document.createElement("div");
    const divimg = document.createElement("div");
    const img = document.createElement("img");
    const title = document.createElement("h3");
    const location = document.createElement("p");
    const date = document.createElement("p");
    const description = document.createElement("p");

    const idEv = document.createElement("span");
    idEv.textContent = event._id;
    idEv.className = "none";

    const attendeeButton = document.createElement("button");
    attendeeButton.id = "attendeeButton";
    attendeeButton.textContent = text;
    attendeeButton.className = "none";

    attendeeButton.addEventListener("click", (e) => {
      const eventId = idEv.textContent;

      if (attendeeButton.textContent === "Confirmar asistencia") {
        confirmAttendee(eventId);
        attendeeButton.classList = "none";
      } else if (attendeeButton.textContent === "Cancelar Asistencia") {
        cancelAttendee(eventId);
        setTimeout(() => {
          MyEvents();
        }, 100);
        
      }
    });

    divimg.className = "divImg";
    date.className = "date";
    location.className = "location";

    divEvent.className = "eventCard";
    img.src = event.img;
    title.textContent = event.title;
    location.textContent = event.location;
    date.textContent = event.date;
    description.textContent = event.description;

    if (localStorage.getItem("token")) {
      attendeeButton.className = "";
    }

    divimg.append(img);
    divEvent.append(
      divimg,
      title,
      location,
      date,
      description,
      attendeeButton,
      idEv
    );
    divEvents.append(divEvent);
  }

  contenedor.append(divEvents);
};

const confirmAttendee = async (id) => {
  const logged = JSON.parse(localStorage.getItem("user"));

  const userAteendee = await getlogged();

  if (userAteendee === undefined) {
    const objetoFinal = JSON.stringify({
      name: logged.name,
      email: logged.email,
      events: [],
    });

    const opciones = {
      method: "POST",
      body: objetoFinal,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    const res = await fetch(`http://localhost:3000/api/attendees`, opciones);
    const response = await res.json();
    confirmAttendee(id);
  }

  const objetoFinal = JSON.stringify({
    name: userAteendee.name,
    email: userAteendee.email,
    events: userAteendee.event,
  });

  const opciones = {
    method: "PUT",
    body: objetoFinal,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  const confirm = await fetch(
    `http://localhost:3000/api/attendees/${id}`,
    opciones
  );
  const confirmed = await confirm.json();
};

const cancelAttendee = async (id) => {
  const userAteendee = await getlogged();

  const objetoFinal = JSON.stringify({
    name: userAteendee.name,
    email: userAteendee.email,
    events: userAteendee.event,
  });

  const opciones = {
    method: "PUT",
    body: objetoFinal,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  const cancel = await fetch(
    `http://localhost:3000/api/attendees/cancel/${id}`,
    opciones
  );
  const canceled = await cancel.json();
};
