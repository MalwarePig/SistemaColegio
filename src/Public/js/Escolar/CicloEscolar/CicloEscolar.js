function AbrirModal(params) {
  $("#" + params).modal();
}

function CerrarModal(params) {
  $('#' + params).modal('hide')
}


function RegistrarNuevoCiclo() {
  $.post("/RegistrarNuevoCiclo", // url
    {
      Clave: moment(document.getElementById("Inicio").value).format('MMM') + "-" + moment(document.getElementById("Cierre").value).format('MMM') + "-" + moment(document.getElementById("Cierre").value).format('YY'),
      Inicio: document.getElementById("Inicio").value,
      Cierre: document.getElementById("Cierre").value,
      Tipo: document.getElementById("Tipo").value,
      Nota: document.getElementById("Nota").value,
    }, // data to be submit
    function (objeto, estatus) { // success callback
      console.log("objeto: " + objeto + "Estatus: " + estatus);
      if (objeto == true) {
        CerrarModal('ModalFormulario')
        $("#ModalExito").modal();
        setTimeout(() => {
          document.getElementById("FormAlumno").reset();
          CargarListaCicloEscolar()
        }, 1000);

      } else {
        $("#ModalError").modal();
      }
    });
}


function CargarListaCicloEscolar() {
  $.ajax({
    url: '/CargarListaCicloEscolar/',
    success: function (data) {
      var Arreglo = [];
      //Limpiar tabla 
      var TablaAlmacen = document.getElementById('Tabla').getElementsByTagName('tbody')[0];
      var limite = TablaAlmacen.rows.length;
      for (var i = 0; i < limite; i++) {
        $("#Rows").remove(); //elimina los elementos con id Rows
      }
      if (data.length == 0) {
        $("#Vacio").modal();
      }
      for (var i = 0; i < data.length; i++) {
        var id = data[i].id;
        var Clave = data[i].Clave || '-';
        var Inicio = moment(data[i].Inicio).format('DD-MM-YYYY');
        var Cierre = moment(data[i].Cierre).format('DD-MM-YYYY');
        var Tipo = data[i].Tipo || '-';
        var Nota = data[i].Nota || '-';
        var Creado = moment(data[i].Creado).format('DD-MM-YYYY');
        //Eliminar variable dentro del For
        Arreglo = [id, Clave, Inicio, Cierre, Tipo, Nota, Creado]

        // inserta una fila al final de la tabla
        var newRow = TablaAlmacen.insertRow(TablaAlmacen.rows.length);
        for (var x = 0; x < Arreglo.length; x++) {
          if (x == 1) { //Si termina de registrar datos crear el boton
            var newCell = newRow.insertCell(1);
            // inserta una celda en el indice 0 
            newRow.setAttribute("id", "Rows"); //se asigna id al incrementar cada fila +1 para contar el encabezado
            // adjuntar el texto al nodo
            var newText = document.createTextNode(Arreglo[x]);
            newCell.appendChild(newText);
            /* newCell.innerHTML = '<button id="' + i + '" class="btn btn-dark" name="btn" onclick=Seleccion('+i+')>'+Arreglo[x]+'</button>'; */
            newCell.innerHTML = '<button id="' + i + '" class="btn btn-outline-info btn-sm" name="btn" data-bs-toggle="modal" data-bs-target="#ModalFull" onclick=Seleccion("' + Arreglo[1] + '")>' + Arreglo[1] + '</button>';

          } else {
            var newCell = newRow.insertCell(x);
            // inserta una celda en el indice 0 
            newRow.setAttribute("id", "Rows"); //se asigna id al incrementar cada fila +1 para contar el encabezado
            // adjuntar el texto al nodo
            var newText = document.createTextNode(Arreglo[x]);
            newCell.appendChild(newText);

          }
        } //fin de for de columnas
      } //fin de for de filas
    } //Funcion success
  }); //Ajax

  CargarListaCarreras()
}

function Seleccion(params) {
  AbrirModal("ModalFull")
  document.getElementById("TiuloCicloActual").innerText = 'Ciclo escolar actual (' + params + ')'
}


function CargarListaCarreras() {
  let ListaCarreras = document.getElementById("ListaCarreras");

  $.ajax({
    url: '/CargarListaCarreras/',
    success: function (Carreras) {

      //Borrar elementos option de select
      for (let i = ListaCarreras.options.length; i >= 0; i--) {
        ListaCarreras.remove(i);
      }

      let optionDefault = document.createElement("option");
      optionDefault.disabled = true;
      optionDefault.text = 'Escoger carrera';
      ListaCarreras.add(optionDefault);
      //Agregar nuevos options del select
      for (var i = 0; i < Carreras.length; i++) {
        var option = document.createElement("option");
        option.text = Carreras[i].Nombre;
        option.value = Carreras[i].id;
        ListaCarreras.add(option);
      }
    } //Funcion success
  }); //Ajax
}


