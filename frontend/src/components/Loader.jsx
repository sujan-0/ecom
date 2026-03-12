const Loader = ({ size = "md" }) => {
  const sizes = {
    sm: "w-5 h-5 border-2",
    md: "w-10 h-10 border-[3px]",
    lg: "w-16 h-16 border-4",
  };

  return (
    <div
      className={`${sizes[size]} rounded-full border-white/10 border-t-brand-500 animate-spin`}
      role="status"
      aria-label="Loading"
    />
  );
};

export default Loader;
