import { useAppSelector } from '../../store/hooks/useAppSelector.ts';
import { selectUser } from '../../store/slices/userSlice.ts';
import { splitCamelCase, toTitleCase } from '../../utils/string.ts';
import { HiLogout, HiOutlineSave } from 'react-icons/hi';
import { DropdownItem } from '../Ui/Dropdowns/DropdownMenu.tsx';
import { useAppDispatch } from '../../store/hooks/useAppDispatch.ts';
import { USER_ACTIONS } from '../../store/actions/userActions.ts';
import DropdownMenu from '../Ui/Dropdowns/DropdownMenu.tsx';
import { setSaveModalOpen } from '../../store/slices/commonSlice.ts';

export default function DawHeader() {
  const { user } = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const dropDownItems: DropdownItem[] = [
    {
      ItemIcon: HiOutlineSave,
      itemTitle: 'Save',
      onClick: () => dispatch(setSaveModalOpen(true)),
      additionalSpacing: 'mb-2',
    },
    {
      ItemIcon: HiLogout,
      itemTitle: 'Logout',
      onClick: () => dispatch({ type: USER_ACTIONS.LOGOUT_ASYNC }),
    },
  ];

  if (!user) {
    return;
  }

  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="rounded-full text-white flex items-center justify-center font-caps shadow-2xl h-24 w-24 text-3xl bg-black">
          {user!.username[0].toUpperCase()}
        </div>
        <h2 className="text-xl text-white">
          {toTitleCase(splitCamelCase(user!.username))}
        </h2>
      </div>
      <div>
        <DropdownMenu
          title="Atmosphere"
          titleStyles="border-2 border-white bg-black bg-opacity-90 p-2 font-title text-xl text-white shadow-xl"
          dropDownArray={dropDownItems}
          position="right-0"
        />
      </div>
    </header>
  );
}
