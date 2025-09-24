import React from 'react';

type SimpleButtonProps = {
  text?: string;
  description?: string;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
};

export default function SimpleButton({
  text = 'Primary action',
  description,
  className = '',
  onClick,
  disabled = false,
}: SimpleButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`simple-button ${className}`}
      aria-disabled={disabled}
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
        padding: '13px 28px',
        borderRadius: 8,
        background: disabled ? 'rgba(240,240,240,0.7)' : 'rgba(255,255,255,0.85)',
        color: disabled ? 'rgba(180,180,180,0.8)' : '#222',
        border: disabled ? '1px solid #e5e7eb' : '1px solid #e5e7eb',
        boxShadow: 'none',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        fontWeight: 500,
        fontSize: 16,
        minWidth: 160,
        outline: 'none',
        transition: 'background 0.18s, color 0.18s',
        cursor: disabled ? 'not-allowed' : 'pointer',
      }}
      onMouseOver={e => {
        if (!disabled) e.currentTarget.style.background = 'rgba(245,245,245,1)';
      }}
      onMouseOut={e => {
        if (!disabled) e.currentTarget.style.background = 'rgba(255,255,255,0.85)';
      }}
      onFocus={e => {
        /* no shadow on focus */
      }}
      onBlur={e => {
        /* no shadow on blur */
      }}
    >
      <span style={{fontSize: 16, fontWeight: 600, letterSpacing: 0.01, lineHeight: 1.2}}>{text}</span>
      {description ? (
        <span style={{fontSize: 12, opacity: 0.7, marginTop: 2, fontWeight: 400, lineHeight: 1.1}}>{description}</span>
      ) : null}
    </button>
  );
}
