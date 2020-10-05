//'INSERT INTO employes (emp_id, password, memorable_info) VALUES($1, $2, $3)', [...values]
let express = require('express');
let bodyParser = require('body-parser');
let morgan = require('morgan');
let pg = require('pg');
var con = 0;
const PORT = 3000;

let pool = new pg.Pool({
    user: 'postgres',
    database: 'postgres',
    password: 'password01',
    host: 'localhost',
    port: 5433,
    max: 10
});

pool.client

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('dev'));

app.use(function(request, response, next){
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-requested-With, Content-Type, Accept");
    next();
});

app.post('/api/new_employe', function(request, response){
    var emp_id_server = request.body.emp_id;
    var password_server = request.body.password;
    var memorable_info = "AAAAAAAAAAAAA";
    //console.log(empi_id_server);
    //console.log(password_server);
    var sql = "SELECT * FROM employes WHERE emp_id = '"+emp_id_server+"' and password = '"+password_server+"'";
    
    pool.connect((err, db,done) => {
        if(err) {
            return response.status(400).send(err);
        }
        else {
            
            db.query( sql, (err,results) => {
                done();
                if(err) {	
                    console.log('DATA NOT INSERTED');
                    return response.status(400).send({ message:'Data not found !!!' });
                }
                
                else if(results.rows.length > 0)
                {
                    console.log('DATA INSERTED');
                    con=1;
                    db.end();
                    response.status(201).send({ message:'Data found !!!' });
                }

               else if(results.rows.length == 0)
                {
                    console.log('Not matched');
                    con=1;
                    db.end();
                    response.status(201).send({ message:'Data Not found !!!' });
                }

            })
        }
    })
});

app.listen(PORT, () => console.log('Listening on PORT' +PORT));
