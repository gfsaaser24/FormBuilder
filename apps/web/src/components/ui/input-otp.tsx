import * as React from "react";
import { Dot } from "lucide-react";
import { cn } from "@/lib/utils";

type InputOTPProps = {
  maxLength: number;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  containerClassName?: string;
  children?: React.ReactNode;
};

type InputOTPContextValue = {
  slots: {
    char: string;
    isActive: boolean;
    hasFakeCaret: boolean;
  }[];
};

const InputOTPContext = React.createContext<InputOTPContextValue>({
  slots: [],
});

const InputOTP = React.forwardRef<HTMLDivElement, InputOTPProps>(
  ({ className, containerClassName, maxLength = 6, value = "", onChange, children, ...props }, ref) => {
    const [focused, setFocused] = React.useState(false);
    const [caretPosition, setCaretPosition] = React.useState<number | null>(null);
    const inputRef = React.useRef<HTMLInputElement>(null);

    // Create the slots array with characters from value
    const valueArray = Array.from(value.slice(0, maxLength).padEnd(maxLength, ' '));
    const slots = valueArray.map((char, idx) => ({
      char: char === ' ' ? '' : char,
      isActive: idx === caretPosition && focused,
      hasFakeCaret: idx === caretPosition && focused,
    }));

    const handleFocus = () => {
      setFocused(true);
      // Set caret to first empty slot or end
      const firstEmptyIndex = valueArray.findIndex(char => char === ' ');
      setCaretPosition(firstEmptyIndex >= 0 ? firstEmptyIndex : maxLength - 1);
    };

    const handleBlur = () => {
      setFocused(false);
      setCaretPosition(null);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value.replace(/[^0-9]/g, '').slice(0, maxLength);
      onChange?.(newValue);
      
      // Move caret to last filled position
      setCaretPosition(Math.min(newValue.length, maxLength - 1));
    };

    return (
      <div 
        ref={ref}
        className={cn(
          "flex items-center gap-2 has-[:disabled]:opacity-50",
          containerClassName,
        )}
        onClick={() => inputRef.current?.focus()}
        {...props}
      >
        <div className="relative">
          <input
            ref={inputRef}
            className="absolute opacity-0 w-0 h-0"
            type="text"
            maxLength={maxLength}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            value={value}
          />
        </div>
        <InputOTPContext.Provider value={{ slots }}>
          {children}
        </InputOTPContext.Provider>
      </div>
    );
  }
);

InputOTP.displayName = "InputOTP";

const InputOTPGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div 
    ref={ref}
    className={cn("flex items-center", className)} 
    {...props}
  />
));
InputOTPGroup.displayName = "InputOTPGroup";

const InputOTPSlot = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { index: number }
>(({ index, className, ...props }, ref) => {
  const context = React.useContext(InputOTPContext);
  const { char, hasFakeCaret } = context.slots[index] || { char: '', hasFakeCaret: false };

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex h-10 w-10 items-center justify-center border-input border-y border-r text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md",
        context.slots[index]?.isActive && "z-10 ring-2 ring-ring ring-offset-background",
        className,
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-px animate-caret-blink bg-foreground duration-1000" />
        </div>
      )}
    </div>
  );
});
InputOTPSlot.displayName = "InputOTPSlot";

const InputOTPSeparator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ ...props }, ref) => (
  <div ref={ref} role="separator" {...props}>
    <Dot />
  </div>
));
InputOTPSeparator.displayName = "InputOTPSeparator";

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };