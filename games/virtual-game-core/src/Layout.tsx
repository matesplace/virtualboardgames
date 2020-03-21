import React from 'react';

interface LayoutProps {
  children: React.ReactNode
}

function Index(props: LayoutProps) {
  return (
    <div className="App">
      Layout
      {props.children}
    </div>
  );
}

export const Layout = Index;
