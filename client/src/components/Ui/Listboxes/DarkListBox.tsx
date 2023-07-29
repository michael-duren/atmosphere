import { Listbox, Transition } from '@headlessui/react';
import { BiChevronDown } from 'react-icons/bi';
import { Fragment } from 'react';
import { BsCheck } from 'react-icons/bs';
import { toTitleCase } from '../../../utils/string.ts';
import { MusicalScale } from '../../../models/types/musicalScale.ts';
import { MusicalKey } from '../../../models/types/musicalKey.ts';
import { PatternName } from 'tone/build/esm/event/PatternGenerator';
import { NoteType } from '../../../models/types/noteType.ts';

export type Item = MusicalKey | MusicalScale | PatternName | NoteType | number;

type Props = {
  items: Item[];
  setCurrentItem: (item: Item) => void;
  currentItem: Item;
};

export default function DarkListBox({
  items,
  setCurrentItem,
  currentItem,
}: Props) {
  return (
    <Listbox value={currentItem} onChange={setCurrentItem}>
      <div
        style={{ position: 'relative', zIndex: 1 }}
        className="relative mt-1"
      >
        <Listbox.Button
          className="relative h-8 shadow-lg shadow-gray-700  cursor-default rounded-lg bg-black py-2 
        pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 
        focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
        >
          <span className="block truncate">
            {toTitleCase(currentItem.toString())}
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <BiChevronDown
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options
            className="absolute mt-1 max-h-60  overflow-auto 
          rounded-md bg-black shadow-2xl shadow-gray-700 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 
          focus:outline-none sm:text-sm scrollbar-thin scrollbar-thumb-gray-900 scrollbar-thumb-rounded-full scrollbar-track-transparent"
          >
            {items.map((item, i) => (
              <Listbox.Option
                key={i}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-9 pr-4 ${
                    active ? 'bg-blue-900 text-gray-100' : 'text-white'
                  }`
                }
                value={item}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? 'font-medium' : 'font-normal'
                      }`}
                    >
                      {toTitleCase(item.toString())}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                        <BsCheck size={20} aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}
