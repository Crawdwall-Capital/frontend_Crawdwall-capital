import React from 'react';
import OfficerLayoutWrapper from '@/components/OfficerLayoutWrapper';
import type { ReactNode } from "react";

export default function OfficerLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <OfficerLayoutWrapper>
      {children}
    </OfficerLayoutWrapper>
  );
}