import React, { ComponentProps, ReactNode } from "react";

type RadioProps = {
  label?: ReactNode;
} & Omit<ComponentProps<"input">, "type">;
const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ label, ...props }, ref) => {
    return (
      <>
        <label className="flex gap-2 items-center font-semibold text-dark/80 cursor-pointer select-none">
          <input type="radio" {...props} ref={ref} className="_radio" />
          <div className="_radio_wrapper">
            <div className="_radio_inner"></div>
          </div>
          {label && <span>{label}</span>}
        </label>
      </>
    );
  }
);

Radio.displayName = "Radio";
export default Radio;
