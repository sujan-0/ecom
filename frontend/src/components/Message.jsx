const variants = {
  danger: { bg: "bg-red-500/10", border: "border-red-500/25", text: "text-red-400", icon: "✕" },
  success: { bg: "bg-brand-500/10", border: "border-brand-500/25", text: "text-brand-400", icon: "✓" },
  info: { bg: "bg-blue-500/10", border: "border-blue-500/25", text: "text-blue-400", icon: "ℹ" },
  warning: { bg: "bg-yellow-500/10", border: "border-yellow-500/25", text: "text-yellow-400", icon: "!" },
};

const Message = ({ variant = "info", children }) => {
  const style = variants[variant] || variants.info;

  return (
    <div className={`flex items-start gap-3 px-4 py-3 rounded-xl border ${style.bg} ${style.border}`}>
      <span className={`flex-shrink-0 font-bold text-sm mt-0.5 ${style.text}`}>{style.icon}</span>
      <p className={`text-sm leading-relaxed ${style.text}`}>{children}</p>
    </div>
  );
};

export default Message;
