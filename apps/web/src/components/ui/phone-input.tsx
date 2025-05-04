import * as React from "react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

// This is a simplified phone input component for Vite
// You can replace this with a more complex component if needed
export function PhoneInput({
  className,
  onChange,
  value,
  international = false,
  placeholder,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  international?: boolean;
}) {
  // Basic formatting logic - could be enhanced for better phone number handling
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let formattedValue = e.target.value.replace(/[^\d+]/g, '');
    
    if (formattedValue.length > 0 && international && !formattedValue.startsWith('+')) {
      formattedValue = '+' + formattedValue;
    }
    
    // Format phone number with parentheses and dashes (simplified)
    if (formattedValue.length > 10 && !international) {
      const areaCode = formattedValue.slice(0, 3);
      const middle = formattedValue.slice(3, 6);
      const last = formattedValue.slice(6, 10);
      formattedValue = `(${areaCode}) ${middle}-${last}`;
    }
    
    if (onChange) {
      const syntheticEvent = {
        ...e,
        target: {
          ...e.target,
          value: formattedValue
        }
      };
      onChange(syntheticEvent);
    }
  };

  return (
    <Input
      type="tel"
      className={cn("", className)}
      value={value}
      onChange={handleChange}
      placeholder={placeholder || (international ? "+1 (555) 000-0000" : "(555) 000-0000")}
      {...props}
    />
  );
}