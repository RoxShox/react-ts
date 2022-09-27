import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import { setCategoryId, setCurrentPage, setFilters, selectFilter } from '../redux/slices/filterSlice';
import { Link } from 'react-router-dom';
import { fetchPizzas, SearchPizzaParams, selectPizza} from '../redux/slices/pizzasSlice' 
import Categories from '../components/Categories';
import Sort, { list } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { useAppDispatch } from '../redux/store';


const Home:React.FC = () => {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const isSearch = React.useRef(false) 
	const isMounted = React.useRef(false)

	const {categoryId, sort, currentPage, searchValue} = useSelector(selectFilter)
	const {items, status} = useSelector(selectPizza)
	const sortType = sort.sortProp


	const onClickCategory = (id:number) => {
		dispatch(setCategoryId(id))
	}

	const onChangePage = (value: number) => {
		dispatch(setCurrentPage(value));
	}

	const getPizzas= async () => {
		const order = sortType.includes('-') ? 'asc' : 'desc';
		const sortBy = sortType.replace('-', '');
		const category = categoryId > 0 ? `category=${categoryId}` : '';
		const search = searchValue ? `&search=${searchValue}` : '';

		dispatch(
			fetchPizzas({
			order,
			sortBy,
			category,
			search,
			currentPage: String(currentPage),
		}),
		);
	}

	React.useEffect(() => {
		if(window.location.search){
			const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;
			const sort = list.find(obj => obj.sortProp === params.sortBy)
			
			dispatch(
				setFilters({
					searchValue: params.search,
					categoryId: Number(params.category),
					currentPage: Number(params.currentPage),
					sort: sort || list[0]
				})
			)
			isSearch.current = true;
		}
	},[])

	React.useEffect(() => {
		getPizzas();
	},[categoryId, sortType, searchValue, currentPage])

	React.useEffect(() => {
		if( isMounted.current) {
			const queryString = qs.stringify({
				sortType: sortType,
				categoryId,
				currentPage,
			})
			navigate(`?${queryString}`)
			console.log(queryString);
		}
		isMounted.current = true
	}, [categoryId, sortType, searchValue, currentPage])

	const pizzas = items.map((obj) => <PizzaBlock  {...obj}/>)
	const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i}/>)
	
	return (
		<div className='container'>
			<div className="content__top">
						<Categories value={categoryId} onClickCategory={onClickCategory}/>
						<Sort />
					</div>
					<h2 className="content__title">Все пиццы</h2>
					{
						status === 'error' 
						? <div>
							<h2>ПРОИЗОЧЛА ОЧИБКА</h2>
							<p>ПОПРОБУЙТЕ ВКЛЮЧИТЬ МОЗГ И ВСТАВИТЬ НОРМАЛЬНУЮ ССЫЛЬ</p>
						</div>
						: <div className="content__items">
								{status === 'loading' ? skeletons : pizzas}
						  </div>
					}
					
					<Pagination currentPage={currentPage} onChangePage={onChangePage}/>
		</div>
	);
};

export default Home;