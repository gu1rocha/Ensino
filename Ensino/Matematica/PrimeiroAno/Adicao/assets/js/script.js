const boxGame = document.querySelector('.boxGame')
const boxMacas = boxGame.querySelector('.boxMacas')
const boxLaranjas = boxGame.querySelector('.boxLaranjas')
const boxResult = boxGame.querySelector('.boxResult')
const boxConf = document.querySelector('.boxConf')
const btnJogar = boxConf.querySelector('.jogar')
const boxRealod = document.querySelector('.boxRealod')

const certo = document.querySelector('#certo')
const errado = document.querySelector('#errado')
const aplauso = document.querySelector('#aplauso')

let error = false, verificador = 1, text = '', numMaca = 0, numLaranja = 0, step = 1

let gerarNum = (max) => Math.floor(Math.random() * max) + 1;

let GerarFrutas = (local, srcImg, qtd)=>{
    local.innerHTML = ''
    for (let i = 0; i < qtd; i++) {
        let fruta = `<img src="${srcImg}">`
        local.innerHTML += fruta
    }
}

let PlayAudio = elemento =>{
    elemento.pause()
    elemento.currentTime = 0;
    elemento.play()
  }

let endGame = obj =>{
    boxConf.querySelector('h1').textContent = obj.h1Text
    boxConf.querySelector('h1').style.color = obj.h1Color
    boxConf.querySelector('h2').textContent = obj.h2Text
    boxConf.querySelector('.jogar').textContent = obj.btnText
    boxConf.removeAttribute('style')
    boxRealod.style.display = 'none';
}

let ValidarDados = (inputVerificar, valor, error)=>{
    if(+inputVerificar.value !== valor){
        inputVerificar.classList.add('error')
        return true
    }
    inputVerificar.classList.remove('error')
    return error
}


document.querySelector('button').addEventListener(('click'),()=>{
    error = false
    error = ValidarDados(boxMacas.querySelector('input'), numMaca, error)
    error = ValidarDados(boxLaranjas.querySelector('input'), numLaranja, error)
    error = ValidarDados(boxResult.querySelector('input'), (numMaca + numLaranja), error)

    if(error){
        PlayAudio(errado)
        boxRealod.removeAttribute('style')
    }else{
        step++
        if(step > 3){
            PlayAudio(aplauso)
            endGame({h1Text: 'PARABÉNS!!!', h2Text: 'VOCÊ CONSEGUIU!', h1Color: 'green', btnText: 'INICIAR'})
            step = 1
        }else{
            PlayAudio(certo)
            endGame({h1Text: 'PARABÉNS!!!', h2Text: 'VAMOS CONTINUAR?', h1Color: 'green', btnText: 'CONTINUAR'})
        }
    }
})

btnJogar.addEventListener('click',()=>{

    boxMacas.querySelector('input').value = ''
    boxLaranjas.querySelector('input').value = ''
    boxResult.querySelector('input').value = ''

    boxRealod.style.display = 'none';
    boxConf.style.display = 'none';
    numMaca = gerarNum(4); numLaranja = gerarNum(4)
    GerarFrutas(boxMacas.querySelector('.macas'),'assets/img/maca.png', numMaca)
    GerarFrutas(boxLaranjas.querySelector('.laranjas'),'assets/img/laranja.png', numLaranja)
})
