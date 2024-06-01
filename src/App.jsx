import React, { useState } from "react";
import CardGame from "./components/cardGame";
import Header from "./components/header";
import Modal from "./components/modal";
import { useTimer } from "./util/customHooks";

export default function App() {
  const [showModal, setShowModal] = useState(false);

  const {
    time,
    start: timerStart,
    stop: timerStop,
    reset: timerReset,
  } = useTimer();

  const cardTexts = [
    "Bunny 🐰",
    "Frog 🐸",
    "Panda 🐼",
    "Doggy 🐶",
    "Kitty 😺",
    "Duck 🦆",
  ];

  const [bestTime, setBestTime] = useState(0)
  const [previousTime, setPreviousTime] = useState(0)

  function gameStart() {
    timerStart()
  }

  function gameEnd() {
    timerStop()
    timerReset()
    setPreviousTime(time)
    newBestTime()
  }

  function newBestTime() {
    if (!bestTime || time < bestTime) {
      setBestTime(time)
    }
  }

  return (
    <>
      <Header
        // add time, bestTime, previousTime props
        time = {time}
        bestTime = {bestTime}
        previousTime = {previousTime}
        openModal={() => setShowModal(true)}
      />
      <CardGame
        // add onGameStart, onGameEnd props
        onGameStart = {gameStart}
        onGameEnd = {gameEnd}
        cardTexts={cardTexts}
      />
      <Modal isShown={showModal} close={() => setShowModal(false)} />
    </>
  );
}
