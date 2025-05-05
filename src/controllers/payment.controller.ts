import {VNPay,HashAlgorithm,VnpLocale} from 'vnpay'
import {NextFunction, Request, Response} from 'express'
import {addEnrollemntFromCart} from '../services/enrollment.service'
import {getUserCart} from '../services/cart.service'
class PaymentController{
    paymentCod = async (req: Request, res: Response) => {
        const cart = await getUserCart(req.currentUser.id)
        const vnpay = new VNPay({
            tmnCode: process.env.VNPAY_TMN_CODE,
            hashAlgorithm:HashAlgorithm.SHA512 ,
            vnpayHost: process.env.VNPAY_HOST_URL,
            testMode: true,
            secureSecret: process.env.VNPAY_SECRET,
        })

        const paymentUrl = vnpay.buildPaymentUrl({
            vnp_Amount: cart.finalPrice ,
            vnp_TxnRef: `${cart.id}'${Date.now()}`,
            vnp_OrderInfo: `${cart.id}`,
            vnp_Locale: VnpLocale.VN,
            vnp_ReturnUrl: process.env.VNPAY_RETURN_URL,
            vnp_IpAddr: req.ip,
        })
        res.json({url: paymentUrl})
    }
    checkPayment = async (req: Request, res: Response,next:NextFunction) => {
        try{
            const {vnp_OrderInfo,vnp_TransactionStatus} = req.query

            if(vnp_TransactionStatus ==='00'&&vnp_OrderInfo)
            {
                await addEnrollemntFromCart(vnp_OrderInfo.toString())
                res.redirect(`http://localhost:3000/payment/checkout/success`)
            }
        }
        catch(err) 
        {
            next(err)
        }
     }
}
export default new PaymentController()