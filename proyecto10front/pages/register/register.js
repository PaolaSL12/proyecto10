import './register.css'

export const Register = () => {
    const main = document.querySelector("main");

    main.innerHTML = "";

    const divRegister = document.createElement("div");
    divRegister.className = "divRegister"


    doRegister(divRegister)

    main.append(divRegister)
}

const doRegister = async (contenedor) => {
    const form = document.createElement("form");

    const inputUser = document.createElement("input");
    const inputEmail = document.createElement("input");
    const inputPass = document.createElement("input");
    const button = document.createElement("button");

    inputPass.type = "password";
    inputUser.placeholder = "User Name";
    inputEmail.placeholder = "email@email.com"
    inputPass.placeholder = "*******";
    button.textContent = "Register"

    form.append(inputUser);
    form.append(inputEmail)
    form.append(inputPass);
    form.append(button);
    contenedor.append(form)

    form.addEventListener("submit", () => submit(inputUser.value, inputEmail.value, inputPass.value, form))
}

const submit = async (name, email, password, form) => {

    const objetoFinal = JSON.stringify({
        name,
        email,
        password
    });
    
    const opciones =  {
        method: "POST",
        body: objetoFinal,
        headers: {
            "Content-Type": "application/json"
        }
    }

    const res = await fetch("https://proyecto10-back-phi.vercel.app/api/users/register", opciones);


    if (res.status === 400) {
        const pError = document.createElement("p");

        pError.classList.add("error")
        pError.textContent = "Usuario ya existente";
        pError.style = "color: red";

        form.append(pError);
        return
    } else {
        form.innerHTML = ""
        const pMessage = document.createElement("p");

        pMessage.textContent = "Se ha registrado exitosamente! 🎉";
        pMessage.style = "color: #152673";

        form.append(pMessage);
    }

    const pError = document.querySelector(".error")
    if (pError) {
        pError.remove();
    }


    const response = await res.json();

 

    console.log(response);

}