const box = document.querySelector('.game')
const boxConf = document.querySelector('.boxConf')
const btnJogar = boxConf.querySelector('.jogar')
const boxRealod = document.querySelector('.boxRealod')
const boxGame = document.querySelector('.boxGame')

let classes = []
let quadrados = [12,13,21,22,23,24,32,33]
let circulos =  [13,22,24,31,32,34,35,42,44,53]

let error = false, verificador = 1, text = '', numMaca = 0, numLaranja = 0

let gerarNum = () => Math.floor(Math.random() * 4) + 1;

let RemoverTextoClasse = obj => obj = obj.className.replace(/[^0-9]/g,'')

let GerarFrutas = (local, srcImg, qtd)=>{
    local.innerHTML = ''

    for (let i = 0; i < qtd; i++) {
        let fruta = `<img src="${srcImg}">`
        local.innerHTML += fruta
    }
    
}



let endGame = obj =>{
    boxConf.querySelector('h1').textContent = obj.text
    boxConf.querySelector('h1').style.color = obj.color
    boxConf.removeAttribute('style')
    boxRealod.style.display = 'none';
}

let Verificar = (inputVerificar)=>{
    for (const input of box.querySelectorAll('input')) {
        if(inputVerificar.value < 1){
            error = true
            inputVerificar.classList.add('error')
        }
        if(RemoverTextoClasse(input) !== RemoverTextoClasse(inputVerificar)){
            if(Math.abs(+RemoverTextoClasse(inputVerificar)[0] - +RemoverTextoClasse(input)[0]) <= 1){
                if(Math.abs(+RemoverTextoClasse(inputVerificar)[1] - +RemoverTextoClasse(input)[1]) <= verificador){
                    if(Math.abs(inputVerificar.value - input.value) <= 1){
                        error = true
                        inputVerificar.classList.add('error')
                        input.classList.add('error')
                    }
                }
            }
        }
    }
}


document.querySelector('button').addEventListener(('click'),()=>{
    error = false
    for (const input of box.querySelectorAll('input')) {
        input.classList.remove('error')
        Verificar(input)
    }

    error ? boxRealod.removeAttribute('style') : endGame({text: 'PARABÉNS!!!', color: 'green'})
})

btnJogar.addEventListener('click',()=>{
    boxRealod.style.display = 'none';
    boxConf.style.display = 'none';
    GerarFrutas(document.querySelector('.boxMacas'),'assets/img/maca.png',gerarNum())
    GerarFrutas(document.querySelector('.boxLaranjas'),'assets/img/laranja.png',gerarNum())
})
