import { ChangeEvent, FocusEvent } from "react";

export interface SelectProps {
  name: string;
  placeholder: string;
  value: string | number;
  view?: boolean;
  selectList: Array<string>;
  disabled?: boolean;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}
