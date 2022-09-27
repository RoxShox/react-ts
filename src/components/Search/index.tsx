import React, { Component } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchValue } from '../../redux/slices/filterSlice';
import { debounce } from 'lodash';

import style from './Search.module.scss';


const Search: React.FC = () => {
	const dispatch = useDispatch()
	const [value, setValue] = React.useState('');
	const inputRef = React.useRef<HTMLInputElement>(null)

	const onClickClear = () => {
		dispatch(setSearchValue(''));
		setValue('');
		inputRef.current?.focus();
	}

	const updateSearchValue = React.useCallback(
		debounce((str: string) => {
			dispatch(setSearchValue(str));
		}, 1000),
	 []);
	const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value)
		updateSearchValue(e.target.value)
	}
	return (
		<div className={style.root}>
			<input 
			ref={inputRef}
			value={value}
			onChange={onChangeInput}
			className={style.input} 
			placeholder='Поиск пиццы....' />
			{value ? 
			<svg 
			onClick={onClickClear}
			className={style.svg} height="14px" version="1.1" viewBox="0 0 14 14" width="14px"><title/><desc/><defs/><g fill="none" id="Page-1" stroke="none" ><g fill="#000000" id="Core" transform="translate(-341.000000, -89.000000)"><g id="close" transform="translate(341.000000, 89.000000)"><path d="M14,1.4 L12.6,0 L7,5.6 L1.4,0 L0,1.4 L5.6,7 L0,12.6 L1.4,14 L7,8.4 L12.6,14 L14,12.6 L8.4,7 L14,1.4 Z" id="Shape"/></g></g></g></svg>
			: ''}
		</div>
		
		
	);
}

export default Search;