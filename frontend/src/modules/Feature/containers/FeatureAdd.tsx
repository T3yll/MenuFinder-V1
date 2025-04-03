import FeatureForm from "../components/FeatureForm";

const FeatureAdd = () => {
  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <div className="w-full max-w-6xl rounded-lg text-center">
        <h1 className="text-xl font-bold mb-4">Gestion Feature</h1>
        <FeatureForm />
      </div>
    </div>
  );
};

export default FeatureAdd;
