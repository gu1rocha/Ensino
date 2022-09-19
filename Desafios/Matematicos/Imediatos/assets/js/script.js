const box = document.querySelector('.game')
const boxConf = document.querySelector('.boxConf')
const select = boxConf.querySelector('select')
const btnJogar = boxConf.querySelector('.jogar')
const boxRealod = document.querySelector('.boxRealod')
const boxGame = document.querySelector('.boxGame')

let classes = []
let quadrados = [12,13,21,22,23,24,32,33]
let circulos =  [13,22,24,31,32,34,35,42,44,53]

let error = false, verificador = 1, text = '';

select.addEventListener('change',()=>{
  text = `
  Preencha as lacunas com todos os número de 1 ao ${select.value}, de modo que nenhum número fique próximo do seu sucessor ou antecessor!
  `
  boxConf.querySelector('p').innerText = text
  boxGame.querySelector('h2').innerText = text
})

let RemoverTextoClasse = obj => obj = obj.className.replace(/[^0-9]/g,'')

let GerarInputs = ()=>{
    +select.value === 8 ? classes = quadrados : classes = circulos;
    +select.value === 8 ? verificador = 1 : verificador = 2;

    document.documentElement.style.setProperty('--j', +select.value === 8 ? 0 : 50+"%");
    document.documentElement.style.setProperty('--k', +select.value/2);
    document.documentElement.style.setProperty('--l', +select.value === 8 ? 5+'rem' : 4+'rem');
    
    box.innerHTML = ''

    for (let classe of classes) {
        let input = `
                        <input type="number" class="input${classe}" 
                        min="1" max="${select.value}" 
                        oninput="validity.valid ? this.save = value : value = this.save;" 
                        tabindex="${classe}"
                        style="--i:${classe%10}">
                    `
        box.innerHTML += input
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
    GerarInputs()
})
