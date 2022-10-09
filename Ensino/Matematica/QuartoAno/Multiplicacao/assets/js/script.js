const boxGame = document.querySelector('.boxGame')
const boxResult = boxGame.querySelector('.boxResult')
const boxConf = document.querySelector('.boxConf')
const btnJogar = boxConf.querySelector('.jogar')
const boxRealod = document.querySelector('.boxRealod')

const inputMultiplicando = document.querySelector('#inputMultiplicando')
const inputMultiplicador = document.querySelector('#inputMultiplicador')

const certo = document.querySelector('#certo')
const errado = document.querySelector('#errado')
const aplauso = document.querySelector('#aplauso')

let error = false, verificador = 1, text = '', numMaca = 0, numBox = 0, step = 1

let gerarNum = (max, min) => Math.floor(Math.random() * (max - min + 1) + min);

let GerarFrutas = (local, srcImg, qtdMaca, qtdBox)=>{
    local.innerHTML = ''
    for (let i = 0; i < qtdMaca; i++) {
        let boxMacas = document.createElement('div')
        boxMacas.classList.add('boxMacas')
        local.appendChild(boxMacas)
        for(j = 0; j < qtdBox; j++){
            let fruta = `<img src="${srcImg}">`
            boxMacas.innerHTML += fruta
        }
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
    error = ValidarDados(inputMultiplicando, numBox, error)
    error = ValidarDados(inputMultiplicador, numMaca, error)
    error = ValidarDados(boxResult.querySelector('input'), (numMaca * numBox), error)

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

inputMultiplicando.addEventListener('change',()=>{
    document.querySelector('#Multiplicando').innerText = inputMultiplicando.value 
})

inputMultiplicador.addEventListener('change',()=>{
    document.querySelector('#Multiplicador').innerText = inputMultiplicador.value 
})

btnJogar.addEventListener('click',()=>{
    inputMultiplicando.value = ''
    inputMultiplicador.value = ''
    boxResult.querySelector('input').value = ''
    document.querySelector('#Multiplicando').innerText = ''
    document.querySelector('#Multiplicador').innerText = ''

    boxRealod.style.display = 'none';
    boxConf.style.display = 'none';
    numMaca = gerarNum(4, 2); numBox = gerarNum(4, 2)
    GerarFrutas(boxGame.querySelector('.game'),'assets/img/maca.png', numMaca, numBox)
})
