const express = require('express');
const ejs = require('ejs');
const aws = require('aws-sdk');
const bodyParser = require('body-parser');
const path = require('path');
const { json } = require('body-parser');
const { Buffer } = require('buffer');
const app = express();


app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
app.set('view engine','ejs');

app.get('/',function(req,res){
    res.render('home');
})

var content = [];


app.post('/',function(req,res){



// Update aws with object store secret
aws.config.update({
    accessKeyId: "AKIAQT4HBU7563FD4N6E",
    secretAccessKey: "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",
    region: 'eu-central-1'
});

// instantiate s3 with the above aws config 
   var s3 = new aws.S3();
   const prefix = req.body.prefix;
  var filePath = req.body.filesaved;
  var params = {
    Bucket: "hcp-8da2bd2a-eb08-4998-baf0-3ceae565e40d",
    Key : prefix + "/" + path.basename(filePath),
      };

  s3.getObject(params, function(err, data){
      if (err) console.log(err, err.stack); // an error occurred
      else data.Body.toString('utf-8');              // successful response
      var  jsonData = data.Body.toString('utf-8');
     console.log(jsonData);
     res.write(jsonData);
     res.send();
      });

    });

// List of all files in a given prefix

app.post('/list', function(req,res){


// Update aws with object store secret
aws.config.update({
    accessKeyId: "AKIAQT4HBU7563FD4N6E",
    secretAccessKey: "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",
    region: 'eu-central-1'
});

// instantiate s3 with the above aws config 
        var s3 = new aws.S3();
                var par = {
                Bucket: req.body.bucket ,   //'hcp-8da2bd2a-eb08-4998-baf0-3ceae565e40d', /* required */
                Prefix: req.body.prefix,  // Can be your folder name
                
            };

            s3.listObjectsV2(par, function(err, data) {
                            if (err) console.log(err, err.stack); // an error occurred
                            else               // successful response
                            // var  jsonData = data.Body.toString('utf-8');
                            // console.log(data.Contents);
                            content = data.Contents;
                            // console.log(JSON.stringify(data));
                            // content = JSON.stringify(data);
                            // // res.write(content);
                            // console.log(content.length)
                            console.log(content[1])
                            // res.write(content)
                            // res.send();
                         

            })

            res.redirect('list');

});

    //   app.post('/list',function(req,res){
//     var par = {
//         Bucket: req.body.bucket ,   //'hcp-8da2bd2a-eb08-4998-baf0-3ceae565e40d', /* required */
//         Prefix: req.body.prefix,  // Can be your folder name
        
//       };
//             s3.listObjectsV2(par, function(err, data) {
//                 if (err) console.log(err, err.stack); // an error occurred
//                 else               // successful response
//                 //var  jsonData = data.Body.toString('utf-8');
//                 // console.log(data);
//                 console.log(JSON.stringify(data));
//                 res.write(JSON.stringify(data));
//                 res.send();
            
//             });

//             var filePath = "saved_model.pb";
//             var params = {
//               Bucket: "hcp-8da2bd2a-eb08-4998-baf0-3ceae565e40d",
//               Key : "demo/0001" + "/" + path.basename(filePath),
//                 };
           
//             s3.getObject(params, function(err, data){
//                 if (err) console.log(err, err.stack); // an error occurred
//                 else data.Body.toString('utf-8');              // successful response
//                 //  const objectData = data.Body.toString('utf-8'); // Use the encoding necessary
//                 //res.send(data.Body.toString('utf-8'));
//                 // console.log(data.Body.toString('utf-8'));
//                var  jsonData = data.Body.toString('utf-8');

// // fs_write.js

// const fs = require('fs');

// // specify the path to the file, and create a buffer with characters we want to write

// const fname =  req.body.filesaved;
// let path = 'public/' + fname ;
// let buffer = Buffer(data.Body);

// // open the file in writing mode, adding a callback function where we do the actual writing
// fs.open(path, 'w', function(err, fd) {
//     if (err) {
//         throw 'could not open file: ' + err;
//     }

//     // write the contents of the buffer, from position 0 to the end, to the file descriptor returned in opening our file
//     fs.write(fd, buffer, 0, buffer.length, null, function(err) {
//         if (err) throw 'error writing file: ' + err;
//         fs.close(fd, function() {
//             console.log('wrote the file successfully');
//         });
//     });
// });
//                 });
          
                
// });


// app.post('/', function(req,res){

//   var fileName = './pqrs.txt'

//   const uploadFile = (fileName) => {
//     // Read content from the file
//     const fileContent = fs.readFileSync(fileName);
//     console.log(fileContent);
//     const BUCKET_NAME = "hcp-8da2bd2a-eb08-4998-baf0-3ceae565e40d";
//     // Setting up S3 upload parameters
//     const params = {
//         Bucket: BUCKET_NAME,
//         Key: 'pqrs.txt', // File name you want to save as in S3
//         Body: fileContent
//     };

//     // Uploading files to the bucket
//     s3.upload(params, function(err, data) {
//         if (err) {
//             throw err;
//         }
//         console.log(`File uploaded successfully. ${data.Location}`);
//     });
// };
// })

  app.get('/',function(req,res){
    res.render('home');
  });

  app.get('/list',function(req,res){
      res.render('list',{content:content});
  })

  app.listen(3002,function(req,res){
    console.log('Aws Get and List object app running at port 3002');

  });
