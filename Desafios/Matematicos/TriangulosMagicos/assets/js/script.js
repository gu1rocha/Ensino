const game = document.querySelector('.game')
const boxGame = document.querySelector('.boxGame')
const btn = boxGame.querySelector('button')
const boxConf = document.querySelector('.boxConf')
const select = boxConf.querySelector('select')
const btnJogar = boxConf.querySelector('.jogar')
const boxRealod = document.querySelector('.boxRealod')

let valor = 6, step = 0, soma = 9, valAt = 0,
    erro = false, rol, dig1, dig2
    classes = [],
    orderSum = [],
    SeisCirc = [13, 22, 24, 31, 33, 35], 
    NoveCirc = [14, 23, 25, 32, 36, 41, 43, 45, 47], 
    reslutSeis = [9, 10, 11, 12],
    resultNove = [17, 19, 20, 21, 23]

select.addEventListener('change',()=>{
  valor = +(select.value)
  soma = valor === 6 ? reslutSeis[0] : resultNove[0]
  text = `
  Preencha as lacunas com todos os números de 1 ao ${valor}, de modo que a soma de todos os lados resulte em <strong>${soma}</strong>!
  `
  boxConf.querySelector('p').innerHTML = text
  boxGame.querySelector('h2').innerHTML = text
})

let GerarInputs = ()=>{
  if(+select.value === 6){
    orderSum = reslutSeis
    classes = SeisCirc
    document.documentElement.style.setProperty('--j', 5);
    document.documentElement.style.setProperty('--l', '5rem');
  }else{
    orderSum = resultNove
    classes = NoveCirc
    document.documentElement.style.setProperty('--j', 7);
    document.documentElement.style.setProperty('--l', '4rem');
  }
  game.innerHTML = ''
  
  for (let classe of classes) {
    let input =  `
                  <input type="number" class="input${classe}" min="1" max="${valor}" oninput="validity.valid ? this.save = value : value = this.save;" tabindex="${classe}" style="--i:${classe%10};">
                  `
    game.innerHTML += input
  }
}

let zerar = ()=>{
  rol = 0, dig1 = 0, dig2 = 0
}

let RTC = obj => obj = obj.className.replace(/[^0-9]/g, '')

let Verificar = (valDirect, input, erro)=>{
  if(valDirect !== orderSum[step]){
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
  !!obj.slt ? select.style.display = obj.slt : select.removeAttribute('style')
  boxConf.querySelector('h1').textContent = obj.text
  boxConf.querySelector('h1').style.color = obj.color
  boxConf.removeAttribute('style')
  boxRealod.style.display = 'none';
  btnJogar.innerText = obj.btText
  
  soma = orderSum[step]
  
  text = `
    Preencha as lacunas com todos os números de 1 ao ${valor}, de modo que a soma de todos os lados resulte em <strong>${soma}</strong>!
    `
  boxConf.querySelector('p').innerHTML = text
  boxGame.querySelector('h2').innerHTML = text
  
}

btn.addEventListener('click',()=>{
  valAt = 0
  zerar()
  if(+select.value === 6){
    dig1 += +game.querySelector('.input13').value + +game.querySelector('.input22').value + +game.querySelector('.input31').value
    dig2 += +game.querySelector('.input13').value + +game.querySelector('.input24').value + +game.querySelector('.input35').value
    rol += +game.querySelector('.input31').value + +game.querySelector('.input33').value + +game.querySelector('.input35').value
  }else{
    dig1 += +game.querySelector('.input14').value + +game.querySelector('.input23').value + +game.querySelector('.input32').value + +game.querySelector('.input41').value
    dig2 += +game.querySelector('.input14').value + +game.querySelector('.input25').value + +game.querySelector('.input36').value + +game.querySelector('.input47').value
    rol += +game.querySelector('.input41').value + +game.querySelector('.input43').value + +game.querySelector('.input45').value + +game.querySelector('.input47').value
  }
  
  erro = false
  for (let input of game.querySelectorAll('input')) {
    input.classList.remove('error')
    erro = VerificarRepetido(input, erro)
  }

  if(+select.value === 6){
    erro = Verificar(dig1, game.querySelector('.input13'), erro);
    erro = Verificar(dig1, game.querySelector('.input22'), erro);
    erro = Verificar(dig1, game.querySelector('.input31'), erro);
    erro = Verificar(dig2, game.querySelector('.input13'), erro);
    erro = Verificar(dig2, game.querySelector('.input24'), erro);
    erro = Verificar(dig2, game.querySelector('.input35'), erro);
    erro = Verificar(rol, game.querySelector('.input31'), erro);
    erro = Verificar(rol, game.querySelector('.input33'), erro);
    erro = Verificar(rol, game.querySelector('.input35'), erro);
  }else{
    erro = Verificar(dig1, game.querySelector('.input14'), erro);
    erro = Verificar(dig1, game.querySelector('.input23'), erro);
    erro = Verificar(dig1, game.querySelector('.input32'), erro);
    erro = Verificar(dig1, game.querySelector('.input41'), erro);
    erro = Verificar(dig2, game.querySelector('.input14'), erro);
    erro = Verificar(dig2, game.querySelector('.input25'), erro);
    erro = Verificar(dig2, game.querySelector('.input36'), erro);
    erro = Verificar(dig2, game.querySelector('.input47'), erro);
    erro = Verificar(rol, game.querySelector('.input41'), erro);
    erro = Verificar(rol, game.querySelector('.input43'), erro);
    erro = Verificar(rol, game.querySelector('.input45'), erro);
    erro = Verificar(rol, game.querySelector('.input47'), erro);
  }
  if(erro){
    boxRealod.removeAttribute('style')
  }else{
    ++step
    if(step >= orderSum.length){
      step = 0
      endGame({text: 'PARABÉNS, POR COMPLETAR ESTE DESAFIO!!!', color: 'green', btText : 'JOGAR'})
    }else{
      endGame({text: 'PARABÉNS, AVANCE PARA O PRÓXIMO NÍVEL!!!', color: 'green',slt: 'none', btText: 'PRÓXIMO'})
    }
  }
})

btnJogar.addEventListener('click',()=>{
    boxRealod.style.display = 'none';
    boxConf.style.display = 'none';
    GerarInputs()
})
