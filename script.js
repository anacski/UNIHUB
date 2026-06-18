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

document.addEventListener("DOMContentLoaded", function() {

    const btnSair = document.getElementById('btn-sair');
    if (btnSair) {
        btnSair.addEventListener('click', function(e) {
            e.preventDefault();
            if (confirm("Você tem certeza que deseja sair do UniHub?")) {
                window.location.href = "index.html";
            }
        });
    }

    const cardPerfilAtalho = document.getElementById('card-perfil-atalho');
    if (cardPerfilAtalho) {
        cardPerfilAtalho.addEventListener('click', () => window.location.href = "perfil.html");
    }

    function aplicarCliquesDePerfil(container) {
        container.querySelectorAll('.avatar-clicavel, .nome-perfil-clicavel').forEach(elemento => {
            elemento.style.cursor = "pointer";
            elemento.addEventListener('click', () => window.location.href = "perfil.html");
        });
    }

    const inputNovoPost = document.getElementById('input-novo-post');
    const botoesAcao = document.querySelectorAll('.action-btn');
    
    const hiddenPhotoInput = document.getElementById('hidden-photo-input');
    const hiddenVideoInput = document.getElementById('hidden-video-input');
    const hiddenDateInput = document.getElementById('hidden-date-input');

    botoesAcao.forEach(botao => {
        botao.style.cursor = "pointer";
        botao.addEventListener('click', function() {
            const textoBotao = this.textContent.trim();

            if (textoBotao.includes("Foto") && hiddenPhotoInput) {
                hiddenPhotoInput.click();
            } 
            else if (textoBotao.includes("Vídeo") && hiddenVideoInput) {
                hiddenVideoInput.click();
            } 
            else if (textoBotao.includes("Data") && hiddenDateInput) {
                hiddenDateInput.showPicker();
            } 
            else if (textoBotao.includes("Câmera")) {
                if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                    navigator.mediaDevices.getUserMedia({ video: true })
                        .then(function(stream) {
                            alert("Permissão concedida! Câmera conectada com sucesso.");
                            stream.getTracks().forEach(track => track.stop());
                        })
                        .catch(function(error) {
                            alert("Acesso à câmera negado ou dispositivo de captura não encontrado.");
                            console.error("Erro na câmera:", error);
                        });
                } else {
                    alert("Seu navegador atual não suporta acesso direto à câmera.");
                }
            }
        });
    });

    if (hiddenPhotoInput) {
        hiddenPhotoInput.addEventListener('change', function() {
            if (this.files.length > 0 && inputNovoPost) {
                inputNovoPost.value += ` [Imagem selecionada: ${this.files[0].name}]`;
            }
        });
    }

    if (hiddenVideoInput) {
        hiddenVideoInput.addEventListener('change', function() {
            if (this.files.length > 0 && inputNovoPost) {
                inputNovoPost.value += ` [Vídeo selecionado: ${this.files[0].name}]`;
            }
        });
    }

    if (hiddenDateInput) {
        hiddenDateInput.addEventListener('change', function() {
            if (this.value && inputNovoPost) {
                const dataFormatada = this.value.split('-').reverse().join('/');
                inputNovoPost.value += ` [Evento: ${dataFormatada}]`;
            }
        });
    }

    function adicionarInteratividadeAoPost(postCard) {
        const btnCurtir = postCard.querySelector('.btn-curtir');
        const btnSalvar = postCard.querySelector('.btn-salvar');
        const inputComentario = postCard.querySelector('.input-comentario');

        postCard.querySelectorAll('.interactive-icon, .icon-btn-share').forEach(btn => {
            btn.style.background = "none";
            btn.style.border = "none";
            btn.style.padding = "5px";
            btn.style.cursor = "pointer";
            btn.style.outline = "none";
            btn.style.boxShadow = "none";
        });

        if (btnCurtir) {
            btnCurtir.addEventListener('click', function() {
                const icone = this.querySelector('i');
                this.classList.toggle('ativo');
                
                if (this.classList.contains('ativo')) {
                    icone.className = "fa-solid fa-heart"; 
                    this.style.color = "#ff3333";      
                } else {
                    icone.className = "fa-regular fa-heart"; 
                    this.style.color = "";
                }
            });
        }

        if (btnSalvar) {
            btnSalvar.addEventListener('click', function() {
                const icone = this.querySelector('i');
                this.classList.toggle('ativo');
                
                if (this.classList.contains('ativo')) {
                    icone.className = "fa-solid fa-bookmark"; 
                    this.style.color = "#ffcc00";            
                } else {
                    icone.className = "fa-regular fa-bookmark"; 
                    this.style.color = "";
                }
            });
        }

        if (inputComentario) {
            inputComentario.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' && this.value.trim() !== "") {
                    alert(`Comentário enviado: "${this.value}"`);
                    this.value = "";
                }
            });
        }
    }

    const feedContainer = document.getElementById('feed-container');

    if (inputNovoPost && feedContainer) {
        inputNovoPost.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault(); 
                
                if (inputNovoPost.value.trim() !== "") {
                    const conteudoDoPost = inputNovoPost.value;
                    const novoPost = document.createElement('div');
                    novoPost.className = 'post-card';
                    
                    novoPost.innerHTML = `
                        <div class="post-header">
                            <img src="images/avatar-jorge.png" class="avatar-small avatar-clicavel" alt="Jorge Filho">
                            <div class="post-info">
                                <h4 class="nome-perfil-clicavel">Jorge Filho</h4>
                                <span>Postou uma nova atividade • Agora mesmo</span>
                            </div>
                            <button class="icon-btn-share" title="Compartilhar"><i class="fa-solid fa-share-nodes"></i></button>
                        </div>
                        <div class="post-content">
                            ${conteudoDoPost}
                        </div>
                        <div class="post-footer">
                            <button class="interactive-icon btn-responder" title="Responder"><i class="fa-solid fa-reply"></i></button>
                            <button class="interactive-icon btn-curtir" title="Curtir"><i class="fa-regular fa-heart"></i></button>
                            <input type="text" class="input-comentario" placeholder="Faça um comentário e aperte Enter">
                            <button class="interactive-icon btn-salvar" title="Salvar"><i class="fa-regular fa-bookmark"></i></button>
                        </div>
                    `;

                    feedContainer.insertBefore(novoPost, feedContainer.firstChild);
                    inputNovoPost.value = "";

                    adicionarInteratividadeAoPost(novoPost);
                    aplicarCliquesDePerfil(novoPost);
                }
            }
        });
    }

    document.querySelectorAll('.post-card').forEach(post => {
        adicionarInteratividadeAoPost(post);
        aplicarCliquesDePerfil(post);
    });

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
});

