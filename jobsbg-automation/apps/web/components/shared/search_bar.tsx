import React from 'react';

export type SearchBarProps = {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  autoFocus?: boolean;
  readOnly?: boolean;
};

export default function SearchBar({
  value = '',
  onChange,
  placeholder = 'Търси...',
  className = '',
  autoFocus = false,
  readOnly = false,
}: SearchBarProps) {
  return (
    <div
      className={className}
      style={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        maxWidth: 420,
        background: 'rgba(255,255,255,0.92)',
        border: '2px solid #e5e7eb',
        borderRadius: 8,
        padding: '0 16px',
        height: 44,
        boxSizing: 'border-box',
      }}
    >
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoFocus={autoFocus}
        readOnly={readOnly}
        style={{
          flex: 1,
          border: 'none',
          outline: 'none',
          background: 'transparent',
          fontSize: 16,
          color: '#222',
        }}
      />
    </div>
  );
}
