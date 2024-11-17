export const filter = (value, filterBoolean, filterValue, list) => {
    // // console.log(value.textContent)
    // console.log(value)
    // console.log(filterBoolean)
    // console.log(filterValue)
    // console.log(list)
    if (value.textContent == "all") {
        filterValue("")
        filterBoolean(false)
    }else    {
        filterValue(value.textContent)
        filterBoolean(true)
    }
    if (value.className == "") {
        for (const i of list) {
            i.className = ""
        }
        value.className = "active"
    }
    return value
}