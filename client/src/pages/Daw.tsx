import DawLayout from '../components/Layouts/DawLayout.tsx';

export default function Daw() {
  return (
    <DawLayout>
      <div className="col-span-4">Aside</div>
      <div className="col-span-8">Main</div>
    </DawLayout>
  );
}
