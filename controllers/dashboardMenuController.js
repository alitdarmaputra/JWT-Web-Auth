// 0 = daftar buah, 1 = daftar sayur, 2 = daftar hewan

const list = [
    ["Semangka", "Melon", "Pepaya"],
    ["Bayem", "Tomat", "Kol"],
    ["Sapi", "Kuda", "Singa"],
]

module.exports = (req, res) => {
    return res.json({ data: list[req.params.menu] });
}