//---------------------------------Modal------------------------------
const modalContenedor = document.querySelector('.modal-container')
const abrirCarrito = document.getElementById('open')
const cerrarCarrito = document.getElementById('cerrar')
const modalCarrito = document.querySelector('.modal-carrito')


abrirCarrito.addEventListener('click', ()=> {
    modalContenedor.classList.toggle('modal-active')
})

cerrarCarrito.addEventListener('click', ()=> {
    modalContenedor.classList.remove('modal-active')
})

modalContenedor.addEventListener('click',() =>{
    cerrarCarrito.click();
})

modalCarrito.addEventListener('click', (e) =>{
    e.stopPropagation();
});
//------------------------Variables Globales-------------------------------------------------
const usuario = 
 {
  user: 'wasSd',
  photoProfile: "./img/usuario/usuario1.jpg"
 }
let carrito = JSON.parse(localStorage.getItem("producto")) || [];
//const carrito = [] //Array donde se guardan item carrito
const guardarLocal = (clave, valor) => { localStorage.setItem(clave, valor)};
//----------------------------------Funcion Cargar Fetch--------------------------
(async()=>{
  try{
    const response = await fetch("../js/product.json")
    const data = await response.json();
    localStorage.setItem("stock", JSON.stringify(data))
  } catch (error){
    swal.fire({
      title: '¡ERROR!',
      text: 'Algo salió mal. Inténtalo de nuevo más tarde',
      icon: 'error',
      confirm: 'Ok',
      timer: 5000
  })
 }
})()
let stockSkins = JSON.parse(localStorage.getItem("stock"))
//----------------------------------Crear botones------------------------------------------//
const seccionBotonesJS = document.getElementById('botones')
verBotones = () => {
  seccionBotonesJS.innerHTML += (`
      <div class="pt-4 ">
        <div class="pt-2 pb-2 d-flex justify-content-center align-items-center boxButton">
          <div>
            <label for="armas">Armas</label>
            <input type="radio" name="elegirArmaoAgente" id="radioMuestraArma" class="radiobutton" value="muestraArma" placeholder='Arma'>
            <label for="agentes">Agentes</label>
            <input type="radio" name="elegirArmaoAgente" id="radioMuestraAgente" class="radiobutton" value="muestraArma" placeholder='Agente' >
            <label for="armas">A-Z</label>
            <input type="radio" name="elegirArmaoAgente" id="AZ" class="radiobutton" value="muestraArma" placeholder='A-Z'>
            <label for="agentes">Z-A</label>
            <input type="radio" name="elegirArmaoAgente" id="ZA" class="radiobutton" value="muestraArma" placeholder='Z-A' >
            <label for="armas">Menor a Mayor</label>
            <input type="radio" name="elegirArmaoAgente" id="manorAMayor" class="radiobutton" value="muestraArma" placeholder='Menor a Mayor'>
            <label for="agentes">Mayor a menor</label>
            <input type="radio" name="elegirArmaoAgente" id="mayorAMenor" class="radiobutton" value="muestraArma" placeholder='Mayor a Menor' >
            <button id="ordenComoUsuario">Enviar opcion</button>
          </div>
          <span class="separador"></span>
          <div>
            <input type="text" name="buscador" id="buscarItemEnCartas" placeholder="Buscador | ej: AWP">
              <span class="separador"></span>
            <button id="verItemSinOrden">Reset</button> 
          </div>
      </div>
  `)
}
verBotones();

// //--------------------------------Tarjeta al iniciar la pagina
const contenedorProductos = document.getElementById('productoContenedor') //-----------------> Tarjeta de inicio al cargar la pagina
function crearCartas(){

  for (const skin of stockSkins) {
    const div = document.createElement('div');
    div.classList.add('col-12','col-md-6','col-lg-4','col-xl-3');
    div.innerHTML += `
      <div class="card shadow " style="width: 17rem">
        <div class='background'>
          <img src="${skin.image}" class="card-img-top" alt="${skin.name}"/>
        </div>
        <div class="card-body">
          <h5 class="card-title">${skin.weapon} | ${skin.name}</h5>
          <div class="d-flex justify-content-between">
            <p class="card-text pb-2">${skin.condition}</p>
            
          </div>
          <div class="d-flex justify-content-between align-content-center">
            <a href="#" class="btn btn-primary" id=boton${skin.id}>Comprar</a>
            <p class="m-0 d-flex align-items-center">$${skin.price}</p>
          </div>
        </div>
      </div>
     </div>
                    `
    contenedorProductos.appendChild(div)
    botonCompra(skin);
  }
 };
 crearCartas()
 
