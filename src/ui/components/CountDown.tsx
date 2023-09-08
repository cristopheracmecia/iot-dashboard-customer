import {
    FC,
    Fragment,
    MutableRefObject,
    PropsWithChildren,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";
import {ButtonProps, Button, Typography, Progress} from "antd"

type Props = {
    onClick: () => void;
    disabledAtRender?: boolean;
    maxSeconds: number;
    buttonProps?: ButtonProps;
};

export const CountDownButton: FC<PropsWithChildren<Props>> = ({
                                                                  onClick,
                                                                  disabledAtRender,
                                                                  maxSeconds,
                                                                  children,
                                                                  buttonProps,
                                                              }) => {
    const [resendEnabled, setResendEnabled] = useState<boolean>(false);
    const [elapsedTime, setElapsedTime] = useState<number | null>(null);
    const timer = useRef(null) as MutableRefObject<NodeJS.Timer | null>;
    const onTimerTick = useCallback(() => {
        setElapsedTime((old) => {
            if (old === maxSeconds - 1) {
                clearInterval(timer.current!);
                setResendEnabled(true);
                timer.current = null;
                return null;
            } else {
                setResendEnabled(false);
                if (old === null) return 0;
                return old + 1;
            }
        });
    }, []);

    const onButtonClicked = useCallback(() => {
        timer.current = setInterval(onTimerTick, 1000);
        onClick();
    }, []);

    useEffect(() => {
        if (disabledAtRender) timer.current = setInterval(onTimerTick, 1000);
        return () => {
            if (timer !== null) clearTimeout(timer.current!);
        };
    }, []);

    return (
        <Fragment>
            <Button
                disabled={!resendEnabled}
                {...buttonProps}
                onClick={onButtonClicked}
            >
                {children}
            </Button>
            {elapsedTime ? (
                <div className="flex flex-row justify-center items-center gap-1">
                        <Progress size={55} type={"circle"} format={(_) => {
                            return <span className="font-mono text-xl p-0 m-0">
              {maxSeconds - elapsedTime}
            </span>
                        }} percent={elapsedTime / maxSeconds * 100}
                        />
                    <Typography
                        className={"p-0 m-0"}
                    >
                        seg. restantes
                    </Typography>
                </div>
            ) : null}
        </Fragment>
    );
};
