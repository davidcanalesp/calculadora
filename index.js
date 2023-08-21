

const screenOperation = document. getElementById ('screen-operation');
const screenResult = document.getElementById ('screen-result');
const buttons= document.getElementById('buttons');

let boolOperationComplete= false;

screenOperation.textContent = '0';
screenResult.textContent =0;


buttons.addEventListener ('click',e=>{
    
    if (e.target.textContent !=='')
        {
            switch (e.target.textContent)
            {
                case '=': writeResult(); break;
                case 'C': resetScreen(); break;
                case '+/-': changeSign(); break;
                case '.': writeOperation('.'); break;
                default: writeOperation(e.target.textContent); break;
            }                   
        }

})

const resetScreen = () =>{
    screenResult.textContent=0;
    screenOperation.textContent=0;
}

const writeResult = () => {
    if (isNaN(lastChar()) && lastChar()!== ')')
        screenOperation.textContent= screenOperation.textContent.substring (0, screenOperation.textContent.length-1)
    screenResult.textContent= eval (screenOperation.textContent);
    boolOperationComplete=true;

    //para que el resultado no desborde el tamaño del screen vamos a empqueñecer la letra
    if (screenResult.textContent.length>9) 
    {
        screenResult.style.fontSize = '2em';
        screenResult.style.marginTop = '1em';
    }
}


/*
   Se debe detectar el primer teclazo al cargar la página, si éste es un número
   (pero no un símbolo de operación ni el cero) debe escribirse en el renglón 
   screen-operation.
   
   Igualmente debemos considerar de no escribir dos símbolos de operación
   consecutivamente ( 9*+3 ) en cuyo caso sólo imprimiremos el segundo caracter
   Por tanto es necesario tener una función que lea toda la cadena escrita en 
   el renglón screenOperation y retorne cuál fue el último caracter impreso
   Para esto está la función lastCharacter().
*/
const lastChar = () =>
    screenOperation.textContent.substring(screenOperation.textContent.length-1)


//La siguiente es la función que que  imprime cada  caracter en renglón
//screenOperation.
const writeOperation = key => {
    //Ya explicamos que no podemos escribir directamente la  tecla oprimida,
    //primero evaluamos si el contenido completo de screenOperation es un cero
    // si no es easí borramos ése cero. Esto es para que si escribimos un 9, por
    // decir algo, éste aparezca como 9 y no como 09
    if (screenOperation.textContent=='0'&& key !== '.') screenOperation.textContent ='';

    /****código del enlazado de operaciones: si se oprimió el  signo = y después se tecleó un signo de operación, el  resultado se pone screenOperation como primer operando y la operación pasa a estar incompleta ***********************/
    if(boolOperationComplete && isNaN (key))
        {
            screenOperation.textContent = screenResult.textContent;
            boolOperationComplete = false;
        }
    if(boolOperationComplete && !isNaN (key))
        {
            screenOperation.textContent='';
            screenResult.textContent='0';
            boolOperationComplete=false;
        }

    
   //Antes de imprimir un caracter constatamos si la tecla anterior fue un
   //símbolo de operación y si el nuevo teclazo también lo es eliminamos el
   //anterior símbolo de screenOperation y lo sustituimos por el nuevo. Ésto es: si el último caracter (lastChar) y el reciente (key) no son números, por lo tanto son signos de operación eliminamos el último y guardamos el reciente
    if (isNaN(lastChar()) && isNaN(key))
        {
            screenOperation.textContent = screenOperation.textContent.substring (0, screenOperation.textContent.length-1);
            screenOperation.textContent += key;
        }

    else
    {
        screenOperation.textContent += key;
    }

    //Ahora enlazar operaciones, en este momente es cuando usamos la variable booleana operationComplete. Lo que queremos es que después de oprimir el "=" si acontinuación iniciamos otro cálculo, el resultado recién obtenido brinque al screenOperation y sea el primer operando del siguiente cálculo


}

const changeSign = ()=>{

    let lastNumber = '';
    let position = 0;

    if (!isNaN(lastChar()))
        {
            for (let i= screenOperation.textContent.length-1; i>0; i--)
                {
                    if (isNaN(screenOperation.textContent[i]))
                        {
                            position= i+1;
                            break;
                        }
                }
        }
    lastNumber =screenOperation.textContent.substring(position);
    screenOperation.textContent= screenOperation.textContent.replace (lastNumber, `(${lastNumber*-1})`)
}
