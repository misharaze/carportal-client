import React from "react";

/**
 * GlassButton — прозрачная "glassmorphism" кнопка с анимацией.
 *
 * props:
 * - children
 * - onClick
 * - disabled
 * - className
 * - type ("button" | "submit" | "reset")
 */
export default function GlassButton({
  children,
  onClick,
  disabled = false,
  className = "",
  type = "button",
  ...rest
}) {
  return (
    <>
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`glass-btn ${disabled ? "is-disabled" : ""} ${className}`}
        {...rest}
      >
        <span className="glass-btn__shine" aria-hidden="true" />
        <span className="glass-btn__content">{children}</span>
      </button>

      <style>{css}</style>
    </>
  );
}

const css = `
.glass-btn{
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,0.22);
  background: rgba(255,255,255,0.08);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);

  color: inherit;
  font-weight: 600;
  letter-spacing: 0.2px;

  padding: 10px 14px;
  border-radius: 14px;

  cursor: pointer;
  user-select: none;
  outline: none;

  transform: translateZ(0);
  transition:
    transform 160ms ease,
    box-shadow 160ms ease,
    border-color 160ms ease,
    background 160ms ease,
    filter 160ms ease;
  
  box-shadow:
    0 10px 22px rgba(0,0,0,0.18),
    inset 0 1px 0 rgba(255,255,255,0.18);
}

.glass-btn__content{
  position: relative;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.glass-btn__shine{
  position: absolute;
  inset: -40%;
  z-index: 1;
  background: linear-gradient(
    115deg,
    transparent 0%,
    rgba(255,255,255,0.18) 35%,
    rgba(255,255,255,0.35) 50%,
    rgba(255,255,255,0.18) 65%,
    transparent 100%
  );
  transform: translateX(-60%) rotate(12deg);
  opacity: 0;
  transition: opacity 160ms ease;
}

.glass-btn:hover{
  transform: translateY(-1px);
  border-color: rgba(255,255,255,0.32);
  background: rgba(255,255,255,0.10);
  box-shadow:
    0 14px 28px rgba(0,0,0,0.22),
    inset 0 1px 0 rgba(255,255,255,0.22);
}

.glass-btn:hover .glass-btn__shine{
  opacity: 1;
  animation: glassShimmer 900ms ease forwards;
}

.glass-btn:active{
  transform: translateY(0px) scale(0.98);
  filter: brightness(0.98);
}

.glass-btn:focus-visible{
  box-shadow:
    0 0 0 3px rgba(255,255,255,0.18),
    0 14px 28px rgba(0,0,0,0.22),
    inset 0 1px 0 rgba(255,255,255,0.22);
}

.glass-btn.is-disabled,
.glass-btn:disabled{
  opacity: 0.55;
  cursor: not-allowed;
  transform: none;
}

.glass-btn.is-disabled .glass-btn__shine,
.glass-btn:disabled .glass-btn__shine{
  display: none;
}

@keyframes glassShimmer{
  from { transform: translateX(-60%) rotate(12deg); }
  to   { transform: translateX(60%)  rotate(12deg); }
}

@media (prefers-reduced-motion: reduce){
  .glass-btn,
  .glass-btn__shine{
    transition: none !important;
    animation: none !important;
  }
}
`;
