import styles from "./Button.module.css";

export default function Button({
  text,
  onClick,
  secondary,
  disabled,
}: {
  text: string;
  onClick: () => void;
  disabled?: boolean;
  secondary?: boolean;
}) {
  return (
    <button
      disabled={disabled}
      className={
        styles.button +
        (secondary ? " " + styles.secondary : "") +
        (disabled ? " " + styles.disabled : "")
      }
      onClick={onClick}
    >
      {text}
    </button>
  );
}
