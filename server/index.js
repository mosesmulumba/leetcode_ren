// file system
const fs = require("fs");
const express = require('express');
const cors = require('cors');
const PythonShell = require('python-shell').PythonShell;


const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

app.post("/leetcode", ( req , res) => {

    try{

        //   console.log(req.body);
    fs.writeFileSync("test.py", req.body.code);

    let options = {
        mode: 'text',
        pythonOptions: ['-u'], // get print results in real-time
        args: [1,2,3]
      };
      
      PythonShell.run('test.py', options, function(err , results ){
        if (err){
            console.error(err);
            res.status(500).json({message : 'Error'});
        }else{
            // results is an array consisting of messages collected during execution
            console.log('results: %j', results);
            // res.json({message : "Success" , results});
        }
        res.json({message : "Success"});
      });
    }catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})