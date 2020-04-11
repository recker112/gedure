<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class NewsTable extends Seeder
{
	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{
				// $max = 75;
				// for($i=0; $i < $max; $i++) {
				// 	$img = $i % 3;
				// 	if ($img === 0) {
				// 		$imgList = '["http://cande800.run-us-west2.goorm.io/imgTest/post1-1.jpg"]';
				// 	}else if ($img === 1) {
				// 		$imgList = '["https:\/\/images.unsplash.com\/photo-1584463057921-c7770fecc471?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80","https:\/\/images.unsplash.com\/photo-1584463057921-c7770fecc471?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80","https:\/\/images.unsplash.com\/photo-1584891753006-ae9c155dc59a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80","https:\/\/images.unsplash.com\/photo-1475778057357-d35f37fa89dd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"]';
				// 	}else if ($img === 2) {
				// 		$imgList = null;
				// 	}
					
				// 	DB::table('news_data')->insert([
				// 'new_title' => Str::random(10),
				// 'new_content' => "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
				// 'new_create_at' => now()->sub($max - $i, 'minutes'),
				// 		'new_img' => $imgList,
				// 'new_owner' => ($i % 2) === 0 ? 'reckersito' : 'reckersote',
				// ]);
				// }
	}
}
