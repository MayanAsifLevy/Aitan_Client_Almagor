const  GenericListCreator=(objectList) =>
{
    // get the list of fruitTypes for the dropdownlist
    let isActiveObjectList = []
    isActiveObjectList = objectList.filter(item => item.isActive === 1) // keep only the types that are active==1
    return isActiveObjectList
}

export default GenericListCreator

