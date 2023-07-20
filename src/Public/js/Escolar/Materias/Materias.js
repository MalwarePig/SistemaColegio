function AbrirModal(params) {
    $("#" + params).modal();
}

function CerrarModal(params) {
    $('#' + params).modal('hide')
}


function RegistrarNuevaMateria() { 
    $.post("/RegistrarNuevaMateria", // url
        {
            Clave: document.getElementById("Clave").value,
            Nombre: document.getElementById("Nombre").value,
            Estado: document.getElementById("Estado").value,
            Frecuencia: document.getElementById("Frecuencia").value,
            Grado: document.getElementById("Grado").value
        }, // data to be submit
        function (objeto, estatus) { // success callback
            console.log("objeto: " + objeto + "Estatus: " + estatus);
            if (objeto == true) {
                CerrarModal('ModalFormulario')
                $("#ModalExito").modal();
                setTimeout(() => {
                    document.getElementById("FormMateria").reset();
                    CargarListaMaterias()
                }, 1000);
            } else {
                $("#ModalError").modal();
            }
        });
}

function CargarListaMaterias() {
    $.ajax({
        url: '/CargarListaMaterias/',
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
                var Nombre = data[i].Nombre || '-';
                var Estado = data[i].Estado || '-';
                var Frecuencia = data[i].Frecuencia || '-';
                var FechaCreacion = moment(data[i].FechaCreacion).format('DD-MM-YYYY');  
                Arreglo = [id,Clave,Nombre,Estado,Frecuencia,FechaCreacion]

                // inserta una fila al final de la tabla
                var newRow = TablaAlmacen.insertRow(TablaAlmacen.rows.length);
                for (var x = 0; x < Arreglo.length; x++) {
                    // inserta una celda en el indice 0
                    var newCell = newRow.insertCell(x);
                    newRow.setAttribute("id", "Rows"); //se asigna id al incrementar cada fila +1 para contar el encabezado
                    // adjuntar el texto al nodo
                    var newText = document.createTextNode(Arreglo[x]);
                    newCell.appendChild(newText);

                     
                } //fin de for de columnas
            } //fin de for de filas
        } //Funcion success
    }); //Ajax
}