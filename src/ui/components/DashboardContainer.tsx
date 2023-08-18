import { FC, HTMLProps, PropsWithChildren } from "react";

export type DashboardSubpageContainerProps = PropsWithChildren<{
  className?: HTMLProps<HTMLDivElement>["className"];
  style?: HTMLProps<HTMLDivElement>["style"];
}>;
export const DashboardSubpageContainer: FC<DashboardSubpageContainerProps> = ({
  style,
  className,
  children,
}) => {
  return (
    <div
      className={`w-full h-full py:2 md:py-4 px-2 md:px-4 flex flex-col relative ${className}`}
      style={style}
    >
      {children}
    </div>
  );
};
