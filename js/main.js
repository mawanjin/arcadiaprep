//Initialize function
var init = function() {
	// TODO:: Do your initialization job
	console.log("init() called");
	prepare();
};
$(document).ready(init);


var db;
/**
 * Preparing Data
 * 
 * step 1. parse configuration xmls ,convert them to object step 2. create
 * database and tables step 3. insert configuration xml datas into database.
 * step 4. insert questions into database.
 * 
 */
function prepare() {
	console.log("prepare() called");
	db = new DBManager();
	// var xmlParser = new XMLParser();
	function prepareDatabase() {
		db.createTables(afterCreateTable);
	}

	function afterCreateTable() {
		console.log("After createTables ,now filling the data...");
		db.fillData();
		timer_check_data_exist = setInterval(func_check_data_exist, 1000);
	}

	var timer_check_table_exist = null;
	var timer_check_data_exist = null;

	var func_check_data_exist = function() {
		db.getIphoneExAppPagesCount();
		db.getIphoneExAppsCount();
		db.getIphoneQuestionsCount();

		if (db.data_count_iphone_ex_apps == 152
				&& db.data_count_IphoneExAppPages == 42
				&& db.data_count_iphoneQuestions == 1510) {
			console.log("fill data complete");
			// Filling data complete
			clearInterval(timer_check_data_exist);
			// start app
			startup();
		}
	};

	var func_check_table_exist = function() {
		if (db.exists_iphone_ex_apps == 1 || db.exists_IphoneExAppPages == 1
				|| db.exists_iphoneQuestions == 1) {
			// table not exists
			clearInterval(timer_check_table_exist);
			prepareDatabase();
		} else if (db.exists_iphone_ex_apps == 0
				|| db.exists_IphoneExAppPages == 0
				|| db.exists_iphoneQuestions == 0) {
			// table exists
			clearInterval(timer_check_table_exist);
			startup();
		}
	};

	timer_check_table_exist = setInterval(func_check_table_exist, 1000);

	// db.dropDB();
	db.exists();
};
var parser = new XMLParser();
var main_moduleinfo;
function startup() {
	console.log("startup() called");
	// parser.getProblemPackages(function(problempackage){
	// // alert(problempackage[0].Attributes.AboutPage.Title);
	// // alert(problempackage[0].Attributes.Bought);
	// //
	// alert(problempackage[0].Data.PackageSetName+";"+problempackage[0].Data.ProblemSets.length);
	// //
	// alert(problempackage[0].Data.PackageSetName+";"+problempackage[problempackage.length-1].Name.ProblemSetName);
	//		
	//		
	// });
	parser.getmoduleinfo(function(moduleinfo) {
		// var c = moduleinfo.examSection.length;
		// for ( var i = 0; i < c; i++) {
		// var vo = moduleinfo.examSection[i];
		// alert(vo.secName + ";" + vo.secNameShort + ";" + vo.secFile);
		// }
		// alert(moduleinfo.examType+"-"+moduleinfo.websiteURL+"::"+moduleinfo.examSection.length);
		main_moduleinfo = moduleinfo;
		console.log("afert getmoduleinfo() called");
		//generateCategoryBar();
		SystemOrientation.refresh(function (){
			console.log("afert SystemOrientation.refresh() called");
//			refreshList(current_section_short,current_section);	
		});
	});
	// ================================================
	// parser.getInformation(function(array) {
	// for ( var i = 0; i < array.length; i++)
	// alert(array[i].name);
	// });

	bindEvent();
	//myScroll = new iScroll('wrapper', { checkDOMChanges: true , hScrollbar: false, vScrollbar: false});
}

// ======================
// index.html
// ======================
function bindEvent() {
	console.log("bindEvent() called");
	$("#btn_login").click(function() {
		alert("good");
	});
	$("#info").click(function() {
		alert("info");
	});
	$("#perfdata").click(function() {
		alert("perfdata");
	});
	$("#disc_no_text").click(function() {
		alert("disc_no_text");
	});
	$("#bookmark").click(function() {
		alert("bookmark");
	});
	$("#mail").click(function() {
		alert("mail");
	});
	$("#search_icon").click(function() {
		alert("search_icon");
	});
	$("#btnVisit").click(function() {
		alert("btnVisit");
	});
}
var current_section,current_section_short;
function generateCategoryBar(callback) {
	console.log("generateCategoryBar() called");
	parser = new XMLParser();
	var h;
	parser
			.getmoduleinfo(function(moduleinfo) {
				h = '<div id="category_bar_container" data-corners="true" data-role="navbar"><ul>';
				var c = moduleinfo.examSection.length;
				for ( var i = 0; i < c; i++) {
					var vo = moduleinfo.examSection[i];
					var selected='';
					if(i==0){
						selected='class="ui-btn-active"';
						current_section = vo.secName;
						current_section_short = vo.secNameShort;
					}
					
					if (SystemOrientation.orientation == 0) {
						
						h += '<li><a '+selected+' onclick="refreshList(\'' + vo.secNameShort
								+ '\',\'' + vo.secName
								+ '\');"  >'
								+ vo.secNameShort + '</a></li>';
					} else
						h += '<li><a '+selected+' href="#" onclick="javascript:refreshList(\''
								+ vo.secNameShort
								+ '\',\''
								+ vo.secName
								+ '\');" >'
								+ vo.secName
								+ '</a></li>';

				}
				h += '</ul></div>';
				$("#category_bar_container").html(h);
				$("#category_bar_container").trigger("create");
				
				$("#category_bar_container").find("li").addClass("ui-btn-active");
				refreshList(current_section_short,current_section);
				
				if(callback)
				callback();
			});
}

