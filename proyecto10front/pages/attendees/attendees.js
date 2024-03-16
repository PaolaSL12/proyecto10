import './attendees.css'

export const getAttendees = async () => {
    const main = document.querySelector("main");

    main.innerHTML = "";

    const res = await fetch("http://localhost:3000/api/attendees");
    const attendees = await res.json();

    console.log(attendees);
    printAttendees(attendees, main)
}

const printAttendees = async (attendees, contenedor) => {
    const divAttendees = document.createElement("div");
    divAttendees.className = "divAttendees"

    for (const attendee of attendees) {
        const cardAttendee = document.createElement("div");
        cardAttendee.className = "cardAttendee";

        const name = document.createElement("h4");
        const email = document.createElement("h5");
        const events = document.createElement("h5");
        const divEvents = document.createElement("div");

        divEvents.className = "divEvent"

        name.textContent = attendee.name;
        email.textContent = attendee.email;
        events.textContent = "Eventos Confirmados"

        if (attendee.events.length < 1 ) {
            const pVacio = document.createElement("p");
            pVacio.textContent = "No tiene eventos confirmados";
            pVacio.className = "pVacio"
            divEvents.append(pVacio)
        }

        for (const events of attendee.events) {

            const event = document.createElement("div")
            event.className = "event";

            const eventTitle = document.createElement("p");
            const eventlocation = document.createElement("p");
            const eventDate = document.createElement("p");

            eventTitle.className = "eTitle"

            eventTitle.textContent = events.title;
            eventlocation.textContent = events.location;
            eventDate.textContent = events.date

            event.append(eventTitle, eventlocation, eventDate)
            divEvents.append(event)
        }
        
        cardAttendee.append(name, email, events, divEvents)
        divAttendees.append(cardAttendee);
    }

    contenedor.append(divAttendees)
}