import { FC, Fragment, PropsWithChildren } from "react";
import { createPortal } from "react-dom";
import { Spin, Typography } from "antd";

type Props = {
  loading?: boolean;
};
export const AppLoader: FC<Props> = ({ loading = true }) => {
  return (
    <Fragment>
      {loading ? (
        <div
          className={"absolute w-full h-full bg-white"}
          style={{ zIndex: 99998 }}
        />
      ) : null}
      <LoaderWrapper>
        {loading ? (
          <div
            className={`absolute w-full h-full bg-black bg-opacity-20 flex items-center justify-center gap-4 flex-col`}
            style={{ zIndex: 99999 }}
          >
            <Spin size={"large"} />
            <Typography.Text className={"text-white"} strong>
              Cargando...
            </Typography.Text>
          </div>
        ) : null}
      </LoaderWrapper>
    </Fragment>
  );
};

const LoaderWrapper: FC<PropsWithChildren> = ({ children }) => {
  return createPortal(children, document.getElementById("loader_container")!);
};
