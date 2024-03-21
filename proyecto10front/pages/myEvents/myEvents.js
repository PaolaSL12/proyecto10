
import { PrintEvents } from '/pages/Events/Events.js'
import "./myEvents.css";

export const MyEvents = async () => {
    const main = document.querySelector("main");

    main.innerHTML = "";

    const logged = JSON.parse(localStorage.getItem("user")).name

    const res = await fetch(`https://proyecto10-back-phi.vercel.app/api/attendees/name/${logged}`);
    const response = await res.json();

    const userAteendee = response[0]

    const divMyEvents = document.createElement("div");
    divMyEvents.className = "divMyEvents"

    main.append(divMyEvents)

    getEvents(divMyEvents, userAteendee);

    return userAteendee
}


const getEvents = async (contenedor, userAteendee) => {

        const res = await fetch(`https://proyecto10-back-phi.vercel.app/api/attendees/${userAteendee._id}`);
        const events = await res.json();
    
        const myEvents = events.events

       if (myEvents.length === 0) {
        const pMyEvents = document.createElement("p");
        pMyEvents.className = "myEvents"

        pMyEvents.textContent = "No tiene eventos confirmados";
        pMyEvents.style = "color: #152673";
        contenedor.append(pMyEvents)
       }

       const text = "Cancelar Asistencia"
    
      PrintEvents(myEvents, contenedor, text);
}