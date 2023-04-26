//window.innerWidth e window.innerHeight busca o tamanho da janela "comprimrnto e altura", será utilizado para o mosquito não ultrapassar o tamanho da janela
var altura = window.innerHeight;
var largura = window.innerWidth;
var vida = 3;
var tempo = 20;
var timeDificult = 0;
var nivel = null;
var pontos = 0;
var record = 0;
var url = window.location.href;
var semCronometro = false;



//As informações de 'nível', 'pontos' e 'record' serão trafegadas pela URL. A condicional abaixo analisa as paginas html recuperando essas informações para apresentação na tela
//Não entrará na condicional em caso de primeiro acesso.
if (window.location.search) {

    if (url.indexOf("app.html") >= 0) {  //Págna app.html
        url = window.location.search.replace('?', ''); //remove a char ? da string
        const param = url.split('-');//Divide a string pelo char '-' criando um Array de suas partes
        nivel = param[0].substring(2);//Remove os 2 char iniciais (n:), mantendo o valor do nivel
        record = param[1].substring(2);//Remove os 2 char iniciais (r:), mantendo o valor do record
        semCronometro = param[2].substring(2);//Remove os 2 char iniciais (c:), mantendo o valor do cronometro
        setDificult(nivel, semCronometro);

    } else if (url.indexOf("vitoria.html") >= 0 || url.indexOf("fim_jogo.html") >= 0) { //Págna vitoria.html e fim_jogo.html
        url = window.location.search.replace('?', '');
        const param = url.split('-');
        pontos = param[0].substring(2);
        record = param[1].substring(2);
        document.getElementById('pontos').innerHTML = pontos;

    } else { //Págna index.html
        url = window.location.search.replace('?', '');
        record = url.substring(2);
        document.getElementById('record').innerHTML = record;
    }



} else { //Estebelece valor zero ao Record no primeiro acesso
    document.getElementById('record').innerHTML = '0';
}



// Função do botão inicar jogo da index.html
function iniciaJogo() {
    //Recupera o nível selecionado na variavel local nivel
    nivel = document.getElementById('nivel').value;
    if (nivel === '') {
        alert('Selecione um nível para iniciar o jogo');
        return false; //finaliza a lógica da função
    }

    // verifica se checkbox sem cronometro está habilitado
    if(document.getElementById('time').checked) {
        semCronometro = true;
    } else {
        semCronometro = false;
    }

    //valor atribuido ao record
    var rd = document.getElementById('record').innerHTML;

    //Direciona para a página app.html com informação do nivel e Record na URL
    window.location.href = "../_vew/app.html?n:" + nivel + "-r:" + rd + "-c:" + semCronometro;
}






//Recebe os dados da URL com o nivel do jogo
function setDificult(nivel, sc) {

    if (nivel === 'facil') {
        timeDificult = 3000;
    } else if (nivel === 'medio') {
        timeDificult = 2000;
    } else if (nivel === 'dificil') {
        timeDificult = 1000;
    }

    //Inicia o cronotro na tela e encaminha para página vitória caso o time finalize
    if(!sc){
        alert('entrou');
        setCronometro();
    }
    setStart();
}





//Contágem do Cronometro na tela
function setCronometro() {
    document.getElementById('cronometro').innerHTML = tempo; //Apresenta o valor inicial do cronometro na tela 
    var cronometro = setInterval(function () {
        if (tempo == 0) {
            document.getElementById('cronometro').innerHTML = tempo;
            clearInterval(cronometro);//finaliza o setainterval para impedir a contagem com nr negativo

            if (pontos > record) { //Verifica se a pontiação ultrapassou record
                record = pontos;
            }

            window.location.href = "../_vew/vitoria.html?p:" + pontos + "-r:" + record; //Com o valor do cronometro zero, redireciona para página vitória.html com pontos como parametro
        }
        document.getElementById('cronometro').innerHTML = tempo;
        tempo--; //decremento do tempo para o cronometro
    }, 1000); //intervalo de 1 segundo
}






function setStart() {
    //A função cria intervalo de tempo do reposicionamento do mosquito
    //quanto menor o tempo, maior a dificuldade do jogo
    randomPosition();
    setInterval(function () {
        randomPosition();
    }, timeDificult); // timeDificult será alterado conforme a seleção da dificuldade do jogo.

}




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

            if (pontos > record) { //Verifica se a pontiação ultrapassou record
                record = pontos;
            }

            // window.location.href > direcionana para uma nova página html
            window.location.href = "../_vew/fim_jogo.html?p:" + pontos + "-r:" + record;
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


    //Adiciona o Audio de zumbido no fundo do jogo
    var audioZoom = document.getElementById('zumbido');
    audioZoom.play();
    

    //função onclik, ao clicar sobre o mosquito, altera a imagem "src" para fumaça e "id" para fumaça 
    mosquito.onclick = function () {
        //this.remove(); //esse comando removeria a imagem
        mosquito.src = '../_img/fumaca.png';
        mosquito.id = 'fumaca';
        pontos++;
        document.getElementById('pontos').innerHTML = pontos;

        //Adiciona audio simulando batida da raquete
        var audioPop = document.getElementById('pop');
        audioZoom.pause();
        audioPop.play();
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


// Função do botão Reinicar jogo das paginas vitoria.html e fim_jogo.html
function setReinicia() {
    window.location.href = "../_vew/index.html?r:" + record;
}

