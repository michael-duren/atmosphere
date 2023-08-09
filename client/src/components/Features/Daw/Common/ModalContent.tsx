import DarkModal from '../../../Ui/Modals/DarkModal.tsx';
import SongForm from './SongForm.tsx';
import LoadSongWarning from './LoadSongWarning.tsx';
import {
  selectCommon,
  setDeleteSongModalOpen,
  setLoadSongModalOpen,
  setPresetDeleteModalOpen,
  setPresetModalOpen,
  setSaveModalOpen,
} from '../../../../store/slices/commonSlice.ts';
import { useAppSelector } from '../../../../store/hooks/useAppSelector.ts';
import { useAppDispatch } from '../../../../store/hooks/useAppDispatch.ts';
import DeleteSongWarning from './DeleteSongWarning.tsx';
import SavePresetForm from './SavePresetForm.tsx';
import DeletePresetWarning from './DeletePresetWarning.tsx';

export default function ModalContent() {
  const dispatch = useAppDispatch();
  const {
    saveModalOpen,
    loadSongModalOpen,
    deleteSongModalOpen,
    presetModalOpen,
    presetModalData,
    presetModalDispatchType,
    presetModalType,
    presetDeleteModalOpen,
    presetToDelete,
    presetDeleteDispatchType,
    presetDeleteType,
  } = useAppSelector(selectCommon);

  const isDeleteModalOpenHandler = () => {
    dispatch(setDeleteSongModalOpen(!deleteSongModalOpen));
  };
  const isSavedModalOpenHandler = () =>
    dispatch(setSaveModalOpen(!saveModalOpen));
  const isLoadSongModalOpenHandler = () =>
    dispatch(setLoadSongModalOpen(!loadSongModalOpen));

  const isPresetModalOpenHandler = () =>
    dispatch(setPresetModalOpen(!presetModalOpen));

  const isPresetDeleteModalOpenHandler = () => {
    dispatch(setPresetDeleteModalOpen(!presetDeleteModalOpen));
  };

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
      <DarkModal
        isOpen={deleteSongModalOpen}
        setIsOpen={isDeleteModalOpenHandler}
      >
        <DeleteSongWarning />
      </DarkModal>
      <DarkModal isOpen={presetModalOpen} setIsOpen={isPresetModalOpenHandler}>
        <SavePresetForm
          dispatchType={presetModalDispatchType!}
          currentPreset={presetModalData}
          presetType={presetModalType!}
        />
      </DarkModal>
      <DarkModal
        isOpen={presetDeleteModalOpen}
        setIsOpen={isPresetDeleteModalOpenHandler}
      >
        <DeletePresetWarning
          closeModal={isPresetDeleteModalOpenHandler}
          presetToDelete={presetToDelete}
          type={presetDeleteType!}
          dispatchType={presetDeleteDispatchType!}
        />
      </DarkModal>
    </>
  );
}
