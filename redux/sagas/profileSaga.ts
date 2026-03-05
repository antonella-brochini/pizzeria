import { apiUpdateProfile } from "@/pages/services/profileService";
import { call, put } from "@redux-saga/core/effects";
import { updateProfile, updateProfileSuccess } from "@/redux/slices/profileSlice";


function* profileSaga({type, payload}){
    switch(type){
        case updateProfile.type:
            try {
                yield call(apiUpdateProfile, payload.id, payload.updates);
                yield put(updateProfileSuccess(payload.updates))
                
            } catch (err) {
                console.log(err)
            }
        break;

       
       
    }
}



export default profileSaga;