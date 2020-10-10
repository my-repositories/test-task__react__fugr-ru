import React from 'react';
import { shallow } from 'enzyme';
import { TextField } from '@material-ui/core';
import { InputText, InputTextProps } from './InputText';

describe(`${InputText.name} - Компонент для ввода однострочного текста:`, () => {
  let defaultProps: InputTextProps;

  beforeEach(() => {
    defaultProps = {
      input: {},
      label: 'testLabel',
      meta: {
        touched: false,
        error: 'Required',
      },
    };
  });

  it('рендерит компонент TextField', () => {
    const wrapper = shallow(<InputText {...defaultProps} />);
    expect(wrapper.find(TextField).length).toBe(1);
  });

  it('передает поле label', () => {
    const wrapper = shallow(<InputText {...defaultProps} />);

    expect(wrapper.find(TextField).prop('label')).toBe(defaultProps.label);
  });

  describe('Передача поля helperText:', () => {
    it('пустая строка, если meta.touched === false', () => {
      const props = {
        ...defaultProps,
        meta: {
          ...defaultProps.meta,
          touched: false,
        },
      };
      const wrapper = shallow(<InputText {...props} />);

      expect(wrapper.find(TextField).prop('helperText')).toBe('');
    });

    it('Required, если meta.touched === true', () => {
      const props = {
        ...defaultProps,
        meta: {
          ...defaultProps.meta,
          touched: true,
        },
      };
      const wrapper = shallow(<InputText {...props} />);

      expect(wrapper.find(TextField).prop('helperText')).toBe(props.meta.error);
    });
  });
});
