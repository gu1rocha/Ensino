const box = document.querySelector('.box')

for(let i = 1; i <= 3; i++){
    for(let j = 1; j <= 4; j++){
        if((i===1&&j===1)||(i===1&&j===4)||(i===3&&j===1)||(i===3&&j===4)){}
        else{
            let input = `
                        <input type="number" class="input${i}${j}" 
                        min="1" max="8" oninput="validity.valid ? this.save = value : value = this.save;" 
                        tabindex="${i}${j}">
                        `
            box.innerHTML += input
        }
    }
}

const inputs = box.querySelectorAll('input')

let RemoverTextoClasse = obj => obj = obj.className.replace(/[^0-9]/g,'')

let error = false

let Verificar = (inputVerificar)=>{
    for (const input of inputs) {
        if(RemoverTextoClasse(input) !== RemoverTextoClasse(inputVerificar)){
            if(Math.abs(+RemoverTextoClasse(inputVerificar)[0] - +RemoverTextoClasse(input)[0]) <= 1){
                if(Math.abs(+RemoverTextoClasse(inputVerificar)[1] - +RemoverTextoClasse(input)[1]) <= 1){
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
    for (const input of inputs) {
        input.classList.remove('error')
        Verificar(input)
    }
    alert(error ? "Tente outra vez!" : "Parabéns")
})
