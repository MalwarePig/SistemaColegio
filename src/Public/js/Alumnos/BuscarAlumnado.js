//CONSULTAR HERRAMIENTAS -- BOTON BUSCAR    
function BuscarAlumno() {
    var Alumno = document.getElementById("Buscador").value;
    $.ajax({
        url: '/BuscarAlumno/' + Alumno,
        success: function (data) {
            document.getElementById("Nombres").value = data[0].Nombres
            document.getElementById("ApellidoP").value = data[0].ApellidoP
            document.getElementById("ApellidoM").value = data[0].ApellidoM
            document.getElementById("Nacimiento").value = data[0].Nacimiento
            SelectDefault('Sexo', data[0].Sexo)
            document.getElementById("CURP").value = data[0].CURP
            document.getElementById("Direccion").value = data[0].Direccion
            document.getElementById("CP").value = data[0].CP
            document.getElementById("Telefono").value = data[0].Telefono
            document.getElementById("Celular").value = data[0].Celular
            document.getElementById("Correo").value = data[0].Correo
            document.getElementById("chkNacimiento").checked = data[0].chkNacimiento == 'true' ? true : false
            document.getElementById("chkSecundaria").checked = data[0].chkSecundaria == 'true' ? true : false
            document.getElementById("chkDomicilio").checked = data[0].chkDomicilio == 'true' ? true : false
            document.getElementById("chkCURP").checked = data[0].chkCURP == 'true' ? true : false
            document.getElementById("Contacto").value = data[0].Contacto
            document.getElementById("ContactoTelefono").value = data[0].ContactoTelefono
            document.getElementById("ContactoCorreo").value = data[0].ContactoCorreo

            document.getElementById("Lista").value = data[0].Lista
            document.getElementById("Matricula").value = data[0].Matricula
            document.getElementById("id").value = data[0].id
            SelectDefault('Turno', data[0].Turno)
            SelectDefault('Carrera', data[0].Carrera)
        } //Funcion success
    }); //Ajax
} //Evento clic



function CerrarModal(params) {
    $('#' + params).modal('hide')
}

function Limpiar() {
    document.getElementById("FormAlumno").reset();
}

/**
 * function
 * @param {*} list carga el nombre del Select a consultar
 * @param {*} data option que se busca crrespondiente al data
 */
function SelectDefault(list, data) {
    var Select = document.getElementById(list);
    for (var i = 0; i < Select.length; i++) { //Agregar nuevos options del select  
        console.log(Select.options[i].value + " - " + data)
        if (data == Select.options[i].value) {
            Select.options[i].selected = true
        }
    }
}

/**
 * function
 * Actualiza informacion completa
 */
function ActualizarAlumno() {
    var Nombres = document.getElementById("Nombres").value || '-';
    var ApellidoP = document.getElementById("ApellidoP").value || '-';
    var ApellidoM = document.getElementById("ApellidoM").value || '-';
    var Nacimiento = document.getElementById("Nacimiento").value || '-';
    var Sexo = document.getElementById("Sexo").value || '-';
    var CURP = document.getElementById("CURP").value || '-';
    var Direccion = document.getElementById("Direccion").value || '-';
    var CP = document.getElementById("CP").value || '-';
    var Telefono = document.getElementById("Telefono").value || '-';
    var Celular = document.getElementById("Celular").value || '-';
    var Correo = document.getElementById("Correo").value || '-';
    var chkNacimiento = document.getElementById("chkNacimiento").checked || '-';
    var chkSecundaria = document.getElementById("chkSecundaria").checked || '-';
    var chkDomicilio = document.getElementById("chkDomicilio").checked || '-';
    var chkCURP = document.getElementById("chkCURP").checked || '-';
    var Contacto = document.getElementById("Contacto").value || '-';
    var ContactoTelefono = document.getElementById("ContactoTelefono").value || '-';
    var ContactoCorreo = document.getElementById("ContactoCorreo").value || '-';
    var Matricula = document.getElementById("Matricula").value
    var Lista = document.getElementById("Lista").value
    var Turno = document.getElementById("Turno").value
    var Carrera = document.getElementById("Carrera").value
    var id = document.getElementById("id").value
    var Arreglo = [Nombres, ApellidoP, ApellidoM, Nacimiento, Sexo, CURP, Direccion, CP, Telefono,
        Celular, Correo, chkNacimiento, chkSecundaria, chkDomicilio, chkCURP, Contacto, 
        ContactoTelefono, ContactoCorreo,Matricula,Lista,Turno,Carrera,id];


    $.post("/ActualizarAlumno", // url
        {
            Arreglo
        }, // data to be submit
        function (objeto, estatus) { // success callback
            console.log("objeto: " + objeto + "Estatus: " + estatus);
            if (objeto == true) {
                $("#ModalExito").modal();
                setTimeout(() => {
                    document.getElementById("FormAlumno").reset();
                }, 2000);

            } else {
                $("#ModalError").modal();
            }
        });
}
