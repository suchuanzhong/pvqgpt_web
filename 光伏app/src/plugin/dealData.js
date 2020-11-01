class FormateRule {
    constructor(formate) {
        this.key = formate.key;
        this.value = formate.value;
        this.keyValues = Object.create(null); //对象
    }
    // 数组对象转为对象，key-value形式
    getKeyValue(listArr) {
        let obj = Object.create(null);
        listArr.forEach(item => {
            obj[item[this.key]] = item[this.value]
        })
        this.keyValues = obj;
        return obj
    }

    // 空值添加
    addNull(allKeys) {
        let CopyKeyValues = JSON.parse(JSON.stringify(this.keyValues));
        allKeys.forEach(item => {
            if (!CopyKeyValues[item]) {
                CopyKeyValues[item] = 0;
            }
        })

        return CopyKeyValues

    }

}
// let list1=[
//     {name:'小高',dataVal:'180'},
//     {name:'小明',dataVal:'180'},
//     {name:'小李',dataVal:'180'},
//     {name:'小张',dataVal:'180'}
// ]

// let Formate=new FormateRule({key:'name',value:'dataVal'});
// let value=Formate.getKeyValue(list1);
// let allKeys=['小高','小明','小李','小张','小黑'];
// let formateResult=Formate.addNull(allKeys);
// debugger

// 添加空数据
class DealNull {
    constructor(list, arr) {
        this.list = [...list];
        this.arr = [...arr];
    }
    result(key, value) {
        this.list.forEach(item => {
            if (!this.arr.find(child => item == child[(key)])) {
                this.arr.push({
                    [key]: item,
                    [value]: 0
                })
            }
        })

        return this.arr
    }
    result2(key, value) {
        this.list.forEach(item => {
            if (!this.arr.find(child => item == child[key])) {
                this.arr.push({
                    [key]: item,
                    [value]: 0
                })
            }
        })
        let arr = [];
        this.list.forEach(item => {
            this.arr.forEach(C => {
                if (item == C[key]) {
                    arr.push(C)
                }
            })
        })
        return arr
    }
    sortResult(key) {
        return [...this.arr].sort(((a, b) => a[key] - b[key]))
    }

}
// let  list2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
// let arr=[{month:1,val:12},{month:5,val:12},{month:5,val:32}];
// let dealMonth = new DealNull(list2,arr);

// let result = dealMonth.result('month');

// let sortResult=dealMonth.sortResult('month');
// debugger

export { FormateRule, DealNull }
