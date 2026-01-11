import { Fragment } from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Investor Dashboard | Crawdwall Capital',
  description: 'Access your event investment portfolio and opportunities on Crawdwall Capital',
};

export default function InvestorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Fragment>
      {children}
    </Fragment>
  );
}