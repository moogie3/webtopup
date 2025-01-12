const User = require('./model')
const bcrypt = require('bcryptjs')

module.exports = {
    viewSignin: async (req, res) => {
        try {
            const alertMessage = req.flash("alertMessage")
            const alertStatus = req.flash("alertStatus")

            const alert = { message: alertMessage, status: alertStatus }

            res.render('admin/users/view_signin', {
                alert
            })
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/')
        }
    },

    actionSignin: async (req, res) => {
        try {
            const { email, password } = req.body
            const check = await User.findOne({ email, password })
            if (user) {
                if (user.status === 'Y') {
                    const checkPassword = await brcypt
                } else {
                    req.flash('alertMessage', `Mohon maaf status anda belum aktif`)
                    req.flash('alertStatus', 'danger')
                    res.redirect('/')
                }
            } else {
                req.flash('alertMessage', `Email yang anda input salah`)
                req.flash('alertStatus', 'danger')
                res.redirect('/')
            }
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/')
        }
    }
}