const abasPerfil = document.querySelectorAll('.tab');
if (abasPerfil.length > 0) {
    abasPerfil.forEach(aba => {
        aba.style.cursor = "pointer";
        aba.addEventListener('click', function() {
            abasPerfil.forEach(a => a.classList.remove('active'));
            this.classList.add('active');
            
            const tipoAba = this.getAttribute('data-tab');
            console.log(`Usuário mudou para a aba: ${tipoAba}`);
        });
    });
}

const formEvento = document.getElementById('event-form');
if (formEvento) {
    formEvento.addEventListener('submit', function(e) {
        e.preventDefault(); 
        
        alert("Sucesso! Sua atividade foi publicada e já está disponível no mural da timeline.");
        window.location.href = "timeline.html"; 
    });
}

const formEditarPerfil = document.getElementById('edit-profile-form');
if (formEditarPerfil) {
    formEditarPerfil.addEventListener('submit', function(e) {
        e.preventDefault(); 
        
        alert("Alterações salvas com sucesso!");
        window.location.href = "perfil.html"; 
    });
}

const btnEnviarMsg = document.getElementById('btn-send-message');
const inputMsg = document.getElementById('chat-input-field');
const containerMsgs = document.getElementById('chat-messages-container');

if (btnEnviarMsg && inputMsg && containerMsgs) {
    function enviarMensagem() {
        const texto = inputMsg.value.trim();
        if (texto === "") return;

        const divMensagem = document.createElement('div');
        divMensagem.className = 'message right';
        divMensagem.innerHTML = `<div class="bubble blue">${texto}</div>`;
        
        containerMsgs.appendChild(divMensagem);
        inputMsg.value = "";
        
        containerMsgs.scrollTop = containerMsgs.scrollHeight;
    }

    btnEnviarMsg.addEventListener('click', enviarMensagem);

    inputMsg.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            enviarMensagem();
        }
    });
}

