const Controller = {};

//Registrar Nuevo Ciclo
Controller.RegistrarNuevoCiclo = (req, res) => {
    if (req.session.loggedin) {
        req.getConnection((err, conn) => {
            const data = req.body; //TRAE TODO EL OBJETO 
            if (err) {
                console.log("Conexion: " + err)
            } else {
                conn.query('INSERT INTO CicloEscolar set ?', [data], (err, ot) => {
                    if (err) {
                        console.log(err)
                    } else {
                        res.json(true);
                    }
                });
            }
        });
    } else {
        res.render('Admin/Login.html');
    }
};


//Cargar lista de ciclos registrados
Controller.CargarListaCicloEscolar = (req, res) => {
    if (req.session.loggedin) {
        //res.send('Metodo Get list');
        req.getConnection((err, conn) => {
            const {
                param
            } = req.params;

            console.log(param)
            //conn.query("SELECT * FROM alumnos WHERE Nombres LIKE '%"+param+"%' OR ApellidoP LIKE '%"+param+"%' OR ApellidoM LIKE '%"+param+"%' OR Lista = "+param+" OR Matricula = "+param, (err, data) => {
            conn.query("SELECT * FROM CicloEscolar ORDER BY Inicio DESC", (err, data) => {
                if (err) {
                    res.json("Error json: " + err);
                } else {
                    console.log(data)
                    res.json(data);
                }
            });
        });
    } else {
        res.render('Admin/Login.html');
    }
};

 
//Cargar Ciclo Escolar Seleccionado
Controller.CicloSeleccionado = (req, res) => {
    const {
        id
    } = req.params; //recibir valores del formulario
    req.getConnection((err, conn) => {
        if (err) {
            console.log("Tipo de error mysql: " + err);
        }
        conn.query('SELECT * FROM controlplaner WHERE id = ?', [id], (err, ordenes) => {
            if (err) {
                console.log("Tipo de error: " + err);
            }
            res.render('Producción/Update.html', {
                data: ordenes[0]
            });
        });
    });
};


//Registrar Nueva Materia
Controller.RegistrarNuevaMateria = (req, res) => {
    if (req.session.loggedin) {
        req.getConnection((err, conn) => {
            const data = req.body; //TRAE TODO EL OBJETO 
            if (err) {
                console.log("Conexion: " + err)
            } else {
                conn.query('INSERT INTO Materias set ?', [data], (err, ot) => {
                    if (err) {
                        console.log(err)
                    } else {
                        res.json(true);
                    }
                });
            }
        });
    } else {
        res.render('Admin/Login.html');
    }
};

//Cargar Lista de materias
Controller.CargarListaMaterias = (req, res) => {
    if (req.session.loggedin) {
        //res.send('Metodo Get list');
        req.getConnection((err, conn) => {
            const {
                param
            } = req.params;

            console.log(param)
            //conn.query("SELECT * FROM alumnos WHERE Nombres LIKE '%"+param+"%' OR ApellidoP LIKE '%"+param+"%' OR ApellidoM LIKE '%"+param+"%' OR Lista = "+param+" OR Matricula = "+param, (err, data) => {
            conn.query("SELECT * FROM Materias ORDER BY FechaCreacion DESC", (err, data) => {
                if (err) {
                    res.json("Error json: " + err);
                } else {
                    console.log(data)
                    res.json(data);
                }
            });
        });
    } else {
        res.render('Admin/Login.html');
    }
};



//Registrar Nueva Materia
Controller.RegistrarNuevaCarrera = (req, res) => {
    if (req.session.loggedin) {
        req.getConnection((err, conn) => {
            const data = req.body; //TRAE TODO EL OBJETO 
            if (err) {
                console.log("Conexion: " + err)
            } else {
                conn.query('INSERT INTO Carreras set ?', [data], (err, ot) => {
                    if (err) {
                        console.log(err)
                    } else {
                        res.json(true);
                    }
                });
            }
        });
    } else {
        res.render('Admin/Login.html');
    }
};




//Cargar Lista de materias
Controller.CargarListaCarreras = (req, res) => {
    if (req.session.loggedin) {
        //res.send('Metodo Get list');
        req.getConnection((err, conn) => {
            const {
                param
            } = req.params;

            console.log(param)
            //conn.query("SELECT * FROM alumnos WHERE Nombres LIKE '%"+param+"%' OR ApellidoP LIKE '%"+param+"%' OR ApellidoM LIKE '%"+param+"%' OR Lista = "+param+" OR Matricula = "+param, (err, data) => {
            conn.query("SELECT * FROM Carreras ORDER BY FechaCreacion DESC", (err, data) => {
                if (err) {
                    res.json("Error json: " + err);
                } else {
                    console.log(data)
                    res.json(data);
                }
            });
        });
    } else {
        res.render('Admin/Login.html');
    }
};

//Cargar carrera Seleccionada
Controller.CargarCarreraSeleccionada = (req, res) => {
    const {
        id
    } = req.params; //recibir valores del formulario

    console.log("id:  " + id);
    req.getConnection((err, conn) => {
        if (err) {
            console.log("Tipo de error mysql: " + err);
        }else{
            conn.query('SELECT * FROM Carreras WHERE id = ?', [id], (err, data) => {
                if (err) {
                    res.json("Error json: " + err);
                } else {
                    console.log(data)
                    res.json(data);
                }
            });
        } 
    });
};

//Cargar grados activos de una carrera
Controller.CargarGradosClave = (req, res) => {
    const {
        id
    } = req.params; //recibir valores del formulario

    console.log("id:  " + id);
    req.getConnection((err, conn) => {
        if (err) {
            console.log("Tipo de error mysql: " + err);
        }else{
            conn.query('SELECT * FROM Grados WHERE Clave = ?', [id], (err, data) => {
                if (err) {
                    res.json("Error json: " + err);
                } else {
                    console.log(data)
                    res.json(data);
                }
            });
        } 
    });
};

module.exports = Controller;
