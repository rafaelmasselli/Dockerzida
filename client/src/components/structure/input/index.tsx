import { InputHTMLAttributes } from "react";
import "./styles.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
}

export function Input({ label, name, ...rest }: InputProps) {
  return (
    <div className="form__group field">
      <input
        type="input"
        className="form__field"
        placeholder={name}
        required
        {...rest}
      />
      <label className="form__label">{label}</label>
    </div>
  );
}
