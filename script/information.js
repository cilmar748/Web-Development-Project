document.addEventListener('DOMContentLoaded', function(){
    const promoMessages = [
    "Join our company in Technology Zone of Visionary Innovation Hub for unparalleled opportunities in cutting-edge tech development! 15 QUOTAS LEFT!",
    "Become part of the Innovation Zone at Visionary Innovation Hub, where creativity meets research for groundbreaking solutions! 10 QUOTAS LEFT!",
    "Discover the Eco Zone at Visionary Innovation Hub, dedicated to sustainable practices and technologies for a greener future! 12 QUOTAS LEFT!"
    ];

    let randomIndex = Math.floor(Math.random() * promoMessages.length);
    document.getElementById('promotion_text').innerHTML = promoMessages[randomIndex];

    function rotateMessages() {
        randomIndex++;
        if (randomIndex > 2){
            randomIndex = 0;
        }
        document.getElementById('promotion_text').innerHTML = promoMessages[randomIndex];
    }
    
    setInterval(rotateMessages, 3000);

    const videos = [
    '<source src="https://personal.cs.cityu.edu.hk/~cs2204/2024/video/video1.mp4" type="video/mp4"> <source src="https://personal.cs.cityu.edu.hk/~cs2204/2024/video/video1.webm" type="video/webm">',
    '<source src="https://personal.cs.cityu.edu.hk/~cs2204/2024/video/video2.mp4" type="video/mp4"> <source src="https://personal.cs.cityu.edu.hk/~cs2204/2024/video/video2.webm" type="video/webm">'
    ];

    let currentVideo = 0;
    document.querySelector('.video_container').innerHTML = videos[currentVideo];
    document.querySelector('.video_container').addEventListener("ended", function(){
        if (currentVideo == 0){
            currentVideo += 1;
        } else{
            currentVideo -= 1;
        }
        document.querySelector('.video_container').innerHTML = videos[currentVideo];
        document.querySelector('.video_container').load();
        document.querySelector('.video_container').play();
    })
})