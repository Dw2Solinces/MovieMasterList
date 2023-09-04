const app = require('./src/app');
const PORT = process.env.PORT || 3001;

const main = async () => {
  
  const db = require('./src/config/configDB');
  await db.connectToMongoDB();
  
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto: ${PORT}`)
  });

}

main();