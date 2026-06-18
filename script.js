const btnEntrar = document.getElementById('btn-entrar');
const inputEmail = document.getElementById('email');
const inputSenha = document.getElementById('senha');
const btnCrieConta = document.getElementById('btn-crie-conta');

if (btnEntrar) {
    btnEntrar.addEventListener('click', function() {
        const email = inputEmail.value;
        const senha = inputSenha.value;

        if (email === "" || senha === "") {
            alert("Por favor, preencha todos os campos!");
        } else if (email.includes("@unirio.br") || email.includes("@edu.unirio.br")) { 
            window.location.href = "timeline.html"; 
        } else {
            alert("Use um e-mail institucional da UNIRIO.");
        }
    });
}

if (btnCrieConta) {
    btnCrieConta.addEventListener('click', function() {
        window.location.href = "cadastro1.html";
    });
}