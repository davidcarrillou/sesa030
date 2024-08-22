const app = require ("./app/app")

const puerto = process.env.PORT || 3001;

app.listen(puerto, () => {
    console.log(`#######servidor ejecutandose en el puerto: ${puerto}`)
});