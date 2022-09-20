const game = document.querySelector('.game')
const boxGame = document.querySelector('.boxGame')
const btn = boxGame.querySelector('button')
const boxConf = document.querySelector('.boxConf')
const btnJogar = boxConf.querySelector('.jogar')
const boxRealod = document.querySelector('.boxRealod')

let classes = [11, 12, 13, 21, 22, 23, 31, 32, 33]

let GerarInputs = ()=>{
    game.innerHTML = ''
    for(let classe of classes){
    let input =  `
                    <input type="number" class="input${classe}" min="1" max="${classes.length}" oninput="validity.valid ? this.save = value : value = this.save;" tabindex="${classe}" style="--i:${classe%10};">
                    `
    game.innerHTML += input
    }
}

let col1, col2, col3, rol1, rol2, rol3, dig1, dig2

let zerar = ()=>{
  col1 = 0, col2 = 0, col3 = 0, rol1 = 0, rol2 = 0, rol3 = 0, dig1 = 0, dig2 = 0
}

let RTC = obj => obj = obj.className.replace(/[^0-9]/g, '')

let Verificar = (valDirect, classe, input, erro)=>{
    if(valDirect !== 15 && classe){
        input.classList.add('error')
        return true
    }
    return erro
}

let VerificarRepetido = (input, erro)=>{
    for (let newInp of game.querySelectorAll('input')) {
        if((RTC(input) !== RTC(newInp))&&(input.value == newInp.value)){
            input.classList.add('error')
            return true
        }
    }
    return erro
}

let endGame = obj =>{
    boxConf.querySelector('h1').textContent = obj.text
    boxConf.querySelector('h1').style.color = obj.color
    boxConf.removeAttribute('style')
    boxRealod.style.display = 'none';
}

let erro = false

btn.addEventListener('click',()=>{
  let valAt = 0
  zerar()
  for (let input of game.querySelectorAll('input')) {
    input.classList.remove('error')
    valAt = +input.value
    col1 += RTC(input)[1] == 1 ? valAt : 0
    col2 += RTC(input)[1] == 2 ? valAt : 0
    col3 += RTC(input)[1] == 3 ? valAt : 0
    rol1 += RTC(input)[0] == 1 ? valAt : 0
    rol2 += RTC(input)[0] == 2 ? valAt : 0
    rol3 += RTC(input)[0] == 3 ? valAt : 0
    dig1 += RTC(input)[0] == RTC(input)[1] ? valAt : 0
    dig2 += +RTC(input)[0]+(+RTC(input)[1]) == 4 ? valAt : 0
  }
  
  erro = false
  for (let input of game.querySelectorAll('input')) {
    erro = VerificarRepetido(input, erro)
    erro = Verificar(col1, RTC(input)[1] == 1, input, erro)
    erro = Verificar(col2, RTC(input)[1] == 2, input, erro)
    erro = Verificar(col3, RTC(input)[1] == 3, input, erro)
    erro = Verificar(rol1, RTC(input)[0] == 1, input, erro)
    erro = Verificar(rol2, RTC(input)[0] == 2, input, erro)
    erro = Verificar(rol3, RTC(input)[0] == 3, input, erro)
    erro = Verificar(dig1, RTC(input)[0] == RTC(input)[1], input, erro)
    erro = Verificar(dig2, +RTC(input)[0] + (+RTC(input)[1]) == 4, input, erro)
  }
  erro ? boxRealod.removeAttribute('style') : endGame({text: 'PARABÉNS!!!', color: 'green'})
  
})

btnJogar.addEventListener('click',()=>{
    boxRealod.style.display = 'none';
    boxConf.style.display = 'none';
    GerarInputs()
})