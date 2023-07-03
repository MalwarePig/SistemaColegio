/**
 * 
 */
function RegistrarAlumno() {

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
    var Arreglo = [Nombres, ApellidoP, ApellidoM, Nacimiento, Sexo, CURP, Direccion, CP, Telefono, Celular, Correo, chkNacimiento, chkSecundaria, chkDomicilio, chkCURP, Contacto, ContactoTelefono, ContactoCorreo];
    var ObjetoTabla = {
        Nombres: document.getElementById("Nombres").value,
        ApellidoP: document.getElementById("ApellidoP").value,
        ApellidoM: document.getElementById("ApellidoM").value,
        Nacimiento: document.getElementById("Nacimiento").value,
        Sexo: document.getElementById("Sexo").value,
        CURP: document.getElementById("CURP").value,
        Direccion: document.getElementById("Direccion").value,
        CP: document.getElementById("CP").value,
        Telefono: document.getElementById("Telefono").value,
        Celular: document.getElementById("Celular").value,
        Correo: document.getElementById("Correo").value,
        chkNacimiento: document.getElementById("chkNacimiento").checked,
        chkSecundaria: document.getElementById("chkSecundaria").checked,
        chkDomicilio: document.getElementById("chkDomicilio").checked,
        chkCURP: document.getElementById("chkCURP").checked,
        Contacto: document.getElementById("Contacto").value,
        ContactoTelefono: document.getElementById("ContactoTelefono").value,
        ContactoCorreo: document.getElementById("ContactoCorreo").value
    }
 
    var totalCampos = Object.keys(ObjetoTabla).length
    for (let index = 0; index < totalCampos; index++) {
        console.log()
        if (!Object.values(ObjetoTabla)[index]) {
            // alert("Objeto Vacio " + Object.values(ObjetoTabla)[index])
        }
    } 
   
    $.post("/RegistrarAlumno", // url
        {
            Nombres: document.getElementById("Nombres").value,
            ApellidoP: document.getElementById("ApellidoP").value,
            ApellidoM: document.getElementById("ApellidoM").value,
            Nacimiento: document.getElementById("Nacimiento").value,
            Sexo: document.getElementById("Sexo").value,
            CURP: document.getElementById("CURP").value,
            Direccion: document.getElementById("Direccion").value,
            CP: document.getElementById("CP").value,
            Telefono: document.getElementById("Telefono").value,
            Celular: document.getElementById("Celular").value,
            Correo: document.getElementById("Correo").value,
            chkNacimiento: document.getElementById("chkNacimiento").checked,
            chkSecundaria: document.getElementById("chkSecundaria").checked,
            chkDomicilio: document.getElementById("chkDomicilio").checked,
            chkCURP: document.getElementById("chkCURP").checked,
            Contacto: document.getElementById("Contacto").value,
            ContactoTelefono: document.getElementById("ContactoTelefono").value,
            ContactoCorreo: document.getElementById("ContactoCorreo").value
        }, // data to be submit
        function (objeto, estatus) { // success callback
            console.log("objeto: " + objeto + "Estatus: " + estatus);
            if (objeto == true) {
                $("#ModalExito").modal();
               setTimeout(() => {
                document.getElementById("FormAlumno").reset();
               }, 2000);
                
            }else{
                $("#ModalError").modal();
            }
        }); 
}

function CerrarModal(params) {
    $('#'+params).modal('hide')
}



