import TeamForm from '@/modules/Team/components/TeamForm';

const TeamAdd = () => {
  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <div className="w-full max-w-6xl rounded-lg text-center">
        <h1 className="text-xl font-bold mb-4">Gestion Team</h1>
        <TeamForm />
      </div>
    </div>
  );
};

export default TeamAdd;
