module.exports = (req, res) => {
    const {
        query: { slug }
    } = req
    res.json({
        body: req.body,
        query: req.query,
        cookies: req.cookies
    })
}