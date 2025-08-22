const nodemailder=require('nodemailer');

module.exports=async(email,subject,text)=>{
        

   try{
    const transfer=nodemailder.createTransport({
        host:process.env.HOST,
        service:process.env.SERVICE,
        port:Number(process.env.EMAIL_PORT),
        secure:Boolean(process.env.SECURE),
        auth:{
            user:process.env.USER,
            pass:process.env.PASS
        }
      })

      await transfer.verify();

      const response=await transfer.sendMail({
        from:process.env.USER,
        to:email,
        subject:subject,
        text:`VERIFY YOUR ONE TIME PASSWORD ${text}`
      })
   } catch(e){
    console.log("error!!!")
      console.log(e) 
   }

}