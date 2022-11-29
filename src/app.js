const express=require('express')
const app=express()


//port config goes here
const port=process.env.PORT || 3000
app.listen(port,()=>{
    console.log(`Server is listening on port ${port}...`);
})
