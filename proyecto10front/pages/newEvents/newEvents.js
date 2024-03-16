import { Events } from "../Events/Events";
import "./newEvents.css";

export const newEvent = async () => {
  const main = document.querySelector("main");

  main.innerHTML = "";

  const divNewEvent = document.createElement("div");
  divNewEvent.className = "divNewEvent";

  createEvent(divNewEvent);

  main.append(divNewEvent);
};

const createEvent = (contenedor) => {
  const form = document.createElement("form");
  form.className = "newEvent";

  const title = document.createElement("input");
  const date = document.createElement("input");
  const location = document.createElement("input");
  const description = document.createElement("textarea");
  const img = document.createElement("input");
  const button = document.createElement("button");

  description.className = "desc";
  img.className = "img";

  title.placeholder = "Titulo";
  date.placeholder = "Fecha";
  location.placeholder = "Ubicacion";
  description.placeholder = "Descripcion del evento";
  img.type = "file";
  button.textContent = "Enviar";

  form.append(title, date, location, description, img, button);
  contenedor.append(form);

  form.addEventListener("submit", () =>
    submitEvent(
      title.value,
      date.value,
      location.value,
      description.value,
      img.files
    )
  );
};

const submitEvent = async (title, date, location, description, img) => {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("date", date);
  formData.append("location", location);
  formData.append("description", description);
  formData.append("img", img[0]);

  const opciones = {
    method: "POST",
    body: formData
  };


  const res = await fetch("http://localhost:3000/api/events/post", opciones);
  const response = await res.json();


  console.log(res.status);

  if (res.status === 201) {
    
    alert("Evento creado exitosamente 🎉")
    Events()
    
}
};
