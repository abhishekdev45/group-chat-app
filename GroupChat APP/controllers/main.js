exports.getMainPage =  async (req,res)=>{
    try{
        res.sendFile('signup.html' , {root : 'views'})
       
    }catch(e){
       res.status(500).json({error:e});
    }
  
}

exports.getLoginPage =  async (req,res)=>{
    try{
        res.sendFile('login.html' , {root : 'views'})
       
    }catch(e){
       res.status(500).json({error:e});
    }
  
}