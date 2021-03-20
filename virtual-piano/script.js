const piano = document.querySelector(".piano");
const pianoKeys = document.querySelectorAll(".piano-key");
const audio = document.querySelector(".audio");

const ACCESSIBLE_NOTE = {
  d: "c",
  f: "d",
  g: "e",
  h: "f",
  j: "g",
  k: "a",
  l: "b",
  r: "cd",
  t: "dd",
  u: "fd",
  i: "gd",
  o: "ad",
};

const playAudio = (note) => {
  const audio = new Audio(`./assets/audio/${note}.mp3`);
  audio.play();
};

piano.addEventListener("click", (event) => {
  playAudio(
    ACCESSIBLE_NOTE[event.target.getAttribute("data-letter").toLowerCase()]
  );
});

const startActiveStyle = (event) => {
  event.target.classList.add("piano-key-active", "piano-key-active-pseudo");
};

const stopActiveStyle = (event) => {
  event.target.classList.remove("piano-key-active", "piano-key-active-pseudo");
};

const mouseOverStart = (event) => {
  if (event.target.classList.contains("piano-key")) {
    event.target.classList.add("piano-key-active", "piano-key-active-pseudo");
  }
  pianoKeys.forEach((elem) => {
    elem.addEventListener("mouseover", startActiveStyle);
    elem.addEventListener("mouseout", stopActiveStyle);
  });
};

const mouseOverStop = (event) => {
  pianoKeys.forEach((elem) => {
    elem.classList.remove("piano-key-active", "piano-key-active-pseudo");
    elem.removeEventListener("mouseover", startActiveStyle);
    elem.removeEventListener("mouseout", stopActiveStyle);
  });
};

piano.addEventListener("mousedown", mouseOverStart);
piano.addEventListener("mouseup", mouseOverStop);

piano.addEventListener("mousedown", (event) => {
  playAudio(
    ACCESSIBLE_NOTE[event.target.getAttribute("data-letter").toLowerCase()]
  );
  piano.addEventListener("mouseover", (event) => {
    playAudio(
      ACCESSIBLE_NOTE[event.target.getAttribute("data-letter").toLowerCase()]
    );
  });
});

const buttonLaters = document.querySelector(".btn-letters");
const buttonNotes = document.querySelector(".btn-notes");

buttonLaters.addEventListener("click", () => {
  if (buttonNotes.classList.contains("btn-active")) {
    buttonNotes.classList.remove("btn-active");
    buttonLaters.classList.add("btn-active");
    pianoKeys.forEach((key) => {
      key.classList.add("piano-key-letter");
    });
  } else {
    buttonLaters.classList.remove("btn-active");
    buttonNotes.classList.add("btn-active");
    pianoKeys.forEach((key) => {
      key.classList.remove("piano-key-letter");
    });
  }
});

buttonNotes.addEventListener("click", () => {
  if (buttonNotes.classList.contains("btn-active")) {
    buttonNotes.classList.remove("btn-active");
    buttonLaters.classList.add("btn-active");
    pianoKeys.forEach((key) => {
      key.classList.add("piano-key-letter");
    });
  } else {
    buttonLaters.classList.remove("btn-active");
    pianoKeys.forEach((key) => {
      key.classList.remove("piano-key-letter");
    });
    buttonNotes.classList.add("btn-active");
  }
});

window.addEventListener("keydown", (event) => {
  if (!ACCESSIBLE_NOTE[event.key]) return;
  playAudio(ACCESSIBLE_NOTE[event.key]);
});

//event.target.classList.add("piano-key-active", "piano-key-active-pseudo");

const buttonFullScreen = document.querySelector(".fullscreen");

buttonFullScreen.addEventListener("click", () => {
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };
  toggleFullScreen();
});
