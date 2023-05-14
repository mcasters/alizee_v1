import React, { useEffect, useRef, useState } from "react";

import s from "./dropdown.module.css";
import { Option } from "@/interfaces/index";

const Icon = () => {
  return (
    <svg height="20" width="20" viewBox="0 0 20 20">
      <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
    </svg>
  );
};

const CloseIcon = () => {
  return (
    <svg height="20" width="20" viewBox="0 0 20 20">
      <path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"></path>
    </svg>
  );
};

interface Props {
  isMulti: boolean;
  options: Option[];
  isSearchable: boolean;
  placeHolder: string;
}

const Dropdown = ({ isMulti, options, isSearchable, placeHolder }: Props) => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<Option[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = () => setShowMenu(false);

    window.addEventListener("click", handler);
    return () => {
      window.addEventListener("click", handler);
    };
  });

  useEffect(() => {
    setSearchValue("");
    if (showMenu && searchRef.current) {
      searchRef.current.focus();
    }
  }, [showMenu]);

  const handleInputClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };
  const getDisplay = () => {
    if (selectedValue.length === 0) return placeHolder;
    if (isMulti) {
      return (
        <div className={s.dropdownTags}>
          {selectedValue.map((option) => (
            <div key={option.id} className={s.dropdownTagItem}>
              {option.label}
              <span
                onClick={(e) => onTagRemove(e, option)}
                className={s.dropdownTagClose}
              >
                <CloseIcon />
              </span>
            </div>
          ))}
        </div>
      );
    }
    return selectedValue[0].id;
  };

  const removeOption = (option: Option) => {
    return selectedValue.filter((o) => o.label !== option.label);
  };
  const onTagRemove = (
    e: React.MouseEvent<HTMLSpanElement>,
    option: Option
  ) => {
    e.stopPropagation();
    setSelectedValue(removeOption(option));
  };

  const onItemClick = (option: Option) => {
    let newValue: Option[];
    if (isMulti) {
      if (selectedValue.findIndex((o) => o.label === option.label) >= 0) {
        newValue = removeOption(option);
      } else {
        newValue = [...selectedValue, option];
      }
    } else {
      newValue = [option];
    }
    setSelectedValue(newValue);
  };

  const isSelected = (option: Option) => {
    if (isMulti) {
      return selectedValue.filter((o) => o.id === option.id).length > 0;
    }
    if (!selectedValue) {
      return false;
    }
    return selectedValue[0]?.id === option.id;
  };

  const onSearch = (e: any) => {
    setSearchValue(e.target.value);
  };
  const getOptions = () => {
    if (!searchValue) {
      return options;
    }
    return options.filter(
      (option) =>
        // Match te text from any position :
        option.label.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0
      // Match te text from the beginning :
      // option.label.toLowerCase().indexOf(searchValue.toLowerCase()) === 0
    );
  };

  return (
    <div className={s.dropdownContainer}>
      <div onClick={handleInputClick} className={s.dropdownInput}>
        {showMenu && (
          <div className={s.dropdownMenu}>
            {isSearchable && (
              <div className={s.searchBox}>
                <input
                  onChange={onSearch}
                  value={searchValue}
                  ref={searchRef}
                />
              </div>
            )}
            {getOptions().map((option) => (
              <div
                onClick={() => onItemClick(option)}
                key={option.id}
                className={`${s.dropdownItem} ${
                  isSelected(option) && s.selected
                }`}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
        <div className={s.dropdownSelectedValue}>{getDisplay()}</div>
        <input
          name="tags"
          type="hidden"
          value={selectedValue.map((option) => {
            return option.id.toString();
          })}
        />
        <div className={s.dropdownTools}>
          <div className={s.dropdownTool}>
            <Icon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
