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
})
//------------------------Variables Globales-------------------------------------------------

class Skins {
  constructor(id, arma, nombre, precio, estado, imagen, clases) {
    this.id = id;
    this.arma = arma;
    this.nombre = nombre;
    this.precio = parseFloat(precio);
    this.estado = estado;
    this.imagen = imagen;
    this.clases = clases;
  }
  comision() {
    this.precio = this.precio * 1.41;
  }
}

const stockSkins = [
  new Skins(0,"AK-47",'Frontside Misty', "1238" , "Casi Nuevo","./img/stock/front.png", 'armaG'),
  new Skins(1,"AWP","Dragon Lore", "30000" , "Recien Fabricado", "./img/stock/dragonlore.png", 'armaG'),
  new Skins(2,"Karambit","Stained", "2458" , "Bastante Degastado","./img/stock/stained.png", 'armaG'),
  new Skins(3,"Agente","Number-K", "1700","No Disponible","./img/stock/agentek.png", 'agente'),
  new Skins(4,"M4A4","Griffer", "1230","Recien Fabricado", "./img/stock/griffin.png", 'armaG'),
  new Skins(5,"Agente","Sargento Bombson","20","No disponible","./img/stock/bomb.png", 'agente'),
  new Skins(6,"Agente","Sir Loudmouth Darryl","1786", "No Disponible","./img/stock/Darryl.png", 'agente'),
  new Skins(7,"AK-47","Leet Museo","1500","Casi Nuevo","./img/stock/leetmuseo.png", 'armaG'),
  new Skins(8,"Five-Seven","Boost Protocol","550","Recien Fabricado","./img/stock/boostprotocol.png", 'chiquito'),
  new Skins(9,"Stiletto","Blue Steel","2000","Deplorable","./img/stock/bluesteel.png", 'armaG'),
  new Skins(10,"USP-S","Whiteout","250","Bastante degastado","./img/stock/whiteout.png", 'armaG'),
  new Skins(11,"P200","Corticera","75","Bastante degastado","./img/stock/corticera.png", 'chiquito')
]


const usuario = 
 {
  user: 'wasSd',
  steam: 'asdasdd.com',
  photoProfile: "./img/usuario/usuario1.jpg"
 }


const carritoDeCompra = [] //Array donde se guardan item carrito
const guardarLocal = (clave, valor) => { localStorage.setItem(clave, valor)};
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

//--------------------------------Tarjeta al iniciar la pagina
const contenedorProductos = document.getElementById('productoContenedor') //-----------------> Tarjeta de inicio al cargar la pagina
const mostrarProductos = (stockSkins) => {
  stockSkins.forEach(skin => {
      const div = document.createElement('div');
      div.classList.add('col-12','col-md-6','col-lg-4','col-xl-3');
      div.innerHTML += `
        <div class="card shadow " style="width: 17rem">
          <div class='background'>
            <img src="${skin.imagen}" class="card-img-top ${skin.clases}" alt="${skin.nombre}"/>
          </div>
          <div class="card-body">
            <h5 class="card-title">${skin.arma} | ${skin.nombre}</h5>
            <div class="d-flex justify-content-between">
              <p class="card-text pb-2">${skin.estado}</p>
              
            </div>
            <div class="d-flex justify-content-between align-content-center">
              <a href="#" class="btn btn-primary" id=boton${skin.id}>Comprar</a>
              <p class="m-0 d-flex align-items-center">$${skin.precio}</p>
            </div>
          </div>
        </div>
       </div>
                      `
      contenedorProductos.appendChild(div)
      botonCompra(skin);
  })
}

