song = "";

leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

scoreLeftWrist = 0;
scoreRightWrist = 0;

function preload(){
    song = loadSound("music.mp3");
}

function setup() {
    
    canvas = createCanvas(550, 550);
    canvas.center();
    
    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
    
}

function modelLoaded(){
    console.log("PoseNet is Initialized");
}

function gotPoses(results){
    if(results.length > 0) 
    {
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log('Left Wrist X = ' + leftWristX + ' Left Wrist Y = ' + leftWristY);
        console.log('Left Wrist Score = ' + scoreLeftWrist);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log('Right Wrist X = ' + rightWristX + ' Right Wrist Y = ' + rightWristY)
        console.log('Right Wrist Score = ' + scoreRightWrist);
    }
}

function draw(){
    image(video, 0, 0, 600, 500);
    fill("#E12D2E");
    stroke("#E12D2E");
    //Speed Y Position if condition
    if (scoreRightWrist > 0.2){
        circle(rightWristX, rightWristY, 20);

        if (rightWristY > 0 && rightWristY <= 100){
            document.getElementById("speed").innerText = "Speed: 0.5x";
            song.rate(0.5);
        }
        else if (rightWristY > 100 && rightWristY <= 200){
            document.getElementById("speed").innerText = "Speed: 1x";
            song.rate(1);
        }
        else if (rightWristY > 200 && rightWristY <= 300){
            document.getElementById("speed").innerText = "Speed: 1.5x";
            song.rate(1.5);
        }
        else if (rightWristY > 300 && rightWristY <= 400){
            document.getElementById("speed").innerText = "Speed: 2x";
            song.rate(2);
        }
        else if (rightWristY > 400 && rightWristY <= 500){
            document.getElementById("speed").innerText = "Speed: 2.5x";
            song.rate(2.5);
        }
    }
    // Volume Circles
    if (scoreLeftWrist > 0.2){
        circle(leftWristX, leftWristY, 20);
        isNumber = Number(leftWristY);
        remDecimals = floor(isNumber)*2;
        divThousand = remDecimals/1000;
        document.getElementById("volume").innerText = "Volume = " + divThousand;
        song.setVolume(divThousand); 
    }
}

function songPlay(){
    song.play();  
    song.setVolume(1);
    song.rate(1)
}







