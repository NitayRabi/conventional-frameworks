import { observe } from "mobx";
import { useState } from "react";
import { RuntimeAPI } from ".";
import { state } from "./bootstrap";

export const useRuntimeAPI = () => {
  const [runtimeState, setRuntimeState] = useState(state.runtimeAPI);

  observe(state, "runtimeAPI", ({ newValue }) =>
    setRuntimeState(newValue as RuntimeAPI)
  );

  return runtimeState;
};
