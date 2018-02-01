//刀具黑名单定时任务
var uuid = new Packages.cn.myapps.util.sequence.Sequence();
var sql="select * from tlk_knife_apply_details  where datediff(now(), ITEM_END_USE_TIME)>0 AND ITEM_TAKEN_STATUS != '已出场' ";
var process=getDocProcess("11e7-863e-10563a1f-b2dc-5b8bc6f5716a");
var domainId="11e1-81e2-37f74759-9124-47aada6b7467";
var query=process.queryBySQL(sql,domainId).datas;
if(query!=null && query.size()>0){   
	for(var iter = query.iterator();iter.hasNext();){
		var doc = iter.next();
		if(doc !=null){
			var itemId=doc.getParentid() ; 
			var sid=doc.getId();
			var searchParent="select * from tlk_knife_apply where ID='"+itemId+"' AND ITEM_APPLY_STATUS !='终止' AND ITEM_APPLY_STATUS !='已归档' ";
			var parnetquery=process.queryBySQL(searchParent,domainId).datas;
			if(parnetquery!=null && parnetquery.size()>0){
				for(var parentiter=parnetquery.iterator();parentiter.hasNext();){
					var parentdoc=parentiter.next();
					if(parentdoc!=null){
						var areas =parentdoc.getItemValueAsString("use_area"); 
						var apply_department=parentdoc.getItemValueAsString("applyco_name");
						var pass_code=parentdoc.getItemValueAsString("pass_code");
						var apply_code=parentdoc.getItemValueAsString("apply_code");
						var parentId=parentdoc.getId();
						var accountid=parentdoc.getAuthor().getName();
						var remark="限制性物品超时未带出";
						var Istatus=1;
						var insertsql="insert into tlk_blacklist (id,ITEM_USE_AREA,DOMAINID,ITEM_APPLYCO_NAME,ITEM_PASS_CODE,ITEM_APPLY_CODE,ITEM_ACCOUNT_NAME,ITEM_VALID,ITEM_REMARK) values('"+parentId+"','"+areas+"','"+domainId+"','"+apply_department+"','"+pass_code+"','"+apply_code+"','"+accountid+"','"+Istatus+"','"+remark+"')";
						insertByDSName("27",insertsql);
					}
				}
		
			}     
	    }	
	}
}

--------------------------------------------------------------------------------------------------------------
//工具定时任务
var uuid = new Packages.cn.myapps.util.sequence.Sequence();
var sql="select * from tlk_tool_apply_details  where datediff(now(), ITEM_END_USE_TIME)>0 AND ITEM_TAKEN_STATUS != '全部出场' ";
var process=getDocProcess("11e7-863e-10563a1f-b2dc-5b8bc6f5716a");
var domainId="11e1-81e2-37f74759-9124-47aada6b7467";
var query=process.queryBySQL(sql,domainId).datas;
if(query!=null && query.size()>0){   
	for(var iter = query.iterator();iter.hasNext();){
		var doc = iter.next();
		if(doc !=null){
			var itemId=doc.getParentid() ; 
			var sid=doc.getId();
			var searchParent="select * from tlk_tool_apply where ID='"+itemId+"' AND ITEM_APPLY_STATUS !='终止' AND ITEM_APPLY_STATUS !='已归档'  ";			
			var parnetquery=process.queryBySQL(searchParent,domainId).datas;
			if(parnetquery!=null && parnetquery.size()>0){
				for(var parentiter=parnetquery.iterator();parentiter.hasNext();){
					var parentdoc=parentiter.next();
					if(parentdoc!=null){
						var areas =parentdoc.getItemValueAsString("use_area"); 
						var apply_department=parentdoc.getItemValueAsString("applyco_name");
						var pass_code=parentdoc.getItemValueAsString("pass_code");
						var apply_code=parentdoc.getItemValueAsString("apply_code");
						var remark="限制性物品超时未带出";
						var parentId=parentdoc.getId();
						var accountid=parentdoc.getAuthor().getName();
						var Istatus=1;				
						var insertsql="insert into tlk_blacklist (id,ITEM_USE_AREA,DOMAINID,ITEM_APPLYCO_NAME,ITEM_PASS_CODE,ITEM_APPLY_CODE,ITEM_ACCOUNT_NAME,ITEM_VALID,ITEM_REMARK) values('"+parentId+"','"+areas+"','"+domainId+"','"+apply_department+"','"+pass_code+"','"+apply_code+"','"+accountid+"','"+Istatus+"','"+remark+"')";					
						insertByDSName("27",insertsql);
					}
				}
		
			}     
	    }	
	}
}
