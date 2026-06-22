const btnEntrar = document.getElementById('btn-entrar');
if (btnEntrar) {
    btnEntrar.addEventListener('click', function() {
        const email = document.getElementById('email').value;
        const senha = document.getElementById('senha').value;
        const erroLogin = document.getElementById('erro-login');
        if (erroLogin) erroLogin.textContent = "";
        
        if (email === "" || senha === "") {
            if (erroLogin) erroLogin.textContent = "Por favor, preencha todos os campos!";
        } else if (!email.includes("@unirio.br") && !email.includes("@edu.unirio.br")) {
            if (erroLogin) erroLogin.textContent = "Use um e-mail institucional da UNIRIO.";
        } else if (senha.length < 4) { 
            if (erroLogin) erroLogin.textContent = "Senha inválida!";
        } else {
            window.location.href = "timeline.html"; 
        }
    });
}

const btnCrieConta = document.getElementById('btn-crie-conta');
if (btnCrieConta) {
    btnCrieConta.addEventListener('click', () => window.location.href = "cadastro1.html");
}

const btnProsseguir = document.getElementById('btn-prosseguir');
if (btnProsseguir) {
    btnProsseguir.addEventListener('click', function() {
        const email = document.getElementById('cad-email').value;
        const senha = document.getElementById('cad-senha').value;
        const confirmaSenha = document.getElementById('cad-confirma-senha').value;
        const erroCadastro = document.getElementById('erro-cadastro');
        if (erroCadastro) erroCadastro.textContent = "";

        if (email === "" || senha === "" || confirmaSenha === "") {
            if (erroCadastro) erroCadastro.textContent = "Por favor, preencha todos os campos!";
        } else if (!email.includes("@unirio.br") && !email.includes("@edu.unirio.br")) {
            if (erroCadastro) erroCadastro.textContent = "Use um e-mail institucional da UNIRIO.";
        } else if (senha.length < 4) {
            if (erroCadastro) erroCadastro.textContent = "A senha deve ter pelo menos 4 caracteres.";
        } else if (senha !== confirmaSenha) {
            if (erroCadastro) erroCadastro.textContent = "As senhas não coincidem!";
        } else {
            window.location.href = "cadastro2.html";
        }
    });
}

const btnCriarConta = document.getElementById('btn-criar-conta');
if (btnCriarConta) {
    btnCriarConta.addEventListener('click', function() {
        const nome = document.getElementById('cad-nome').value.trim();
        const nascimento = document.getElementById('cad-nascimento').value.trim();
        const curso = document.getElementById('cad-curso').value.trim();
        const erroDados = document.getElementById('erro-dados');
        if (erroDados) erroDados.textContent = "";

        if (nome === "" || nascimento === "" || curso === "") {
            if (erroDados) erroDados.textContent = "Por favor, preencha todos os seus dados pessoais!";
            return;
        }
        
        const hoje = new Date();
        const dataNasc = new Date(nascimento);
        let idade = hoje.getFullYear() - dataNasc.getFullYear();
        localStorage.setItem('unihub_nome', nome);
        localStorage.setItem('unihub_curso', curso);
        localStorage.setItem('unihub_idade', idade + " Anos");
        window.location.href = "timeline.html";
    });
}

