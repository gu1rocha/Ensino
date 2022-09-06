const cores = {
    1:{
      igual : '#00D8E3',
      diferente : '#00D0E9'
    },
    2:{
      igual : '#01C19A',
      diferente : '#01C28B'
    },
    3:{
      igual : '#AE00C1',
      diferente : '#B500D1'
    },
    4:{
      igual : '#E500BD',
      diferente : '#E700D8'
    },
    5:{
      igual : '#001DC1',
      diferente : '#011EDF'
    },
    6:{
      igual : '#C95A23',
      diferente : '#C95731'
    },
    7:{
      igual : '#3E1579',
      diferente : '#3A1497'
    },
    8:{
      igual : '#C10003',
      diferente : '#C20029'
    },
    
}

const boxConf = document.querySelector('.boxConf')

const btnJogar = boxConf.querySelector('.jogar')

const game = document.querySelector('.game')

const select = boxConf.querySelector('select')

const app = document.querySelector("#app")

select.addEventListener('change', el =>{
  TIME_LIMIT = el.target.value
  timePassed = 0
})

let etap = 0

let atualizarAlet = () => Math.floor(Math.random() * (5) + 1);

let insertInputs = dif => {
    let input = document.createElement('div');
    input.classList.add('box');
    if(dif) {
        input.style.backgroundColor = cores[etap].diferente
    }else{
        input.style.backgroundColor = cores[etap].igual
    }

    game.appendChild(input)

    input.addEventListener('click',()=>{
        if(dif) next()
        else
           endGame({
              text:'ERROU!!!',
              color: 'red',
              time: ''
           })
    })
}

let endGame = obj =>{
    boxConf.querySelector('h1').textContent = obj.text
    boxConf.querySelector('h1').style.color = obj.color
    boxConf.querySelector('h2').textContent = obj.time
    timePassed = 0
    
    clearInterval(timerInterval)
    boxConf.removeAttribute('style')
}

let loopGame = (numDif) =>{
    game.textContent = ""
    for (var i = 1; i <= 5; i++) {
        insertInputs(numDif === i ? 'dif' : false)
    }
}

let inicializarGame = () => {
    etap = 1
    loopGame(atualizarAlet())
    startTimer()
}

let next = () => {
    game.innerHTML = ''
    etap = ++etap
    if(etap > 8)
       endGame({
          text: 'PARABÉNS!!!',
          color: 'green',
          time: `Time: ${timePassed}s`
       })
    loopGame(atualizarAlet())
}

btnJogar.addEventListener('click',()=>{
  if(select.value !== 'livre'){
    app.style.display = 'block'
  }else{
    app.style.display = 'none'
  }
  boxConf.style.display = 'none';
  inicializarGame()
})
