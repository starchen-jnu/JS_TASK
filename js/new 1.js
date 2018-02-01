//对下一个节点进行邮件
var users=getWebUser().getName();
//获取表单ID
 var docid = getCurrentDocument().getId();
println(docid);
println(users);
//查询表单tlk_knife_apply中AUDITORNAMES值（下一个节点名称）
var sqlID="select * from tlk_knife_apply where ID ='"+docid+"' ";
println(sqlID);
var queryID=queryByDSName("27",sqlID);
if(queryID!=null &&queryID.size()>0){ 
for(var atIter=queryID.iterator();atIter.hasNext();){
var atIdDoc=atIter.next();
if(atIdDoc!=null){
println("success");
//获取AUDITORNAMES值（下一个节点名称）
var names=atIdDoc.get("AUDITORNAMES");

var sql="select * from t_user where NAME ='"+names+"' ";
var queryName=queryByDSName("obpm",sql);

if(queryName !=null && queryName.size()>0){
	for(var nameIter=queryName.iterator();nameIter.hasNext();){
		var nameDoc=nameIter.next();
		if(nameDoc !=null){
			var loginno=nameDoc.get("LOGINNO");
			var object=getUserByLoginno(loginno);
			var email=object.getEmail();
			println(email);
		}
	
    }


}

}
}
}