const allStories = [
  {
    thumbUrl: "images/dry3.png",
    imageUrl: "images/dry3.png",
    title: "Fruits 1",
  },

  {
    thumbUrl: "images/apple.jpg",
    imageUrl: "images/apple.jpg",
    title: "Fruits 2",
  },

  {
      thumbUrl: "images/dry3.png",
    imageUrl: "images/dry3.png",
    title: "Fruits 3",
  },

  {
    thumbUrl: "images/apple.jpg",
    imageUrl: "images/apple.jpg",
    title: "Fruits 4",
  },

  {
     thumbUrl: "images/dry3.png",
    imageUrl: "images/dry3.png",
    title: "Fruits 5",
  },

  {
    thumbUrl: "images/apple.jpg",
    imageUrl: "images/apple.jpg",
    title: "Fruits 6",
  },

  {
      thumbUrl: "images/dry3.png",
    imageUrl: "images/dry3.png",
    title: "Fruits 7",
  },

  {
    thumbUrl: "images/apple.jpg",
    imageUrl: "images/apple.jpg",
    title: "Fruits 8",
  },
];

const storiesContainer = document.querySelector(".stories-container");
const storyFull = document.querySelector(".story-full");
const storyFullImage = document.querySelector(".story-full img");
const storyFullTitle = document.querySelector(".story-full .title");
const closeBtn = document.querySelector(".story-full .close-btn");
const leftArrow = document.querySelector(".story-full .left-arrow");
const rightArrow = document.querySelector(".story-full .right-arrow");

let currentIndex = 0;
let timer;

allStories.forEach((s, i) => {
  const content = document.createElement("div");
  content.classList.add("content");

  const img = document.createElement("img");
  img.setAttribute("src", s.thumbUrl);

  storiesContainer.appendChild(content);
  content.appendChild(img);

  content.addEventListener("click", () => {
    currentIndex = i;
    storyFull.classList.add("active");
    storyFullImage.setAttribute("src", s.imageUrl);

    if (!s.title) {
      storyFullTitle.style.display = "none";
    } else {
      storyFullTitle.style.display = "block";
      storyFullTitle.innerHTML = s.title;
    }

    clearInterval(timer);
    timer = setInterval(nextStory, 5000);
  });
});

closeBtn.addEventListener("click", () => {
  storyFull.classList.remove("active");
});

leftArrow.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex -= 1;

    storyFullImage.setAttribute("src", allStories[currentIndex].imageUrl);

    if (!allStories[currentIndex].title) {
      storyFullTitle.style.display = "none";
    } else {
      storyFullTitle.style.display = "block";
      storyFullTitle.innerHTML = allStories[currentIndex].title;
    }

    clearInterval(timer);
    timer = setInterval(nextStory, 5000);
  }
});

const nextStory = () => {
  if (currentIndex < allStories.length - 1) {
    currentIndex += 1;

    storyFullImage.setAttribute("src", allStories[currentIndex].imageUrl);

    if (!allStories[currentIndex].title) {
      storyFullTitle.style.display = "none";
    } else {
      storyFullTitle.style.display = "block";
      storyFullTitle.innerHTML = allStories[currentIndex].title;
    }
  }
};

rightArrow.addEventListener("click", () => {
  nextStory();
  clearInterval(timer);
  timer = setInterval(nextStory, 5000);
});
