import MainFader from '../../../Ui/Faders/MainFader.tsx';

export default function FadersCard() {
  return (
    <div className=" flex justify-between w-full border-red-600">
      <div>
        <MainFader />
      </div>
      <div>
        <MainFader />
      </div>
    </div>
  );
}