document.addEventListener("DOMContentLoaded", function() {
    const nomeSalvo = localStorage.getItem('unihub_nome') || "Jorge Filho";
    const cursoSalvo = localStorage.getItem('unihub_curso') || "CCH - Pedagogia";
    const idadeSalva = localStorage.getItem('unihub_idade') || "21 Anos";
    const bioSalva = localStorage.getItem('unihub_bio') || "Gosto de esportes calmos";

    document.querySelectorAll('.nome-perfil-clicavel').forEach(el => el.textContent = nomeSalvo);
    const txtCurso = document.querySelector('.profile-body .course');
    if (txtCurso) txtCurso.textContent = cursoSalvo;
    const txtIdade = document.querySelector('.profile-body .age');
    if (txtIdade) txtIdade.textContent = idadeSalva;
    const txtBio = document.querySelector('.profile-body .bio');
    if (txtBio) txtBio.textContent = bioSalva;

    const inputNovoPost = document.getElementById('input-novo-post');
    const feedContainer = document.getElementById('feed-container');

    if (inputNovoPost && feedContainer) {
        inputNovoPost.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                const conteudoDoPost = inputNovoPost.value.trim();
                
                if (conteudoDoPost !== "") {
                    const novoPost = document.createElement('div');
                    novoPost.className = 'post-card';
                    novoPost.innerHTML = `
                        <div class="post-header">
                            <img src="images/avatar-jorge.png" class="avatar-small avatar-clicavel" alt="Avatar">
                            <div class="post-info">
                                <h4 class="nome-perfil-clicavel">${nomeSalvo}</h4>
                                <span>Postou uma nova atividade • Agora mesmo</span>
                            </div>
                        </div>
                        <div class="post-content" style="padding: 10px 0;">
                            ${conteudoDoPost}
                        </div>
                        <div class="post-comments" style="background: #f9f9f9; border-radius: 6px; margin-bottom: 10px;"></div>
                        <div class="post-footer" style="display:flex; align-items:center; gap:10px;">
                            <button class="interactive-icon btn-republicar" title="Republicar" style="background:none; border:none; cursor:pointer; color: #666; font-size: 1.2rem;"><i class="fa-solid fa-retweet"></i></button>
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
        const btnRepublicar = postCard.querySelector('.btn-republicar'); 
        const inputComentario = postCard.querySelector('.input-comentario');
        const listaComentarios = postCard.querySelector('.post-comments');

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
                this.style.color = "#28a745";
                
                if (feedContainer) {
                    const postClonado = postCard.cloneNode(true);
                    
                    const btnRepublicarClone = postClonado.querySelector('.btn-republicar');
                    if (btnRepublicarClone) {
                        btnRepublicarClone.style.color = "#666";
                        btnRepublicarClone.classList.remove('ativo');
                    }

                    const inputComentarioClone = postClonado.querySelector('.input-comentario');
                    if (inputComentarioClone) inputComentarioClone.value = '';
                    
                    const listaComentariosClone = postClonado.querySelector('.post-comments');
                    if (listaComentariosClone) listaComentariosClone.innerHTML = '';
                    
                    const postInfoTexto = postClonado.querySelector('.post-info span');
                    if (postInfoTexto) {
                        postInfoTexto.textContent = "Republicou esta atividade • Agora mesmo";
                    }

                    feedContainer.insertBefore(postClonado, feedContainer.firstChild);
                    
                    adicionarInteratividadeAoPost(postClonado);
                    aplicarCliquesDePerfil(postClonado);
                }
            });
        }

        if (inputComentario && listaComentarios) {
            inputComentario.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' && this.value.trim() !== "") {
                    e.preventDefault();
                    const texto = this.value.trim();
                    const item = document.createElement('div');
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

    function aplicarCliquesDePerfil(container) {
        container.querySelectorAll('.avatar-clicavel, .nome-perfil-clicavel').forEach(elemento => {
            elemento.style.cursor = "pointer";
            elemento.addEventListener('click', () => window.location.href = "perfil.html");
        });
    }

    document.querySelectorAll('.post-card').forEach(post => {
        adicionarInteratividadeAoPost(post);
        aplicarCliquesDePerfil(post);
    });

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
                if (typeof hiddenDateInput.showPicker === 'function') {
                    hiddenDateInput.showPicker();
                } else {
                    hiddenDateInput.click();
                }
            } else if (textoBotao.includes("Câmera")) {
                if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                    navigator.mediaDevices.getUserMedia({ video: true })
                        .then(function(stream) {
                            alert("Permissão concedida! Câmera conectada com sucesso.");
                            stream.getTracks().forEach(track => track.stop());
                        })
                        .catch(function() {
                            alert("Acesso à câmera negado ou dispositivo não encontrado.");
                        });
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

    const inputBusca = document.querySelector('.search-bar');
    const msgSemResultados = document.getElementById('sem-resultados');

    if (inputBusca) {
        inputBusca.addEventListener('input', function() {
            const termo = this.value.toLowerCase().trim();
            const cards = document.querySelectorAll('#feed-container .post-card');
            let encontrouAlgo = false;

            cards.forEach(card => {
                const textoCard = card.textContent.toLowerCase();

                if (textoCard.includes(termo)) {
                    card.style.display = ""; 
                    encontrouAlgo = true;
                } else {
                    card.style.display = "none"; 
                }
            });

            if (!encontrouAlgo && termo !== "") {
                if (msgSemResultados) msgSemResultados.style.display = "block";
            } else {
                if (msgSemResultados) msgSemResultados.style.display = "none";
            }
        });
    }

    const btnSair = document.getElementById('btn-sair');
    if (btnSair) {
        btnSair.addEventListener('click', function(e) {
            e.preventDefault();
            if (confirm("Você tem certeza que deseja sair do UniHub?")) window.location.href = "index.html";
        });
    }

    const btnConfirmar = document.getElementById('btn-confirmar-presenca');
    if (btnConfirmar) {
        btnConfirmar.addEventListener('click', function() {
            this.textContent = "✓ Presença Confirmada!";
            this.style.backgroundColor = "#28a745";
            this.style.color = "#fff";
        });
    }
});

const btnClip = document.getElementById('btn-clip-attach');
const hiddenFileChat = document.getElementById('chat-hidden-file');
const inputChat = document.getElementById('chat-input-field');
const btnEnviarMsg = document.getElementById('btn-send-message');
const containerMensagens = document.getElementById('chat-messages-container');

if (btnClip && hiddenFileChat) {
    btnClip.addEventListener('click', function(e) {
        e.preventDefault();
        hiddenFileChat.click();
    });
    
    hiddenFileChat.addEventListener('change', function() {
        if (this.files.length > 0 && inputChat) {
            inputChat.value += ` [Arquivo: ${this.files[0].name}]`;
            inputChat.focus();
        }
    });
}

function enviarMensagemChat() {
    if (!inputChat || !containerMensagens) return;
    const textoMensagem = inputChat.value.trim();
    if (textoMensagem !== "") {
        const novaMsgDiv = document.createElement('div');
        novaMsgDiv.className = 'message right';
        novaMsgDiv.innerHTML = `<div class="bubble blue">${textoMensagem}</div>`;
        containerMensagens.appendChild(novaMsgDiv);
        inputChat.value = "";
        containerMensagens.scrollTop = containerMensagens.scrollHeight;
    }
}

if (btnEnviarMsg) {
    btnEnviarMsg.addEventListener('click', function(e) {
        e.preventDefault();
        enviarMensagemChat();
    });
}

if (inputChat) {
    inputChat.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            enviarMensagemChat();
        }
    });
}

document.querySelectorAll('.chat-item').forEach(item => {
    item.addEventListener('click', function() {
        document.querySelectorAll('.chat-item').forEach(i => i.classList.remove('active'));
        this.classList.add('active');
        
        const nomeGrupo = this.querySelector('.chat-info h4').textContent;
        const srcAvatar = this.querySelector('.chat-avatar').src;
        
        const headerNome = document.getElementById('header-nome');
        const headerAvatar = document.getElementById('header-avatar');
        
        if (headerNome) headerNome.textContent = nomeGrupo;
        if (headerAvatar) headerAvatar.src = srcAvatar;
        if (inputChat) inputChat.value = "";
    });
});
