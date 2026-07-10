import './dependencies/style/styles.css';
import React from 'react';
import SelectEngine from './SelectEngine';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { EvaluateFailure, GuardStatus } from '../../utils/DyvixGuard';
import { ValidateSelect } from './validation';
import Version from '../../../package.json';

/**
 * DyvixSelect component for creating customizable select inputs.
 *
 * @param {Object} props
 * @param {Array<Object>} props.elements - Array of selectable elements
 * @param {Function} [props.onChange] - Callback triggered when selection changes
 * @param {('select'|'autocomplete')} [props.type='select'] - Select behavior type
 * @param {string} [props.animation='fade'] - Animation name for the select
 * @param {('Singularity'|'Industrial'|'Blade'|'Ember'|'Neon')} [props.theme] - Select theme configuration
 * @param {string} [props.background] - Background color of the input field
 * @param {string} [props.dropdownBackground] - Background color of the dropdown
 * @param {string} [props.className] - Custom CSS class for the select wrapper
 * @param {string} [props.placeholder] - Placeholder text displayed in the input
 * @param {Object} [props.style] - Inline styles applied to the wrapper
 * @param {Object} [props.rest] - Additional input properties passed to the select input
 */
function DyvixSelect({
  elements = [],
  onChange,
  type = 'select',
  animation = 'fade',
  theme = '!/',
  background,
  dropdownBackground,
  className,
  placeholder = '',
  style,
  ...rest
}) {
  type = type.includes('-') ? type.split('-')[1] : type;

  const [Select, SetSelect] = React.useState({
    is_rendered: true,
    is_open: false,
    elements: [],
    selected: '',
    activeIndex: -1
  });
  const selectWrapperRef = React.useRef(null);
  const selectRef = React.useRef(null);
  const [configs, SetConfig] = React.useState({});
  const instanceId = React.useId();
  const dropdownSelectRef = React.useRef(null);

  function onChangeInternalCallback(data) {
    onChange(data);
  }

  function TranslateEngineType(value, handler, controller) {
    if (type === 'select') {
      if (handler !== 'focus' && handler !== 'blur') return;

      controller((prevData) => ({
        ...prevData,
        is_open: handler === 'focus',
        elements: elements
      }));
    }
  }

  const PopulateSelect = (value, controller, elementArray) => {
    value = value.toLowerCase();

    if (!value) {
      controller((prevData) => ({
        ...prevData,
        is_open: false
      }));
      return;
    }

    const result = elementArray.filter((element) => {
      const items = String(element).trim().toLowerCase();
      const query = value.trim().toLowerCase();

      return items.startsWith(query);
    });

    if (result.length == 0) {
      controller((prevData) => ({
        ...prevData,
        elements: [],
        is_open: false
      }));

      return;
    }

    controller((prevData) => ({
      ...prevData,
      elements: result,
      is_open: true
    }));
  };
  const currentAnimation = animation ? configs['animation'] : null;
  const currentTheme = theme !== '!/' ? configs['theme'] : null;
  className =
    `dyvix-select-wrapper ${currentTheme?.class ?? ''} ${className !== '' ? ` ${className}` : ''}`.trim();
  const dropdownThemeClass = currentTheme?.['dropdown-class'];
  const inputThemeClass = currentTheme?.['input-class'];

  React.useEffect(() => {
    async function validate() {
      const validator = await ValidateSelect(
        elements,
        type,
        animation,
        theme,
        SetConfig,
        instanceId
      );

      if (validator.status === GuardStatus.Error) {
        return EvaluateFailure(validator.error, validator.status);
      }
    }

    validate();
    return () => {
      const key = `DYVIX_${Version['version']}_Select_theme_${instanceId}`;
      const ele = document.getElementById(key);
      if (ele) ele.remove();
    };
  }, [animation, theme]);

  function HandleKey(e, controller) {
    if (Select.is_open == false) return;

    const { key } = e;
    const max = Select.elements.length - 1;
    const min = -1;
    const index = Select.activeIndex;

    if (key === 'ArrowUp') {
      if (index <= min) return;
      controller((prevData) => ({
        ...prevData,
        activeIndex: index - 1
      }));
      e.preventDefault();
    }

    if (key === 'ArrowDown') {
      if (index >= max) return;
      controller((prevData) => ({
        ...prevData,
        activeIndex: index + 1
      }));
      e.preventDefault();
    }

    if (key === 'Enter') {
      if (index < 0 || index > max) return;

      selectRef.current.value = Select.elements[index];
      controller((prevData) => ({
        ...prevData,
        selected: Select.elements[index],
        is_open: false,
        activeIndex: -1
      }));
      e.preventDefault();
    }
  }

  useGSAP(() => {
    if (!selectWrapperRef.current || !currentAnimation) return;

    gsap.fromTo(selectWrapperRef.current, currentAnimation.from, {
      ...currentAnimation.to,
      duration: currentAnimation['default-duration'],
      ease: currentAnimation.ease
    });
  }, [currentAnimation]);
  const props = {
    className: className,
    style: {
      ...style
    }
  };
  const inputProps = {
    autoComplete: 'off',
    role: 'combobox',
    'aria-autocomplete': 'list',
    'aria-expanded': Select.is_open,
    'aria-haspopup': 'listbox',
    className: `dyvix-select-input ${inputThemeClass}`.trim(),
    type: 'text',
    ...(background && { style: { background: background } }),
    ...rest,
    ref: selectRef,
    placeholder: placeholder || undefined,
    onChange: (e) => {
      PopulateSelect(e.target.value, SetSelect, elements);
      onChangeInternalCallback(e.target.value);
    },
    onFocus: (e) => {
      TranslateEngineType(e.target.value, 'focus', SetSelect);
      if (rest.onFocus) rest.onFocus(e);
    },
    onBlur: (e) => {
      TranslateEngineType(e.target.value, 'blur', SetSelect);
      if (rest.onBlur) rest.onBlur(e);
    },
    onKeyDown: (e) => {
      HandleKey(e, SetSelect);
      if (rest.onKeyDown) rest.onKeyDown(e);
    }
  };

  const engineProps = {
    elements: Select.elements,
    is_open: Select.is_open,
    is_rendered: Select.is_rendered,
    inputRef: selectRef,
    activeIndex: Select.activeIndex,
    ref: dropdownSelectRef,
    ...(dropdownBackground && { background: dropdownBackground }),
    ...(dropdownThemeClass && { className: dropdownThemeClass }),
    controller: SetSelect,
    OnChangeCallback: (value) => onChangeInternalCallback(value),
    placeholder: placeholder || undefined
  };

  return (
    <div {...props} ref={selectWrapperRef}>
      <div className="dyvix-select">
        <input {...inputProps} />
      </div>
      <SelectEngine {...engineProps} />
    </div>
  );
}

export default DyvixSelect;
