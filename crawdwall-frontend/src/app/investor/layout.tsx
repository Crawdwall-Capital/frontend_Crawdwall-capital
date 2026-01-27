import React from 'react';
import type { Metadata } from 'next';
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: 'Investor Dashboard | Crawdwall Capital',
  description: 'Access your event investment portfolio and opportunities on Crawdwall Capital',
};

import InvestorLayoutWrapper from '@/components/InvestorLayoutWrapper';

export default function InvestorLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <InvestorLayoutWrapper>
      {children}
    </InvestorLayoutWrapper>
  );
}