mostrarProductos(stockSkins);
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
          <img src="${skin.imagen}" class="card-img-top" alt="${skin.nombre} "/>
        </div>
            <div class="card-body">
              <h5 class="card-title">${skin.arma} | ${skin.nombre}</h5>
              <div class="d-flex justify-content-between">
                <p class="card-text pb-2">${skin.estado}</p>
              </div>
              <div class="d-flex justify-content-between buttonD">
                <a href="#" class="btn btn-primary" id=boton${skin.id}>Comprar</a>
                <p class="m-0 d-flex align-items-baseline">$${skin.precio}</p>
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
      text: `Se agrego ${skin.arma} | ${skin.nombre} al carrito `,
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
      carritoDeCompra.push(producto);
      //stockSkins.splice(producto.id, 1);
      guardarLocal(producto.id, JSON.stringify(producto))

      renderizarCard(stockSkins)
      let div = document.createElement('div')
      div.classList.add('productoEnCarrito')
      div.innerHTML +=` <p><img src='${producto.imagen}' width=40px height=40px class='mt-3'>
                        <p class="m-0 mt-3">${producto.arma} | ${producto.nombre}</p>
                        <p class="m-0 mt-3">Precio: ${producto.precio}</p> 
                        <i class="fa-solid fa-trash-can"id=eliminar${producto.id}></i>
                        `;       
      contenedorCarrito.appendChild(div);
