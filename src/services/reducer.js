const reducer =(state,action) => {
    if(action.type==="auth"){
      return state = action.payload
    }
}
const initial = {}

export {reducer,initial}