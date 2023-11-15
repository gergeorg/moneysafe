export const convertStringNumber = (str) => {
	const noSpaceStr = String(str).replace(/\s+/g, '')
	const num = parseFloat(noSpaceStr)

	if (!isNaN(num) && isFinite(num)) {
		return num
	} else {
		false
	}
}

export const reformatDate = (date) => {
	const [year, month, day] = date.split('-')

	return `${day.padStart(2, '0')}.${month.padStart(2, '0')}.${year}`
}

export const animationNumber = (el, num) => {
	const fps = 60
	const duration = 1000
	const frameDuration = duration / fps
	const totalFrame = Math.round(duration / frameDuration)

	let currentFrame = 0

	const initialNumber = parseInt(el.textContent.replace(/[^0-9.-]+/g, ''))
	const increment = parseInt((num - initialNumber) / totalFrame)

	const animate = () => {
		currentFrame += 1
		const newNumber = initialNumber + increment * currentFrame
		el.textContent = `${newNumber.toLocaleString('RU-ru')} ₽`

		if (currentFrame < totalFrame) {
			requestAnimationFrame(animate)
		} else {
			el.textContent = `${newNumber.toLocaleString('RU-ru')} ₽`
		}
	}

	requestAnimationFrame(animate)
}
