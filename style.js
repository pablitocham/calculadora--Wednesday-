

function agregar(valor) {
    document.getElementById('pantalla').value += valor;
}


function borrar() {
    document.getElementById('pantalla').value = '';
}



function calcular() {
    const valorPantalla = document.getElementById('pantalla').value;
    const resultado = eval(valorPantalla);
    document.getElementById('pantalla').value = resultado;
}

document.addEventListener('keydown', function(event){
    const key = event.key;
    const validKeys = ['0','1','2','3','4','5','6','7','8','9','.','+','-','*','/'];
    if(validKeys.includes(key)){
        agregar(key);
    }else if (key ==='Enter' ){
        calcular();
    }else if (key === 'Backspace'){
        borrar();
    }
});
function playAudio(){
    let audio = document.getElementById("bloodyMary");
    audio.play()
}