import React, { useState } from 'react';
// import ReactDOM from "react-dom";
import Select from 'react-select';
import { clone } from 'lodash';

import './styles.css';

function isIncludingString(string, option) {
  let result = false;
  if (
    !string ||
    option.label.toString().includes(string) ||
    option.value.toString().includes(string)
  ) {
    result = true;
  }
  return result;
}

const options = [
  { label: 'Select all', value: 'all' },
  { label: 'Option 1', value: 1 },
  { label: 'Option custom 1', value: '1-custom' },
  { label: 'Option 2', value: 2 },
  { label: 'Option custom 2', value: '2-custom' },
  { label: 'Option 3', value: 3 },
  { label: 'Option custom 3', value: '3-custom' },
  { label: 'Option 4', value: 4 },
  { label: 'Option 5', value: 5 },
  { label: 'Option 6', value: 6 },
  { label: 'Option 7', value: 7 },
];

export default function Home() {
  //   constructor(props) {
  //     super(props);
  //     this.state = {
  //       searchField: null,
  //       values: [],
  //     };
  //   }

  const [searchField, setSearchField] = useState(null);
  const [values, setValues] = useState([]);
  const onChange = (opt, { option }) => {
    let newOpts = opt;
    let string = searchField;

    if (option && option.value === 'all') {
      let filteredOptions = clone(options);

      filteredOptions = filteredOptions.filter(
        (filteredOption) =>
          isIncludingString(string, filteredOption) &&
          !newOpts.includes(filteredOption)
      );

      string = null;
      newOpts = newOpts
        .concat(filteredOptions)
        .filter((newOpt) => newOpt.value !== 'all');
    }
    setSearchField(string);
    setValues(newOpts);
    // this.setState({
    //   searchField: string,
    //   values: newOpts,
    // });
  };
  const onInputChange = (string, { action }) => {
    if (action === 'input-change') {
      setSearchField(string);
      //   this.setState({
      //     searchField: string,
      //   });
    }
  };
  const filterOption = ({ label, value }, string) => {
    if (value === 'all') {
      return true;
    } else if (string) {
      return label.includes(string) || value.toString().includes(string);
    } else {
      return true;
    }
  };
  return (
    <div className='App'>
      {console.log('vvvv', values)}
      <Select
        isMulti
        filterOption={filterOption}
        onInputChange={onInputChange}
        onChange={onChange}
        options={options}
        value={values}
        defaultMenuIsOpen={true}
        closeMenuOnSelect={false}
      />
    </div>
  );
}
