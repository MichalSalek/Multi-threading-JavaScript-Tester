export default function postHandler(req, res) {

	const {
		body: { id, title },
		method,
	} = req

	// console.log(method)
	// console.log(res)

	if (req.method === 'POST') {
		// data.push({id, title})
		res.status(200)
	}
}