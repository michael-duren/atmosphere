import DarkModal from '../../../Ui/Modals/DarkModal.tsx';
import SongForm from './SongForm.tsx';
import LoadSongWarning from './LoadSongWarning.tsx';
import {
  selectCommon,
  setLoadSongModalOpen,
  setSaveModalOpen,
} from '../../../../store/slices/commonSlice.ts';
import { useAppSelector } from '../../../../store/hooks/useAppSelector.ts';
import { useAppDispatch } from '../../../../store/hooks/useAppDispatch.ts';

export default function ModalContent() {
  const dispatch = useAppDispatch();
  const { saveModalOpen, loadSongModalOpen } = useAppSelector(selectCommon);
  const isSavedModalOpenHandler = () =>
    dispatch(setSaveModalOpen(!saveModalOpen));
  const isLoadSongModalOpenHandler = () =>
    dispatch(setLoadSongModalOpen(!loadSongModalOpen));
  return (
    <>
      <DarkModal isOpen={saveModalOpen} setIsOpen={isSavedModalOpenHandler}>
        <SongForm />
      </DarkModal>
      <DarkModal
        isOpen={loadSongModalOpen}
        setIsOpen={isLoadSongModalOpenHandler}
      >
        <LoadSongWarning />
      </DarkModal>
    </>
  );
}
