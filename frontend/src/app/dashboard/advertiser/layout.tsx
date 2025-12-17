import ProtectedRoute from "@/components/ProtectedRoute";

export default function AdvertiserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute role="ADVERTISER">
      {children}
    </ProtectedRoute>
  );
}
