const html = document.querySelector('html');
const focobt = document.querySelector('.app__card-button--foco');
const curtobt = document.querySelector('.app__card-button--curto');
const longobt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const imagemPlayPause = document.querySelector('.app__card-primary-butto-icon');
const startPauseBt = document.querySelector('#start-pause');
const musicafocoInput = document.querySelector('#alternar-musica');
const IniciarOuPausarBt = document.querySelector('#start-pause span');
const tempoNaTela = document.querySelector('#timer');
const musica = new Audio('sons/luna-rise-part-one.mp3');
const musicaPlay = new Audio('sons/play.wav');
const musicaPause = new Audio('sons/pause.mp3');
const chegaraZero = new Audio('sons/beep.mp3');

let tempoDeCorridoEmSegundos = 1500;
let intervaloId = null;

musica.loop = true;

musicafocoInput.addEventListener('change', () =>{
    if(musica.paused) {
          musica.play()
    } else {
        musica.pause()
    }
})

focobt.addEventListener('click', () => {
    tempoDeCorridoEmSegundos = 1500
    alterarContexto('foco')
    focobt.classList.add('active')
})

curtobt.addEventListener('click', () => {
    tempoDeCorridoEmSegundos = 300
    alterarContexto('descanso-curto')
    curtobt.classList.add('active')
})

longobt.addEventListener('click', () => {
    tempoDeCorridoEmSegundos = 900
    alterarContexto('descanso-longo')
    longobt.classList.add('active')
})

function alterarContexto(contexto) {
    mostrarTempo()
    botoes.forEach(function (contexto) {
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `./imagens/${contexto}.png`);
    switch (contexto){
        case "foco":
            titulo.innerHTML = `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;
        case "descanso-curto":
            titulo.innerHTML = `Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>`
            break;
        case "descanso-longo":
            titulo.innerHTML = `Hora de voltar à superfície.<strong class="app__title-strong"> Faça uma pausa longa.</strong>`
        default:    
            break;
    }
}

const contagemRegressiva = () =>{
    if(tempoDeCorridoEmSegundos <= 0){
        chegaraZero.play()
        alert('Tempo finalizado!')
        Zerar()
        return
    }
    tempoDeCorridoEmSegundos -= 1
    mostrarTempo()
}

startPauseBt.addEventListener('click', InciarOuPausar)

function InciarOuPausar(){
    if(intervaloId){
        musicaPause.play()
        imagemPlayPause.setAttribute('src', `./imagens/play_arrow.png`);
        Zerar()
        return
    }
    musicaPlay.play()
    intervaloId = setInterval(contagemRegressiva, 1000)
    IniciarOuPausarBt.textContent = "Pausar"
    imagemPlayPause.setAttribute('src', `./imagens/pause.png`);
}

function Zerar(){
    clearInterval(intervaloId)
    imagemPlayPause.setAttribute('src', `./imagens/play_arrow.png`);
    IniciarOuPausarBt.textContent = "Começar"
    intervaloId = null
}

function mostrarTempo(){
    const tempo = new Date(tempoDeCorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`    
}


mostrarTempo()