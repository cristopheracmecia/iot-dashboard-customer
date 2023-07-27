import {
  ChangeEvent,
  ChangeEventHandler,
  FC,
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import OtpInput from "react-otp-input";

type Props = {
  digits: number;
  onChange: ChangeEventHandler<HTMLInputElement>;
  value: string;
};

export const InputCode: FC<Props> = ({ digits, onChange, value }) => {
  const [size, setSize] = useState(0);
  const containerRef = useRef<HTMLDivElement>(
    null
  ) as MutableRefObject<HTMLDivElement>;
  const sizeListener = useCallback(() => {
    const container = containerRef.current;
    if (!!container) {
      const containerWidth = container.clientWidth;
      const newSize = containerWidth / digits - digits * 1.2;
      setSize(newSize > 62 ? 62 : newSize);
    }
  }, [setSize]);

  useEffect(() => {
    window.addEventListener("resize", sizeListener);
    sizeListener();
    return () => {
      window.removeEventListener("resize", sizeListener);
    };
  }, []);

  return (
    <div className="flex flex-col gap-2 w-full" ref={containerRef}>
      <div className="flex flex-row gap-2 justify-center items-center w-full">
        <OtpInput
          value={value}
          onChange={(value) => {
            onChange({
              target: {
                name: "code",
                value,
              },
            } as ChangeEvent<HTMLInputElement>);
          }}
          numInputs={6}
          renderSeparator={<span className="mx-1" />}
          renderInput={(props) => (
            <input
              {...props}
                className={"shadow-none appearance-none outline-0 border border-neutral-300 border-solid rounded text-gray-700" +
                    " focus:border-primary focus:outline-none"}
              style={{
                ...props.style,
                width: size,
                height: size,
                fontSize: size - 20,
                textAlign: "center",
              }}
            />
          )}
        />
      </div>
    </div>
  );
};
