import { IconUpload } from "../../assets/icons";
import clsx from "clsx";
type InputFileProps = {
  name?: string;
  className?: string;
  text?: React.ReactNode | string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  props?: Record<string, any>;
};
import styles from "./InputFile.module.scss";
import type React from "react";
import { forwardRef, useCallback, useRef } from "react";
export const InputFile = forwardRef(({ name, className, text, onChange, ...props }: InputFileProps, ref: any) => {
  if (!ref) {
    ref = useRef();
  }
  const interactiveKeys = ["Space", " "];
  const wrapperKeyDownHandler = useCallback(
    (e: any) => {
      if (interactiveKeys.includes(e.key)) {
        e.preventDefault();
        ref.current.click();
      }
    },
    [ref],
  );
  return (
    <label className={clsx(styles.inputWrapper, className)} onKeyDown={wrapperKeyDownHandler}>
      <span className={styles.labelContent}>
        <IconUpload className={styles.icon} /> {text ?? <>Upload Image</>}
      </span>
      <input
        ref={ref}
        type="file"
        className={clsx("file-input", styles.input)}
        name={name}
        {...props}
        onChange={onChange}
        tabIndex={-1}
      />
    </label>
  );
});