//------------------------------------DOM---------------------------------------------------
const reiniciar = document.getElementById('verItemSinOrden') //             Boton Reset
let enviarOrdenados = document.getElementById('ordenComoUsuario');//        Ordena Como quiere el usuario
const buscadorBarra = document.getElementById('buscarItemEnCartas');//      Buscador
document.createElement('paginaTerminarCompra') // ------------------------> Boton iniciar compra
const eliminarItemsTodoCarrito = document.getElementById('eliminarItemCarrito') // Boton Carrito Borrar Localstorage/carrito

//-------------------------------------Funcion cartas por botones y buscador--------------------
function renderizarCard (skinArray){
  productoContenedor.innerHTML = ''
  skinArray.forEach(skin => {
        const div = document.createElement('div');
        div.classList.add('col-12','col-md-6','col-lg-4','col-xl-3');
        div.innerHTML += `
          <div class="card shadow " style="width: 17rem">
          <div class='background'>
          <img src="${skin.image}" class="card-img-top" alt="${skin.name} "/>
        </div>
            <div class="card-body">
              <h5 class="card-title">${skin.weapon} | ${skin.name}</h5>
              <div class="d-flex justify-content-between">
                <p class="card-text pb-2">${skin.condition}</p>
              </div>
              <div class="d-flex justify-content-between buttonD">
                <a href="#" class="btn btn-primary" id=boton${skin.id}>Comprar</a>
                <p class="m-0 d-flex align-items-baseline">$${skin.price}</p>
              </div>
            </div>
          </div>
         </div>
                        `
        contenedorProductos.appendChild(div)
        botonCompra(skin);
    })
}
//------------------------------------Funcion de compra con los botones-----------------------
function botonCompra (skin){
  const boton = document.getElementById(`boton${skin.id}`);
  boton.addEventListener('click', ()=>{
    Toastify({
      text: `Se agrego ${skin.weapon} | ${skin.name} al carrito `,
      duration: 2500,
      newWindow: true,
      close: true,
      gravity: "bottom", // `top` or `bottom`
      position: "left", // `left`, `center` or `right`
      stopOnFocus: false, // Prevents dismissing of toast on hover
      style: {
        background: "linear-gradient(to right, #5f0979, #00d4ff)",
      },
      onClick: function(){} // Callback after click
    }).showToast();

    carritoIndex(skin.id)
  } )
}
//----------------------------------------Agregar al carrito + Carrito---------------------------------

const carritoIndex = (productoId) =>{
  const contenedorCarrito = document.getElementById('carrito-contenedor');
  

  const renderCarritoProductos = () => {

    let producto = stockSkins.find(elemento => elemento.id == productoId);
      carrito.push(producto);
      //stockSkins.splice(producto.id, 1);
      guardarLocal(producto.id, JSON.stringify(producto))

      renderizarCard(stockSkins)
      let div = document.createElement('div')
      div.classList.add('productoEnCarrito')
      div.innerHTML +=` <p><img src='${producto.image}' width=40px height=40px class='mt-3'>
                        <p class="m-0 d-flex align-items-center">${producto.weapon} | ${producto.name}</p>
                        <p class="m-0 d-flex align-items-center">Precio: ${producto.price}</p> 
                        <i class="fa-solid fa-trash-can d-flex align-items-center"id=eliminar${producto.id}></i>
                        <hr>
                        `;       
      contenedorCarrito.appendChild(div);


//----------Eliminar todo el carrito
      eliminarItemsTodoCarrito.addEventListener('click', () =>{
        if(carrito.length != 0){
          for(let i=0; i<carrito.length; i++){                
            localStorage.removeItem(producto.id)    
          }
          Toastify({
            text: `Se eliminaron ${carrito.length} items del carrito :(.
              Se va a recargar la pagina.`,
            duration: 2500,
            newWindow: true,
            close: false,
            gravity: "top", // `top` or `bottom`
            position: "left", // `left`, `center` or `right`
            stopOnFocus: false, // Prevents dismissing of toast on hover
            style: {
              background: "linear-gradient(to right, #5f0979, #00d4ff)",
            },
            onClick: function(){} // Callback after click
          }).showToast();  
          //contenedorCarrito.removeChild(div);
          setTimeout(()=> {
            location.reload();
        }, 1500)
        
        }if(carrito.length==0){
          Toastify({
            text: `El carrito esta vacio no se puede vaciar.`,
            duration: 2500,
            newWindow: true,
            close: false,
            gravity: "top", // `top` or `bottom`
            position: "left", // `left`, `center` or `right`
            stopOnFocus: false, // Prevents dismissing of toast on hover
            style: {
              background: "linear-gradient(to right, #5f0979, #00d4ff)",
            },
            onClick: function(){} // Callback after click
          }).showToast();  
        }
      })
//----------Eliminar un unico item del carrito
    const eliminarTachoCarrito = document.getElementById(`eliminar${producto.id}`); //---------------------->Elimina unico item carrito
      eliminarTachoCarrito.addEventListener('click',()=>{
        localStorage.removeItem(producto.id)
          Toastify({
            text: `Se elimino ${producto.weapon} | ${producto.name} del carrito `,
            duration: 2500,
            newWindow: true,
            close: false,
            gravity: "top", // `top` or `bottom`
            position: "left", // `left`, `center` or `right`
            stopOnFocus: false, // Prevents dismissing of toast on hover
            style: {
              background: "linear-gradient(to right, #5f0979, #00d4ff)",
            },
            onClick: function(){} // Callback after click
          }).showToast();
          contenedorCarrito.removeChild(div);
      })
  }
      renderCarritoProductos()
}

