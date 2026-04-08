import { useState } from "react";

export function useDesktopResolution({ resolution = 1024 }) {
  const [isDesktop, setIsDesktop] = useState(() => window.innerWidth >= resolution);

  return isDesktop;
}
