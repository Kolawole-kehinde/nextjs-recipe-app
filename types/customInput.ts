interface CustomInputProps {
  name: string;
  control: Control<any>;
  label?: string;
  type?: string;
  placeholder?: string;
  options?: { value: string; label: string }[];
  className?: string;
}