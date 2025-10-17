import React from 'react';

export const Header = () => (
  <header className="bg-secondary-dark p-4 shadow-md flex items-center justify-start gap-4 sticky top-0 z-10">
    <img src="components\cutm-ap-logo.png" alt="CUTM Logo" className="h-12" />
    <h1 className="text-2xl font-semibold text-accent-cyan">
      Centurion University AI Assistant
    </h1>
  </header>
);
