export type FormFieldTextPropTypes = {
  name: string;
  placeholder: string;
  value: string;
  error: string;
  onChange: (_: React.ChangeEvent<HTMLTextAreaElement>) => void;
  disabled?: boolean;
  id: string;
  label?: string;
  inputClass?: string;
  labelClass?: string;
};
