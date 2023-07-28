import { Listbox, Transition } from '@headlessui/react';
import { BiChevronDown } from 'react-icons/bi';
import { Fragment, useEffect, useState } from 'react';
import { BsCheck } from 'react-icons/bs';

interface Item<V> {
  id: number;
  name: string;
  value: V;
}

type Props<T> = {
  items: Item<T>[];
  setSelectedValue: (item: T) => void;
};

export default function DarkListBox<T>({ items, setSelectedValue }: Props<T>) {
  const [selected, setSelected] = useState(items[0]);

  useEffect(() => {
    setSelectedValue(selected.value);
  }, [selected]);

  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className="relative mt-1">
        <Listbox.Button
          className="relative h-8 shadow-lg shadow-gray-700  cursor-default rounded-lg bg-black py-2 
        pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 
        focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
        >
          <span className="block truncate">{selected.name}</span>
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
            {items.map((person, personIdx) => (
              <Listbox.Option
                key={personIdx}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-6 pr-4 ${
                    active ? 'bg-blue-900 text-gray-100' : 'text-white'
                  }`
                }
                value={person}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? 'font-medium' : 'font-normal'
                      }`}
                    >
                      {person.name}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                        <BsCheck className="h-5 w-5" aria-hidden="true" />
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
