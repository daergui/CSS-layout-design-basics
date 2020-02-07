window.onload = function () {
    waterfall('main', 'box');

    // 这是完成了触发条件后，我们用接口对后台进行获取的json值
    let dataInt = {
        "data": [
            {"scr":'0.jpg'},{"scr":'1.jpg'},{"scr":'2.jpg'},
            {"scr":'3.jpg'},{"scr":'4.jpg'}
        ]
    }
    window.onscroll = function () {
        this.console.log(checkScrollsLide())
        if (checkScrollsLide()) {
            // 把json渲染到当前页面的尾部
            let  oParent = document.getElementById('main');
            for(let i=0;i < dataInt.data.length; i++) {
                
                oParent.innerHTML+= `
                    <li class="box">
                        <div class="pic"><img src="../images/${dataInt.data[i].scr}"></div>
                    </li>
                `
            }
        }
    }
}


function waterfall(parent, box) {
    // 将main 下的所有class为box的元素取出来
    let oParent = document.getElementById(parent);
    let oBoxs = oParent.getElementsByClassName('box');
    let oBoxW = oBoxs[0].offsetWidth;
    
    // 技术整个页面应该显示的列数(页面宽度/box的宽度),四舍五入
    var cols = Math.floor(document.documentElement.clientWidth / oBoxW);
    
    // 设置main的宽度, 列数宽度 * 列数要显示个数
    oParent.style.cssText = 'width:' + oBoxs * cols + 'px;margin:0 auto';

    // 根据box高度来决定第二行box排列位置，把全部box高度进行遍历存储
    let hArr = [];
    for(let i = 0; i < oBoxs.length; i++) {

        // 把第一行列数高度存储
        if (i < cols) {
            hArr.push(oBoxs[i].offsetHeight);
        }else {
            // 取第一行列数中高度最小的元素, 传入null改变指针，可以对数组每个进行查找
            let minH = Math.min.apply(null, hArr);

            //取得最小值在数组中的位置，从而知道在第几个列数下排列
            let index = hArr.indexOf(minH);
            
            // 给第二行元素开始排列
            oBoxs[i].style.position = 'absolute';
            oBoxs[i].style.top = minH + 'px';

            // 平移元素的距离等于元素的相加元素的最小高度距离
            oBoxs[i].style.left = oBoxs[index].offsetLeft+'px';


            // 从第二行开始平移了第一个到最小高度后，给平移的位置上下两个高度相加
            // 等于下一行计算高度要位移的位置
            hArr[index]+=oBoxs[i].offsetHeight;
        }
    }
    console.log(hArr)
}

// 检测是否具备了滚动加载数据的条件
function checkScrollsLide() {
    let oParent = document.getElementById('main');
    let oBoxs = oParent.getElementsByClassName('box');

    // 计算滚动条已经滚动过了第一行
    let lastBoxH = oBoxs[oBoxs.length-1].offsetTop +
        Math.floor(oBoxs[oBoxs.length-1].offsetHeight / 2);
    
    // 获取滚动值, 浏览器滚动条监听有两种模式，在这做下兼容，
    // 分别为标准模式与混杂模式
    let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

    // 获取视窗高度，同样存在上述两种模式需要兼容
    let height = document.body.clientHeight || document.documentElement.clientHeight;
    
    // 返回已经完成触发底部更多数据加载的条件,
    // 如果滚动值+视窗高度 > 已经滚动了第一行的高度值则完成条件
    console.log('滚动条值:'+scrollTop, '视窗值'+height);
    return ((scrollTop + height) > lastBoxH) ? true:false;
}