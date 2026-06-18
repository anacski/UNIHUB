const btnEntrar = document.getElementById('btn-entrar');
const inputEmail = document.getElementById('email');
const inputSenha = document.getElementById('senha');

btnEntrar.addEventListener('click', function() {
    const email = inputEmail.value;
    const senha = inputSenha.value;

    if (email === "" || senha === "") {
        alert("Por favor, preencha todos os campos!");
    } else if (email.includes("@unirio.br")) {
        window.location.href = "timeline.html"; 
    } else {
        alert("Use um e-mail institucional da UNIRIO.");
    }
});