//--------------------------Consulta usuario mayor menor etc-----------------------------------//
enviarOrdenados.addEventListener('click',()=>{
  const arrayObjetoOrdenados = stockSkins.slice(0);
  if(document.getElementById('AZ').checked){
    let objetoOrdenado = arrayObjetoOrdenados.sort((a, b) => //Muestra de A-Z
        a.weapon.localeCompare(b.weapon));

        renderizarCard(objetoOrdenado);

      }else if(document.getElementById('ZA').checked){
        let objetoOrdenado = arrayObjetoOrdenados.sort((a, b) =>//Muestra de Z-A
          b.weapon.localeCompare(a.weapon));

          renderizarCard(objetoOrdenado);

      }else if(document.getElementById('manorAMayor').checked){
        let objetoOrdenado = arrayObjetoOrdenados.sort(         //Muestra de menor a mayor de precio
          (a, b) => a.price - b.price);

          renderizarCard(objetoOrdenado);

      }else if(document.getElementById('mayorAMenor').checked){
        let objetoOrdenado = arrayObjetoOrdenados.sort(          //Muestra en Mayor a menor de precio
         (a, b) => b.price - a.price);

         renderizarCard(objetoOrdenado);

      } else if (document.getElementById('radioMuestraArma').checked) {
        let filtro = stockSkins.filter((name) => name.weapon !== "Agente");  // Muestra solo tipo de arma
        renderizarCard(filtro);
      } else if (document.getElementById('radioMuestraAgente').checked) {
        let filtro = stockSkins.filter((name) => name.weapon == "Agente");  //Muestra solo los agentes
        renderizarCard(filtro);
      } else{
        Swal.fire({
          icon: 'warning',
          title: 'Error',
          text: 'Selecciona algun filtro para continuar.',
          backdrop: `rgba(255,255,255,.25)`
        })
      }
})
//--------------------------------Boton Reinicia---------------------------------------------

reiniciar.addEventListener('click', ()=>{  //-----Reinicia las cartas a como estaban cuando entras
  renderizarCard(stockSkins);
})
//------------------------Buscador-------------------------------------

function buscadorUsuario() {

  let buscadorUsuario = buscadorBarra.value;
  let buscador = stockSkins.filter((nombre) => nombre.weapon == buscadorUsuario);
  
  renderizarCard(buscador)
  buscadorUsuario == '' && renderizarCard(stockSkins) //--Si no tiene nada se reinicia
  
}
buscadorBarra.addEventListener('input', buscadorUsuario) //----------> Buscador

//-------------------Nombre del Usurario------------------------------

function userDisplay(){
  const {user, photoProfile} = usuario
  let usuarioNombre = document.getElementById('nombreUsuarioInd');
  let displayUsuarioHTML = user;
  usuarioNombre.innerText = displayUsuarioHTML;
  
  const photoUserHTML = document.getElementsByClassName('photo');
  const div = document.createElement('div');
  div.innerHTML += `<img src="${photoProfile}" alt="photoUser" width=32px height=32px class="rounded-circle">`
  photoUserHTML[0].appendChild(div)
}

userDisplay()
//----------------------------------------Compra Completada----------------------------------------------------
let compraUsuarios = [{

}]
const terminarCompraFuncion = document.getElementById('terminarCompra');

