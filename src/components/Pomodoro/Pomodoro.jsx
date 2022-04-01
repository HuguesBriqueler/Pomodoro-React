import { useState, useEffect, useReducer } from "react";
import styles from "./Pomodoro.module.css";
import pauseIcon from "../../Images/pause.svg";
import playIcon from "../../Images/play.svg";
import resestIcon from "../../Images/reset.svg";
import useTuneButton from "../reducer/pomodoro.reducer";

function Pomodoro() {
  const [sessionDuration, setSessionDuration] = useState(1500);
  const [sessionTimer, setSessionTimer] = useState(1500);
  const [breakDuration, setBreakDuration] = useState(300);
  const [breakTimer, setBreakTimer] = useState(300);
  const [isRunning, setIsRunning] = useState(false);

  const [duration, dispatchDuration] = useTuneButton({
    sessionDuration,
    setSessionDuration,
    sessionTimer,
    setSessionTimer,
    breakDuration,
    setBreakDuration,
    breakTimer,
    setBreakTimer,
  });

  const playPause = () => {
    setIsRunning(!isRunning);
  };
  const handleReset = () => {
    if (isRunning) {
      setIsRunning(false);
    }
    setSessionTimer(sessionDuration);
    setBreakTimer(breakDuration);
  };

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        dispatchDuration({ type: "TICK" });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isRunning]);

  return (
    <div
      className={`${styles.containerChrono} ${
        isRunning ? `${styles.animGlow}` : null
      }`}
    >
      <div className={styles.containerConfig}>
        <div className={`sessionDuration ${styles.boxBtns}`}>
          <button
            onClick={() =>
              dispatchDuration({ type: "DECREMENT", payload: "session" })
            }
          >
            -
          </button>
          <span>{sessionDuration / 60}</span>
          <button
            onClick={() =>
              dispatchDuration({ type: "INCREMENT", payload: "session" })
            }
          >
            +
          </button>
        </div>
        <div className={`breakDuration ${styles.boxBtns}`}>
          <button
            onClick={() =>
              dispatchDuration({ type: "DECREMENT", payload: "break" })
            }
          >
            -
          </button>
          <span>{breakDuration / 60}</span>
          <button
            onClick={() =>
              dispatchDuration({ type: "INCREMENT", payload: "break" })
            }
          >
            +
          </button>
        </div>
      </div>
      <h1>
        {sessionTimer > 0 ? (
          <span>
            {`${
              Math.trunc(sessionTimer / 60) < 10
                ? `0${Math.trunc(sessionTimer / 60)}`
                : `${Math.trunc(sessionTimer / 60)}`
            } : ${
              sessionTimer % 60 < 10
                ? `0${sessionTimer % 60}`
                : `${sessionTimer % 60}`
            }`}
          </span>
        ) : (
          <span>
            {`${
              Math.trunc(breakTimer / 60) < 10
                ? `0${Math.trunc(breakTimer / 60)}`
                : `${Math.trunc(breakTimer / 60)}`
            } : ${
              breakTimer % 60 < 10
                ? `0${breakTimer % 60}`
                : `${breakTimer % 60}`
            }`}
          </span>
        )}
      </h1>
      <div className={styles.containerControllers}>
        <button onClick={playPause}>
          <img src={isRunning ? pauseIcon : playIcon} alt="Play/Pause button" />
        </button>
        <button onClick={handleReset}>
          <img src={resestIcon} alt="Reset button" />
        </button>
      </div>
    </div>
  );
}

export default Pomodoro;
