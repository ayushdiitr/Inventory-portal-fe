import { Checkbox } from 'antd';
import React from 'react';

const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
};

const CheckBox = () => <Checkbox onChange={onChange}>Issuable</Checkbox>;
export default CheckBox;
