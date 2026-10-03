import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from 'react';

export type DeviceMode = 'app' | 'site';

interface DeviceStoreValue {
  mode: DeviceMode;
  setMode: (m: DeviceMode) => void;
}

const DeviceStoreContext = createContext<DeviceStoreValue | null>(null);

export function DeviceStoreProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<DeviceMode>('app');
  return (
    <DeviceStoreContext.Provider value={{ mode, setMode }}>
      {children}
    </DeviceStoreContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useDevice() {
  const ctx = useContext(DeviceStoreContext);
  if (!ctx) throw new Error('useDevice deve ser usado dentro de DeviceStoreProvider');
  return ctx;
}
