import { useState, useRef, useCallback } from 'react';
import './PhoneUI.css';

export function PhoneUI({ onSubmit, isProcessing }) {
  const [value, setValue] = useState('');
  const inputRef = useRef(null);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Enter' && !e.shiftKey && value.trim()) {
        e.preventDefault();
        onSubmit(value.trim());
        setValue('');
      }
    },
    [value, onSubmit],
  );

  return (
    <div className="phone-ui">
      <div className="phone-ui__inner">
        <span className="phone-ui__label">No-Forms</span>
        <input
          ref={inputRef}
          className="phone-ui__input"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type anything… press Enter to materialize"
          disabled={isProcessing}
          autoFocus
          aria-label="No-Forms capture input"
        />
        {isProcessing && (
          <span className="phone-ui__spinner" aria-label="Processing" />
        )}
      </div>
    </div>
  );
}
