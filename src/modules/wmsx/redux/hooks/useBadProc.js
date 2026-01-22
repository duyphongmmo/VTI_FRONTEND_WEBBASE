import { get } from "lodash";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import badProcActions from "../actions/bad-proc";

export const useBadProc = () => {
  const data = useSelector((state) => get(state, "wmsx.badProc"));

  const dispatch = useDispatch();
  const actions = useMemo(
    () => bindActionCreators(badProcActions, dispatch),
    [dispatch],
  );

  return {
    actions,
    data,
  };
};
