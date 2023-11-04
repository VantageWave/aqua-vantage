'use client';
import React from 'react';
import AppBar from '../AppBar';

export default function PageContainer({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppBar />
      <div>{children}</div>
    </>
  );
}
