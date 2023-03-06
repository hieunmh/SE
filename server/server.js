import express from 'express';
import { getProducts } from './config/db';
import morgan from 'morgan';


const app = express();

//http logger
// app.use(morgan('combined'));


app.get('/products', async (req,res) => {
    const result = await getProducts();
    res.status(200).send(result);
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


// Listen on pc port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));

