const express = require("express");
const cors = require("cors");

/* Creates an Express application.
The express() function is a top-level
function exported by the express module.
*/

const Pool = require("pg").Pool;

const pool = new Pool({
  user: "root",
  host: "postgres",
  database: "root",
  password: "root",
  port: 5432,
});

/* To handle the HTTP Methods Body Parser
is used, Generally used to extract the
entire body portion of an incoming
request stream and exposes it on req.body
*/

async function get_data(num_cols, cat_cols, component, data, base_query){
  query = base_query

  for (let f in data){
    if(data[f]){
      if(num_cols.includes(f)){
        query=query+" AND ("+f+" BETWEEN "+data[f][0]+" AND "+data[f][1]+")"
      }
      if(cat_cols.includes(f)){
        query=query+" AND ("+f+"."+f+"="+"'"+data[f][0]+"'"
        if(data[f].length>1){
          for(i=1;i<data[f].length;i++){
              query=query+" OR "+f+"."+f+"="+"'"+data[f][i]+"'"
          }
        }
        query=query+")"
  
      }
    }
  } 
  console.log(query)
  
  all_data = await pool.query(query);
  all_data = {'Page_data' : all_data.rows} 
  for (let cat_col in cat_cols){
    filter_querry = `SELECT ${cat_cols[cat_col]}.${cat_cols[cat_col]}, COUNT(*) as amount FROM ${component} \
    JOIN ${cat_cols[cat_col]} ON ${cat_cols[cat_col]}.id = ${component}.${cat_cols[cat_col]}\
    GROUP BY ${cat_cols[cat_col]}.${cat_cols[cat_col]}`;
    filter = await pool.query(filter_querry)
    f = {[cat_cols[cat_col]] : filter.rows}
    all_data = Object.assign(all_data, f)
  }
  return all_data
}

const app = express();
app.use(cors());

const bodyParser = require("body-parser");
const { Query } = require("pg");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json());

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

pool.connect((err, client, release) => {
  if (err) {
    return console.error("Error acquiring client", err.stack);
  }
  client.query("SELECT NOW()", (err, result) => {
    release();
    if (err) {
      return console.error("Error executing query", err.stack);
    }
    console.log("Connected to Database !");
  });
});


app.get("/", (req, res) => {
  console.log("GET");

  getAll()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});


app.post("/cpu", async (req,res) =>{
  data=req.body
  category_filters=["Core_number", "Threads_number", "Socket"] 
  num_filters=["Frequency", "TDP", "Price"]
  component = 'Processor'
  try {
    query="SELECT Processor.id, img, Name, Core_number, Frequency, TDP, Threads_number, Socket.Socket, Price FROM Processor \
    JOIN Socket ON Socket.id = Processor.Socket WHERE 1=1"
    for (let f in data){
      if(data[f]){
        if(num_filters.includes(f)){
          console.log(f)
          query=query+' AND ('+f+' BETWEEN '+data[f][0]+' AND '+data[f][1]+')'
        }
        if (f == "Socket"){
          query=query+" AND ( Socket.Socket ='"+data[f][0]+"'"
          if(data[f].length>1){
            for(i=1;i<data[f].length;i++){
                query=query+" OR Socket.Socket ='"+data[f][i]+"'"
            }
          }
          query=query+')'
        }
        else if(category_filters.includes(f)){
          query=query+" AND ("+f+"='"+data[f][0]+"'"
          if(data[f].length>1){
            for(i=1;i<data[f].length;i++){
                query=query+' OR '+f+'='+data[f][i]
            }
          }
          query=query+')'
         
        }
      }
      console.log(query)
    }
    
    all_data = await pool.query(query);
    all_data = {'Page_data' : all_data.rows} 
    for (let cat_col in category_filters){
      filter_querry = `SELECT ${category_filters[cat_col]}, COUNT(*) as amount FROM ${component} \
      GROUP BY ${category_filters[cat_col]}`;
      filter = await pool.query(filter_querry)
      f = {[category_filters[cat_col]] : filter.rows}
      all_data = Object.assign(all_data, f)
    }

    filter_querry = `SELECT Socket.Socket, COUNT(*) as amount FROM ${component} \
    JOIN Socket ON Socket.id = Processor.Socket\
    GROUP BY Socket.Socket`;
    filter = await pool.query(filter_querry)
    f = {'Socket' : filter.rows}
    all_data = Object.assign(all_data, f)  
    
    res.json(all_data);
  }
  catch (err){
    console.error(err.message);
  }
  
})

