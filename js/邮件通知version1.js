//短期物品邮件通知（定时任务）多条子单发一条邮件；
function shortTime_Email_Notice(mainTable,subTable){
	//根据主单的状态获取主单ID
var sql="select * from "+mainTable+"  where  ITEM_USE_DEADLINE = '短期' AND ITEM_APPLY_STATUS !='已归档' ";
var process=getDocProcess("11e7-863e-10563a1f-b2dc-5b8bc6f5716a");
var domainId="11e1-81e2-37f74759-9124-47aada6b7467";
var query=process.queryBySQL(sql,domainId).datas;

var subject="限制性物品管理系统";

if(query!=null && query.size()>0){   
	for(var iter = query.iterator();iter.hasNext();){
		var doc = iter.next();
		if(doc !=null){
			var itemId=doc.getParentid() ; 
			var sid=doc.getId();
			var applyco=doc.getItemValueAsString("apply_code");
			//获取子单的截止时间，根据条件主单ID与子单中PARENT相等。
			var searchParent="select * from "+subTable+" where PARENT='"+sid+"'  AND ITEM_TAKEN_STATUS != '已出场' AND ITEM_TAKEN_STATUS != '全部出场'";
			var users=doc.getAuditorNames();		
			var parnetquery=process.queryBySQL(searchParent,domainId).datas;
			if(parnetquery!=null && parnetquery.size()>0){
				
				var timeNum=0;
				var codes="";
				for(var parentiter=parnetquery.iterator();parentiter.hasNext();){
					var parentdoc=parentiter.next();
					if(parentdoc!=null){
	                                                               var now=getCurDate("yyyy-MM-dd");						
					          var timedealine =parentdoc.getItemValueAsDate("end_use_time");
							   
							  var  times=diffDays( now,timedealine);
							   
		//判断主单是刀具还是工具，获取子单编码，并且设置提前一天发邮件，对于同一主表单的子表单满足条件，只发一次邮件通知。					   
							  if(mainTable=="tlk_tool_apply" && times==1){
                                 var apply_codes=parentdoc.getItemValueAsString("tool_code");								  
							     codes +=apply_codes+";";
								 timeNum=1;
								 
							  }
							  if(mainTable=="tlk_knife_apply" && times==1){	
                                 var apply_codes=parentdoc.getItemValueAsString("knife_code");							  
							     codes +=apply_codes+";";
								  timeNum=1;
								   
							  }
					           
						
						
					}
				}
				//提取流程历史表中的用户ID
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
                                     println("编码"+codes);	
                                    var itemCode=codes.substring(0,codes.lastIndexOf(";"));									 
									var content="温馨提示:"+sysUser+"，主单号:"+applyco+"，子单号:"+itemCode+"，申请带入的物品即将到达出场的截止日期。请您及时将物品全部按要求带出控制区。逾期未带出会进入系统黑名单。";
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



-------------------------------------------------------------------------------------------------------------------------------

//长期物品邮件通知（定时任务）发一条邮件
function longTime_Email_Notice(mainTable,subTable){
	//根据主单的状态获取主单ID
var sql="select * from "+mainTable+"  where   ITEM_USE_DEADLINE = '长期' AND ITEM_APPLY_STATUS !='已归档'  ";
var process=getDocProcess("11e7-863e-10563a1f-b2dc-5b8bc6f5716a");
var domainId="11e1-81e2-37f74759-9124-47aada6b7467";
var query=process.queryBySQL(sql,domainId).datas;
//var to="starchen_jnu@163.com";
var subject="限制性物品系统";
println("test。。。。。。。。。。");
if(query!=null && query.size()>0){   
	for(var iter = query.iterator();iter.hasNext();){
		var doc = iter.next();
		if(doc !=null){
			
			var itemId=doc.getParentid() ; 
			var sid=doc.getId();
			var applyco=doc.getItemValueAsString("apply_code");
			//获取子单的截止时间，根据条件主单ID与子单中PARENT相等。
			var searchParent="select * from "+subTable+" where PARENT='"+sid+"' AND ITEM_TAKEN_STATUS != '已出场' AND ITEM_TAKEN_STATUS != '全部出场'";
			var parnetquery=process.queryBySQL(searchParent,domainId).datas;
			
			if(parnetquery!=null && parnetquery.size()>0){
				var apply_codes="";
				var codes="";
				var times=1;
				for(var parentiter=parnetquery.iterator();parentiter.hasNext();){
					var parentdoc=parentiter.next();
					if(parentdoc!=null){
	                    var now=getCurDate("yyyy-MM-dd");						
						var timedealine =parentdoc.getItemValueAsDate("end_use_time"); 
						var timeNum=diffDays(now, timedealine);
						//判断主单是刀具还是工具，获取子单编码，并且满足条件的只发一次邮件通知
						if(mainTable=="tlk_tool_apply" && timeNum<14 && timeNum>0 && (timeNum%3)==0 ){
                                 var apply_codes=parentdoc.getItemValueAsString("tool_code");
								     codes+=apply_codes+";";
									 times=timeNum;
									 
							    
							  }
					    if(mainTable=="tlk_knife_apply" && timeNum<14 && timeNum>0 && (timeNum%3)==0 ){	
                                 var apply_codes=parentdoc.getItemValueAsString("knife_code");							  
							     codes+=apply_codes+";";
								  times=timeNum;
							  }
						
																	
					}
				}
				
				           //提取流程历史表中的用户ID
							if(times<14 && times>0 ){
							if(times%3==0){												
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
									var itemCode=codes.substring(0,codes.lastIndexOf(";"));	
									var content="温馨提示:"+sysUser+"，主单号:"+applyco+"，子单号:"+itemCode+"，申请带入的物品即将到达出场的截止日期。请您及时将物品全部按要求带出控制区。逾期未带出会进入系统黑名单。";	
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




