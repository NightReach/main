import ProtectedRoute from "@/components/ProtectedRoute";

export default function PublisherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute role="PUBLISHER">
      {children}
    </ProtectedRoute>
  );
}
