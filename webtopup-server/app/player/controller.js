const Player = require('./model')
const Voucher = require('../voucher/model')
const Category = require('../category/model')
const Bank = require('../bank/model')
const Payment = require('../payment/model')
const Nominal = require('../nominal/model')
const Transaction = require('../transaction/model')

module.exports = {
    landingPage: async (req, res) => {
        try {
            const voucher = await Voucher.find()
                .select('_id name status category thumbnail')
                .populate('category')

            res.status(200).json({ data: voucher })
        } catch (err) {
            res.status(500).json({ message: err.message || `Internal Server Error` })
        }
    },

    detailPage: async (req, res) => {
        try {
            const { id } = req.params
            const voucher = await Voucher.find({ _id: id })
                .populate('user', '_id name phoneNumber')
                .populate('category')
                .populate('nominals')

            if (!voucher) {
                return res.status(404).json({ message: "voucher game tidak ditemukan. !" })
            }

            res.status(200).json({ data: voucher })
        } catch (err) {
            res.status(500).json({ message: err.message || `Internal Server Error` })
        }
    },

    category: async (req, res) => {
        try {
            const category = await Category.find()
            res.status(200).json({ data: category })
        } catch (err) {
            res.status(500).json({ message: err.message || `Internal Server Error` })
        }
    },

    checkout: async (req, res) => {
        try {
            const { accountUser, name, nominal, voucher, payment, bank } = req.body

            const res_voucher = await Voucher.findOne({ _id: voucher })
                .select('name category _id thumbnail user')
                .populate('category')
                .populate('user')

            if (!res_voucher) return res.status(404).json({ message: 'voucher game tidak ditemukan' })

            const res_nominal = await Nominal.findOne({ _id: nominal })

            if (!res_nominal) return res.status(404).json({ message: 'nominal tidak ditemukan' })

            const res_payment = await Payment.findOne({ _id: payment })

            if (!res_payment) return res.status(404).json({ message: 'payment tidak ditemukan' })

            const res_bank = await Bank.findOne({ _id: bank })

            if (!res_bank) return res.status(404).json({ message: 'payment tidak ditemukan' })

            let tax = (10 / 100) * res_nominal._doc.price;
            let value = res_nominal._doc.price - tax;

            const payload = {
                historyVoucherTopUp: {
                    gameName: res_voucher._doc.name,
                    category: res_voucher._doc.category ? res_voucher._doc.category.name : '',
                    thumbnail: res_voucher._doc.thumbnail,
                    coinName: res_nominal._doc.category,
                    coinQuantity: res_nominal._doc.coinQuantity,
                    price: res_nominal._doc.price,
                },
                historyPayment: {
                    name: res_bank._doc.name,
                    type: res_payment._doc.type,
                    bankName: res_bank._doc.bankName,
                    noRekening: res_bank._doc.noRekening,
                },

                name: name,
                accountUser: accountUser,
                tax: tax,
                value: value,
                player: req.player._id,
                historyUser: {
                    name: res_voucher._doc.user?.name,
                    phoneNumber: res_voucher._doc.user?._phoneNumber
                },

                category: res_voucher._doc.category?._id,
                user: res_voucher._doc.user?._id
            }

            const transaction = new Transaction(payload)

            res.status(201).json({ data: payload })
        } catch (err) {
            res.status(500).json({
                message: err.message || `Internal Server Error`
            })
        }
    },

    history: async (req, res) => {
        try {
            const { status = '' } = req.query
            let criteria = {}

            if (status.length) {
                criteria = {
                    ...criteria,
                    status: { $regex: `${status}`, $options: 'i' }
                }
            }

            if (req.player._id) {
                criteria = {
                    ...criteria,
                    player: req.player._id
                }
            }

            const history = await Transaction.find(criteria)
            let total = await Transaction.aggregate([
                { $match: criteria },
                {
                    $group: {
                        _id: null,
                        value: { $sum: '$value' }
                    }
                }
            ])
            res.status(200).json({
                data: history,
                total: total.length ? total[0].value : 0
            })
        } catch (err) {
            res.status(500).json({
                message: err.message || `Internal Server Error`
            })
        }
    },

    historyDetail: async (req, res) => {
        try {
            const { id } = req.params
            const history = await Transaction.findOne({ _id: id })
            if (!history) return res.status(404).json({ message: "riwayat tidak ditemukan" })
            res.status(200).json({ data: history })
        } catch (err) {
            res.status(500).json({
                message: err.message || `Internal Server Error`
            })
        }
    },

    dashboard: async (req, res) => {
        try {
            const count = await Transaction.aggregate([
                { $match: { player: req.player._id } },
                {
                    $group: {
                        _id: '$category',
                        value: { $sum: 'value' }
                    }
                }
            ])

            const category = await Category.find({})
            category.forEach(element => {
                count.forEach(data => {
                    if (data._id.toString() === element._id.toString()) {
                        data.name = element.name
                    }
                })
            })

            const history = await Transaction.find({ player: req.player._id })
                .populate('category')
                .sort({ 'updatedAt': -1 })

            res.status(200).json({ data: history, count: count })
        } catch (err) {
            res.status(500).json({
                message: err.message || `Internal Server Error`
            })
        }
    },

    profile: async (req, res) => {
        try {
            const player = {
                id: req.player._id,
                username: req.player.username,
                email: req.player.email,
                name: req.player.name,
                avatar: req.player.avatar,
                phone_number: req.player.phone_number
            }
            res.status(200).json({ data: player })
        } catch (err) {
            res.status(500).json({
                message: err.message || `Internal Server Error`
            })
        }
    },

    editProfile: async (req, res, next) => {
        try {
            const { name = "", phoneNumber = "" } = req.body
            const payload = {}
            if (name.length) payload.name = name
            if (phoneNumber.length) payload.phoneNumber = phoneNumber

            if (req.file) {
                let tmp_path = req.file.path;
                let originalExt = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1];
                let filename = req.file.filename + '.' + originalExt;
                let target_path = path.resolve(config.rootPath, `public/uploads/${filename}`);

                const src = fs.createReadStream(tmp_path)
                const dest = fs.createWriteStream(target_path)

                src.pipe(dest)

                src.on('end', async () => {

                    let player = await Player.findOne({ _id: req.player._id })

                    let currentImage = `${config.rootPath}/public/uploads/${player.avatar}`;
                    if (fs.existsSync(currentImage)) {
                        fs.unlinkSync(currentImage)
                    }

                    player = await Player.findOneAndUpdate({
                        _id: req.player._id
                    }, {
                        ...payload,
                        avatar: filename
                    }, { new: true, runValidators: true })

                    res.status(201).json({
                        data: {
                            id: player.id,
                            name: player.name,
                            phoneNumber: player.phoneNumber,
                            avatar: player.avatar
                        }
                    })
                })

                src.on('err', async () => {
                    next(err)
                })
            } else {
                const player = await Player.findOneAndUpdate({
                    _id: req.player._id
                }, payload, { new: true, runValidators: true })

                res.status(201).json({
                    data: {
                        id: player.id,
                        name: player.name,
                        phoneNumber: player.phoneNumber,
                        avatar: player.avatar
                    }
                })
            }
        } catch (err) {
            if (err && err.name === "ValidationError") {
                res.status(422).json({
                    error: 1,
                    message: err.message,
                    fields: err.errors
                })
            }
        }
    }
}