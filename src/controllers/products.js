const Product=require('../models/products')

const getAllProductsStatic=async(req,res)=>{
   
    /**
     * ` getAllProductsStatic() = testing route, only manual hard-coded values
     */
    
    /**
     * ! Non-Rigid Searching
     * 
     * > const search='a'
     * > const products=await Product.find({
     * >   name:{$regex:search,$options:'i'}
     * > })
     */
    
    /**
     * ! Sorting
     * > const products=await Product.find({}).sort('price')
     */

    /**
     * ! Selection of fields
     * > const products=await Product.find({}).select('name price')
     */

    /**
     * ! Limiting Data
     * > const products=await Product.find({})
     * >    .sort('name')
     * >    .select('name price')
     * >    .limit(4)
     * >    .skip(2)
     * > 
     */
    res.status(200).json({products, nbHits:products.length})
    //throw new Error('testing async errors...')
}

const getAllProducts=async(req,res)=>{
    //console.log(req.query);
    const {featured,company,name,sort, select}=req.query
    const queryObj={}
    
    if (featured){
        queryObj.featured=featured==='true'?true:false
    }

    if(company){
        queryObj.company=company
    }

    /**
     * ! use regex for non-strict filtering 
     */

    if(name){
        queryObj.name={$regex:name,$options:'i'}
    }

    //console.log(queryObj);
    
    /**
     *  ! Sorting
     */

      let result= Product.find(queryObj)
      
      if(sort){
        const sortList=sort.split(',').join(' ')
        result=result.sort(sortList)
      }
    
      else{
        result=result.sort('createAt')
      }
      

      /**
       * ! Selection of fields 
       */

      if(select){
        const selectList=select.split(',').join(' ')
        result=result.select(selectList) 
      }

      /**
       * ! Page limits
       */
      
      const page=Number(req.query.page)||1
      const limit=Number(req.query.limit)||10
      const skip=(page-1)*limit
      
      
      result=result.skip(skip).limit(limit)
      
      const products=await result
    
    res.status(200).json({products, nbHits:products.length})
}

module.exports={
    getAllProducts,
    getAllProductsStatic
}