//CONSULTAR HERRAMIENTAS -- BOTON BUSCAR    
function BuscarAlumno() {
    var Alumno = document.getElementById("Buscador").value;
    $.ajax({
        url: '/BuscarAlumno/' + Alumno,
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
                var Nombre = data[i].Nombres;
                var ApellidoP = data[i].ApellidoP;
                var ApellidoM = data[i].ApellidoM;
                var NombreCompleto = Nombre + " " + ApellidoP + " " + ApellidoM
                var Lista = data[i].Lista || '-';
                var Matricula = data[i].Matricula || '-';
                //Eliminar variable dentro del For
                Arreglo = [id, NombreCompleto, Lista, Matricula]

                // inserta una fila al final de la tabla
                var newRow = TablaAlmacen.insertRow(TablaAlmacen.rows.length);
                for (var x = 0; x < Arreglo.length; x++) {
                    // inserta una celda en el indice 0
                    var newCell = newRow.insertCell(x);
                    newRow.setAttribute("id", "Rows"); //se asigna id al incrementar cada fila +1 para contar el encabezado
                    // adjuntar el texto al nodo
                    var newText = document.createTextNode(Arreglo[x]);
                    newCell.appendChild(newText);

                    if (x == 3) { //Si termina de registrar datos crear el boton
                        var newCell = newRow.insertCell(4); //CREAR CELDA
                        newCell.innerHTML = '<button id="' + i + '" class="btn btn-dark" name="btn" onclick=Seleccion(' + (i + 1) + ')> Selección </button>';
                    }
                } //fin de for de columnas
            } //fin de for de filas
        } //Funcion success
    }); //Ajax
} //Evento clic

//=========================================== EVENTO CLIC SOBRE LA TABLA DE BUSQUEDA PARA SELECCIONAR Alumno =================================================//
function Seleccion(variable) {
    Registro = document.getElementById("Tabla");

    var id = Registro.rows[variable].cells[0].childNodes[0].nodeValue; //Obtiene el valor de Clave 
    var Nombre = Registro.rows[variable].cells[1].childNodes[0].nodeValue; //Obtiene el valor de Producto
    var Lista = Registro.rows[variable].cells[2].childNodes[0].nodeValue; //Obtiene el valor de Stock
    var Matricula = Registro.rows[variable].cells[3].childNodes[0].nodeValue; //Obtiene el valor de StockUsado

    document.getElementById("Nombres").value = Nombre
    document.getElementById("id").value = id
    document.getElementById("Lista").value = Lista
    document.getElementById("Matricula").value = Matricula
}



function AsignarAlumno() {
    id = document.getElementById("id").value;
    Lista = document.getElementById("Lista").value;
    Matricula = document.getElementById("Matricula").value;
    Turno = document.getElementById("Turno").value;
    Carrera = document.getElementById("Carrera").value;

    var ObjetoTabla = {
        id: id,
        Lista: Lista,
        Matricula: Matricula,
        Turno: Turno,
        Carrera: Carrera
    }

    $.post("/AsignarAlumno", // url
        {
            ObjetoTabla
        }, // data to be submit
        function (objeto, estatus) { // success callback
            if (objeto == true) {
                //alert("Cambios realizados")
                $("#ModalExito").modal();
                setTimeout(() => {
                    document.getElementById("FormAlumno").reset();
                    document.getElementById("Buscador").value = '';
                }, 2000);
            }
        });
}

function CerrarModal(params) {
    $('#' + params).modal('hide')
}

function Limpiar() {
    document.getElementById("FormAlumno").reset();
}





