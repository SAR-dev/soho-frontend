import { AuthorDataParam } from "./author"

export interface PaymentDataParam {
    id: number
    author: AuthorDataParam
    product_id: string
    price_id: string
    coupon_id: string
    promotion_id: string
    promotion_code: string
    currency: string
    product_image: string
    unit_amount: number
    sub_interval: string
    percent_off: string
}
