import useTheme from "../hooks/useTheme";

const GridBackground = () => {
  const { isDark } = useTheme();

  return (
    <div className="fixed inset-0 z-0 opacity-30 pointer-events-none">
      <div
        className="w-full h-full transition-all duration-300"
        style={{
          backgroundImage: isDark
            ? `
              linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
            `
            : `
              linear-gradient(rgba(0, 0, 0, 0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 0, 0, 0.08) 1px, transparent 1px)
            `,
          backgroundSize: "40px 40px",
        }}
      />
    </div>
  );
};

export default GridBackground;
