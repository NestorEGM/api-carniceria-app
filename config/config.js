// **************************
// Port
// **************************
process.env.PORT = process.env.PORT || 3000;

// **************************
// Environment
// **************************
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// **************************
// Environment
// **************************
let urlDB;
if (process.env.NODE_ENV === 'dev') {
  urlDB = 'mongodb://localhost:27017/carniceria';
} else {
  urlDB = process.env.MONGO_URI;
}

process.env.URL_DB = urlDB;

// **************************
// Salt rounds for bcrypt
// **************************
process.env.SALT_ROUNDS = 10;

// **************************
// SEED token
// **************************
process.env.SEED = process.env.SEED || 'secret-seed-development';

// **************************
// Token expiration
// **************************
// 60 segundos
// 60 minutos
// 24 horas
// 30 dias
process.env.TOKEN_EXPIRATION = 60 * 60;