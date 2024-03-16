
import { header } from '../Header/Header';
import { Events } from '../Events/Events.js';


import './login.css'

export const Login = () => {
    const main = document.querySelector("main");

    main.innerHTML = "";

    const divLogin = document.createElement("div");
    divLogin.className = "divLogin"


    doLogin(divLogin)

    main.append(divLogin)
}

const doLogin = (contenedor) => {
    const form = document.createElement("form");

    const inputUser = document.createElement("input");
    const inputPass = document.createElement("input");
    const button = document.createElement("button");

    inputPass.type = "password";
    inputUser.placeholder = "User Name";
    inputPass.placeholder = "*******";
    button.textContent = "Login"

    form.append(inputUser);
    form.append(inputPass);
    form.append(button);
    contenedor.append(form)

    form.addEventListener("submit", () => submit(inputUser.value, inputPass.value, form))
}

const submit = async (name, password, form) => {

    const objetoFinal = JSON.stringify({
        name,
        password
    });
    
    const opciones =  {
        method: "POST",
        body: objetoFinal,
        headers: {
            "Content-Type": "application/json"
        }
    }

    const res = await fetch("http://localhost:3000/api/users/login", opciones);


    if (res.status === 400) {
        const pError = document.createElement("p");

        pError.classList.add("error")
        pError.textContent = "Usuario o contraseña incorrectos";
        pError.style = "color: red";

        form.append(pError);
        return
    }

    const pError = document.querySelector(".error")
    if (pError) {
        pError.remove();
    }

    const response = await res.json();

    localStorage.setItem("token", response.token);
    localStorage.setItem("user", JSON.stringify(response.user))


    header()
    Events()
}