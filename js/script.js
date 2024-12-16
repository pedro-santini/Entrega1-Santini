//INICIO LA ARRAY GLOBAL DE USUARIOS
let usuarios=[];

//ESCONDO SEGUNDA SECCIÓN
document.getElementById("infoAlimentacion").style.display = "none";  // Ocultar la segunda sección


//INICIO CLASE
class Usuario {
    constructor(nombre, sexo, edad, altura, peso, objetivo, actividad) {
        this.nombre = nombre;
        this.sexo = sexo;
        this.edad = edad;
        this.altura = altura;
        this.peso = peso;  // Añadir peso
        this.objetivo = objetivo;  // Perder o ganar peso
        this.actividad = actividad;
        this.caloriasNecesarias = this.calcularCalorias();
    }


    calcularCalorias (){
        let mb; //meetabolismo basal
        if (this.sexo === "hombre") {
            mb = 10 * this.peso + 6.25 * this.altura - 5 * this.edad + 5;
        } else {
            mb = 10 * this.peso + 6.25 * this.altura - 5 * this.edad - 161;
        }

        // Ajustar por nivel de actividad
    let factorActividad;

    switch (this.actividad){

        case "sedentaria":
            factorActividad = 1.2;
            break;
        case "ligera":
            factorActividad = 1.375;
            break;
        case "moderada":
            factorActividad = 1.55;
            break;
        case "intensa":
            factorActividad = 1.725;
            break;
        case "extrema":
            factorActividad = 1.9;
            break;
        default:
            factorActividad = 1.55; // Por defecto a actividad moderada
    }

    let caloriasNecesarias = mb * factorActividad;

    return caloriasNecesarias;
}
}

//LLAMADO DEL BOTÓN DEL HTML
document.getElementById("guardarInfo").addEventListener("click", () => {
    const nombre = document.getElementById("nombreUsuario").value;
    const sexo = document.getElementById("sexoUsuario").value;
    const edad = document.getElementById("edadUsuario").value;
    const altura = document.getElementById("alturaUsuario").value;
    const peso = document.getElementById("pesoUsuario").value;
    const objetivo = document.getElementById("objetivoUsuario").value;
    const actividad = document.getElementById("actividadUsuario").value;
    


//VALIDACIONES DE ENTRADA
    if (!nombre || !edad || !altura || !objetivo){
        alert("Ninguno de los campos puede estar vacío, reingrese los datos")
        return;
    }  
    
    if (!isNaN(nombre)){
        alert("El nombre no puede ser un número, reingrese el dato")
        return;
    } 

    if (isNaN(edad) || edad < 18 || edad > 70){
        alert("Ingrese una edad apta para este calculo y debe ser un número")
        return;
    }

    if (isNaN(altura) || altura.length != 3){ //mi idea de length es que si llegan a poner solo 2 caracteres ya es indicio de estar midiendolo en otra regla
        alert("La altura debe ser expresada en números y en centímetros, reingrese el dato")
        return;
    }

    if (altura < 100 || altura > 230){
        alert("No es una altura válida, reingrese el dato")
        return;
    }

    if (isNaN(peso) || peso < 40 || peso > 150){
        alert("Ingrese un peso valido")
        return;
    }

    //imprimo en consola los datos del usuario
    console.log(`Nombre: ${nombre}`);
    console.log(`Sexo: ${sexo}`);
    console.log(`Edad: ${edad}`);
    console.log(`Altura: ${altura}`);
    console.log(`Peso: ${peso}`);
    console.log(`Objetivo: ${objetivo}`);
    console.log(`Nivel de actividad: ${actividad}`);


     // Crear el nuevo usuario desde la clase y agregarlo al array
    const nuevoUsuario = new Usuario(nombre, sexo, edad, altura, peso, objetivo, actividad);
    usuarios.push(nuevoUsuario);

     // Calcular calorias necesarias para mantener peso
    console.log(`Calorias necesarias para mantener peso de ${nombre}: ${parseInt(nuevoUsuario.calcularCalorias())} calorías`);


    alert("Datos guardados correctamente");


    // Pasar a la segunda sección del HTML (ejemplo de cambio de sección)
    document.getElementById("infoPersonal").style.display = "none";  // Ocultar la primera sección
    document.getElementById("infoAlimentacion").style.display = "block";  // Mostrar la segunda sección

});




let comidas = [];
let totalCalorias = 0;

document.getElementById("agregarComida").addEventListener("click", () => {
    const comidaInput = document.getElementById("comidaInput").value;
    const caloriasInput = document.getElementById("caloriasInput").value;

    if (!comidaInput || isNaN(caloriasInput) || caloriasInput <= 0){
        alert ("Por favor intrese una comida y un número de calorías válido")
    } else{
        comidas.push({ comida: comidaInput, calorias: parseInt(caloriasInput) });
        totalCalorias += parseInt(caloriasInput);
        document.getElementById("totalCalorias").textContent = `Total calorías del día: ${totalCalorias}`;
        // Limpiar los campos de entrada
        document.getElementById("comidaInput").value = '';
        document.getElementById("caloriasInput").value = '';
        }

})

