import React from 'react';
import OrganizerLayoutWrapper from '@/components/OrganizerLayoutWrapper';
import type { ReactNode } from "react";

export default function OrganizerLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <OrganizerLayoutWrapper>
      {children}
    </OrganizerLayoutWrapper>
  );
}