song1 = "";
song2 = "";
statu = "";

leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

scoreLeftWrist = 0;
scoreRightWrist = 0;

function preload()
{
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function setup()
{
    canvas = createCanvas(650,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw()
{
    image(video, 0, 0, 650, 500);

    fill("#FF0000");
    stroke("#FF0000");

    if (scoreLeftWrist > 0.05)
    {
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);
        
        circle(leftWristX, leftWristY, 20);
        song2.stop();
        if (statu == false)
        {
            song1.play();
            document.getElementById("song").innerHTML = "Harry Potter Theme Song";
        }
    }

    else if (statu == "false" && scoreRightWrist > 0.05)
    {
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);
        
        circle(rightWristX, rightWristY, 20);
        song2.play();
        song1.stop();
        document.getElementById("song").innerHTML = "Calm Music";
    }
    
}

function modelLoaded()
{
    console.log('PoseNet Is Intialized');
}

function gotPoses(results)
{
    if (results.length > 0)
    {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log(scoreLeftWrist);
        console.log(scoreRightWrist);
    }
}