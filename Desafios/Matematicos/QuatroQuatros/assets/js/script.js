const game = document.querySelector('.game')
const boxGame = document.querySelector('.boxGame')
const btn = boxGame.querySelector('button')

let Verificar = (resulte, key, row)=> {
    if(eval(resulte) !== +key){
        row.lastElementChild.classList.add('error')
        row.lastElementChild.classList.remove('success')
    }else{
        row.lastElementChild.classList.remove('error')
        row.lastElementChild.classList.add('success')
    }
}

btn.addEventListener('click',()=>{
    for (const [key, row] of Object.entries(game.querySelectorAll('.row'))) {
        let resulte = ''
        for(let i = 1; i <= 9; i++){
            if(row.querySelector(`:nth-child(${i})`).localName === 'input'){
                resulte += (row.querySelector(`:nth-child(${i})`).value.length > 0 ? row.querySelector(`:nth-child(${i})`).value : '')
            }else{
                resulte += (parseInt(row.querySelector(`:nth-child(${i})`).innerText))
            }
        }
        Verificar(resulte, key, row)
    }
})

for (const input of game.querySelectorAll('input')) {
    input.addEventListener('keypress',(ev) => {
        if(ev.key.match(/[^+/*()-]/)) {
        ev.preventDefault();
        }
    })
}