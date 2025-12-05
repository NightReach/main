'use client';
import { useState } from 'react';

export default function OfferForm() {
  const [title, setTitle] = useState('');
  const [payout, setPayout] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    await fetch('/api/admin/offers/create', {
      method: 'POST',
      body: JSON.stringify({ title, payout }),
    });
    window.location.href = '/admin/offers';
  };

  return (
    <form onSubmit={submit} className='space-y-4 max-w-md'>
      <div>
        <label className='block mb-1 font-semibold'>Title</label>
        <input className='border p-2 w-full' value={title} onChange={e => setTitle(e.target.value)} />
      </div>

      <div>
        <label className='block mb-1 font-semibold'>Payout</label>
        <input className='border p-2 w-full' value={payout} onChange={e => setPayout(e.target.value)} />
      </div>

      <button type='submit' className='px-4 py-2 bg-blue-600 text-white rounded'>Create</button>
    </form>
  );
}
