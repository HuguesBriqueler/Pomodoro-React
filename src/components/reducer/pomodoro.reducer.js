import * as actions from "./action";
import { useReducer } from "react";

// Reducer handling session and break duration buttons

const useTuneButton = ({
  sessionDuration,
  setSessionDuration,
  sessionTimer,
  setSessionTimer,
  breakDuration,
  setBreakDuration,
  breakTimer,
  setBreakTimer,
}) => {
  const [duration, dispatchDuration] = useReducer(durationActions);
  function durationActions(state, action) {
    switch (action.type) {
      case actions.INCREMENT:
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
      case actions.DECREMENT:
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
      // handling countdown timer
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
  return [duration, dispatchDuration];
};

export default useTuneButton;
