const rules = {
    mobile:(v) => {
    return;
},
username:(v) => {
    return;
},
password:(v) => {
    return;
},
email:(v) => {
    return;
},
require:(v) => {
    if(!v.trim()){
        return{
            type:"require",
            message:"必填"
        }
    }
    return;
}
}

const check = (form) => {
    if(!form && form.elements) return;

    const elements = form.elements;
    let checkResult = [];

    Array.from(elements).filter(item => {
        return item.getAttribute("valid");
}).map(item => {
        const valids = item.getAttribute("valid");
    const value = item.value;
    let errorArr = [];
    valids.forEach(valid => {
        if(rules[valid]){
        let result = rules[valid](value);
        result && errorArr.push(result);
    }
});
    if(errorArr.length){
        checkResult.push({
            dom:item,
            errorArr:errorArr,
            name:item.name,
            message:errorArr[0].message,
            type:errorArr[0].type
        })
    }
});
    // return checkResult;
}

export {check}