//----------Eliminar todo el carrito
      eliminarItemsTodoCarrito.addEventListener('click', () =>{
        // removeAllItemCart(producto);
        if(carritoDeCompra.length === 0){
          alert('El carrito esta vacio, no se puede vaciar.')
        }else{
          for(let i=0; i<carritoDeCompra.length; i++){                 //-----------AAAAAAAAAAAAAAAAAAAA
            localStorage.removeItem(producto.id)    
          }
          
          Toastify({
            text: `Se eliminaron ${carritoDeCompra.length} items del carrito :(`,
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
        }
      })
//----------Eliminar un unico item del carrito
    const eliminarTachoCarrito = document.getElementById(`eliminar${producto.id}`); //---------------------->Elimina unico item carrito
      eliminarTachoCarrito.addEventListener('click',()=>{
        localStorage.removeItem(producto.id)
          Toastify({
            text: `Se elimino ${producto.arma} | ${producto.nombre} del carrito `,
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
enviarOrdenados.addEventListener('click',orden) //-------> AZ-ZA-Mayor a menor-Menor a mayor Botones Y Filtro de Agente o arma
function orden(){
  const arrayObjetoOrdenados = stockSkins.slice(0);
  if(document.getElementById('AZ').checked){
    let objetoOrdenado = arrayObjetoOrdenados.sort((a, b) => //Muestra de A-Z
        a.arma.localeCompare(b.arma));

        renderizarCard(objetoOrdenado);

      }else if(document.getElementById('ZA').checked){
        let objetoOrdenado = arrayObjetoOrdenados.sort((a, b) =>//Muestra de Z-A
          b.arma.localeCompare(a.arma));

          renderizarCard(objetoOrdenado);

      }else if(document.getElementById('manorAMayor').checked){
        let objetoOrdenado = arrayObjetoOrdenados.sort(         //Muestra de menor a mayor de precio
          (a, b) => a.precio - b.precio);

          renderizarCard(objetoOrdenado);

      }else if(document.getElementById('mayorAMenor').checked){
        let objetoOrdenado = arrayObjetoOrdenados.sort(          //Muestra en Mayor a menor de precio
         (a, b) => b.precio - a.precio);

         renderizarCard(objetoOrdenado);

      } else if (document.getElementById('radioMuestraArma').checked) {
        let filtro = stockSkins.filter((nombre) => nombre.arma !== "Agente");  // Muestra solo tipo de arma
        renderizarCard(filtro);
      } else if (document.getElementById('radioMuestraAgente').checked) {
        let filtro = stockSkins.filter((nombre) => nombre.arma == "Agente");  //Muestra solo los agentes
        renderizarCard(filtro);
      } else{
        Swal.fire({
          icon: 'warning',
          title: 'Error',
          text: 'Selecciona algun filtro para continuar.',
          backdrop: `rgba(255,255,255,.25)`
        })
      }
};

//--------------------------------Boton Reinicia---------------------------------------------

reiniciar.addEventListener('click', ()=>{
  renderizarCard(stockSkins);
})

//------------------------Buscador-------------------------------------

function buscadorUsuario() {

  let buscadorUsuario = buscadorBarra.value;
  let buscador = stockSkins.filter((nombre) => nombre.arma == buscadorUsuario);
  
  renderizarCard(buscador)
  buscadorUsuario == '' && renderizarCard(stockSkins)
  
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
  
(carritoDeCompra.length === '') && (Swal.fire({
  icon: 'error',
  title: 'El carrito esta vacio.',
  text: 'Agrega mas item para continuar.',
}))

if (carritoDeCompra.length >= 1){
  productoContenedor.innerHTML = ''
  seccionBotonesJS.innerHTML = ''

  paginaTerminarCompra.innerHTML +=`
  <div class='container bg-white pt-2'> </a>
    <a href="index.html" id="volverAtras" ><i class="fa-solid fa-arrow-left-long"></i></a>
      <div class="pt-4 pb-4">
              <div class="container d-flex flex-column">
                <div class="pt-3">
                  <div class="d-flex">
                    <p class="m-0 pe-2">Tu nombre:</p>
                    <span class="requiered">*</span>
                  </div>
                  <div class="pt-1 d-flex justify-content-center">
                    <input type="text" name="nombreDelComprador" class='inputNombreComprador' placeholder="Tu nombre." class="cajaTextoFinalizarCompra">
                  </div>
                </div>
                <div class="pt-3">
                  <div class="d-flex">
                    <p class="m-0 pe-2">Correo Electronico: </p>
                    <span class="requiered">*</span>
                  </div>
                  <div class="pt-1 d-flex justify-content-center">
                    <input type="text" name="correoElectronicoDelComprador" class="inputElecMain" placeholder="ejemplo@mail.com" class="cajaTextoFinalizarCompra">
                  </div>
                </div>
                <div class="pt-3">
                  <div class="d-flex">
                    <p class="m-0  pe-2">Otro medio de contacto: </p>
                    <span class="requiered">*</span>
                  </div>
                  <div class="d-flex justify-content-center">
                    <input type="text" name="otroMedioContaDelComprador" id="inputOtroMedioCont" placeholder="Tu instagram, twitter, etc." class="cajaTextoFinalizarCompra">
                  </div>
                </div>
                <div class="pt-3">
                  <div class="d-flex">
                    <p class="m-0 pe-2">Trade URL:</p>
                    <span class="requiered">*</span>
                    <a href="https://www.steamcommunity.com/my/tradeoffers/privacy#trade_offer_access_url" class="ps-2">(?)</a>
                  </div>
                  <div class="pt-1 d-flex justify-content-center">
                    <input type="text" name="compraUsuarioTradeLink" class="inputURLSteam" placeholder="URL trade de steam." class="cajaTextoFinalizarCompra">
                  </div>
                </div>
                <div class="pt-3 text-center">
                  <button type="button" class="btn btn-primary" id='enviarCompra'>enviar</button>
                </div>
              </div> 
          </div>
      </div>
    </div>
  </div>
  `;

  cerrarCarrito.click();
  finalCompra()
 }
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
      //CorreoElectronico: correoElecComprador.value,
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
          Swal.fire('Los datos no se guardaron', 'Le tenes miedo al éxito', 'error');
          setTimeout(() => {
              location.reload();
          }, 2000);
      }
  })


    // if((compraUsuarioTradeLink == '')||(nombreDelComprador == '')||(otroMedioContaDelComprador == '')||(correoElectronicoDelComprador == '')){
    //   Swal.fire({
    //     icon: 'error',
    //     title: 'Error',
    //     text: 'Rellena todos los campos para continuar',
    //     backdrop: `rgba(255,255,255,.25)`
    // })
    // }else{
    //   Swal.fire({
    //     icon: 'success',
    //     title: 'Gracias!',
    //     text: 'En los proximos dias te llegara una notificacion!',
    //     backdrop: `rgba(255,255,255,.25)`
    // })
  //}
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