var rtn='';
//申请单位负责人
var dptid='11e7-d640-9b506e57-a5dc-2b2d92c90eb3';
var roleNameList=getUsersByRoleId(dptid);
var subject="限制性物品";
var content="有表单待处理";
var users=getWebUser().getName();
println(users);
println(roleNameList);
if(roleNameList!=null && roleNameList.size()>0){
    for(var iter=roleNameList.iterator();iter.hasNext();){
	
	   var roleName=iter.next();
	   if(roleName!=null){
	       var eMail=roleName.getEmail();
		   var name=roleName.getName();
		   println(eMail);
		   //sendEmailBySystemUser(eMail, subject, content);
	   
	   }
	}

}
rtn;

Emailnotic;
#include "Emailnotice";

function emails(dptid,subject,content){
	var rtn='';
var roleNameList=getUsersByRoleId(dptid);
//var subject="限制性物品";
//var content="收到";
println(roleNameList);
if(roleNameList!=null && roleNameList.size()>0){
    for(var iter=roleNameList.iterator();iter.hasNext();){
	
	   var roleName=iter.next();
	   if(roleName!=null){
	       var eMail=roleName.getEmail();
		   var name=roleName.getName();
		   println(eMail);
		   sendEmailBySystemUser(eMail, subject, content);
	   
	   }
	}

}
return rtn;
}	

var docid = doc.getId();
var flowid = doc.getFlowid();
var applicationid = getApplication();
var rtprocess = new Packages.cn.myapps.core.workflow.storage.runtime.ejb.FlowStateRTProcessBean(applicationid);
var statert = rtprocess.findFlowStateRTByDocidAndFlowid(docid,flowid); //获取流程实例
var statelabel = statert.getPrevAuditNode(); ]



实现splitString(str, separator)函数的应用，以指定字串分割字符串实际示例：表单中有两个字段A、B，B字段的选项是A字段值分割出来的  (选项脚本)          splitString方法完全匹配separator切割  
//var value = getItemValueAsString("编号");var value="林俊杰$$林志颖$$$安以轩$邱泽$$唐嫣";var arr = splitString (value, "$$");  //分割出来的值：[林俊杰,林志颖,$安以轩$邱泽,唐嫣]var opts=$TOOLS.createOptions();for (var i=0;i<arr.length;i++){     opts.add(arr[i],arr[i]);}opts; 

[{"instanceId":"11e7-fa58-84ce2daa-8990-f99178b04828","flowName":"刀具申请","flowId":"11e7-9767-a74ac3de-8750-db1ab0c6c41d","nodes":[{"nodeId":"1505185745356","stateLabel":"申请单位负责人审批","auditors":[{"id":"11e7-8c65-f47f2c04-aa79-53feb8b1b999","name":"申请单位负责人"}]}]}]

var value="";



var users=getWebUser().getName();
var docid=getParameter('_docid');
println(docid);
println(users);
var sqlActorID="select * from tlk_sharps_apply  where ID ='"+docid+"' ";
println(sqlActorID);
var queryActorID=queryByDSName("27",sqlActorID);
if(queryActorID!=null &&queryActorID.size()>0){ 
for(var actorIter=queryActorID.iterator();actorIter.hasNext();){
var actorIdDoc=actorIter.next();
if(actorIdDoc!=null){
println("success");
var aID=actorIdDoc.get("STATELABELINFO");
println(aID);
}
}
}

//修改

var users=getWebUser().getName();
 var docid = getCurrentDocument().getId();
println(docid);
println(users);
var sqlActorID="select * from tlk_knife_apply where ID ='"+docid+"' ";
println(sqlActorID);
var queryActorID=queryByDSName("27",sqlActorID);
if(queryActorID!=null &&queryActorID.size()>0){ 
for(var actorIter=queryActorID.iterator();actorIter.hasNext();){
var actorIdDoc=actorIter.next();
if(actorIdDoc!=null){
println("success");
var names=actorIdDoc.get("AUDITORNAMES");
var object=getUserByLoginno(names);
var email=object.getEmail();
println(names);
println(email);
}
}
}






//对下一个节点进行邮件
var users=getWebUser().getName();
//获取表单ID
 var docid = getCurrentDocument().getId();
println(docid);

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


[{"instanceId":"11e8-00f0-e48803ae-b120-950fe85de464","flowName":"刀具申请","flowId":"11e7-9767-a74ac3de-8750-db1ab0c6c41d","nodes":[{"nodeId":"1505185745356","stateLabel":"申请单位负责人审核","auditors":[{"id":"11e7-8c65-f47f2c04-aa79-53feb8b1b999","name":"申请单位负责人"}]}]}]




//流程通知
var users=getWebUser().getName();
//获取表单ID
var docid = getCurrentDocument().getId();
println(docid);
var subject="限制性物品";
var content="有表单待处理";
var nextId =null;
//查询表单tlk_knife_apply中AUDITORNAMES值（下一个节点名称）
var sqlID="select * from tlk_knife_apply where ID ='"+docid+"' ";
println(sqlID);
var queryID=queryByDSName("27",sqlID);
if(queryID!=null &&queryID.size()>0){ 
	for(var atIter=queryID.iterator();atIter.hasNext();){
		var atIdDoc=atIter.next();
		if(atIdDoc!=null){
			println("success");
			//获取AUDITORLIST值（）
			var idList=atIdDoc.get("AUDITORLIST");
			//截取下一节点ID
			println(idList);
			var sid=idList.substring(idList.indexOf("[") + 1, idList.lastIndexOf("]"));
			println(sid);
			var value=sid.split(",");

			if(value !=null  ){
				for(var i = 0; i < value.length; i++){
					var idDoc=value[i];
					nextId = idDoc.substring(idDoc.indexOf("\"") + 1, idDoc.lastIndexOf("\""));
					println(nextId);
					users=getUserById(nextId );
					email=users.getEmail();
					println(email);
					//sendEmailBySystemUser(email, subject, content);
				}
			}else{
				nextId = sid.substring(sid.indexOf("\"") + 1, sid.lastIndexOf("\""));
				println(nextId);
				users=getUserById(nextId );
				email=users.getEmail();
				println(email);
				// sendEmailBySystemUser(email, subject, content);
			}

		}
	}
}



{"1505186026805":["11e7-8c67-e6a82a46-aa79-53feb8b1b999","11e7-8c67-ffd6d9d8-aa79-53feb8b1b999"]}

AUDITORLIST
string.substring(string.indexOf("[") + 1, string.lastIndexOf("]"));

var strList=string.substring(string.indexOf("\"") + 1, string.lastIndexOf("\""));


							