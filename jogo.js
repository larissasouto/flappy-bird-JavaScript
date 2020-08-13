console.log('Flappy Bird JS');

const sprites = new Image();
sprites.src='./sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

//plano de fundo
const planoDeFundo = {
    spriteX: 390,
    spriteY: 0,
    largura: 275,
    altura: 204,
    x: 0,
    y: canvas.height - 204,
    desenha(){
        contexto.fillStyle = '#70c5ce';
        contexto.fillRect(0,0, canvas.width, canvas.height);

        contexto.drawImage(
            sprites,
            planoDeFundo.spriteX, planoDeFundo.spriteY, // sprite X, sprite Y 
            planoDeFundo.largura, planoDeFundo.altura, // tamanho do recorte na sprite
            planoDeFundo.x, planoDeFundo.y, // onde começa dentro do canvas
            planoDeFundo.largura, planoDeFundo.altura, // tamanho dentro do canvas
        );

        contexto.drawImage(
            sprites,
            planoDeFundo.spriteX, planoDeFundo.spriteY, // sprite X, sprite Y 
            planoDeFundo.largura, planoDeFundo.altura, // tamanho do recorte na sprite
            (planoDeFundo.x + planoDeFundo.largura), planoDeFundo.y, // onde começa dentro do canvas
            planoDeFundo.largura, planoDeFundo.altura, // tamanho dentro do canvas
        );
    }
}

//chao
const chao = {
    spriteX: 0,
    spriteY: 610,
    largura: 224,
    altura: 112,
    x: 0,
    y: canvas.height - 112,
    desenha(){
        contexto.drawImage(
            sprites,
            chao.spriteX, chao.spriteY, // sprite X, sprite Y 
            chao.largura, chao.altura, // tamanho do recorte na sprite
            chao.x, chao.y, // onde começa dentro do canvas
            chao.largura, chao.altura, // tamanho dentro do canvas
        );

        contexto.drawImage(
            sprites,
            chao.spriteX, chao.spriteY, // sprite X, sprite Y 
            chao.largura, chao.altura, // tamanho do recorte na sprite
            (chao.x + chao.largura), chao.y, // onde começa dentro do canvas
            chao.largura, chao.altura, // tamanho dentro do canvas
        );
    }
}

//passarinho
const flappyBird = {
    spriteX: 0,
    spriteY: 0,
    largura: 33,
    altura: 24,
    x: 10,
    y: 50,
    gravidade: 0.25,
    velocidade: 0,
    atualiza(){
        flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade;
        flappyBird.y = flappyBird.y + flappyBird.velocidade;
    },
    desenha(){
        contexto.drawImage(
            sprites,
            flappyBird.spriteX, flappyBird.spriteY, // sprite X, sprite Y 
            flappyBird.largura, flappyBird.altura, // tamanho do recorte na sprite
            flappyBird.x, flappyBird.y, // onde começa dentro do canvas
            flappyBird.largura, flappyBird.altura, // tamanho dentro do canvas
        );
    }
}

//tela de início - mensagem Get Ready
const mensagemGetReady = {
    sX: 134,
    sY: 0,
    w: 174,
    h: 152,
    x: (canvas.width / 2) - 174 / 2,
    y: 50,
    desenha(){
        contexto.drawImage(
            sprites,
            mensagemGetReady.sX, mensagemGetReady.sY,
            mensagemGetReady.w, mensagemGetReady.h,
            mensagemGetReady.x, mensagemGetReady.y,
            mensagemGetReady.w, mensagemGetReady.h,
        );
    }
};

//=============================================
//                  [Telas]
//=============================================
let telaAtiva = {};
function mudaParaTela(novaTela) {
    telaAtiva = novaTela;
}

const Telas = {
    INICIO: {
        desenha(){
            planoDeFundo.desenha();
            chao.desenha();
            flappyBird.desenha();
            mensagemGetReady.desenha();
        },
        atualiza(){

        },
        click(){
            mudaParaTela(Telas.JOGO);
        }
    }
};

Telas.JOGO = {
    desenha(){
        planoDeFundo.desenha();
        chao.desenha();
        flappyBird.desenha();
    },
    atualiza(){
        flappyBird.atualiza();
    }
};

function loop(){
    telaAtiva.desenha();
    telaAtiva.atualiza();

    requestAnimationFrame(loop);
}

window.addEventListener('click', function(){
    if(telaAtiva.click){
        telaAtiva.click();
    }
})

mudaParaTela(Telas.INICIO);
loop();