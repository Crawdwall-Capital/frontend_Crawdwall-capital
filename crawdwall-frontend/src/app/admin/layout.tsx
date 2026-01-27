import React from 'react';
import AdminLayoutWrapper from '@/components/AdminLayoutWrapper';
import type { ReactNode } from "react";

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <AdminLayoutWrapper>
      {children}
    </AdminLayoutWrapper>
  );
}