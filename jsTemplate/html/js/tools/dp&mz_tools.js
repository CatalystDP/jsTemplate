var dp_mz=dp_mz||{};
dp_mz.klass=function(Parent,props){
    var Child,i;
    Child=function(){
      if(Child.superKlass&&Child.superKlass.hasOwnProperty("__construct")){
          Child.superKlass.__construct.apply(this,arguments);
        //Child.superKlass指向parent的原型
      }
      if(Child.prototype.hasOwnProperty("__construct")){
          Child.prototype.__construct.apply(this,arguments);
      }
    };
//构造函数内判断__construct
    Parent=Parent||Object;
    if(Parent!==Object)
    {
        if(typeof Parent=="object"){
            Child.prototype=Parent;
            Child.superKlass=Parent;
        }
        else if(typeof Parent=="function")
        {
            var F=function(){};
            F.prototype=Parent.prototype;
            Child.prototype=new F();
            Child.superKlass=Parent.prototype;
        }
    }
//    继承
    Child.prototype.constructor=Child;
//    将props中的属性放到Child原形中
    for(i in props){
        if(props.hasOwnProperty(i))
            Child.prototype[i]=props[i];
    }
    return Child;
};
//klass类模拟其他语言中的类
dp_mz.nameSpace=function(){};
dp_mz.nameSpace.prototype.namespace=function(ns_string){
       var parts=ns_string.split('.'),
           parent=this,
           i;
       if(eval(parts[0])===parent)
            parts=parts.slice(1);
       for(i=0;i<parts.length;i++){
           if(typeof parent[parts[i]]=="undefined"){
               parent[parts[i]]={};
           }
           parent=parent[parts[i]];
       }
       return parent;
};
//生成命名空间