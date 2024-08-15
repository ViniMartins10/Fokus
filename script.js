const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const musicaFocoInput = document.querySelector('#alternar-musica') // quando pega do html pelo id 
const iniciarOuPausarBt = document.querySelector('#start-pause span')
const musica = new Audio('/sons/luna-rise-part-one.mp3') //readFile() Se for muito pesado não é recomendado
const startPauseBt = document.querySelector('#start-pause')
const imagePause = document.querySelector('.app__card-primary-butto-icon')
const playSom = new Audio('/sons/play.wav') 
const pauseSom = new Audio('/sons/pause.mp3')
const fimSom = new Audio('/sons/beep.mp3')
const tempoNaTela = document.querySelector("#timer")

let tempoDecorridoEmSegundos = 10
let intervaloId = null

musica.loop = true
playSom.loop = false

musicaFocoInput.addEventListener('change', () => {
    if(musica.paused){
        musica.play()
    } else{
        musica.pause()
    }
})

focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 10
    alterarContexto('foco')
    focoBt.classList.add('active')
})

curtoBt.addEventListener("click", () => {
    tempoDecorridoEmSegundos = 300
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
})

longoBt.addEventListener("click", () => {
    tempoDecorridoEmSegundos = 900
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
})

startPauseBt.addEventListener('click', () => {
    if(intervaloId){
        pauseSom.play()
    }
    else{
        playSom.play()
    }
})

function alterarContexto(contexto){
    mostrarTempo()
    botoes.forEach(function(contexto){
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto',contexto)
    banner.setAttribute('src', `/imagens/${contexto}.png`)
    switch(contexto){
        case "foco":
            titulo.innerHTML = `Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;
        
        case "descanso-curto":
            titulo.innerHTML = `Que tal dar uma respirada?<br>
            <strong class ="app__title-strong">Faça uma pausa curta!</strong>`
            break;
        case "descanso-longo":
            titulo.innerHTML = `Hora de voltar à superficie.<br>
            <strong class = "app__title-strong">Faça uma pausa longa.</strong>`
            break;
        default:
            break;
    }
}

//sempre visualizar as classes no html para os comandos Javascript


const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0){
        fimSom.play()
        alert('tempo finalizado')
        const focoAtivo = html.getAttribute('data-contexto') == 'foco'
        if (focoAtivo) {
            const evento = new CustomEvent('FocoFinalizado')
            document.dispatchEvent(evento)
        }
        
        zerar()
        return
    }
    tempoDecorridoEmSegundos -= 1
    mostrarTempo()
}

startPauseBt.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar () {
    if(intervaloId){
        zerar()
        iniciarOuPausarBt.textContent = "Começar"
        imagePause.setAttribute('src', `/imagens/play_arrow.png`)
        return
    }
    intervaloId  = setInterval(contagemRegressiva, 1000) // valor em milisegundos
    iniciarOuPausarBt.textContent = "Pausar"
    imagePause.setAttribute('src', `/imagens/pause.png`)
}

function zerar(){
    clearInterval(intervaloId)
    intervaloId = null
}

function mostrarTempo(){
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo()