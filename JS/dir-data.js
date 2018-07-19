var dirData = {
    dirType:[
        {
            status:"value",
            regVal:"result"
        }
    ]
}
function dirReg(type,value){
    var data = dirData[type];
    if(data){
        for(var i = 0;i < data.length; i++){
            if(value == data[i].status){
                return data[i].regVal;
            }
        }
    }
    return null;
}

function Dictionary(){
    var items = [];
    this.has = function (key){
        return key in items;
    }
    this.get = function (key){
        return this.has(key) ? items[key] : undefined;
    }
    this.set = function (key,value){
        items[key]=value;
    }
    this.remove = function (key){
        if(this.has(key)){
            delete items[key];
            return true;
        }
        return false;
    }
    this.values = function (){
        var values = new Array();
        for(var k in items){
            values.push(items[k]);
        }
        return values;
    }

    this.getItems = function(){
        return items;
    }

    this.size = function(){
        return Object.keys(items).length;
    }
}