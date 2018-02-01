var sql="select * from tlk_knife_apply  where   ITEM_USE_DEADLINE = '短期' ";
println(sql);
var process=getDocProcess("11e7-863e-10563a1f-b2dc-5b8bc6f5716a");
var domainId="11e1-81e2-37f74759-9124-47aada6b7467";
var query=process.queryBySQL(sql,domainId).datas;
//var to="starchen_jnu@163.com";
var subject="限制性物品系统";
if(query!=null && query.size()>0){   
	for(var iter = query.iterator();iter.hasNext();){
		var doc = iter.next();
		if(doc !=null){
			var itemId=doc.getParentid() ; 
			var sid=doc.getId();
			var applyco=doc.getItemValueAsString("apply_code");
			var searchParent="select * from tlk_knife_apply_details where PARENT='"+sid+"'";
			var users=doc.getAuditorNames();		
			var parnetquery=process.queryBySQL(searchParent,domainId).datas;
			if(parnetquery!=null && parnetquery.size()>0){
				for(var parentiter=parnetquery.iterator();parentiter.hasNext();){
					var parentdoc=parentiter.next();
					if(parentdoc!=null){
	                    var now=getCurDate("yyyy-MM-dd");						
						var timedealine =parentdoc.getItemValueAsDate("end_use_time"); 
						var timeNum=diffDays( now,timedealine);
						if(timeNum==1){
							//获取流程的各用户ID；
							var sqlActorID="select  DISTINCT(ACTORID) from t_actorhis  where DOC_ID ='"+sid+"' ";
							var queryActorID=queryByDSName("27",sqlActorID);
							if(queryActorID!=null &&queryActorID.size()>0){  
								for(var actorIter=queryActorID.iterator();actorIter.hasNext();){
									var actorIdDoc=actorIter.next();
								if(actorIdDoc!=null){									
									var aID=actorIdDoc.get("ACTORID");
									var userById=getUserById(aID);
									var sysUser=userById.getName();									
									//获取用户邮件地址；
									var sysUserEmail=userById.getEmail();							
									var content="温馨提示:"+sysUser+"，单号:"+applyco+"，限制性物品还有"+timeNum+"天过了带出场时间，请将物品及时带出场；";
									sendEmailBySystemUser(sysUserEmail, subject, content);									
									
								}
									
								}
																
							}
							
						}
						
					}
				}
		
			}     
	    }	
	}
}