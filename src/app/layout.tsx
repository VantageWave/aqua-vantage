import React from 'react';
import { default as Layout } from './rootLayout';
import './globals.css';

export const metadata = {
  title: 'Waterwatch - vwave',
  description:
    'Water Wave enables you to unlock the limitless possibilities of harnessing the power of maps to create custom masks, catalog essential data, and precisely calculate the water resources.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <Layout >
      {children}
    </Layout>
  );
}
