'use client';
import ProtectedRoute from '../components/ProtectedRoute';

export default function HospitalProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute allowedRoles={['hospital']}>
      {children}
    </ProtectedRoute>
  );
} 