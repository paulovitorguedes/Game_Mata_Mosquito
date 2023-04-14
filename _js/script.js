var altura = 0;
var largura = 0;

// Mede a altura e largura da tela html
function ajustarTamanhoPalcoJogo() {
    largura = window.innerWidth;
    altura = window.innerHeight;
}
ajustarTamanhoPalcoJogo();

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
mosquito.className = 'mosquito1';
mosquito.style.left = positionX + 'px';
mosquito.style.top = positionY + 'px';
mosquito.style.position = 'absolute';

// cria um filho para o body
document.body.appendChild(mosquito)
console.log(positionX)