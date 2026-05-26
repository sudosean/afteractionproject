export default function Icon({ className = '', fill = false, name, style, ...props }) {
  const filledStyle = fill
    ? {
        fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24",
        ...style,
      }
    : style;

  return (
    <span className={`material-symbols-outlined ${className}`} style={filledStyle} {...props}>
      {name}
    </span>
  );
}
