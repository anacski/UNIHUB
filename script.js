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


const btnSair = document.getElementById('btn-sair');
if (btnSair) {
    btnSair.addEventListener('click', function(e) {
        e.preventDefault();
        const confirmaSair = confirm("Você tem certeza que deseja sair?");
        if (confirmaSair) {
            window.location.href = "index.html";
        }
    });
}


const cardPerfilAtalho = document.getElementById('card-perfil-atalho');
const elementosPerfilClicaveis = document.querySelectorAll('.avatar-clicavel, .nome-perfil-clicavel');

if (cardPerfilAtalho) {
    cardPerfilAtalho.addEventListener('click', function() {
        window.location.href = "perfil.html";
    });
}

elementosPerfilClicaveis.forEach(elemento => {
    elemento.addEventListener('click', function() {
        window.location.href = "perfil.html";
    });
});


function adicionarInteratividadeAoPost(postCard) {
    const btnCurtir = postCard.querySelector('.btn-curtir');
    const btnSalvar = postCard.querySelector('.btn-salvar');
    const inputComentario = postCard.querySelector('.input-comentario');

    if (btnCurtir) {
        btnCurtir.addEventListener('click', function() {
            this.classList.toggle('ativo');
            if (this.classList.contains('ativo')) {
                this.style.transform = "scale(1.25)";
                this.style.filter = "drop-shadow(0px 0px 4px rgba(255, 0, 0, 0.6))";
            } else {
                this.style.transform = "scale(1)";
                this.style.filter = "";
            }
        });
    }

    if (btnSalvar) {
        btnSalvar.addEventListener('click', function() {
            this.classList.toggle('ativo');
            this.style.transform = this.classList.contains('ativo') ? "scale(1.2)" : "scale(1)";
        });
    }

    if (inputComentario) {
        inputComentario.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && this.value.trim() !== "") {
                alert(`Comentário enviado com sucesso: "${this.value}"`);
                this.value = "";
            }
        });
    }
}


const inputNovoPost = document.getElementById('input-novo-post');
const feedContainer = document.getElementById('feed-container');

if (inputNovoPost && feedContainer) {
    inputNovoPost.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && inputNovoPost.value.trim() !== "") {
            const conteudoDoPost = inputNovoPost.value;

            const novoPost = document.createElement('div');
            novoPost.className = 'post-card';
            novoPost.innerHTML = `
                <div class="post-header">
                    <img src="images/avatar-jorge.png" class="avatar-small avatar-clicavel" alt="Jorge Filho" style="cursor: pointer;">
                    <div class="post-info">
                        <h4 class="nome-perfil-clicavel" style="cursor: pointer;">Jorge Filho</h4>
                        <span>Postou uma nova atividade • Agora mesmo</span>
                    </div>
                    <button class="icon-btn-share">🔗</button>
                </div>
                <div class="post-content">
                    ${conteudoDoPost}
                </div>
                <div class="post-footer">
                    <button class="interactive-icon btn-responder" title="Responder">↩️</button>
                    <button class="interactive-icon btn-curtir" title="Curtir">❤️</button>
                    <input type="text" class="input-comentario" placeholder="Faça um comentário e aperte Enter">
                    <button class="interactive-icon btn-salvar" title="Salvar">🔖</button>
                </div>
            `;

            
            feedContainer.insertBefore(novoPost, feedContainer.firstChild);
            inputNovoPost.value = "";

            
            adicionarInteratividadeAoPost(novoPost);

            
            novoPost.querySelectorAll('.avatar-clicavel, .nome-perfil-clicavel').forEach(el => {
                el.addEventListener('click', () => window.location.href = "perfil.html");
            });
        }
    });
}


document.querySelectorAll('.post-card').forEach(post => adicionarInteratividadeAoPost(post));


const btnConfirmar = document.getElementById('btn-confirmar-presenca');
if (btnConfirmar) {
    btnConfirmar.addEventListener('click', function() {
        if (this.textContent === "Confirmar presença") {
            this.textContent = "✓ Presença Confirmada!";
            this.style.backgroundColor = "#28a745";
            this.style.color = "#fff";
        } else {
            this.textContent = "Confirmar presença";
            this.style.backgroundColor = "";
            this.style.color = "";
        }
    });
}