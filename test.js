var nodeimu = require('nodeimu');
var IMU = new nodeimu.IMU();

var PythonShell = require('python-shell');

PythonShell.run('python/helloworld.py', function(err, results) {
    if (err) throw err;
});

IMU.getValue(function(err, data) {
    if (err) throw err;
    console.log(data);
});

function pollMe(e) {
    IMU.getValue(function(err, data) {
        if (err) throw err;
        yaw = data.fusionPose.z * 180 / Math.PI + 180;
        //console.log(yaw.toFixed(0));
        let message = "Heading: " + yaw.toFixed(1) + " degrees ";
        process.stdout.write(message + "\r");
    });
}

setInterval(pollMe,250);