function CargarCarreraSeleccionada() {

  let Carrera = document.getElementById("ListaCarreras").value;
  $.ajax({
    url: '/CargarCarreraSeleccionada/' + Carrera,
    success: function (data) {
      var Arreglo = [];
      //Limpiar tabla 
      var TablaAlmacen = document.getElementById('TablaCarreras').getElementsByTagName('tbody')[0];
      var limite = TablaAlmacen.rows.length;
      for (var i = 0; i < limite; i++) {
        $("#RowsCarrera").remove(); //elimina los elementos con id Rows
      }
      if (data.length == 0) {
        $("#Vacio").modal();
      }
      for (var i = 0; i < data.length; i++) {
        var id = data[i].id;
        var Clave = data[i].Clave || '-';
        var Nombre = data[i].Nombre || '-';
        //Eliminar variable dentro del For
        Arreglo = [id, Clave, Nombre]
        // inserta una fila al final de la tabla
        var newRow = TablaAlmacen.insertRow(TablaAlmacen.rows.length);
        for (var x = 0; x < Arreglo.length; x++) {
          // inserta una celda en el indice 0
          var newCell = newRow.insertCell(x);
          newRow.setAttribute("id", "Rows"); //se asigna id al incrementar cada fila +1 para contar el encabezado
          // adjuntar el texto al nodo
          var newText = document.createTextNode(Arreglo[x]);
          newCell.appendChild(newText);

          if (x == 2) { //Si termina de registrar datos crear el boton
            var newCell = newRow.insertCell(3); //CREAR CELDA
            newCell.innerHTML = '<button id="' + i + '" class="btn btn-outline-info btn-sm" name="btn" onclick=MostrarGrados("' + Arreglo[1] + '")><i class="fas fa-arrow-right"></i></button>';
          }
        } //fin de for de columnas
      } //fin de for de filas
    } //Funcion success
  }); //Ajax
}


function MostrarGrados(Clave) {
  $.ajax({
    url: '/CargarGradosClave/' + Clave,
    success: function (data) {
      var Arreglo = [];
      //Limpiar tabla 
      var TablaAlmacen = document.getElementById('TablaGrados').getElementsByTagName('tbody')[0];
      var limite = TablaAlmacen.rows.length;
      for (var i = 0; i < limite; i++) {
        $("#RowsGrados").remove(); //elimina los elementos con id Rows
      }
      if (data.length == 0) {
        $("#Vacio").modal();
      }

      var chkUno = data[0].chkUno || '-';
      var chkDos = data[0].chkDos || '-';
      var chkTres = data[0].chkTres || '-';
      var chkCuatro = data[0].chkCuatro || '-';
      var chkCinco = data[0].chkCinco || '-';
      var chkSeis = data[0].chkSeis || '-';

      //Eliminar variable dentro del For
      Arreglo = [chkUno, chkDos, chkTres, chkCuatro, chkCinco, chkSeis]

      for (var x = 0; x < 6; x++) {//6 filas
        // inserta una fila al final de la tabla
        var newRow = TablaAlmacen.insertRow(TablaAlmacen.rows.length);
        //Columnas Semestre y check
        for (let y = 0; y < 2; y++) {

          if (y == 0) { //Si termina de registrar datos crear el boton
            // inserta una celda en el indice 0
            var newCell = newRow.insertCell(y);
            newRow.setAttribute("id", "RowsGrados"); //se asigna id al incrementar cada fila +1 para contar el encabezado
            // adjuntar el texto al nodo
            var newText = document.createTextNode("Grado " + (x + 1));
            newCell.appendChild(newText); 
            newCell.innerHTML = 'Grado ' + (x + 1);
          } 
          
          if (y == 1) { //Si termina de registrar datos crear el boton
            // inserta una celda en el indice 0
            var newCell = newRow.insertCell(y);
            newRow.setAttribute("id", "RowsGrados"); //se asigna id al incrementar cada fila +1 para contar el encabezado 
            newCell.innerHTML = '<input class="form-check-input" type="checkbox" id="chkDomicilio">';
          }

        }


      } //fin de for de filas
    } //Funcion success
  }); //Ajax
}