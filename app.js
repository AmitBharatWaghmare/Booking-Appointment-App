const express=require(`express`);
const path =require(`path`);
const bodyParser=require(`body-parser`);
const cors =require(`cors`);
const Sequelize=require(`sequelize`);


const errorController=require(`./controllers/error`);
const sequelize=require(`./util/database`);
const User=require(`./moduls/User`);

const app=express();
app.use(bodyParser.json({extended:false}));
app.use(cors());

app.post(`/user/add-user`,async(req,res,next)=>
{
 
  try{
    console.log(req.body);
      if(!req.body.number)
      {
         throw new Error(`Phone is mandatory`);
      }
      const name =req.body.Name;
      const email=req.body.Email;
      const phonenumber=req.body.number;
        console.log(name);
      const data=await User.create({name:name,email:email,phonenumber:phonenumber});
      console.log(data);
      res.status(201).json({newUserDetail:data});
  }catch(err){
    console.log(err);
      res.status(500).json({
          error:err
      });
  }
})

app.get(`/user/get-user`,async(req,res,next)=>{
  
  User.findAll()
  .then(users => {
      res.json(users)
      //console.log(res.json(users)); 
  })
  .catch(err => {
      console.log(err);
      res.status(500).send(err.message);})
})


sequelize.sync().then(result=>{
  console.log('Database Connected...')
  app.listen(3000,()=>{
      console.log(`Server start on port 3000`);
  });
}).catch(err=>{
  console.log(err.message);
});