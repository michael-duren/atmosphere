import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import {
  HiLogout,
  HiOutlineDocumentAdd,
  HiOutlineSave,
  HiOutlineSaveAs,
} from 'react-icons/hi';
import { useAppDispatch } from '../../../store/hooks/useAppDispatch.ts';
import { USER_ACTIONS } from '../../../store/actions/userActions.ts';
import { setSaveModalOpen } from '../../../store/slices/commonSlice.ts';
import { SONG_ACTIONS } from '../../../store/actions/songActions.ts';
import { GiHamburgerMenu } from 'react-icons/gi';
import { setNewSongToSaveAs } from '../../../store/slices/songSlice.ts';

export default function DawDropdownMenu() {
  const dispatch = useAppDispatch();
  const onNewSong = () => dispatch({ type: SONG_ACTIONS.SET_NEW_SONG_ASYNC });
  const onSaveSong = () => dispatch(setSaveModalOpen(true));
  const onSaveSongAs = () => {
    dispatch(setNewSongToSaveAs('Untitled'));
    dispatch(setSaveModalOpen(true));
  };
  const onLogout = () => dispatch({ type: USER_ACTIONS.LOGOUT_ASYNC });

  return (
    <Menu
      as="div"
      style={{ zIndex: 60 }}
      className="relative inline-block text-left"
    >
      <div>
        <Menu.Button
          className={
            'text-gray-300 hover:text-white text-2xl md:text-3xl lg:text-4xl '
          }
        >
          <GiHamburgerMenu />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className={`absolute  mt-2 w-56 origin-top-right divide-y right-0 divide-gray-700 shadow-gray-500 rounded-md bg-gray-900 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
        >
          <div className={`px-1 py-1 `}>
            {/* New Song */}
            <Fragment>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-blue-500 text-white' : 'text-gray-200'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    onClick={onNewSong}
                  >
                    {active ? (
                      <HiOutlineDocumentAdd
                        className="mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                    ) : (
                      <HiOutlineDocumentAdd
                        className="mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                    )}
                    New Song
                  </button>
                )}
              </Menu.Item>
            </Fragment>
          </div>
          <div className={`px-1 py-1 `}>
            {/* Save Song */}
            <Fragment>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-blue-500 text-white' : 'text-gray-200'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    onClick={onSaveSong}
                  >
                    {active ? (
                      <HiOutlineSave
                        className="mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                    ) : (
                      <HiOutlineSave
                        className="mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                    )}
                    Save Song
                  </button>
                )}
              </Menu.Item>
            </Fragment>
            {/* Save Song As */}
            <Fragment>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-blue-500 text-white' : 'text-gray-200'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    onClick={onSaveSongAs}
                  >
                    {active ? (
                      <HiOutlineSaveAs
                        className="mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                    ) : (
                      <HiOutlineSaveAs
                        className="mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                    )}
                    Save Song As
                  </button>
                )}
              </Menu.Item>
            </Fragment>
          </div>
          <div className={`px-1 py-1 `}>
            <Fragment>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-blue-500 text-white' : 'text-gray-200'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    onClick={onLogout}
                  >
                    {active ? (
                      <HiLogout className="mr-2 h-5 w-5" aria-hidden="true" />
                    ) : (
                      <HiLogout className="mr-2 h-5 w-5" aria-hidden="true" />
                    )}
                    Logout
                  </button>
                )}
              </Menu.Item>
            </Fragment>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
