const allstories = [
    {
        thumUrl:"images/dummy.jpg",
        imageurl:"images/dummy.png",
        title:"Title No.1"
    },
    {
        thumUrl:"images/dummy.jpg",
        imageurl:"images/dummy.png",
        title:"Title No.1"
    },
    {
        thumUrl:"images/dummy.jpg",
        imageurl:"images/dummy.png",
        title:"Title No.1"
    },
    {
        thumUrl:"images/dummy.jpg",
        imageurl:"images/dummy.png",
        title:"Title No.1"
    },
    {
        thumUrl:"images/dummy.jpg",
        imageurl:"images/dummy.png",
        title:"Title No.1"
    },
    {
        thumUrl:"images/dummy.jpg",
        imageurl:"images/dummy.png",
        title:"Title No.1"
    },
    {
        thumUrl:"images/dummy.jpg",
        imageurl:"images/dummy.png",
        title:"Title No.1"
    },
];
 
const storiesContainer = document.querySelector(".stories-container");
const storyFull = document.querySelector(".story-full");
const storyFullImage = document.querySelector(".story-full img");
const storyTitle  = document.querySelector(".story-full .title");
const closeBtn = document.querySelector("story-full .close-btn");
 allstories.forEach({s} => {
    const content = document.createElement{"div"};
    content.classList.add{"content"};

    const img = document.createElement{"img"};
    img.setAttribute{"src", s.thumUrl};

    storiesContainer.appendChild{content};
    content.appendChild{img};

    content.addEventListner{"click", () => {
storyFull.classList.add("active");
storyFullImage.setAttribute("src", s.imageurl);


if(!s.title){
    storyFullTitle.style.display = "none";
}
else{
    storyFullTitle.style.display = "block";
    storyFullTitle.innerhtml = s.title;
}
    }}
 });


 closeBtn.addEventListener("click", {} =>{
    storyFull.classList.remove("active");
 });
