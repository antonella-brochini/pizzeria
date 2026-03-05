
import {call, put} from 'redux-saga/effects'
import { getItemsError, getItemsLoading } from '@/redux/slices/appSlice';
import { getItemsSuccess } from '@/redux/slices/itemsSlice';
import { toast } from 'react-hot-toast';
import { apiGetItems } from '@/pages/services/itemsService';


function* getItemsSaga(){
   try {
       yield put(getItemsLoading(true))
        const data = yield call(apiGetItems);
       
      if (Array.isArray(data)) {
      yield put(getItemsSuccess(data));
    } else {
      yield put(getItemsSuccess([]));
      toast.error("No food was found");
    }

    yield put(getItemsLoading(false));

 
  } catch (err) {
    yield put(getItemsLoading(false));
    yield put(getItemsError(true));
    toast.error("Error loading items");
  }

}



export default getItemsSaga;