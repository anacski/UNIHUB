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
    const avatarSalvo = localStorage.getItem('unihub_avatar') || "images/avatar-jorge.png";
    const capaSalva = localStorage.getItem('unihub_capa') || "";

    document.querySelectorAll('.nome-perfil-clicavel').forEach(el => el.textContent = nomeSalvo);
    
    const h2Perfil = document.querySelector('.profile-body h2');
    if (h2Perfil) h2Perfil.textContent = nomeSalvo;

    const txtCurso = document.querySelector('.profile-body .course');
    if (txtCurso) txtCurso.textContent = cursoSalvo;
    
    const txtIdade = document.querySelector('.profile-body .age');
    if (txtIdade) txtIdade.textContent = idadeSalva;
    
    const txtBio = document.querySelector('.profile-body .bio');
    if (txtBio) txtBio.textContent = bioSalva;

    document.querySelectorAll('.avatar-large').forEach(img => img.src = avatarSalvo);
    
    document.querySelectorAll('.profile-header').forEach(header => {
        if (capaSalva) {
            header.style.backgroundImage = `url(${capaSalva})`;
            header.style.backgroundSize = "cover";
            header.style.backgroundPosition = "center";
        }
    });

    const cardPerfilAtalho = document.getElementById('card-perfil-atalho');
    if (cardPerfilAtalho) {
        cardPerfilAtalho.addEventListener('click', () => window.location.href = "perfil.html");
    }

    const formEditarPerfil = document.getElementById('form-editar-perfil');
    if (formEditarPerfil) {
        const inputNome = document.getElementById('edit-nome');
        const inputCurso = document.getElementById('edit-curso');
        const inputIdade = document.getElementById('edit-idade');
        const inputBio = document.getElementById('edit-bio');
        const fileCapa = document.getElementById('file-capa');
        const fileAvatar = document.getElementById('file-avatar');
        
        const previewCapa = document.querySelector('.edit-header-preview');
        const previewAvatar = document.querySelector('.edit-avatar-preview');

        if(inputNome) inputNome.value = nomeSalvo;
        if(inputCurso) inputCurso.value = cursoSalvo;
        if(inputIdade) inputIdade.value = idadeSalva.replace(" Anos", "").trim();
        if(inputBio) inputBio.value = bioSalva;
        if(previewAvatar) previewAvatar.src = avatarSalvo;
        if(previewCapa && capaSalva) {
            previewCapa.style.backgroundImage = `url(${capaSalva})`;
            previewCapa.style.backgroundSize = "cover";
            previewCapa.style.backgroundPosition = "center";
        }

        let base64Avatar = avatarSalvo;
        let base64Capa = capaSalva;

        if (fileAvatar) {
            fileAvatar.addEventListener('change', function() {
                const file = this.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        base64Avatar = e.target.result;
                        if (previewAvatar) previewAvatar.src = base64Avatar;
                    };
                    reader.readAsDataURL(file);
                }
            });
        }

        if (fileCapa) {
            fileCapa.addEventListener('change', function() {
                const file = this.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        base64Capa = e.target.result;
                        if (previewCapa) {
                            previewCapa.style.backgroundImage = `url(${base64Capa})`;
                            previewCapa.style.backgroundSize = "cover";
                            previewCapa.style.backgroundPosition = "center";
                        }
                    };
                    reader.readAsDataURL(file);
                }
            });
        }

        formEditarPerfil.addEventListener('submit', function(e) {
            e.preventDefault();
            
            localStorage.setItem('unihub_nome', inputNome.value.trim());
            localStorage.setItem('unihub_curso', inputCurso.value.trim());
            localStorage.setItem('unihub_idade', inputIdade.value.trim() + " Anos");
            localStorage.setItem('unihub_bio', inputBio.value.trim());
            localStorage.setItem('unihub_avatar', base64Avatar);
            localStorage.setItem('unihub_capa', base64Capa);

            window.location.href = "perfil.html";
        });
    }

    const inputNovoPost = document.getElementById('input-novo-post');
    const feedContainer = document.getElementById('feed-container');

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
                        btnRepublicarClone.style.color = "";
                        btnRepublicarClone.classList.remove('ativo');
                    }
                    const inputComentarioClone = postClonado.querySelector('.input-comentario');
                    if (inputComentarioClone) inputComentarioClone.value = '';
                    
                    const listaComentariosClone = postClonado.querySelector('.post-comments');
                    if (listaComentariosClone) listaComentariosClone.innerHTML = '';
                    
                    const postInfoTexto = postClonado.querySelector('.post-info span');
                    if (postInfoTexto) postInfoTexto.textContent = "Republicou esta atividade • Agora mesmo";

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
                    item.style.padding = "8px 12px";
                    item.style.backgroundColor = "#f0f2f5";
                    item.style.borderRadius = "15px";
                    item.style.margin = "5px 10px";
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

    const formEvento = document.getElementById('event-form');
    if (formEvento) {
        formEvento.addEventListener('submit', function(e) {
            e.preventDefault();
            const inputNome = document.getElementById('event-name');
            const inputLocal = document.getElementById('event-location');
            const inputData = document.getElementById('event-date');
            const inputDesc = document.getElementById('event-desc');

            if (inputNome && inputLocal && inputData && inputDesc) {
                let dataFormatada = "";
                if (inputData.value) {
                    const dataObj = new Date(inputData.value);
                    const dia = String(dataObj.getDate()).padStart(2, '0');
                    const mes = String(dataObj.getMonth() + 1).padStart(2, '0');
                    const ano = dataObj.getFullYear();
                    const horas = String(dataObj.getHours()).padStart(2, '0');
                    const minutos = String(dataObj.getMinutes()).padStart(2, '0');
                    dataFormatada = `${dia}/${mes}/${ano} às ${horas}:${minutos}h`;
                }

                const novoEventoObj = {
                    titulo: inputNome.value.trim(),
                    local: inputLocal.value.trim(),
                    data: dataFormatada,
                    descricao: inputDesc.value.trim()
                };

                localStorage.setItem('unihub_novo_evento', JSON.stringify(novoEventoObj));
                window.location.href = "timeline.html";
            }
        });
    }

    const eventoPendente = localStorage.getItem('unihub_novo_evento');
    if (eventoPendente && feedContainer) {
        const dados = JSON.parse(eventoPendente);
        const cardEvento = document.createElement('div');
        cardEvento.className = 'post-card';
        cardEvento.innerHTML = `
            <div class="post-header">
                <img src="${avatarSalvo}" class="avatar-small avatar-clicavel" alt="Avatar">
                <div class="post-info">
                    <h4 class="nome-perfil-clicavel">${nomeSalvo}</h4>
                    <span>Postou um novo evento • Agora mesmo</span>
                </div>
            </div>
            <div class="event-card">
                <h5>${dados.titulo}</h5>
                ${dados.descricao ? `<p>${dados.descricao}</p>` : ''}
                <p><strong>Data/Hora</strong> ${dados.data}</p>
                <p>📍 ${dados.local}.</p>
                <button class="btn-confirm">Confirmar presença</button>
            </div>
            <div class="post-comments" style="background: #f9f9f9; border-radius: 6px; margin-bottom: 10px;"></div>
            <div class="post-footer">
                <button class="interactive-icon btn-republicar" title="Republicar" style="background:none; border:none; cursor:pointer; color: #666; font-size: 1.2rem;"><i class="fa-solid fa-retweet"></i></button>
                <button class="interactive-icon btn-curtir" title="Curtir"><i class="fa-regular fa-heart"></i></button>
                <input type="text" class="input-comentario" placeholder="Faça um comentário e aperte Enter">
                <button class="interactive-icon btn-salvar" title="Salvar"><i class="fa-regular fa-bookmark"></i></button>
            </div>
        `;
        feedContainer.insertBefore(cardEvento, feedContainer.children[1]);
        localStorage.removeItem('unihub_novo_evento');
        
        adicionarInteratividadeAoPost(cardEvento);
        aplicarCliquesDePerfil(cardEvento);

        const btnNovoConfirmar = cardEvento.querySelector('.btn-confirm');
        if (btnNovoConfirmar) {
            btnNovoConfirmar.addEventListener('click', function() {
                this.textContent = "✓ Presença Confirmada!";
                this.style.backgroundColor = "#28a745";
                this.style.color = "#fff";
                this.style.border = "none";
            });
        }
    }

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
                            <img src="${avatarSalvo}" class="avatar-small avatar-clicavel" alt="Avatar">
                            <div class="post-info">
                                <h4 class="nome-perfil-clicavel">${nomeSalvo}</h4>
                                <span>Postou uma nova atividade • Agora mesmo</span>
                            </div>
                        </div>
                        <div class="post-content">
                            ${conteudoDoPost}
                        </div>
                        <div class="post-comments" style="background: #f9f9f9; border-radius: 6px; margin-bottom: 10px;"></div>
                        <div class="post-footer">
                            <button class="interactive-icon btn-republicar" title="Republicar" style="background:none; border:none; cursor:pointer; color: #666; font-size: 1.2rem;"><i class="fa-solid fa-retweet"></i></button>
                            <button class="interactive-icon btn-curtir" title="Curtir"><i class="fa-regular fa-heart"></i></button>
                            <input type="text" class="input-comentario" placeholder="Faça um comentário e aperte Enter">
                            <button class="interactive-icon btn-salvar" title="Salvar"><i class="fa-regular fa-bookmark"></i></button>
                        </div>
                    `;
                    feedContainer.insertBefore(novoPost, feedContainer.children[1]);
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

    const botoesAcao = document.querySelectorAll('.action-btn');
    const hiddenPhotoInput = document.getElementById('hidden-photo-input');
    const hiddenVideoInput = document.getElementById('hidden-video-input');
    const hiddenDateInput = document.getElementById('hidden-date-input');

    botoesAcao.forEach(botao => {
        botao.style.cursor = "pointer";
        botao.addEventListener('click', function() {
            const textoBotao = this.textContent.trim();
            if (textoBotao.includes("Foto") && hiddenPhotoInput) hiddenPhotoInput.click();
            else if (textoBotao.includes("Vídeo") && hiddenVideoInput) hiddenVideoInput.click();
            else if (textoBotao.includes("Data") && hiddenDateInput) {
                if (typeof hiddenDateInput.showPicker === 'function') hiddenDateInput.showPicker();
                else hiddenDateInput.click();
            } else if (textoBotao.includes("Câmera")) {
                if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                    navigator.mediaDevices.getUserMedia({ video: true })
                        .then(stream => {
                            alert("Permissão concedida! Câmera conectada com sucesso.");
                            stream.getTracks().forEach(track => track.stop());
                        }).catch(() => alert("Acesso à câmera negado ou dispositivo não encontrado."));
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
            if (this.files.length > 0 && inputNovoPost) inputNovoPost.value += ` [Vídeo: ${this.files[0].name}]`;
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

    const inputBusca = document.getElementById('search-bar');
    const msgSemResultados = document.getElementById('sem-resultados');
    if (inputBusca) {
        inputBusca.addEventListener('input', function() {
            const termo = this.value.toLowerCase().trim();
            const cards = document.querySelectorAll('#feed-container .post-card');
            let encontrouAlgo = false;

            cards.forEach(card => {
                if (card.textContent.toLowerCase().includes(termo)) {
                    card.style.display = ""; 
                    encontrouAlgo = true;
                } else {
                    card.style.display = "none"; 
                }
            });

            if (msgSemResultados) msgSemResultados.style.display = (!encontrouAlgo && termo !== "") ? "block" : "none";
        });
    }

    const btnSair = document.getElementById('btn-sair');
    if (btnSair) {
        btnSair.addEventListener('click', function(e) {
            e.preventDefault();
            if (confirm("Você tem certeza que deseja sair do UniHub?")) window.location.href = "index.html";
        });
    }

    const btnConfirmarOriginal = document.getElementById('btn-confirmar-presenca');
    if (btnConfirmarOriginal) {
        btnConfirmarOriginal.addEventListener('click', function() {
            this.textContent = "✓ Presença Confirmada!";
            this.style.backgroundColor = "#28a745";
            this.style.color = "#fff";
            this.style.border = "none";
        });
    }
});

const btnClip = document.getElementById('btn-clip-attach');
const hiddenFileChat = document.getElementById('chat-hidden-file');
const inputChat = document.getElementById('chat-input-field');
const btnEnviarMsg = document.getElementById('btn-send-message');
const containerMensagens = document.getElementById('chat-messages-container');

let grupoAtivo = "Basquete";
const historicoChats = {
    "Xadrezin": [{ tipo: "left", texto: "E aí, vai rolar o treino no DA?" }, { tipo: "left", texto: "sábado não tem..." }],
    "Basquete": [{ tipo: "right", texto: "Vai ter jogo sábado?" }, { tipo: "left", texto: "15h no aterro" }, { tipo: "right", texto: "👍" }, { tipo: "left", html: '<img src="images/jogo-basquete.jpeg" class="media-preview" alt="Mídia">' }],
    "Vôlei": [{ tipo: "left", texto: "Quem vai levar a bola na sexta?" }, { tipo: "right", texto: "Eu levo!" }, { tipo: "left", texto: "boaaa!!!" }],
    "Ping pong": [{ tipo: "right", texto: "Perdi a raquete de novo kkkk" }, { tipo: "left", texto: "KKKKKKKKK" }]
};

if (btnClip && hiddenFileChat) {
    btnClip.addEventListener('click', e => { e.preventDefault(); hiddenFileChat.click(); });
    hiddenFileChat.addEventListener('change', function() {
        if (this.files.length > 0 && inputChat) {
            inputChat.value += ` [Arquivo: ${this.files[0].name}]`;
            inputChat.focus();
        }
    });
}

function renderizarMensagens(nomeGrupo) {
    if (!containerMensagens) return;
    containerMensagens.innerHTML = "";
    (historicoChats[nomeGrupo] || []).forEach(msg => {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${msg.tipo}`;
        msgDiv.innerHTML = msg.html ? msg.html : `<div class="bubble ${msg.tipo === "right" ? "blue" : "yellow"}">${msg.texto}</div>`;
        containerMensagens.appendChild(msgDiv);
    });
    containerMensagens.scrollTop = containerMensagens.scrollHeight;
}

