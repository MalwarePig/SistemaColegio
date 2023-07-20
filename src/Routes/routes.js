const express = require('express'); //guardar express en una variable de servidor
const router = express.Router(); //usar modulo de router de ex´press
const UserController = require('../Controllers/UserController');
const AlumnoController = require('../Controllers/AlumnoController');
const EscolarController = require('../Controllers/EscolarController');

/********************************************************************************/
/********* Inicio *********/
/********************************************************************************/
//Acceder a login
router.get('/', (req, res) => {
	//res.send('holoo');
	res.render('Admin/Login.html');
});

//Iniciar logueo
router.post('/Login', UserController.login);

//Acceder a home
router.get('/Home', (req, res) => {
	//res.send('holoo');
	res.render('index.html');
});

/********************************************************************************/
/********* ALUMNOS *********/
/********************************************************************************/
//Abre pagina formulario
router.get('/RegistrarAlumnos', (req, res) => {
	if (req.session.loggedin) {
		res.render('Alumnos/RegistroAlumnos.html', {
			title: 'Gladosys'
		});
	} else {
		res.render('Admin/Login.html');
	}
});

//Registrar alumno nuevo
router.post('/RegistrarAlumno', AlumnoController.RegistrarAlumno); 

//Abre pagina asignacion de carreras para alumnos
router.get('/AsignacionAlumnos', (req, res) => {
	if (req.session.loggedin) {
		res.render('Alumnos/Asignacion.html', {
			title: 'Gladosys'
		});
	} else {
		res.render('Admin/Login.html');
	}
});

//Buscar alumno
router.get('/BuscarAlumno/:param', AlumnoController.BuscarAlumno);
//Asignar alumno carrera y turno
router.post('/AsignarAlumno', AlumnoController.AsignarAlumno); 


//Abre pagina de busqueda de alumnos
router.get('/BuscarAlumnado', (req, res) => {
	if (req.session.loggedin) {
		res.render('Alumnos/Buscar.html', {
			title: 'Gladosys'
		});
	} else {
		res.render('Admin/Login.html');
	}
});

//Registrar alumno nuevo
router.post('/ActualizarAlumno', AlumnoController.ActualizarAlumno); 

/********************************************************************************/
/********* Escolar *********/
/********************************************************************************/
//Abre pagina de Ciclo escolar
router.get('/CicloEscolar', (req, res) => {
	if (req.session.loggedin) {
		res.render('Escolar/CicloEscolar/CicloEscolar.html', {
			title: 'Gladosys'
		});
	} else {
		res.render('Admin/Login.html');
	}
});

//Registrar Nuevo Ciclo
router.post('/RegistrarNuevoCiclo', EscolarController.RegistrarNuevoCiclo); 
//Cargar Lista Ciclo Escolar
router.get('/CargarListaCicloEscolar/', EscolarController.CargarListaCicloEscolar);
//Cargar Ciclo Escolar Seleccionado
router.get('/CicloSeleccionado/:id', EscolarController.CicloSeleccionado);


 
//Abre pagina de Materias
router.get('/Materias', (req, res) => {
	if (req.session.loggedin) {
		res.render('Escolar/Materias/Materias.html', {
			title: 'Gladosys'
		});
	} else {
		res.render('Admin/Login.html');
	}
});

//Registrar Nueva Materia
router.post('/RegistrarNuevaMateria', EscolarController.RegistrarNuevaMateria); 
//Cargar Lista de materias
router.get('/CargarListaMaterias/', EscolarController.CargarListaMaterias);




//Abre pagina de Materias
router.get('/Carreras', (req, res) => {
	if (req.session.loggedin) {
		res.render('Escolar/Carreras/Carreras.html', {
			title: 'Gladosys'
		});
	} else {
		res.render('Admin/Login.html');
	}
});

//Registrar Nueva Materia
router.post('/RegistrarNuevaCarrera', EscolarController.RegistrarNuevaCarrera); 
//Cargar Lista de materias
router.get('/CargarListaCarreras/', EscolarController.CargarListaCarreras);
//Cargar Ciclo Escolar Seleccionado
router.get('/CargarCarreraSeleccionada/:id', EscolarController.CargarCarreraSeleccionada);
//Cargar grados activos de una carrera
router.get('/CargarGradosClave/:id', EscolarController.CargarGradosClave);







//Abre pagina de materias
router.get('/Materias', (req, res) => {
	if (req.session.loggedin) {
		res.render('Escolar/Materias/Materias.html', {
			title: 'Gladosys'
		});
	} else {
		res.render('Admin/Login.html');
	}
});

//Abre pagina de materias
router.get('/Dashboard', (req, res) => {
	if (req.session.loggedin) {
		res.render('Escolar/Dashboard/Dashboard.html', {
			title: 'Gladosys'
		});
	} else {
		res.render('Admin/Login.html');
	}
});



module.exports = router;