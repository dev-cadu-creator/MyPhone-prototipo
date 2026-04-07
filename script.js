const senhaAcesso = "98712560@Ca"; 
let tentativa = prompt("Digite a senha para visualizar o protótipo:");

if (tentativa !== senhaAcesso) {
    document.body.innerHTML = "<h1 style='color:white; text-align:center; margin-top:50px;'>Acesso Negado</h1>";
    window.stop();
}

// =========================================
// 1. ABRIR E FECHAR A GAVETA DO CARRINHO
// =========================================
const carrinho = document.getElementById('carrinho');
const btnFechar = document.querySelector('.btn-fechar-carrinho');

function fecharCarrinho() {
    carrinho.style.right = '-400px'; 
}

if (btnFechar) {
    btnFechar.addEventListener('click', fecharCarrinho);
}

// =========================================
// 2. A MÁGICA DE ADICIONAR PRODUTOS
// =========================================
let itensNoCarrinho = []; 

function atualizarCarrinho() {
    const containerItens = document.querySelector('.itens-carrinho');
    containerItens.innerHTML = ''; 
    let total = 0;

    itensNoCarrinho.forEach(item => {
        containerItens.innerHTML += `
            <div class="item-no-carrinho">
                <img src="${item.imagem}" alt="${item.nome}" class="img-mini-carrinho">
                <div class="info-item-carrinho">
                    <h4>${item.nome}</h4>
                    <span class="preco-item-carrinho">R$ ${item.preco.toFixed(2).replace('.', ',')}</span>
                </div>
            </div>
        `;
        total += item.preco;
    });

    document.querySelector('.valor-total').innerText = `R$ ${total.toFixed(2).replace('.', ',')}`;

    const contadorCarrinho = document.getElementById('contador-carrinho');
    
    if (itensNoCarrinho.length > 0) {
        contadorCarrinho.innerText = itensNoCarrinho.length;
        contadorCarrinho.style.display = 'inline-block'; 
    } else {
        contadorCarrinho.style.display = 'none'; 
    }
} 

const botoesComprar = document.querySelectorAll('.btn-comprar');

botoesComprar.forEach(botao => {
    botao.addEventListener('click', function(event) {
        const card = event.target.closest('.card-produto');
        
        const nome = card.querySelector('.nome-produto').innerText;
        const imagem = card.querySelector('.imagem-produto').src;
        const precoTexto = card.querySelector('.preco-novo').innerText;
        
        const precoNumero = parseFloat(precoTexto.replace('R$ ', '').replace('.', '').replace(',', '.'));

        itensNoCarrinho.push({
            nome: nome,
            imagem: imagem,
            preco: precoNumero
        });
        
        atualizarCarrinho();
        console.log(nome + " adicionado!");

        const contador = document.getElementById('contador-carrinho');
        contador.style.transform = 'scale(1.5)'; 
        contador.style.backgroundColor = '#ff0000';

        setTimeout(() => {
            contador.style.transform = 'scale(1)'; 
            contador.style.backgroundColor = '#ff0000'; 
        }, 300);
    });
});

// =========================================
// 3. FINALIZAR COMPRA DIRETO NO WHATSAPP
// =========================================
const btnFinalizar = document.querySelector('.btn-finalizar-compra');

if (btnFinalizar) {
    btnFinalizar.addEventListener('click', function() {
        if (itensNoCarrinho.length === 0) {
            alert("Seu carrinho está vazio! Adicione alguns produtos primeiro.");
            return;
        }

        let textoPedido = "Olá! Gostaria de finalizar o seguinte pedido pelo site:\n\n";
        let total = 0;

        itensNoCarrinho.forEach(item => {
            textoPedido += `- ${item.nome} (R$ ${item.preco.toFixed(2).replace('.', ',')})\n`;
            total += item.preco;
        });

        textoPedido += `\n*Total a pagar: R$ ${total.toFixed(2).replace('.', ',')}*`;

        const textoFormatado = encodeURIComponent(textoPedido);
        window.open(`https://wa.me/5534998000828?text=${textoFormatado}`, '_blank');
    });
}

// =========================================
// 4. BOTÃO VOLTAR AO TOPO
// =========================================
const btnTopo = document.getElementById("btn-topo");

window.onscroll = function() {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        btnTopo.style.display = "block";
    } else {
        btnTopo.style.display = "none";
    }
};

if (btnTopo) {
    btnTopo.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// =========================================
// 5. ABRIR CARRINHO PELO MENU (Agora só abre aqui!)
// =========================================
const btnAbrirMenu = document.getElementById('btn-abrir-carrinho');

if (btnAbrirMenu) {
    btnAbrirMenu.addEventListener('click', function(event) {
        event.preventDefault(); 
        carrinho.style.right = '0'; // Aqui ele continua abrindo quando o usuário clica no ícone
    });
}

// =========================================
// 6. ESVAZIAR O CARRINHO
// =========================================
const btnLimpar = document.getElementById('btn-limpar-carrinho');

if (btnLimpar) {
    btnLimpar.addEventListener('click', function() {
        if (itensNoCarrinho.length === 0) {
            alert("O carrinho já está vazio!");
            return;
        }
        itensNoCarrinho = [];
        atualizarCarrinho();
    });
}

// =========================================
// LÓGICA DA ESCALA 12x36 (NAYARA E TAMIRES)
// =========================================
const botaoVendas = document.getElementById('btn-whatsapp-vendas');
const botaoAssistencia = document.getElementById('btn-whatsapp-assistencia');

function chamarNoZap(event, setor) {
    event.preventDefault(); 

    const zapNayara = "5534997340117"; 
    const zapTamires = "5534999999992";

    const dataBase = new Date(2026, 3, 7); 
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0); 

    const diferencaDias = Math.floor((hoje - dataBase) / (1000 * 60 * 60 * 24));

    let zapPlantao = (diferencaDias % 2 === 0) ? zapNayara : zapTamires;
    let nomePlantao = (diferencaDias % 2 === 0) ? "Nayara" : "Tamires";

    let mensagem = "";
    if (setor === "vendas") {
        mensagem = `Olá ${nomePlantao}! Vim pelo site da myPhone e gostaria de falar com uma vendedora.`;
    } else if (setor === "assistencia") {
        mensagem = `Olá ${nomePlantao}! Vim pelo site da myPhone e preciso de um orçamento de assistência técnica.`;
    }

    window.open(`https://wa.me/${zapPlantao}?text=${encodeURIComponent(mensagem)}`, '_blank');
}

if (botaoVendas) {
    botaoVendas.addEventListener('click', function(e) { 
        chamarNoZap(e, "vendas"); 
    });
}

if (botaoAssistencia) {
    botaoAssistencia.addEventListener('click', function(e) { 
        chamarNoZap(e, "assistencia"); 
    });
}