terminarCompraFuncion.addEventListener('click', ()=>{
(carrito.length == 0) && (Swal.fire({
  icon: 'error',
  title: 'El carrito esta vacio.',
  text: 'Agrega mas item para continuar.',
}))
(carrito.length != 0) && (Swal.fire({
  icon: 'aSD',
  title: 'El carrito esta vacio.',
  text: 'Agrega mas item para continuar.',
}))

// if (carrito.length >= 1){
//   productoContenedor.innerHTML = ''
//   seccionBotonesJS.innerHTML = ''

//   paginaTerminarCompra.innerHTML +=`
//   <div class='container bg-white pt-2'> </a>
//     <a href="index.html" id="volverAtras" ><i class="fa-solid fa-arrow-left-long"></i></a>
//       <div class="pt-4 pb-4">
//               <div class="container d-flex flex-column">
//                 <div class="pt-3">
//                   <div class="d-flex">
//                     <p class="m-0 pe-2">Tu nombre:</p>
//                     <span class="requiered">*</span>
//                   </div>
//                   <div class="pt-1 d-flex justify-content-center">
//                     <input type="text" name="nombreDelComprador" class='inputNombreComprador cajaTextoFinalizarCompra' placeholder="Tu nombre." >
//                   </div>
//                 </div>
//                 <div class="pt-3">
//                   <div class="d-flex">
//                     <p class="m-0 pe-2">Correo Electronico: </p>
//                     <span class="requiered">*</span>
//                   </div>
//                   <div class="pt-1 d-flex justify-content-center">
//                     <input type="text" name="correoElectronicoDelComprador" class="inputElecMain cajaTextoFinalizarCompra" placeholder="ejemplo@mail.com">
//                   </div>
//                 </div>
//                 <div class="pt-3">
//                   <div class="d-flex">
//                     <p class="m-0  pe-2">Otro medio de contacto: </p>
//                     <span class="requiered">*</span>
//                   </div>
//                   <div class="d-flex justify-content-center">
//                     <input type="text" name="otroMedioContaDelComprador" class="inputOtroMedioCont cajaTextoFinalizarCompra" placeholder="Tu instagram, twitter, etc." >
//                   </div>
//                 </div>
//                 <div class="pt-3">
//                   <div class="d-flex">
//                     <p class="m-0 pe-2">Trade URL:</p>
//                     <span class="requiered">*</span>
//                     <a href="https://www.steamcommunity.com/my/tradeoffers/privacy#trade_offer_access_url" class="ps-2">(?)</a>
//                   </div>
//                   <div class="pt-1 d-flex justify-content-center">
//                     <input type="text" name="compraUsuarioTradeLink" class="inputURLSteam cajaTextoFinalizarCompra" placeholder="URL trade de steam.">
//                   </div>
//                 </div>
//                 <div class="pt-3 text-center">
//                   <button type="button" class="btn btn-primary" id='enviarCompra'>enviar</button>
//                 </div>
//               </div> 
//           </div>
//       </div>
//     </div>
//   </div>
//   `;

//   cerrarCarrito.click();
//   finalCompra()
//  }
// (carritoDeCompra.length >= 1) && 
// cerrarCarrito.click();
  
  //location.href="./compra.html";
})

function finalCompra(){
  const enviarCompra = document.getElementById('enviarCompra')
  enviarCompra.addEventListener('click',(event)=>{
    event.preventDefault();
    
    //----Finalizar Compra
    
    const nombreComprador = document.querySelector('.inputNombreComprador'),
          otroMedioContaDelComprador = document.querySelector('.inputElecMain'),
          correoElecComprador = document.querySelector('.inputOtroMedioCont'),
          compraUsuarioTradeLink = document.querySelector('.inputURLSteam');
    
    const data= {
      nombre: nombreComprador.value,
      UserOtroMedio: otroMedioContaDelComprador.value,
      CorreoElectronico: correoElecComprador.value,
      SteamURL: compraUsuarioTradeLink.value,
    };


    Swal.fire({
      title: '¿Deseas guardar los datos de la tarjeta?',
      showCancelButton: true,
      position: 'center',
      width: 400,
      confirmButtonText: 'Guardar',
  }).then((result)=>{
      if(result.isConfirmed){
          localStorage.setItem('data', JSON.stringify(data));
          Swal.fire('Datos guardados', '', 'success');
          setTimeout(() => {
              location.reload();
          }, 2000);
      }else if(result.dismiss === Swal.DismissReason.cancel){
          Swal.fire('Los datos no se guardaron', 'error');
          setTimeout(() => {
              location.reload();
          }, 2000);
      }
  })
 })
}
//----------------------------------------Carrito de compra al tirar F5 queda guardado--------------------------
const renderizarLocalStorage = ()=> {
  Object.values(localStorage).forEach(elements =>{
    carritoIndex(JSON.parse(elements).id);
    //carritoDeCompra.push(JSON.parse(elements));
  })
}
renderizarLocalStorage();