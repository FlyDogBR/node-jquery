module.exports = function(request, response, next){
   if(request.method === 'GET'){
     next();
   }else{
     response.end('Method is not allowed');
   }
 };