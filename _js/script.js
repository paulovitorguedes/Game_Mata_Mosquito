var altura = 0;
var largura = 0;

ajustarTamanhoPalcoJogo();
randomPosition();

// o comando roda a function randomPosition() a cada 1000ms (1 segundo)
setInterval(function () {
    randomPosition();
}, 2000);


// Mede a altura e largura da tela html
function ajustarTamanhoPalcoJogo() {
    largura = window.innerWidth;
    altura = window.innerHeight;
}


// Muda de forma randômica a posição do mosquito
function randomPosition() {

    // Remover o mosquito anterior (caso exista)
    // Caso exista o elemento mosquito, o retorno é Thue, caso negativo retorna null
    if (document.getElementById('mosquito')) {
        document.getElementById('mosquito').remove();
    }


    // Math.random busca um valor randomico
    // Math.floor aredonda o vaalor
    // Caso a posição da imagem cair próximo ao canto direito da tela, o comprimento da imagem irá passar da tela e criando uma barra de rolagem
    // Neste cado subtraimos uma valor em pixel superior a largura da imagem
    var positionX = Math.floor(Math.random() * largura) - 90;
    var positionY = Math.floor(Math.random() * altura) - 90;
    positionX = positionX < 0 ? 0 : positionX;
    positionY = positionY < 0 ? 0 : positionY;

    // cria um document img
    var mosquito = document.createElement('img');
    mosquito.src = '_img/mosquito.png';
    mosquito.className = randonSize() + " " + randonMirror();
    mosquito.style.left = positionX + 'px';
    mosquito.style.top = positionY + 'px';
    mosquito.style.position = 'absolute';
    mosquito.id = 'mosquito';
    mosquito.onclick = function () {
        //this.remove();
        mosquito.src = '_img/fumaca.png';
    }

    // cria um filho para o body
    document.body.appendChild(mosquito);
    console.log(randonMirror())
}


// Muda de forma randômica o tamanho do mosquito
function randonSize() {
    var classe = Math.floor(Math.random() * 3);

    switch (classe) {
        case 0:
            return 'mosquito1';
        case 1:
            return 'mosquito2';
        case 2:
            return 'mosquito3';
    }
}



// Muda de forma randômica o lado do mosquito, espelhando a imagem
function randonMirror() {
    var classe = Math.floor(Math.random() * 2);

    switch (classe) {
        case 0:
            return 'ladoA';
        case 1:
            return 'ladoB';
    }
}