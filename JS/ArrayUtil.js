
/*
 * JSON数组去重
 * @param: [array] json Array
 * @param: [string] 唯一的key名，根据此键名进行去重
 */
Array.prototype.uniqueArrayJson = function(array, key){
    var result = [array[0]];
    for(var i = 1; i < array.length; i++){
        var item = array[i];
        var repeat = false;
        for (var j = 0; j < result.length; j++) {
            if (item[key] == result[j][key]) {
                repeat = true;
                break;
            }
        }
        if (!repeat) {
            result.push(item);
        }
    }
    return result;
}

//数组去重
Array.prototype.uniqueArray = function(){
    var res = [];
    var json = {};
    for(var i = 0; i < this.length; i++){
        if(!json[this[i]]){
            res.push(this[i]);
            json[this[i]] = 1;
        }
    }
    return res;
}
Array.prototype.staticArrNum = function(){
    var json = {};
    for(var i = 0; i < this.length; i++){
        if(!json[this[i]])
            json[this[i]] = 1;
        else
            json[this[i]] ++;
    }
    return json;
}

// 数组去除空值
Arrary.prototype.removeNull = function (array) {
    for(var i = 0 ;i<array.length;i++)
    {
        if(array[i] == "" || typeof(array[i]) == "undefined")
        {
            array.splice(i,1);
            i= i-1;

        }

    }
    return array;
}

//数组是否重复
Arrary.prototype.arrIsRepeat = function (arr){

        var hash = {};

        for(var i in arr) {

            if(hash[arr[i]])

                return true;

            hash[arr[i]] = true;

        }

        return false;

    }

//验证对象是否为空
Object.prototype.isEmptyObject = function (obj) {
    for (var key in obj){
        return false;//返回false，不为空对象
    }
    return true;//返回true，为空对象
}

// slice(start,end) 截取数组，字符串 substring(start,end)
// splice(start,length,newItem) 删除并可添加新元素，返回已删除的数组 substr(start,length)
