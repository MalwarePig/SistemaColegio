const Controller = {};

//Registrar Alumno nuevo
Controller.RegistrarAlumno = (req, res) => {
    if (req.session.loggedin) {
        req.getConnection((err, conn) => {
            const data = req.body; //TRAE TODO EL OBJETO 
            if (err) {
                console.log("Conexion: " + err)
            } else {
                conn.query('INSERT INTO alumnos set ?', [data], (err, ot) => {
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

//Buscar alumno
Controller.BuscarAlumno = (req, res) => {
    if (req.session.loggedin) {
        //res.send('Metodo Get list');
        req.getConnection((err, conn) => {
            const {
                param
            } = req.params;

            console.log(param)
            //conn.query("SELECT * FROM alumnos WHERE Nombres LIKE '%"+param+"%' OR ApellidoP LIKE '%"+param+"%' OR ApellidoM LIKE '%"+param+"%' OR Lista = "+param+" OR Matricula = "+param, (err, data) => {
            conn.query("SELECT * FROM alumnos WHERE (Nombres LIKE '%" + param + "%') OR (ApellidoP LIKE '%" + param + "%') OR (ApellidoM LIKE '%" + param + "%') OR (Lista LIKE '%" + param + "%') OR (Matricula LIKE '%" + param + "%')", (err, data) => {
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



//Crea Producto Gaveta
Controller.AsignarAlumno = (req, res) => {
    if (req.session.loggedin) {
        req.getConnection((err, conn) => {
            const data = req.body; //TRAE TODO EL OBJETO
            console.log(Object.values(data)[0]);
            var id = Object.values(data)[0].id; //obeter datos de un objeto id
            var Lista = Object.values(data)[0].Lista; //obeter datos de un objeto id
            var Matricula = Object.values(data)[0].Matricula;
            var Turno = Object.values(data)[0].Turno;
            var Carrera = Object.values(data)[0].Carrera;

            if (err) {
                console.log("Conexion: " + err)
            } else {
                conn.query("UPDATE alumnos SET Lista = '" + Lista + "', Matricula = '" + Matricula + "', Turno = '" + Turno + "', Carrera = '" + Carrera + "', Estado = true WHERE id = " + id, (err, Herramientas) => {
                    if (err) {
                        console.log('Error de lectura' + err);
                    } else {
                        res.json(true)
                    }

                });
            }
        });
    } else {
        res.render('Admin/Login.html');
    }
};



//Actualizar Alumno 
Controller.ActualizarAlumno = (req, res) => {
    if (req.session.loggedin) {
        req.getConnection((err, conn) => {
            const data = req.body; //TRAE TODO EL OBJETO 
          
            const query = 'UPDATE alumnos SET Nombres = ?, ApellidoP = ?, ApellidoM = ?,'+
            'Nacimiento = ?, Sexo = ?, CURP = ?, Direccion =?,CP = ?, Telefono = ?, Celular= ?,Correo = ?,'+
            'chkNacimiento = ?, chkSecundaria = ?, chkDomicilio =?, chkCURP =?, Contacto=?, ContactoTelefono =?,'+
            'ContactoCorreo =?, Matricula =?, Lista =?, Turno =?, Carrera = ? WHERE id = ?'
            const values = ['Womys', 'Miranda', '2']; 
            console.log(Object.values(data)[0] )
            if (err) {
                console.log("Conexion: " + err)
            } else {
                conn.query(query, Object.values(data)[0], (err, ot) => {
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
module.exports = Controller;
