var aws = require('aws-sdk');

aws.config.update({
    accessKeyId: "AKIAQT4HBU7563FD4N6E",
    secretAccessKey: "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",
    region: 'eu-central-1'
});

// instantiate s3 with the above aws config 
   var s3 = new aws.S3();


//construct getParam
var getParams = {
    Bucket: 'hcp-8da2bd2a-eb08-4998-baf0-3ceae565e40d', //replace example bucket with your s3 bucket name
    Key: 'masdet.json' // replace file location with your s3 file location
}


var params = {
    Bucket: "hcp-8da2bd2a-eb08-4998-baf0-3ceae565e40d",
    // Key : "demo/0001" + "/" + path.basename(filePath),
    Key : '/abcd.txt'
      };




//Fetch or read data from aws s3
s3.getObject(getParams, function (err, data) {

    if (err) {
        console.log(err);
    } else {
        console.log(data.Body.toString()); //this will log data to console
    }

})