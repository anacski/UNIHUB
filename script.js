const btnEntrar = document.getElementById('btn-entrar');
const inputEmail = document.getElementById('email');
const inputSenha = document.getElementById('senha');
const btnCrieConta = document.getElementById('btn-crie-conta'); 
const erroLogin = document.getElementById('erro-login');
const btnEsqueceuSenha = document.getElementById('btn-esqueceu-senha');

if (btnEntrar) {
    btnEntrar.addEventListener('click', function() {
        const email = inputEmail.value;
        const senha = inputSenha.value;

        erroLogin.textContent = "";

        if (email === "" || senha === "") {
            erroLogin.textContent = "Por favor, preencha todos os campos!";
        } else if (!email.includes("@unirio.br") && !email.includes("@edu.unirio.br")) {
            erroLogin.textContent = "Use um e-mail institucional da UNIRIO.";
        } else if (senha.length < 4) { 
            erroLogin.textContent = "Senha inválida!";
        } else {
            erroLogin.textContent = "";
            window.location.href = "timeline.html"; 
        }
    });
}

if (btnCrieConta) {
    btnCrieConta.addEventListener('click', function() {
        window.location.href = "cadastro1.html";
    });
}

if (btnEsqueceuSenha) {
    btnEsqueceuSenha.addEventListener('click', function() {
        const email = inputEmail.value;

        if (email === "") {
            erroLogin.textContent = "Digite seu e-mail no campo acima para podermos ajudar.";
        } else if (email.includes("@unirio.br") || email.includes("@edu.unirio.br")) {
            alert(`Sucesso! Um e-mail de recuperação foi enviado para: ${email}`);
            erroLogin.textContent = ""; 
        } else {
            erroLogin.textContent = "Insira um e-mail válido da UNIRIO.";
        }
    });
}
