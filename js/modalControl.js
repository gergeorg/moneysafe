import { OverlayScrollbars } from './libs/overlayscrollbars.esm.min.js'
import { reformatDate } from './helpers.js'
import { deleteData, getData } from './service.js'
import { financeControl } from './financeControl.js'
import { clearChart, generateChart } from './generateChart.js'

const financeReport = document.querySelector('.finance__report')
const report = document.querySelector('.report')
const reportOperationList = document.querySelector('.report__operation-list')
const reportDates = document.querySelector('.report__dates')
const generateChartButton = document.getElementById('generateChartButton')

const typesOperation = {
	income: 'доход',
	expenses: 'расход',
}

let actualData = []

OverlayScrollbars(report, {})

const closeModal = ({ target }) => {
	if (target.closest('.report__close') || (!target.closest('.report') && target !== financeReport)) {
		gsap.to(report, {
			opacity: 0,
			scale: 0,
			duration: 1,
			ease: 'power4.in',
			onComplete() {
				report.style.visibility = 'hidden'
			},
		})

		document.removeEventListener('click', closeModal)
	}
}

const openModal = () => {
	report.style.visibility = 'visible'

	gsap.to(report, {
		opacity: 1,
		scale: 1,
		duration: 1,
		ease: 'power4.out',
		onComplete() {},
	})

	document.addEventListener('click', closeModal)
}

const renderReport = (data) => {
	reportOperationList.textContent = ''

	const reportRows = data.map(({ id, category, amount, description, date, type }) => {
		const reportRow = document.createElement('tr')
		reportRow.classList.add('report__row')
		reportRow.innerHTML = `
			<td class="report__cell">${category}</td>
			<td class="report__cell report__cell-right">${amount.toLocaleString()}&nbsp;₽</td>
			<td class="report__cell">${description}</td>
			<td class="report__cell">${reformatDate(date)}</td>
			<td class="report__cell">${typesOperation[type]}</td>
			<td class="report__action-cell">
				<button class="report__button report__button_table" data-id="${id}">&#10006;</button>
			</td>
		`

		return reportRow
	})

	reportOperationList.append(...reportRows)
}

export const modalControl = () => {
	reportOperationList.addEventListener('click', async ({ target }) => {
		const buttonDelete = target.closest('.report__button_table')

		if (buttonDelete) {
			await deleteData(`/finance/${buttonDelete.dataset.id}`)

			const reportRow = buttonDelete.closest('.report__row')
			reportRow.remove()
			financeControl()
			clearChart()
		}
	})

	financeReport.addEventListener('click', async () => {
		const textContent = financeReport.textContent
		financeReport.textContent = 'Загрузка...'
		financeReport.disabled = true

		actualData = await getData('/finance')
		// actualData = await getData('/test')

		financeReport.textContent = textContent
		financeReport.disabled = false

		renderReport(actualData)
		openModal()
	})

	reportDates.addEventListener('submit', async (e) => {
		e.preventDefault()

		const formData = Object.fromEntries(new FormData(reportDates))
		const searchParams = new URLSearchParams()

		if (formData.startDate) {
			searchParams.append('startDate', formData.startDate)
		}

		if (formData.endDate) {
			searchParams.append('endDate', formData.endDate)
		}

		const queryString = searchParams.toString()

		const url = queryString ? `/finance?${queryString}` : '\finance'
		// const url = queryString ? `/test?${queryString}` : '\test'
		actualData = await getData(url)
		renderReport(actualData)
		clearChart()
	})
}

generateChartButton.addEventListener('click', () => {
	generateChart(actualData)
})