app.post("/motherboard", async (req,res) =>{
  data=req.body
  console.log(data)
  category_filters=["Chipset","Socket","Memory_type","Form_factor"]
  num_filters=["Price"]
  component='Motherboard'
  try {
    base_query="SELECT Motherboard.id, img, Name, Chipset.Chipset, Socket.Socket, Memory_type.Memory_type as Memory_type, Form_factor.Form_factor , Price FROM Motherboard \
    JOIN Chipset ON Chipset.id = Motherboard.Chipset \
    JOIN Socket ON Socket.id = Motherboard.Socket \
    JOIN Memory_type ON Memory_type.id = Motherboard.Memory_type \
    JOIN Form_factor ON Form_factor.id = Motherboard.Form_factor WHERE 1=1"
    
    full = await get_data(num_filters, category_filters, component, data, base_query)
    res.json(full);
  }
  catch (err){
    console.error(err.message);
  }
  
})

app.post("/body", async (req,res) =>{
  data=req.body
  console.log(data)
  category_filters=[]
  num_filters=["Price"]
  component='Body'
  try {
    query=`SELECT
    Body.id, Body.img, Body.Name, Body.Price,
    STRING_AGG(Form_factor.Form_factor, ', ') AS Form_factors
    FROM Body_form_factors
    JOIN Body ON Body_form_factors.body_id = Body.id
    JOIN Form_factor ON Form_factor.id = Body_form_factors.form_factor_id
    GROUP BY Body.id HAVING 1=1`

    full = await get_data(num_filters, category_filters, component, data, query)
    res.json(full);
  }
  catch (err){
    console.error(err.message);
  }
  console.log(data)
  
})

app.post("/cooling_system", async (req,res) =>{
  data=req.body
  console.log(data)
  category_filters=["Cooling_system_type"]
  num_filters=["Price","Max_TDP"]
  component='Cooling_system'
  try {
    query=`SELECT Cooling_system.id, Cooling_system.img, Cooling_system.Name, Cooling_system.Cooling_system_type, Cooling_system.Max_TDP, STRING_AGG(Socket.Socket, ', '),
    Cooling_system.Price FROM Cooling_systems_sockets 
    JOIN Socket ON Socket.id = Cooling_systems_sockets.socket_id
    JOIN Cooling_system ON Cooling_system.id = Cooling_systems_sockets.cooling_system_id
    GROUP BY Cooling_system.id HAVING 1=1`
    for (let f in data){
      if(data[f]){
        if(num_filters.includes(f)){
          query=query+' AND '+f+'>'+data[f][0]+' AND '+f+'<'+data[f][1]
        }
        if (f == "Cooling_system_type"){
          query=query+" AND (Cooling_system.Cooling_system_type='"+data[f][0]+"'"
          if(data[f].length>1){
            for(i=1;i<data[f].length;i++){
                query=query+' OR '+f+'='+data[f][i]
            }
          }
          query=query+')'
        }
        else if(category_filters.includes(f)){
          query=query+' AND ('+f+'='+data[f][0]
          if(data[f].length>1){
            for(i=1;i<data[f].length;i++){
                query=query+' OR '+f+'='+data[f][i]
            }
          }
          query=query+')'
         
        }
      }
      console.log(query)
    }
    
    all_data = await pool.query(query);
    all_data = {'Page_data' : all_data.rows} 

    filter_querry = `SELECT Cooling_system.Cooling_system_type, COUNT(*) as amount FROM ${component} \
    GROUP BY Cooling_system.Cooling_system_type`;
    filter = await pool.query(filter_querry)
    f = {'Cooling_system_type' : filter.rows}
    all_data = Object.assign(all_data, f)

    res.json(all_data);
  }
  catch (err){
    console.error(err.message);
  }
  console.log(data)
  
})

