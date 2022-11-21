import "./styles.scss";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  name: string;
}

export function Button({ name, ...rest }: ButtonProps) {
  return (
    <button className="btn__signIn" {...rest}>
      {name}
    </button>
  );
}
