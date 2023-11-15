const API_URL = 'https://rift-cat-newsboy.glitch.me/api'

export const getData = async (url) => {
	try {
		const resp = await fetch(`${API_URL}${url}`)

		if (!resp.ok) {
			throw new Error(`HTTP error! status: ${resp.status}`)
		}

		return await resp.json()
	} catch (error) {
		console.error('Ошибка при получении данных:', error)
		throw error
	}
}

export const postData = async (url, data) => {
	try {
		const resp = await fetch(`${API_URL}${url}`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data),
		})

		if (!resp.ok) {
			throw new Error(`HTTP error! status: ${resp.status}`)
		}

		return await resp.json()
	} catch (error) {
		console.error('Ошибка при отправке данных:', error)
		throw error
	}
}

export const deleteData = async (url) => {
	try {
		const resp = await fetch(`${API_URL}${url}`, {
			method: 'DELETE',
		})

		if (!resp.ok) {
			throw new Error(`HTTP error! status: ${resp.status}`)
		}

		return await resp.json()
	} catch (error) {
		console.error('Ошибка при удалении данных:', error)
		throw error
	}
}