function atualizarPreviaGrupo(nomeGrupo, texto) {
    document.querySelectorAll('.chat-item').forEach(item => {
        if (item.querySelector('.chat-info h4').textContent.includes(nomeGrupo)) {
            const p = item.querySelector('.chat-info p');
            if (p) p.textContent = texto;
        }
    });
}

function enviarMensagemChat() {
    if (!inputChat || !containerMensagens) return;
    const textoMensagem = inputChat.value.trim();
    if (textoMensagem !== "") {
        if (!historicoChats[grupoAtivo]) historicoChats[grupoAtivo] = [];
        historicoChats[grupoAtivo].push({ tipo: "right", texto: textoMensagem });
        renderizarMensagens(grupoAtivo);
        atualizarPreviaGrupo(grupoAtivo, textoMensagem);
        inputChat.value = "";
    }
}

if (btnEnviarMsg) btnEnviarMsg.addEventListener('click', e => { e.preventDefault(); enviarMensagemChat(); });
if (inputChat) inputChat.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); enviarMensagemChat(); } });

document.querySelectorAll('.chat-item').forEach(item => {
    item.addEventListener('click', function() {
        document.querySelectorAll('.chat-item').forEach(i => i.classList.remove('active'));
        this.classList.add('active');
        const h4Texto = this.querySelector('.chat-info h4').textContent;
        
        if (h4Texto.includes("Xadrezin")) grupoAtivo = "Xadrezin";
        else if (h4Texto.includes("Basquete")) grupoAtivo = "Basquete";
        else if (h4Texto.includes("Vôlei")) grupoAtivo = "Vôlei";
        else if (h4Texto.includes("Ping pong")) grupoAtivo = "Ping pong";
        
        const srcAvatar = this.querySelector('.chat-avatar').src;
        if (document.getElementById('header-nome')) document.getElementById('header-nome').textContent = h4Texto;
        if (document.getElementById('header-avatar')) document.getElementById('header-avatar').src = srcAvatar;
        if (inputChat) inputChat.value = "";
        renderizarMensagens(grupoAtivo);
    });
});
