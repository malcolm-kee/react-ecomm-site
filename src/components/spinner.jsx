import React from 'react';
import './spinner.css';

export function Spinner() {
  return (
    <div class="spinner" role="progressbar">
      <div class="spinner-inner">
        <svg viewBox="22 22 44 44">
          <circle fill="none" cx="44" cy="44" r="16" strokeWidth="4" />
        </svg>
      </div>
    </div>
  );
}
