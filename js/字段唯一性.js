
//判断字段唯一性

//方法一
var keyvalue = getItemValueAsString("data_code");
var groupcode = getItemValueAsString("group_code");
var sql = "SELECT * FROM tlk_t_rgm_data WHERE ITEM_GROUP_CODE = '" + groupcode + "'" + " AND ITEM_DATA_CODE = '" + keyvalue + "'";
var datas = queryBySQL(sql);
if(datas!=null && datas.size()>0){
	var lasttime = getParameter("content.lastmodified");
	println(lasttime);
	if (lasttime == null || lasttime =="") {
		createAlert("同一数据字典组里数据键值不能相同");
	}
}



//方法二
var keyvalue = getItemValueAsString("data_code");
var groupcode = getItemValueAsString("group_code");
var sql = "SELECT * FROM tlk_t_rgm_data WHERE ITEM_GROUP_CODE = '" + groupcode + "'" + " AND ITEM_DATA_CODE = '" + keyvalue + "'";
var datas = queryBySQL(sql);
if(datas!=null && datas.size()>0){
	var doc=getCurrentDocument();
	if (doc.is_new() ) {
		createAlert("同一数据字典组里数据键值不能相同");
	}
}