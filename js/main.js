import { dataListControl } from './dataListControl.js'
import { financeControl } from './financeControl.js'
import { modalControl } from './modalControl.js'

const init = () => {
	financeControl()
	modalControl()
	dataListControl()
}

init()
