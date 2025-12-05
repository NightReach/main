import EditOfferForm from '../../_components/EditOfferForm';

export default function EditOfferPage({ params }) {
  return (
    <div>
      <h1 className='text-2xl font-bold mb-4'>Edit Offer</h1>
      <EditOfferForm id={params.id} />
    </div>
  );
}
