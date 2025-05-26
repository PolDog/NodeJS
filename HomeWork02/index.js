function show(value){
    console.log("=== log ==>      ",value,"      <=== log ==");
}

function showCustom(text,value){
    console.log("=== log ==>      ",text,"   ",value,"      <=== log ==");
}

module.exports={show,showCustom};