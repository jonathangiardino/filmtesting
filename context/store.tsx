import React, {
  useMemo,
  useReducer,
  createContext,
  useContext,
  FC,
} from "react";

interface ContextTypes {
  activeFilter: number | null;
  activateFilter: (payload: number) => void;
  clearFilter: () => void;
}

const initialState: ContextTypes = {
  activeFilter: null,
  activateFilter: () => {},
  clearFilter: () => {},
};

export const FilterContext = createContext<ContextTypes>(initialState);

function reducer(
  state: any,
  action: { type: string; payload?: number | null }
) {
  switch (action.type) {
    case "ACTIVATE_FILTER": {
      return {
        ...state,
        activeFilter: action.payload,
      };
    }
    case "CLEAR_FILTER": {
      return {
        activeFilter: null,
      };
    }
    default: {
      return console.error("no action");
    }
  }
}

export const FilterProvider = (props: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const activateFilter = (payload: number) =>
    dispatch({ type: "ACTIVATE_FILTER", payload });

  const clearFilter = () => dispatch({ type: "CLEAR_FILTER" });

  const value = useMemo(
    () => ({
      ...state,
      activateFilter,
      clearFilter,
    }),
    [state]
  );

  return <FilterContext.Provider value={value} {...props} />;
};

export const useFilter = () => {
  const context = useContext<ContextTypes>(FilterContext);
  if (context === undefined) {
    throw new Error(`must be used within a Filter Provider`);
  }
  return context;
};

export const FilterContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => <FilterProvider>{children}</FilterProvider>;