app.post("/hard_drive", async (req,res) =>{
  data=req.body
  console.log(data)
  category_filters=["Disk_type"]
  num_filters=["Price","Memory"]
  component='Disk'
  try {

    query="SELECT Disk.id, img, Name, Disk_type.Disk_type, Memory, Price FROM Disk \
    JOIN Disk_type ON Disk_type.id = Disk.Disk_type WHERE 1=1"
    full = await get_data(num_filters, category_filters, component, data, query)
    res.json(full);
  }
  catch (err){
    console.error(err.message);
  }
  console.log(data)
  
})

app.post("/ram", async (req,res) =>{
  data=req.body
  console.log(data)
  category_filters=["Memory_type"]
  num_filters=["Price","Memory","Frequency"]
  component='RAM'
  try {

    query="SELECT RAM.id, img, Name, Memory_type.Memory_type, Memory, Frequency, Price FROM RAM \
    JOIN Memory_type ON Memory_type.id = RAM.Memory_type WHERE 1=1"
    full = await get_data(num_filters, category_filters, component, data, query)
    res.json(full);
  }
  catch (err){
    console.error(err.message);
  }
  console.log(data)
  
})

app.post("/power_unit", async (req,res) =>{
  data=req.body
  console.log(data)
  category_filters=["Power_unit_type"]
  num_filters=["Price","Power"]
  component='Power_unit'
  try {
    query = "SELECT Power_unit.id, img, Name, Power_unit_type.Power_unit_type, Power, Price FROM Power_unit \
    JOIN Power_unit_type ON Power_unit_type.id = Power_unit.Power_unit_type WHERE 1=1"
    full = await get_data(num_filters, category_filters, component, data, query)
    res.json(full);
  }
  catch (err){
    console.error(err.message);
  }
  console.log(data)
  
})

app.post("/videocard", async (req,res) =>{
  data=req.body
  category_filters=["Videomemory_type"]
  num_filters=["Price","Videomemory","Frequency","Power"]
  component='Videocard'
  try {

    query="SELECT Videocard.id, img, Name, Videomemory, Videomemory_type.Videomemory_Type, Frequency, Power, Price FROM Videocard \
    JOIN Videomemory_type ON Videomemory_type.id = Videocard.Videomemory_type WHERE 1=1"
    
    full = await get_data(num_filters, category_filters, component, data, query)
    res.json(full);
  }
  catch (err){
    console.error(err.message);
  }
  console.log(data)
  
})

app.post("/config_existence", async (req, res) => {//перевірка на наявність імені конфігурації
  try{
  data=req.body
  query=`SELECT EXISTS (SELECT 1 FROM Configuration WHERE Name = '${data["Name"]}')`
  console.log(query)
  
  const all_data = await pool.query(query);
  res.json(all_data.rows);
  }
  catch (err){
    console.error(err.message);
  }
  console.log(data)
});

app.post("/delete_config", async (req, res) => {//видалення конфігурації
  try{
  data=req.body
  query=`DELETE FROM Configuration WHERE id = ${data["ID"]}`
  console.log(query)
  
  await pool.query(query);
  res.json("DELETED");
  }
  catch (err){
    console.error(err.message);
  }
  console.log(data)
});

