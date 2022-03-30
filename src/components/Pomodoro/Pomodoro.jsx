import { useState } from "react";
import styles from "./Pomodoro.module.css";
import pauseIcon from "../../Images/pause.svg";
import playIcon from "../../Images/play.svg";
import resestIcon from "../../Images/reset.svg";

function Pomodoro() {
  const [sessionDuration, setSessionDuration] = useState(1500);
  const [sessionTimer, setSessionTimer] = useState(1500);
  const [breakDuration, setBreakDuration] = useState(300);
  const [breakTimer, setBreakTimer] = useState(300);
  const [isRunning, setIsRunning] = useState(false);

  return (
    <div className={styles.containerChrono}>
      <div className={styles.containerConfig}>
        <div className={`sessionDuration ${styles.boxBtns}`}>
          <button>-</button>
          <span>{sessionDuration / 60}</span>
          <button>+</button>
        </div>
        <div className={`breakDuration ${styles.boxBtns}`}>
          <button>-</button>
          <span>{breakDuration / 60}</span>
          <button>+</button>
        </div>
      </div>
      <h1>
        <span>CHRONO</span>
      </h1>
      <div className={styles.containerControllers}>
        <img src={isRunning ? pauseIcon : playIcon} alt="Play/Pause button" />
        <img src={resestIcon} alt="Reset button" />
      </div>
    </div>
  );
}

export default Pomodoro;
