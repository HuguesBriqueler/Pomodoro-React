import { useState, useEffect, useReducer } from "react";
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

  // Reducer handling countdown timer
  const [countdown, dispatchCountdown] = useReducer(countdownActions);
  function countdownActions(state, action) {
    switch (action.type) {
      case "TICK":
        if (sessionTimer > 0) {
          setSessionTimer((prevSessionTimer) => prevSessionTimer - 1);
        } else if (breakTimer > 0) {
          setBreakTimer((prevBreakTimer) => prevBreakTimer - 1);
        } else {
          setSessionTimer(sessionDuration);
          setBreakTimer(breakDuration);
        }
        break;
      default: {
      }
    }
  }

  // Reducer handling session and break duration buttons
  const [duration, dispatchDuration] = useReducer(durationActions);
  function durationActions(state, action) {
    switch (action.type) {
      case "INCREMENT":
        if (action.payload === "session") {
          setSessionDuration(
            (prevSessionDuration) => prevSessionDuration + 300
          );
          setSessionTimer((prevSessionTimer) => prevSessionTimer + 300);
        } else {
          setBreakDuration((prevBreakDuration) => prevBreakDuration + 60);
          setBreakTimer((prevBreakTimer) => prevBreakTimer + 60);
        }
        break;
      case "DECREMENT":
        if (action.payload === "session") {
          if (sessionDuration > 300) {
            setSessionDuration(
              (prevSessionDuration) => prevSessionDuration - 300
            );
            setSessionTimer((prevSessionTimer) => prevSessionTimer - 300);
          }
        } else {
          if (breakDuration > 60) {
            setBreakDuration((prevBreakDuration) => prevBreakDuration - 60);
            setBreakTimer((prevBreakTimer) => prevBreakTimer - 60);
          }
        }
        break;
      default: {
      }
    }
  }

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        dispatchCountdown({ type: "TICK" });
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
