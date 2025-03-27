import anime from "animejs";
export const runHomeAnime = () => {
  console.log("run!");

  anime({
    targets: ".heroImg",
    translateX: [200, 0],
    opacity: [0, 1],
    duration: 1500,
  });

  anime({
    targets: ".text-anime-1",
    opacity: [0, 1],
    duration: 1500,
    delay: 1000,
  });

  anime({
    targets: ".text-anime-2",
    opacity: [0, 1],
    translateY: [-100, 0],
    duration: 1500,
    delay: 2000,
  });
};
