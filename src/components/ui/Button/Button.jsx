import "./Button.scss";

export default function Button({ variant = "default", ...props }) {
  return (
    <button
      className={`btn btn-${variant}`}
      {...props}
    />
  );
}