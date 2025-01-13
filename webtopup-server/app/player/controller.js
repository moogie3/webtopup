const Player = require('./model')
const Voucher = require ('../voucher/model')

module.exports = {
    landingPage:async(req,res)=>{
        try{
            const voucher = await Voucher.find()
            .select('_id name status category thumbnail')
            .populate('category')

            res.status(200).json({data : voucher})
        } catch (err){
            res.status(500).json({message: err.message || `Internal Server Error`})
        }
    },

    detailPage:async(req,res)=>{
        try{
            const { id } = req.params   
            const voucher = await Voucher.find({ _id : id})
            .populate('user', '_id name phoneNumber')
            .populate('category')
            .populate('nominals')

            if(!voucher){
                return res.status(404).json({message : "voucher game tidak ditemukan. !"})
            }

            res.status(200).json({data : voucher})
        } catch (err){
            res.status(500).json({message: err.message || `Internal Server Error`})
        }
    },
}