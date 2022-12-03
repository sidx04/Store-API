const Product=require('../models/products')

const getAllProductsStatic=async(req,res)=>{
    const products=await Product.find({featured:true,})
    res.status(200).json({products, nbHits:products.length})
    //throw new Error('testing async errors...')
}

const getAllProducts=async(req,res)=>{
    //console.log(req.query);
    const {featured,company,name}=req.query
    const queryObj={}
    
    if (featured){
        queryObj.featured=featured==='true'?true:false
    }

    if(company){
        queryObj.company=company
    }

    if(name){
        queryObj.name=name
    }

    console.log(queryObj);
    const products=await Product.find(queryObj)
    res.status(200).json({products, nbHits:products.length})
}

module.exports={
    getAllProducts,
    getAllProductsStatic
}