import type { ReactNode } from 'react';
import { useDevice } from '../store/DeviceStore';
import { DesktopFrame, MobileFrame } from './Layout';

/* Moldura pública (sem navegação) respeitando app/site */
export function PublicShell({
  children,
  desktopFull = false,
}: {
  children: ReactNode;
  desktopFull?: boolean;
}) {
  const { mode } = useDevice();
  if (mode === 'app') {
    return (
      <MobileFrame>
        <div className="flex h-full flex-col overflow-y-auto">{children}</div>
      </MobileFrame>
    );
  }
  return (
    <DesktopFrame>
      <div
        className={`h-[720px] overflow-y-auto bg-white ${
          desktopFull ? '' : 'px-0'
        }`}
      >
        {children}
      </div>
    </DesktopFrame>
  );
}