document.getElementById("finalizarDia").addEventListener("click", () => {

    const usuarioActual = usuarios[usuarios.length - 1];

    if (usuarioActual.objetivo === "aumentar" && totalCalorias > usuarioActual.caloriasNecesarias) {
        alert("¡Felicidades! Estás en un superávit calórico como lo demanda tu objetivo.");
    } else if (usuarioActual.objetivo === "perder" && totalCalorias < usuarioActual.caloriasNecesarias) {
        alert("¡Felicidades! Estás en un déficit calórico como lo demanda tu objetivo.");
    } else if (usuarioActual.objetivo === "mantener" && totalCalorias === usuarioActual.caloriasNecesarias) {
        alert("¡Felicidades! Estás manteniendo tu peso como lo demandaba tu objetivo.");
    } else {
        alert("No estás cumpliendo con tu objetivo. Revisa tus calorías.");
    }

    console.log("El total de calorías del usuario consumidas es: "+ totalCalorias)
    for (let i = 0; i < comidas.length;i++){
        console.log("Estos fueron los distintos platos del día: "+ comidas[i])
    }
});



// document.getElementById("agregarComida").addEventListener("click", () => {
//     const comidaInput = document.getElementById("comidaInput").value;
//     const caloriasInput = document.getElementById("caloriasInput".value);

//     //validación de datos

//     if(!comidaInput || isNaN(caloriasInput) || caloriasInput <= 0 ){
//         alert("Por favor ingrese una comida y un número de calorías válido");
//     }

// })

// document.getElementById("agregarComida").addEventListener("click", () => {
//     const comidaInput = document.getElementById("comidaInput").value;
//     const caloriasInput = parseInt(document.getElementById("caloriasInput").value);

//     // Validación de entrada
//     if (!comidaInput || isNaN(caloriasInput) || caloriasInput <= 0) {
//         alert("Por favor ingrese una comida válida y un número de calorías válido.");
//         return;
//     }

//     // Agregar comida al array
//     comidas.push({ comida: comidaInput, calorias: caloriasInput });
//     totalCalorias += caloriasInput;

//     // Mostrar la lista de comidas ingresadas
//     const listaComidas = document.getElementById("listaComidas");
//     const nuevaComida = document.createElement("p");
//     nuevaComida.textContent = `Comida: ${comidaInput}, Calorías: ${caloriasInput}`;
//     listaComidas.appendChild(nuevaComida);

//     // Actualizar el total de calorías
//     document.getElementById("totalCalorias").textContent = `Total calorías del día: ${totalCalorias}`;

//     // Limpiar los campos de input para agregar más comidas
//     document.getElementById("comidaInput").value = "";
//     document.getElementById("caloriasInput").value = "";
// });

// document.getElementById("finalizarDia").addEventListener("click", () => {
//     // Mostrar las comidas del día
//     console.log("Comidas del día:");
//     comidas.forEach(item => {
//         console.log(`Comida: ${item.comida}, Calorías: ${item.calorias}`);
//     });

//     // Verificar si está dentro del objetivo
//     console.log(`Total calorías consumidas en el día: ${totalCalorias}`);

//     if (totalCalorias < objetivoUsuario.caloriasNecesarias) {
//         console.log("Está en déficit calórico.");
//     } else if (totalCalorias > objetivoUsuario.caloriasNecesarias) {
//         console.log("Está en superávit calórico.");
//     } else {
//         console.log("Está en mantenimiento de calorías.");
//     }

//     // Si se repite este método durante un mes
//     const caloriasMensuales = totalCalorias * 30;
//     console.log(`Calorías consumidas en un mes: ${caloriasMensuales}`);

//     if (objetivoUsuario.objetivo === "Perder peso" && caloriasMensuales > objetivoUsuario.caloriasNecesarias * 30) {
//         console.log("¡Cuidado! Estás comiendo más de lo que se recomienda para perder peso.");
//     } else if (objetivoUsuario.objetivo === "Aumentar peso" && caloriasMensuales < objetivoUsuario.caloriasNecesarias * 30) {
//         console.log("¡Cuidado! Estás comiendo menos de lo que se recomienda para ganar peso.");
//     } else {
//         console.log("Tu consumo mensual es acorde al objetivo.");
//     }
// });

// // Objeto de usuario con objetivo y calorías necesarias
// const objetivoUsuario = {
//     objetivo: "Perder peso", // Ejemplo, podría ser "Aumentar peso" o "Mantener peso"
//     caloriasNecesarias: 2000 // Ejemplo, ajusta según el cálculo del déficit o superávit
// };
