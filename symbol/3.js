//Symbol消除魔术字符串

var shapeType = {
   // Triangle:'triangle',
   Triangle:Symbol(),
    //Circle:'circle'
   Circle:Symbol()
}
function getArea(shape,options) {
    var area = 0;
    switch(shape) {
        case shapeType.Triangle: 
             area = options.width * options.height;
             break;
        case shapeType.Circle:
             area = Math.PI * options.r * options.r;
             break;
    }
    console.log(area);
}
getArea(shapeType.Triangle,{width:200, height:100});
getArea(shapeType.Circle,{r:2});
