import { Spin } from "antd";
import {
  FC,
  PropsWithChildren,
  createContext,
  useCallback,
  useState,
} from "react";

type Value = {
  startLoading: () => void;
  stopLoading: () => void;
  loading: boolean;
};

export const AppLoaderContext = createContext<Value>({
  startLoading: null!!,
  stopLoading: null!!,
  loading: null!!,
});

export const AppLoaderProvider: FC<PropsWithChildren> = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const startLoading = useCallback(() => {
    if (!loading) setLoading(true);
  }, [loading]);
  const stopLoading = useCallback(() => {
    if (loading) setLoading(false);
  }, [loading]);
  return (
    <AppLoaderContext.Provider
      value={{
        startLoading,
        stopLoading,
        loading,
      }}
    >
      {loading ? (
        <div className="absolute bg-opacity-60 w-full h-full bg-white z-50 flex items-center justify-center">
          <Spin  />
        </div>
      ) : null}
      {children}
    </AppLoaderContext.Provider>
  );
};
