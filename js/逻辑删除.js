//逻辑删除
  var docid = getParameter("docid");
		println(docid);
		var sql="update tlk_blacklist set ITEM_VALID='0' where ID='"+docid+"'";
		updateByDSName("27",sql);