var recommendations;
var ListItemMyQuestions;
function refreshList(sectionShortName, sectionName) {
	console.log("refreshList() called");
	if (!recommendations || recommendations.length == 0) {
		getAllPackageItems(function(data) {
			recommendations = data;
			console.log("find my questionsets by sectionName::"+sectionName);
			// get myQuestionSets
			db.findMyQuestionSets(sectionName, function(data) {
				console.log("find my questionsets...size is "+data.length);
				ListItemMyQuestions = data;
				fireRefreshList();
			});
		});
	} else {
		// get myQuestionSets
		console.log("find my questionsets by sectionName::"+sectionName);
		db.findMyQuestionSets(sectionName, function(data) {
			console.log("find my questionsets...size is "+data.length);
			ListItemMyQuestions = data;
			fireRefreshList();
		});
	}
	
//	if (!recommendations || recommendations.length == 0) {
//		getAllPackageItems(function(data) {
//			recommendations = data;
//			// get myQuestionSets
//			db.findExAppsBySection(sectionName, function(data) {
//				exApps = data;
//				fireRefreshList();
//			});
//		});
//	} else {
//		// get myQuestionSets
//		db.findExAppsBySection(sectionName, function(data) {
//			exApps = data;
//			fireRefreshList();
//		});
//	}
}

function refreshMainListViewHeight() {
	console.log("refreshMainListViewHeight() called");
	if (SystemOrientation.orientation == 0)
		$("#div_content").css("height",
				Constant.main_div_listview_height_portrait);
	else
		$("#div_content").css("height",
				Constant.main_div_listview_height_landscape);
	
	
}

function fireRefreshList() {
	console.log("fireRefreshList() called");
	console.log("ready to fill the listview.[recommendation="+recommendations.length+"];[myquestionests="+ListItemMyQuestions.length+"]");
	update(recommendations,ListItemMyQuestions);
}
/**
 * show the introduction of one problemset,it is usually called when click on list.  
 */
function showProblemSetIntro(){	
	//$('div[data-role="page"]').hide();
	//window.location.href="#info";
}

//List View
function createListItemMyQuestions(data){
	
	var img = '<img src="./css/images/'+data.logoImg+'" />';
	var title ='<div><strong>'+data.title+'</strong></div>';
	if(data.info){
		title+='<div>'+data.info+'</div>';
	}
	var img_arrow = '<img name="arrow" src="./css/images/arrow.png" width="15px" height="10px;" />';
	var status = '';
	
	var html = '<table cellspacing=0 cellpadding=0><tr><td name="td_logo" valign="middle" >'+img+'</td><td name="title">'+title+'</td><td align="right">'+img_arrow+'</td></tr></table>';
	return html;
}

function createListItemRecommendation(data){
	var img = '<img name="recommend_logo" src="./css/images/'+data.icon+'" />';
	var title ='<div><strong>'+data.title+'</strong></div>';
	var price = data.price;
	
	var img_arrow = '<img name="arrow" src="./css/images/arrow.png" width="15px" height="10px;" />';
	var html = '<table cellspacing=0 cellpadding=0><tr><td name="td_logo" valign="middle" >'+img+'</td><td name="title">'+title+'</td><td name="price" align="right">'+price+'&nbsp;'+img_arrow+'</td></tr></table>';
	return html;
}

function update(recommendations,myquestions){
	
	var html='';
	if(myquestions&&myquestions.length>0){
		
		html+='<li data-role="list-divider">MY Question Sets</li>';
		for(var i=0;i<myquestions.length;i++){
			var o = myquestions[i];
			html+='<li>'+createListItemMyQuestions(o)+'</li>';
		}
			
	}
	
	if(recommendations&&recommendations.length>0){
		html+='<li data-role="list-divider">Recommendations</li>';
		for(var i=0;i<recommendations.length;i++){
			var o = recommendations[i];
			html+='<li data-icon="arrow-r" data-iconpos="right" >'+createListItemRecommendation(o)+'</li>';
		}
	}
	$("#thelist").html(html);
	$("#thelist").trigger("create");
	//$('#thelist').listview('refresh');
	
	setTimeout(function () {
		myScroll.refresh();
	});
}