app.post("/update_name", async (req, res) => {//зміна імени конфігурації
  try{
  data=req.body
  query=`UPDATE Configuration SET Name = '${data["NewName"]}' WHERE id = ${data["ID"]}`
  console.log(query)
  
  await pool.query(query);
  res.json("Updated");
  }
  catch (err){
    console.error(err.message);
  }
  console.log(data)
});


app.post("/set_config", async (req, res) => {//збереження конфігурації
  try{
  data=req.body
  query="INSERT INTO Configuration (Name, Body, Motherboard, Processor, Cooling_system, RAM, Videocard, Disk, Power_unit, Full_price) \
  VALUES ('"+data["Name"]+"', "+data["Body"]+", "+data["Motherboard"]+", "+data["Processor"]+", "+data["Cooling_system"]+
  ", "+data["RAM"]+", "+data["Videocard"]+", "+data["Disk"]+", "+data["Power_unit"]+", "+data["Full_price"]+")"
  console.log(query)
  
  const all_data = await pool.query(query);
  res.json("Config set!!!");
  }
  catch (err){
    console.error(err.message);
  }
  console.log(data)
});

app.post("/get_configs", async (req, res) => {//отримання всіх конфігурацій
  try{
    query="SELECT Configuration.id, Body.img as Img, Configuration.Name AS CONF_NAME, Body.Name AS BODY_NAME, Motherboard.Name AS MOTHER_NAME, Processor.Name AS CPU_NAME,\
    Cooling_system.Name AS COOL_NAME, RAM.Name AS RAM_NAME, Videocard.Name AS VIDEO_NAME, Disk.Name AS SDD_NAME, Power_unit.Name AS POWER_NAME, Full_price FROM Configuration\
    JOIN Body ON Body.id = Configuration.Body\
    JOIN Motherboard ON Motherboard.id = Configuration.Motherboard\
    JOIN Processor ON Processor.id = Configuration.Processor\
    JOIN Cooling_system ON Cooling_system.id = Configuration.Cooling_system\
    JOIN RAM ON RAM.id = Configuration.RAM\
    JOIN Videocard ON Videocard.id = Configuration.Videocard\
    JOIN Disk ON Disk.id = Configuration.Disk\
    JOIN Power_unit ON Power_unit.id = Configuration.Power_unit\
    ORDER BY Configuration.id ASC;"
    const all_data = await pool.query(query);
    res.json(all_data.rows);
  }
  catch (err){
    console.error(err.message);
  }
    
});

app.post("/select_component", async (req, res) => {//отримати назву зображення та вартість якщо обран товар 
  data=req.body
  try {
    query = "SELECT "+data["Component"]+".id, img, Name, Price FROM "+data["Component"]+" WHERE 1=1 AND ID="+data['ID']
    const all_data = await pool.query(query);

    res.json(all_data.rows);
  }
  catch (err){
    console.error(err.message);
  }
  console.log(data)
  
});


app.post("/count", async (req, res) => {//отримати кількість товарів компоненти
  data=req.body
  try {
    query=`SELECT COUNT(*) as amount FROM ${data["Component"]}`
    const all_data = await pool.query(query);

    res.json(all_data.rows);
  }
  catch (err){
    console.error(err.message);
  }
  console.log(data)
  
});


app.post("/max_component_price", async (req,res) =>{ //отримання максимума для фільтрів
  data=req.body
  console.log(data)
  try {
    query = `SELECT MAX(Price) as max_price FROM ${data["Component"]}`    
    const all_data = await pool.query(query);

    res.json(all_data.rows);
  }
  catch (err){
    console.error(err.message);
  }
  console.log(data)
  
})



app.post("/component_filters", async (req, res) => {//отримання фільтрів компоненти
  data=req.body
  try {
    query=`SELECT COUNT(*) as amount FROM ${data["Component"]}`

    const all_data = await pool.query(query);

    res.json(all_data.rows);
  }
  catch (err){
    console.error(err.message);
  }
  console.log(data)
  
});

app.listen(8080, () => {
  console.log("Server start");
});


