Promise.resolve('sangfor')
.then(res =>{
   throw res;
}).catch(err => {
    console.log(err);
}).then(res => {
    console.log(res);
})