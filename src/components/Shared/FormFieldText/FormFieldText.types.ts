export type FormFieldTextPropTypes = {
  className?: string;
  name: string;
  placeholder: string;
  value: string | number;
  error?: string;
  type: string;
  onChange: (_: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  id: string;
  label?: string;
  inputClass?: string;
  labelClass?: string;
  min?: number;
  max?: number;
};
