const findIndexById = (array,id) => {
    for(let i = 0; i < array.length; i++){
        console.log(array[i].room_ID, id)
        if(array[i].room_ID === id){
            return i
        }
    }
    return -1
}

export default findIndexById