import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { IconType } from 'react-icons';

export interface DropdownItem {
  onClick: () => void;
  ItemIcon: IconType;
  itemTitle: string;
}

interface Props {
  dropDownArray: DropdownItem[];
  title: string;
  titleStyles: string;
  position: 'left-0' | 'right-0';
}

export default function DropdownMenu({
  dropDownArray,
  title,
  titleStyles,
  position,
}: Props) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className={titleStyles}>{title}</Menu.Button>
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
          className={`absolute ${position} mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
        >
          <div className="px-1 py-1 ">
            {dropDownArray.map((item) => {
              const { onClick, ItemIcon, itemTitle } = item;

              return (
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? 'bg-gray-500 text-white' : 'text-gray-900'
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      onClick={onClick}
                    >
                      {active ? (
                        <ItemIcon className="mr-2 h-5 w-5" aria-hidden="true" />
                      ) : (
                        <ItemIcon className="mr-2 h-5 w-5" aria-hidden="true" />
                      )}
                      {itemTitle}
                    </button>
                  )}
                </Menu.Item>
              );
            })}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
