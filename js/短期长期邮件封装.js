#include  "shortTime_Email_Notice";
var mainTable="tlk_knife_apply";
var subTable="tlk_knife_apply_details";
shortTime_Email_Notice(mainTable,subTable);

#include  "shortTime_Email_Notice";
var mainTable="tlk_tool_apply";
var subTable="tlk_tool_apply_details";
shortTime_Email_Notice(mainTable,subTable);


function shortTime_Email_Notice(mainTable,subTable){

var sql="select * from "+mainTable+"  where   ITEM_USE_DEADLINE = '短期'  ";
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
			var searchParent="select * from "+subTable+" where PARENT='"+sid+"'";
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
}

#include  "longTime_Email_Notice";
var mainTable="tlk_knife_apply";
var subTable="tlk_knife_apply_details";
longTime_Email_Notice(mainTable,subTable);

#include  "longTime_Email_Notice";
var mainTable="tlk_tool_apply";
var subTable="tlk_tool_apply_details";
longTime_Email_Notice(mainTable,subTable);

//长期物品邮件通知：
function longTime_Email_Notice(mainTable,subTable){
var sql="select * from "+mainTable+"  where   ITEM_USE_DEADLINE = '长期' ";
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
			var searchParent="select * from "+subTable+" where PARENT='"+sid+"'";
			var parnetquery=process.queryBySQL(searchParent,domainId).datas;
			if(parnetquery!=null && parnetquery.size()>0){
				for(var parentiter=parnetquery.iterator();parentiter.hasNext();){
					var parentdoc=parentiter.next();
					if(parentdoc!=null){
	                    var now=getCurDate("yyyy-MM-dd");						
						var timedealine =parentdoc.getItemValueAsDate("end_use_time"); 
						var timeNum=diffDays(now, timedealine);
						if(timeNum<14 && timeNum>0 ){
							if(timeNum%3==0){
							var content="温馨提示，单号:"+applyco+"，申请带入的物品还有"+timeNum+"天就到带出场的时间，请将物品及时带出场；";							
							
								//获取流程的各用户ID；
							var sqlActorID="select DISTINCT(ACTORID) from t_actorhis  where DOC_ID ='"+sid+"' ";
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
}
}