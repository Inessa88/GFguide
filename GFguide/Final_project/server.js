import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './config/db.js';
import router from './routes/Users.js'
import db2 from './config/db2.js';


dotenv.config();
const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(router);

// app.listen(process.env.PORT||8080, ()=>{
//     console.log(`run on ${process.env.PORT||8080}`);
// })
app.listen(3001, ()=>{
  console.log(`run on ${3001}`);
})

// try{
//     await db.authenticate();
//     console.log('Database connected');
// }
// catch(e){
//     console.log(e);
// }


app.get('/products',(req,res)=>{
    db2('products')
    
  .select('name', 'url')
  .from('products')
  .join('pictures', 'products.main_picture_id', '=', 'pictures.id')
  .then(rows=>{
      res.json(rows);
    })
    .catch(err=>{
      console.log(err);
    })
  })

  app.post('/products',(req,res)=>{
    let {name, category, filename} = req.body
    let picture_id = 1
    db2('pictures').insert({'url': filename}).returning('id')//to check after what we added 
    .then((data) => {
      db2('products').insert({'name': name, 'category_id': Number(category), 'main_picture_id': data[0].id})
      .then(rows=>{
          res.json(rows);
        })
    })    
    .catch(err=>{
      console.log(err);
    })
  })
