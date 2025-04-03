import InfoForm from '@/modules/Info/components/InfoForm';

const InfoAdd = () => {
  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <div className="w-full max-w-6xl rounded-lg text-center">
        <h1 className="text-xl font-bold mb-4">Gestion Fiche Info</h1>
        <InfoForm />
      </div>
    </div>
  );
};

export default InfoAdd;
