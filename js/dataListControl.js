import { getData } from "./service.js"

const categoryList = document.getElementById('categoryList')

const getCategories = (category) => {
	const option = document.createElement('option')
	option.value = category

	return option
}

export const dataListControl = async () => {
	categoryList.textContent = ''

	const categories = await getData('/categories')
	const optionsIncome = categories.income.map(getCategories)
	const optionsExpenses = categories.expenses.map(getCategories)

	categoryList.append(...optionsExpenses, ...optionsIncome)
}