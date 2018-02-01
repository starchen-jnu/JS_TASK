//提交表单，下一节点邮件通知
function emailNotice(tableName){
	var users=getWebUser().getName();
	//获取表单ID
	var docid = getCurrentDocument().getId();
	var apply_code=getCurrentDocument().getItemValueAsString("apply_code");
	println(apply_code);
	var subject="限制性物品";
	var content="您有一单限制性物品申请单待审核，申请单号为："+apply_code+"。请及时审核。";
	println(content);
	var nextId =null;
	//查询表单tableName中AUDITORLIST值
	var sqlID="select * from "+tableName+" where ID ='"+docid+"' ";
	var queryID=queryByDSName("27",sqlID);

	if(queryID!=null &&queryID.size()>0){ 
	for(var atIter=queryID.iterator();atIter.hasNext();){
		var atIdDoc=atIter.next();
		if(atIdDoc!=null){
			
			//获取AUDITORLIST值（）
			var idList=atIdDoc.get("AUDITORLIST");
			//截取下一节点ID
			var sid=idList.substring(idList.indexOf("[") + 1, idList.lastIndexOf("]"));
			
			if(sid !=null && sid !=""){
			var value=sid.split(",");
			if(value !=null  ){
				for(var i = 0; i < value.length; i++){
					var idDoc=value[i];
					nextId = idDoc.substring(idDoc.indexOf("\"") + 1, idDoc.lastIndexOf("\""));					
					users=getUserById(nextId );
					email=users.getEmail();	                                    				
					//sendEmailBySystemUser(email, subject, content);
				}
			}else{
				nextId = sid.substring(sid.indexOf("\"") + 1, sid.lastIndexOf("\""));
				users=getUserById(nextId );
				email=users.getEmail();     			                                 
				//sendEmailBySystemUser(email, subject, content);
			}
			}

		}
	}
}
	
}