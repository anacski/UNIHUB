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
            const nomeUsuarioReal = email.split('@')[0];
            alert(`Sucesso! Olá, ${nomeUsuarioReal}! Um e-mail de recuperação foi enviado para: ${email}`);
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
        } else if (!email.includes("@unirio.br") && !email.includes("@edu.unirio.br")) {
            erroCadastro.textContent = "Use um e-mail institucional da UNIRIO.";
        } else if (senha.length < 4) {
            erroCadastro.textContent = "A senha deve ter pelo menos 4 caracteres.";
        } else if (senha !== confirmaSenha) {
            erroCadastro.textContent = "As senhas não coincidem!";
        } else {
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

if (inputCadNome) {
    inputCadNome.addEventListener('input', function(e) {
        e.target.value = e.target.value.replace(/[0-9]/g, '');
    });
}

if (inputCadCurso) {
    inputCadCurso.addEventListener('input', function(e) {
        e.target.value = e.target.value.replace(/[0-9]/g, '');
    });
}

if (btnCriarConta) {
    btnCriarConta.addEventListener('click', function() {
        const nome = inputCadNome.value.trim();
        const nascimento = inputCadNascimento.value.trim();
        const curso = inputCadCurso.value.trim();
        erroDados.textContent = "";
        if (nome === "" || nascimento === "" || curso === "") {
            erroDados.textContent = "Por favor, preencha todos os seus dados pessoais!";
            return;
        }
        if (isNaN(Date.parse(nascimento))) {
            erroDados.textContent = "Por favor, insira uma data válida.";
            return;
        }
        const hoje = new Date();
        const dataNasc = new Date(nascimento);
        let idade = hoje.getFullYear() - dataNasc.getFullYear();
        const m = hoje.getMonth() - dataNasc.getMonth();
        if (m < 0 || (m === 0 && hoje.getDate() < dataNasc.getDate())) {
            idade--;
        }
        if (idade < 16 || idade > 100) {
            erroDados.textContent = "Idade inválida para cadastro (Mínimo 16 anos).";
            return;
        }
        localStorage.setItem('unihub_nome', nome);
        localStorage.setItem('unihub_curso', curso);
        erroDados.textContent = "";
        window.location.href = "timeline.html";
    });
}

document.addEventListener("DOMContentLoaded", function() {
    const nomeSalvo = localStorage.getItem('unihub_nome') || "Jorge Filho";
    const cursoSalvo = localStorage.getItem('unihub_curso') || "CCH - Pedagogia";

    document.querySelectorAll('.nome-perfil-clicavel, .profile-body h2').forEach(el => {
        if(el.tagName === 'H2' && el.parentElement.classList.contains('profile-body')) {
            el.textContent = nomeSalvo;
        } else if(!el.closest('.post-card')) {
            el.textContent = nomeSalvo;
        }
    });

    const txtCurso = document.querySelector('.profile-body .course');
    if(txtCurso) txtCurso.textContent = cursoSalvo;

    const inputBusca = document.querySelector('.search-bar');
    if (inputBusca) {
        inputBusca.addEventListener('input', function() {
            const termo = this.value.toLowerCase().trim();
            document.querySelectorAll('.post-card, .event-card').forEach(card => {
                const texto = card.textContent.toLowerCase();
                if (texto.includes(termo)) {
                    card.style.display = "";
                } else {
                    card.style.display = "none";
                }
            });
        });
    }

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
            } else if (textoBotao.includes("Vídeo") && hiddenVideoInput) {
                hiddenVideoInput.click();
            } else if (textoBotao.includes("Data") && hiddenDateInput) {
                hiddenDateInput.showPicker();
            } else if (textoBotao.includes("Câmera")) {
                if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                    navigator.mediaDevices.getUserMedia({ video: true })
                        .then(function(stream) {
                            alert("Permissão concedida! Câmera conectada com sucesso.");
                            stream.getTracks().forEach(track => track.stop());
                        })
                        .catch(function(error) {
                            alert("Acesso à câmera negado ou dispositivo de captura não encontrado.");
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
                const nomes = Array.from(this.files).map(f => f.name).join(', ');
                inputNovoPost.value += ` [Imagens: ${nomes}]`;
            }
        });
    }

    if (hiddenVideoInput) {
        hiddenVideoInput.addEventListener('change', function() {
            if (this.files.length > 0 && inputNovoPost) {
                inputNovoPost.value += ` [Vídeo: ${this.files[0].name}]`;
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
                            <img src="images/avatar-jorge.png" class="avatar-small avatar-clicavel" alt="Avatar">
                            <div class="post-info">
                                <h4 class="nome-perfil-clicavel">${nomeSalvo}</h4>
                                <span>Postou uma nova atividade • Agora mesmo</span>
                            </div>
                            <!-- Novo botão verde inserido na criação de posts -->
                            <button class="icon-btn-republicar" title="Republicar" style="background:none; border:none; cursor:pointer; color: #28a745; font-size: 1.2rem;">
                                <i class="fa-solid fa-retweet"></i>
                            </button>
                        </div>
                        <div class="post-content" style="padding: 10px 0;">
                            ${conteudoDoPost}
                        </div>
                        <div class="post-comments" style="background: #f9f9f9; border-radius: 6px; margin-bottom: 10px;"></div>
                        <div class="post-footer" style="display:flex; align-items:center; gap:10px;">
                            <button class="interactive-icon btn-responder" title="Responder" style="background:none; border:none; cursor:pointer;"><i class="fa-solid fa-reply"></i></button>
                            <button class="interactive-icon btn-curtir" title="Curtir" style="background:none; border:none; cursor:pointer;"><i class="fa-regular fa-heart"></i></button>
                            <input type="text" class="input-comentario" placeholder="Faça um comentário e aperte Enter" style="flex:1; padding:6px; border:1px solid #ccc; border-radius:4px;">
                            <button class="interactive-icon btn-salvar" title="Salvar" style="background:none; border:none; cursor:pointer;"><i class="fa-regular fa-bookmark"></i></button>
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

    function adicionarInteratividadeAoPost(postCard) {
        const btnCurtir = postCard.querySelector('.btn-curtir');
        const btnSalvar = postCard.querySelector('.btn-salvar');
        const btnRepublicar = postCard.querySelector('.icon-btn-republicar');
        const btnResponder = postCard.querySelector('.btn-responder');
        const inputComentario = postCard.querySelector('.input-comentario');
        const listaComentarios = postCard.querySelector('.comments-list') || postCard.querySelector('.post-comments');

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

        if (btnRepublicar) {
            btnRepublicar.addEventListener('click', function() {
                const feedContainer = document.getElementById('feed-container');
                if (feedContainer) {
                    const postClonado = postCard.cloneNode(true);
                    
                    const inputComentarioClone = postClonado.querySelector('.input-comentario');
                    if (inputComentarioClone) inputComentarioClone.value = '';
                    
                    const listaComentariosClone = postClonado.querySelector('.comments-list') || postClonado.querySelector('.post-comments');
                    if (listaComentariosClone) listaComentariosClone.innerHTML = '';
                    
                    const postInfoTexto = postClonado.querySelector('.post-info span');
                    if (postInfoTexto) {
                        postInfoTexto.textContent = "Republicou esta atividade • Agora mesmo";
                    }

                    feedContainer.insertBefore(postClonado, feedContainer.firstChild);

                    adicionarInteratividadeAoPost(postClonado);
                    if (typeof aplicarCliquesDePerfil === "function") {
                        aplicarCliquesDePerfil(postClonado);
                    }
                }
            });
        }

        if (btnResponder) {
            btnResponder.addEventListener('click', function() {
                if(inputComentario) inputComentario.focus();
            });
        }

        if (inputComentario && listaComentarios) {
            inputComentario.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' && this.value.trim() !== "") {
                    const texto = this.value.trim();
                    const item = document.createElement('div');
                    const nomeSalvo = localStorage.getItem('unihub_nome') || "Jorge Filho";
                    item.className = 'comment-item';
                    item.style.padding = "6px 10px";
                    item.style.borderTop = "1px solid #eee";
                    item.style.fontSize = "0.9rem";
                    item.innerHTML = `<strong>${nomeSalvo}:</strong> ${texto}`;
                    listaComentarios.appendChild(item);
                    this.value = "";
                }
            });
        }
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

    const inputEditNome = document.getElementById('edit-nome');
    const inputEditCurso = document.getElementById('edit-curso');
    const inputEditIdade = document.getElementById('edit-idade');
    const formEditarPerfil = document.getElementById('edit-profile-form');

    if(inputEditNome && nomeSalvo) inputEditNome.value = nomeSalvo;
    if(inputEditCurso && cursoSalvo) inputEditCurso.value = cursoSalvo;

    if (inputEditNome) {
        inputEditNome.addEventListener('input', function(e) {
            e.target.value = e.target.value.replace(/[0-9]/g, '');
        });
    }
    if (inputEditCurso) {
        inputEditCurso.addEventListener('input', function(e) {
            e.target.value = e.target.value.replace(/[0-9]/g, '');
        });
    }

    if (formEditarPerfil) {
        formEditarPerfil.addEventListener('submit', function(e) {
            e.preventDefault();
            const nomeVal = inputEditNome.value.trim();
            const cursoVal = inputEditCurso.value.trim();
            const idadeVal = inputEditIdade ? parseInt(inputEditIdade.value.trim()) : 21;

            if(nomeVal === "" || cursoVal === "") {
                alert("Os campos Nome e Curso não podem ficar vazios.");
                return;
            }
            if(inputEditIdade && (isNaN(idadeVal) || idadeVal < 16 || idadeVal > 100)) {
                alert("Insira uma idade válida (Mínimo 16 anos).");
                return;
            }

            localStorage.setItem('unihub_nome', nomeVal);
            localStorage.setItem('unihub_curso', cursoVal);
            alert("Alterações salvas com sucesso!");
            window.location.href = "perfil.html"; 
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
        });
    });
}

const formEvento = document.getElementById('event-form');
if (formEvento) {
    formEvento.addEventListener('submit', function(e) {
        e.preventDefault(); 
        alert("Sucesso! Sua publicação foi criada e já está disponível no mural da timeline.");
        window.location.href = "timeline.html"; 
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