import styles from "./Button.module.css";

export default function Button({
  text,
  onClick,
  secondary,
}: {
  text: string;
  onClick: () => void;
  secondary?: boolean;
}) {
  return (
    <button
      className={styles.button + (secondary ? " " + styles.secondary : "")}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
