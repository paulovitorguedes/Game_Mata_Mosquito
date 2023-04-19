//window.innerWidth e window.innerHeight busca o tamanho da janela "comprimrnto e altura", será utilizado para o mosquito não ultrapassar o tamanho da janela
var altura = window.innerHeight;
var largura = window.innerWidth;
var vida = 3;
var tempo = 20;
var timeDificult = 0;
var nivel = null;

//Chama a função para setar o nivel de dificuldade do jogo
setDificult();

//Inicia o cronotro na tela e encaminha para página vitória caso o time finalize
setCronometro();

// Função do botão inicar jogo da index.html
function iniciaJogo() {
    //Recupera o nível selecionado na variavel local nivel
    nivel = document.getElementById('nivel').value;
    if (nivel === '') {
        alert('Selecione um nível para iniciar o jogo');
        return false; //finaliza a lógica da função
    }
    //Direciona para a página app.html com informação do nivel na URL
    window.location.href = "../_vew/app.html?" + nivel;
}






//Recebe os dados da URL com o nivel do jogo
function setDificult() {
    nivel = window.location.search; //Variável recebe o valor da URL incluindo o ?
    nivel = nivel.replace('?', ''); //Apaga o char ? da informação recuperada da URL 
    if (nivel === 'facil') {
        timeDificult = 3000;
    } else if (nivel === 'medio') {
        timeDificult = 2000;
    } else if (nivel === 'dificil') {
        timeDificult = 1000;
    }
}





//Contágem do Cronometro na tela
function setCronometro(){
    document.getElementById('cronometro').innerHTML = tempo; //Apresenta o valor inicial do cronometro na tela 
    var cronometro = setInterval(function () {
        if (tempo == 0) {
            document.getElementById('cronometro').innerHTML = tempo;
            clearInterval(cronometro);//finaliza o setainterval para impedir a contagem com nr negativo
            window.location.href = "../_vew/vitoria.html"; //Com o valor do cronometro zero, redireciona para página vitória.html
        }
        document.getElementById('cronometro').innerHTML = tempo; 
        tempo--; //decremento do tempo para o cronometro
    }, 1000); //intervalo de 1 segundo
}
 






//A função cria intervalo de tempo do reposicionamento do mosquito
//quanto menor o tempo, maior a dificuldade do jogo
randomPosition();
setInterval(function () {
    randomPosition();
}, timeDificult); // timeDificult será alterado conforme a seleção da dificuldade do jogo.




// Muda de forma randômica a posição do mosquito
function randomPosition() {

    // Remover o mosquito anterior (caso exista)
    // Caso exista o elemento mosquito, o retorno é Thue, caso negativo retorna null
    if (document.getElementById('mosquito')) {
        document.getElementById('mosquito').remove();
        // Para cada mosquito removido automaticanente, será reallizado a mudança do coração cheio para vazio
        //total de 3 alterações para finalizar o jogo 
        if (vida > 1) {
            document.getElementById('v' + vida).src = "../_img/coracao_vazio.png"; // class v1, v2, v3
            vida--;
        } else {
            document.getElementById('v' + vida).src = "../_img/coracao_vazio.png";
            // window.location.href > direcionana para uma nova página html
            window.location.href = "../_vew/fim_jogo.html";
        }

    }

    if (document.getElementById('fumaca')) {
        document.getElementById('fumaca').remove();
    }


    // Math.random busca um valor randomico
    // Math.floor aredonda o valor
    // Caso a posição da imagem cair próximo ao canto direito da tela, o comprimento da imagem irá passar da tela e criando uma barra de rolagem
    // Neste cado subtraimos uma valor em pixel superior a largura da imagem
    var positionX = Math.floor(Math.random() * largura) - 90;
    var positionY = Math.floor(Math.random() * altura) - 90;
    positionX = positionX < 0 ? 0 : positionX;
    positionY = positionY < 0 ? 0 : positionY;

    // cria um document img
    var mosquito = document.createElement('img'); //cria o elemento img
    mosquito.src = '../_img/mosquito.png'; //adiciona o endereço da imagem mosquito "src"
    mosquito.className = randonSize() + " " + randonMirror(); // classe composta
    mosquito.style.left = positionX + 'px';
    mosquito.style.top = positionY + 'px';
    mosquito.style.position = 'absolute';
    mosquito.id = 'mosquito';

    //função onclik, ao clicar sobre o mosquito, altera a imagem "src" para fumaça e "id" para fumaça 
    mosquito.onclick = function () {
        //this.remove(); //esse comando removeria a imagem
        mosquito.src = '../_img/fumaca.png';
        mosquito.id = 'fumaca';
    }

    // cria um filho para o body
    document.body.appendChild(mosquito);
}





// Muda de forma randômica o tamanho do mosquito
//set a classe para imagrm mosquito
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
//set a classe para imagrm mosquito
function randonMirror() {
    var classe = Math.floor(Math.random() * 2);

    switch (classe) {
        case 0:
            return 'ladoA';
        case 1:
            return 'ladoB';
    }
}





