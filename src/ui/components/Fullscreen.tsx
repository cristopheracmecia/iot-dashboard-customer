import { FC, useCallback, useEffect, useState } from "react";
import { Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExpand, faCompress } from "@fortawesome/free-solid-svg-icons";

type Props = {
  containerRef: React.RefObject<HTMLDivElement>;
};
export const FullscreenToggle: FC<Props> = ({ containerRef }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const onToggleCallback = useCallback(() => {
    setIsFullscreen(
      !!containerRef.current &&
        document.fullscreenElement === containerRef.current,
    );
  }, [containerRef.current, setIsFullscreen]);

  useEffect(() => {
    const curr = containerRef.current;
    if (curr) {
      curr.addEventListener("fullscreenchange", onToggleCallback);
    }
    return () => {
      if (curr) {
        curr.removeEventListener("fullscreenchange", onToggleCallback);
      }
    };
  }, [containerRef]);

  useEffect(() => {
    setIsFullscreen(
      !!containerRef.current &&
        document.fullscreenElement === containerRef.current,
    );
  }, []);

  const onToggle = useCallback(() => {
    if (!!containerRef.current) {
      if (isFullscreen) {
        void document.exitFullscreen();
      } else {
        void containerRef.current.requestFullscreen();
      }
    }
  }, [containerRef, isFullscreen]);
  return (
    <Button
      onClick={onToggle}
      type={isFullscreen ? "primary" : "default"}
      icon={<FontAwesomeIcon icon={isFullscreen ? faCompress : faExpand} />}
    />
  );
};
