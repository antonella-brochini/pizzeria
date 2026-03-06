import { apiSetOrders } from "@/services/ordersService";
import {call, put } from "@redux-saga/core/effects";
import { clearCart } from "@/redux/slices/cartSlice";
import { setOrders } from "@/redux/slices/ordersSlice";
import toast from "react-hot-toast";



function* ordersSaga({type, payload}){
    switch(type){
        case setOrders.type:
            try {
                yield call(apiSetOrders, payload.id, payload.orders)
                toast.success('Your Orders Placed successfully')
                yield put(clearCart())
            } catch (err) {
                console.log(err.message)
            }
    }
}


export default ordersSaga;