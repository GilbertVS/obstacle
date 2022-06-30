//array de apuestas posibles
apuestas = [1, 10, 20, 40, 60, 100, 200, 500];
arrayPremios = [0, 1, 2, 3, 5, 10, 20, 100, 300, 500, 1000];
arrayFigures = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
/*inicializar variables*/
var numero1 = 9;
var numero2 = 9;
var numero3 = 9;
var premio = 0;
var cantidad = 0; //capital
var mensaje = '';
var error = '';
var apuesta = 1;
var tirada = false;
var audio = new Audio('./mp3/premio.mp3');

function newGame() {
    error = '';
    mensaje = '';
    premio = 0;
    cantidad = document.getElementById("cantidad").value;
    apuesta = document.getElementById('bet').value;
    document.getElementById("cantidad").style = "#cantidad{border:3px solid navy;}";
    document.getElementById("win").value = premio;
    document.getElementById("mensaje").innerHTML = ""+mensaje;
    if (!tirada) {
        tirada = true;
        for (var i=0; i<=10; i++) {
            arrayFigures[i] = 0;
        }
        if (cantidad == '') {
            error += "<style>#errores {color: red;}#cantidad{border:3px solid red;}</style> La cantitat no està informada";
        }
        else if (!parseInt(cantidad)) {
            error += "<style>#errores {color: red;}#cantidad{border:3px solid red;}</style> La cantitat no és numèrica";
        }
        else if (parseInt(cantidad) < parseInt(apuesta)) {
            error +="<style>#errores {color:red;}#cantidad{border:3px solid red;}</style> La cantitat és inferior a l'aposta";
        }   
        if (error == '') {
            cantidad -= apuesta;
            numberRand(1);
            numberRand(2);
            numberRand(3);
            premio = winMoney();
            premio *= apuesta;
            cantidad += premio;   
        }
        if (premio > 0) {
            mensaje = "<style>#win{border:3px solid gold;} .scores, .controls{background-color: navy;} #win{color: #fefefe;}</style> Has guanyat "+premio+" c !!";
        }
        else {
            document.getElementById("cantidad").value = cantidad;
        }
        document.getElementById("errores").innerHTML = ""+error;
        yourfinnish();
    }
}
function yourfinnish() {
    setTimeout(() =>{
        document.getElementById("cantidad").value = cantidad;
        document.getElementById("win").value = premio;
        document.getElementById("mensaje").innerHTML = ""+mensaje;
        if (mensaje != "") audio.play();
        tirada = false;
    },1100);
}
function numberRand(i) {
    n = Math.random();
    n *= 10;
    number = Math.floor(n);
    number += 1,
    arrayFigures[number]++;
    animate(i, number);
}
function winMoney() {
    for (var i=1; i<=10; i++) {
        if (arrayFigures[i] == 3){
            return arrayPremios[i];
        } 
        else if (arrayFigures[i] == 2 && arrayFigures[10] == 1) {
            return arrayPremios[i];
        }
        else if (arrayFigures[i] == 1 && arrayFigures[10] == 2) {
            return arrayPremios[i];
        }
        else if (arrayFigures[10] == 2 && arrayFigures[i]  == 1) {
            return arrayPremios[i];
        }
    }
    return 0;
}
function animate(i, number) {
    var n = number-5; 
    if (number<=5) n=number+5;
    var pos = 0;
    var id = setInterval(frame, 5);
    function frame() {
        pos++;
        if (pos%30 == 0 && pos<=180) {
            document.getElementById("reel"+i).innerHTML = "<img id='fig' src='./img/"+n+".png'></img>";
            n++;
            if(n>10) n=1;
        }
        if (pos==180) clearInterval(id);     
    }   
}
