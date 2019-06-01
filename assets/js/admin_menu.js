$(document).ready(function(){
	var admin_menu = 0;
	$(".admin-mobi-m").on("click", ".admin-icon-menu", function(){
		$(".fix-slideToggle").slideToggle(function(){
			if (admin_menu == 0) {
				$(".admin-icon-menu").removeClass("icon-menu").addClass("icon-cross");
				admin_menu=1;
				$(".admin-m span").addClass("toggle");
			}else {
				$(".admin-icon-menu").removeClass("icon-cross").addClass("icon-menu");
				admin_menu=0;
				$(".admin-m span").removeClass("toggle");
			}
		});
		$(".admin-m").on("click", ".toggle", function(){
			$(".fix-slideToggle").slideUp(function(){
				$(".admin-icon-menu").removeClass("icon-cross").addClass("icon-menu");
				$(".admin-m span").removeClass("toggle");
				admin_menu=0;
			});
		});
	});
});