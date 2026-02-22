import React from 'react';
import EXAMPLES1 from '../assets/examples1';
import EXAMPLES2 from '../assets/examples2';
import EXAMPLES3 from '../assets/examples3';

interface Example {
  name: string;
  value: string;
}

interface ExampleSelectorProps {
  example: string;
  locked: boolean;
  onChangeExample: (evt: React.ChangeEvent<HTMLSelectElement>) => void;
}

const ExampleSelector = ({
  example,
  locked,
  onChangeExample,
}: ExampleSelectorProps) => (
  <form className="flex flex-wrap ml-2 w-full" autoComplete="off">
    <select
      className="m-2 w-full min-w-[120px] px-3 py-2 border border-gray-300 rounded-md bg-white text-base disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-400"
      value={example}
      onChange={onChangeExample}
      disabled={locked}
    >
      <option value="none">
        Choose an Example
      </option>
      <option disabled>──────────────</option>
      {(EXAMPLES1 as Example[]).map(({ name, value }) => (
        <option key={name} value={value}>
          {name}
        </option>
      ))}
      <option disabled>──────────────</option>
      {(EXAMPLES2 as Example[]).map(({ name, value }) => (
        <option key={name} value={value}>
          {name}
        </option>
      ))}
      <option disabled>──────────────</option>
      {(EXAMPLES3 as Example[]).map(({ name, value }) => (
        <option key={name} value={value}>
          {name}
        </option>
      ))}
    </select>
  </form>
);

export default ExampleSelector;
