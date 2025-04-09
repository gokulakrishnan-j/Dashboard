import { ChangeEvent, FocusEvent } from "react";

export interface InputProps {
  name: string;
  placeholder: string;
  type: string;
  value: string | number;
  touched: boolean | undefined;
  error: string | undefined;
  view?: boolean
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: FocusEvent<any>) => void;
}
