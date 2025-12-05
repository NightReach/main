import Sidebar from './_components/Sidebar';

export default function AdminLayout({ children }) {
  return (
    <div className='flex h-screen'>
      <Sidebar />
      <div className='flex-1 p-6 overflow-y-auto'>
        {children}
      </div>
    </div>
  );
}
