/*
IMPORTANTE: En este código se utiliza la función Math.pow(base, exp) porque JS no reconoce el símbolo ^ para exponenciación
Se utiliza el redondeo con Math.round() en algunas operaciones porque de no hacerlo, sería imposible realizar correctamente las cuentas con números tan largos
Redefinimos el método MOD en lugar de usar el símbolo % porque al principio pensé que era esta función la que no funcionaba bien
*/




function mod(a, n) {
    var x = a/n;
    console.log(a+"/ " +n +" = "+ x);
    var entero = Math.trunc(x);
    console.log("Parte entera: " +entero);
    var coma = x - entero;
    console.log(x +" - " + entero + "= " + coma)
    console.log("Resto: "+coma*n)
    return coma * n;

    //return a - (n * Math.floor(a/n));
}



// Verifica si un número recibido es PRIMO o NO */
function primo(numero) {
    let res = true;
    if(numero == null) {
        res = false;
    } else {

    for (let i = 2; i < numero; i++) {
  
      if (mod(numero, i) == 0) {
        res = false;;
      }
  
        }
    } // else
  
    return res;
  }

// Retorna un número aleatorio entre min (incluido) y max (excluido)
function getRandomArbitrary(min, max) {
    //Ejecutamos la función MATH.FLOOR para obtener la parte ENTERA del RANDOM
    return Math.floor(Math.random() * (max - min) + min);
}



/*Función para generar un primo random ENTRE un par de valores especificado*/
function primoRandomEntre(n1, n2) {
    let r = n1;
    while(primo(r) === false) {
        r = getRandomArbitrary(n1, n2);
        
    }
    
    return r;

}


//COMENZAMOS CON JQUERY

function calcularPublicas() {
  
  
    $("#publicAlice").html( primoRandomEntre(100, 200));
    $("#publicBob").html(primoRandomEntre(10, 98));
  
  
}





$(() => {
    
//generamos claves públicas
calcularPublicas();
    
    //Resetear juego
    $("#reset").click(() => {
        
        $(".primer-calculo").css({"display":"none"});
        $(".segundo-calculo").css("display", "none");
        $(".resultado-final").css("display", "none");
        $("#passwordBob").val("0");
        $("#passwordAlice").val("0");
        calcularPublicas();
        
        
    });

    //Al presionar START, iniciamos los cálculos
    $("#start").click(() => {
        //obtención de valores
        var passAlice = $("#passwordAlice").val();
        var passBob = $("#passwordBob").val();
        var publicAlice = $("#publicAlice").html();
        var publicBob = $("#publicBob").html();
        if(isNaN(passAlice) || isNaN(passBob) || (passAlice == "") || (passBob == "")) {
            alert("SORRY!! Passwords must be NUMBERS, try reset");
        } else {
            //Si las claves son correctas (números) pasamos a hacer las cuentas
            publicAlice = parseInt(publicAlice);
            publicBob = parseInt(publicBob);
            console.log("pass alice: " + passAlice);
            console.log("pass bob: " +passBob);
            console.log("public alice: " +publicAlice);
            console.log("public bob: " +publicBob);
            
            //Primeros cálculos
            setTimeout( () => {
                $(".primer-calculo").css("display", "block");
                $("#calculoMODAlice").css("display", "none");
                $("#calculoMODBob").css("display", "none");
                $(".exchnge1").css("display", "none");
            } 
                ,1000);
            var calculosAlice = Math.round(mod((Math.pow(publicBob, passAlice)), publicAlice));
            var calculosBob = Math.round(mod(Math.pow(publicBob,passBob), publicAlice));
            var calcAlice = "<b> First calculation: " + publicBob + "^ " + passAlice + " MOD " + publicAlice + "=  </b>" + calculosAlice;
            var calcBob = "<b> First calculation: " + publicBob + "^ " + passBob + " MOD " + publicAlice + "=  </b>" + calculosBob;
            setTimeout( () => {
                $(".exchange").css("display", "inline-block");
                $("#calculoMODAlice").html(calcAlice);
                $("#calculoMODAlice").css("display", "inline-block");
                $("#calculoMODBob").css("display", "none");
             } 
                ,1000);
            
            //Intercambio de resultados y clave común
            
            setTimeout( () => {
                $(".exchange").css("display", "inline-block");
                $("#calculoMODAlice").html(calcAlice);
                $("#calculoMODAlice").css("display", "inline-block");
                $("#calculoModBob").html(calcBob);
                $("#calculoModBob").css("display", "inline-block");
                } 
                ,1000);
            var calculosCommonAlice = Math.round(mod((Math.pow(calculosBob, passAlice)), publicAlice));
            var calculosCommonBob = Math.round(mod((Math.pow(calculosAlice, passBob)), publicAlice));
            var calculosCommon = (calculosCommonAlice == calculosCommonBob) ? calculosCommonAlice : false;
            var calcCommonAlice = "<b> Common key calculation: " + calculosBob + "^ " + passAlice + " MOD " + publicAlice + "=  </b>" + calculosCommonAlice;
            var calcCommonBob = "<b> Common key calculation: " + calculosAlice + "^ " + passBob + " MOD " + publicAlice + "=  </b>" + calculosCommonBob;
            
            setTimeout( () => {
                $(".segundo-calculo").css("display", "block");
                $("#commonAliceCalc").css("display", "none");
                $("#commonBobCalc").css("display", "none");
                $(".exchnge2").css("display", "none");
            }, 1000);

            console.log("Common key Bob: " + calculosCommonBob);
            console.log("Common key Alice: " + calculosCommonAlice);

            setTimeout( () => {
                $(".exchnge2").css("display", "inline-block");
                $("#commonAliceCalc").html(calcCommonAlice);
                $("#commonAliceCalc").css("display", "inline-block");
                $("#commonBobCalc").html(calcCommonBob);
                $("#commonBobCalc").css("display", "inline-block");
                
            }, 3000);

            setTimeout( () => {
                let comun = (calculosCommon == false) ? "ERROR" : calculosCommon;
                $(".resultado-final").css("display", "block");
                $("#commonKey").html(comun);
             
            }, 3000);
        }
    });









});