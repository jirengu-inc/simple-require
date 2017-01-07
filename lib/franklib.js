!function(){

  var cache = {}
  window.define = function(){
    if(arguments.length === 2){
      var name = arguments[0] 
      var moduleFunc = arguments[1]
    }else if(arguments.length ===3){
      var name = arguments[0] 
      var deps = arguments[1]
      var moduleFunc = arguments[2]
    }

    cache[name] = {
      deps: deps,
      moduleFunc: moduleFunc
    }
  }


  window.require = function(deps, func){

    var modules = findModules(deps)
    func.apply(null, modules)

  }















  function findModules(deps){
    if(deps){
      var modules = []
      for(var i=0; i<deps.length; i++) {
        var name = deps[i] 
        var module = cache[name] // { deps:[], moduleFunc: Function }
        if(module){
          modules.push( module.moduleFunc.apply(null, findModules(module.deps)) )
        }
      }
      return modules
    }else{
      return []
    }
  }
}()
