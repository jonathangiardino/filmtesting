import React, {
  useMemo,
  useReducer,
  createContext,
  useContext,
  FC,
} from "react";

interface ContextTypes {
  activeFilter: number | null;
  searchParams: string;
  activateFilter: (payload: number) => void;
  clearFilter: () => void;
  handleSearch: (payload: string) => void;
}

const initialState: ContextTypes = {
  activeFilter: null,
  searchParams: "",
  activateFilter: () => {},
  clearFilter: () => {},
  handleSearch: () => {},
};

export const FilterContext = createContext<ContextTypes>(initialState);

function reducer(
  state: any,
  action: { type: string; payload?: number | string | null }
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
        ...state,
        activeFilter: null,
      };
    }
    case "SEARCH": {
      return {
        ...state,
        searchParams: action.payload,
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

  const handleSearch = (payload: string) =>
    dispatch({ type: "SEARCH", payload });

  const value = useMemo(
    () => ({
      ...state,
      activateFilter,
      clearFilter,
      handleSearch,
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
