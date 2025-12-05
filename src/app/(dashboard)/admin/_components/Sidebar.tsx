export default function Sidebar() {
  return (
    <div className='w-64 h-screen bg-gray-900 text-white p-4 space-y-4'>
      <h2 className='text-xl font-bold mb-4'>Admin Panel</h2>
      <ul className='space-y-2'>
        <li><a href='/admin/offers' className='block hover:text-gray-300'>Offers</a></li>
        <li><a href='/admin/publishers' className='block hover:text-gray-300'>Publishers</a></li>
        <li><a href='/admin/advertisers' className='block hover:text-gray-300'>Advertisers</a></li>
        <li><a href='/admin/settings' className='block hover:text-gray-300'>Settings</a></li>
      </ul>
    </div>
  );
}
