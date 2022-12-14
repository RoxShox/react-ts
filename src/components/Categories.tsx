import {useState} from 'react';

type CategoriesProps = {
	value: number;
	onClickCategory: (i: number) => void;
}

const Categories: React.FC<CategoriesProps> = ({value, onClickCategory}) => {
	const categories = ['Все','Мясные','Вегетарианская','Гриль','Острые','Закрытые' ]

	return(
		<div className="categories">
			<ul>
				{
					categories.map((item, i) => (
						<li 
							key={i} 
							onClick={() => onClickCategory(i)} 
							className={value === i ? 'active' : null}>
							 {item}
						</li> 
					))
				}
			</ul>
		</div>
	)
}

export default Categories;