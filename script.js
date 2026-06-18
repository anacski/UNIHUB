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


const btnProsseguir = document.getElementById('btn-prosseguir');
const inputCadEmail = document.getElementById('cad-email');
const inputCadSenha = document.getElementById('cad-senha');
const inputConfirmaSenha = document.getElementById('cad-confirma-senha');
const erroCadastro = document.getElementById('erro-cadastro');

if (btnProsseguir) {
    btnProsseguir.addEventListener('click', function() {
        const email = inputCadEmail.value;
        const senha = inputCadSenha.value;
        const confirmaSenha = inputConfirmaSenha.value;

        erroCadastro.textContent = "";

        if (email === "" || senha === "" || confirmaSenha === "") {
            erroCadastro.textContent = "Por favor, preencha todos os campos!";
        } 
        else if (!email.includes("@unirio.br") && !email.includes("@edu.unirio.br")) {
            erroCadastro.textContent = "Use um e-mail institucional da UNIRIO.";
        } 
        else if (senha.length < 4) {
            erroCadastro.textContent = "A senha deve ter pelo menos 4 caracteres.";
        } 
        else if (senha !== confirmaSenha) {
            erroCadastro.textContent = "As senhas não coincidem!";
        } 
        else {
            erroCadastro.textContent = "";
            window.location.href = "cadastro2.html";
        }
    });
}

const btnCriarConta = document.getElementById('btn-criar-conta');
const inputCadNome = document.getElementById('cad-nome');
const inputCadNascimento = document.getElementById('cad-nascimento');
const inputCadCurso = document.getElementById('cad-curso');
const erroDados = document.getElementById('erro-dados');

if (btnCriarConta) {
    btnCriarConta.addEventListener('click', function() {
        const nome = inputCadNome.value.trim();
        const nascimento = inputCadNascimento.value.trim();
        const curso = inputCadCurso.value.trim();

        erroDados.textContent = "";

        if (nome === "" || nascimento === "" || curso === "") {
            erroDados.textContent = "Por favor, preencha todos os seus dados pessoais!";
        } else {
            erroDados.textContent = "";
            window.location.href = "timeline.html";
        }
    });
}