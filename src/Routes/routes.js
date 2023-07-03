const express = require('express'); //guardar express en una variable de servidor
const router = express.Router(); //usar modulo de router de ex´press
const UserController = require('../Controllers/UserController');
const AlumnoController = require('../Controllers/AlumnoController');

/********* Inicio *********/
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
/********* ALUMNOS *********/
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


/********* ALUMNOS *********/
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



module.exports = router;