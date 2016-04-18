document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    
    var vibrate_button = document.querySelector('.vibrate-button');
    var qrcode_button = document.querySelector('.qr-code-button');
    var location_button = document.querySelector('.location-button');
    var flashlight_button = document.querySelector('.flashlight-button');

    var accelerometer_container = document.querySelector('.accelerations');
    var accelerometer_button = document.querySelector('.accelerometer-button');
    var accelerometer_y = document.querySelector('.acceleration-y');
    var accelerometer_x = document.querySelector('.acceleration-x');
    var accelerometer_z = document.querySelector('.acceleration-z');
   
    //Vibrate click
    vibrate_button.addEventListener('click', function() {
    	//vibrate for 2 seconds
    	navigator.vibrate(2000);
    });

    //QR Code click
    qrcode_button.addEventListener('click', function() {
    	
    	cordova.plugins.barcodeScanner.scan(
    	    function (result) {
    	        alert("We got a barcode\n" +
    	        "Result: " + result.text + "\n" +
    	        "Format: " + result.format + "\n" +
    	        "Cancelled: " + result.cancelled);
    	    }, 
    	    function (error) {
    	        alert("Scanning failed: " + error);
    	    }
    	);

    });
    
    //Location click
    location_button.addEventListener('click', function() {
    	
    	navigator.geolocation.getCurrentPosition(function(position){
    		//Show location
    		alert('Latitude: '          + position.coords.latitude          + '\n' +
		          'Longitude: '         + position.coords.longitude         + '\n' +
		          'Altitude: '          + position.coords.altitude          + '\n' +
		          'Accuracy: '          + position.coords.accuracy          + '\n' +
		          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
		          'Heading: '           + position.coords.heading           + '\n' +
		          'Speed: '             + position.coords.speed             + '\n' +
		          'Timestamp: '         + position.timestamp                + '\n');

    	}, function(error){
    		//Show error
    		alert('code: '    + error.code    + '\n' +
          		  'message: ' + error.message + '\n');
    	});

    });


    //Flashlight
    var flashlight_active = false;
    flashlight_button.addEventListener('click', function() {
    	if(!flashlight_active) {
    		flashlight_active = true;
    		flashlight_button.style.fontWeight = 'bold';
    		window.plugins.flashlight.switchOn();
    	}
    	else {
    		flashlight_active = false;
    		flashlight_button.style.fontWeight = 'normal';
    		window.plugins.flashlight.switchOff()
    	}
    });

    //Variable to store the acceleration watcher
    var watchID = false;

    //this function will get called every time acceleration updates
    var accelerometerSuccess = function (acceleration) {
    	accelerometer_y.innerHTML = acceleration.y;
		accelerometer_x.innerHTML = acceleration.x;
		accelerometer_z.innerHTML = acceleration.z;
    }

    //error handler
    var accelerometerError = function (error) {
    	alert(error);
    }

    //Accelerometer click
    accelerometer_button.addEventListener('click', function(e) {

    	if(!watchID) {
    		//show container etc
    		accelerometer_container.style.display = 'block';
    		accelerometer_button.style.fontWeight = 'bold';

    		//start to watch for accelerations
    		watchID = navigator.accelerometer.watchAcceleration(accelerometerSuccess, accelerometerError, {
    			frequency: 1000 //in milliseconds
    		});
    	}
    	else {
    		//stop listening
    		navigator.accelerometer.clearWatch(watchID);
    		watchID = false;
    		
    		//hide container etc
    		accelerometer_button.style.fontWeight = 'normal';
    		accelerometer_container.style.display = 'none';
    		
    	}
    });
}