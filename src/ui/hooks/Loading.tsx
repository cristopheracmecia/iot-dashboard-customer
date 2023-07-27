import { useContext, useEffect } from "react";
import { AppLoaderContext } from "../context/Loading";
import { AppState } from "../../data/domain/State";

export function useAppLoader(states: Array<AppState<any> | null>) {
  const { startLoading, stopLoading, loading } = useContext(AppLoaderContext);
  TaskStateObserver(
    states,
    () => {
      startLoading();
    },
    () => {
      stopLoading();
    }
  );
  return {
    startLoading,
    stopLoading,
    loading,
  };
}

function TaskStateObserver(
  states: Array<AppState<any> | null>,
  whenAnyLoading: () => void,
  whenNoneLoading: () => void
) {
  let ignore = false;

  useEffect(() => {
    if (ignore) {
      whenNoneLoading();
      return;
    }
    for (let i = 0; i < states.length; i++) {
      const currentState = states[i];
      if (currentState?.loading) {
        whenAnyLoading();
        break;
      }
      const finalReached = i === states.length - 1;
      if (finalReached) {
        whenNoneLoading();
      }
    }
  }, [...states]);

  useEffect(() => {
    return () => {
      ignore = true;
    };
  }, []);
}
