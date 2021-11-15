export default function postHandler(req, res) {
	if (req.method === 'GET') {
		// res.status(200).json({ data })
	}
}

export const getPosts = async () => {
	const res = await fetch('http://localhost:8080/posts')
	return res.json()
}
