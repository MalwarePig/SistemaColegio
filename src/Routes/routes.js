const express = require('express'); //guardar express en una variable de servidor
const router = express.Router(); //usar modulo de router de ex´press

//Acceder a login
router.get('/', (req, res) => {
	//res.send('holoo');
	res.render('index.html');
});

module.exports = router;