"use client";

import React from 'react'
import Image from 'next/image'
import g1 from '../public/assets/graph1.svg'
import g2 from '../public/assets/graph2.svg'
import g3 from '../public/assets/graph3.svg'
import { useState } from 'react'

const Home = () => {
	const [website, setWebSite] = useState("")
	const [data, setData] = useState<any[]>()

	const fetchDataForSEO = async () => {
		const api_url = 'https://api.dataforseo.com/v3/on_page/task_post'
		const api_password = "102457b16082174a"
		const api_login = "ayusd2ld@gmail.com"

		var web = (document.getElementById("inp") as HTMLInputElement).value
		setWebSite(web)
		console.log(web)

		const post_array = [];

		post_array.push({
		"target": web,
		"max_crawl_pages": 1,
		"load_resources": true,
		"enable_javascript": true,
		"enable_browser_rendering":true,
		"custom_js": "meta = {}; meta.url = document.URL; meta;",
		});

		const axios = require('axios');

		axios({
		method: 'post',
		url: 'https://api.dataforseo.com/v3/on_page/task_post',
		auth: {
			username: api_login,
			password: api_password
		},
		data: post_array,
		headers: {
			'content-type': 'application/json'
		}
		}).then(function (response: any) {
		var result = response['data']['tasks'];
		// Result data
		console.log(result);
		setData(result)
		}).catch(function (error : any) {
		console.log(error);
		});
	}
	

	return (
		<>
    	<header className="bg-stone-100 flex items-center justify-between mx-auto">
			<section>
				<section className="py-16 px-2 text-5xl font-semibold text-gray-700">
					<span className='text-6xl text-gradient tracking-wider'>SEO</span><br/> 
					<div>AUDIT TOOL</div>
					<div className="text-lg font-normal">
						Identify website issues with every page on your site.
					</div>
				</section>

				<section className='pb-20 px-2'>
					<form className='flex flex-wrap gap-2' method='post'>
						<input type='text' id="inp" className='px-2 w-80 h-16 shadow-md rounded-md' placeholder='Enter Your Website'/>
						<input type='button' 
							   value='CHECK'
							   onClick={()=>fetchDataForSEO()} 
							   className='py-5 w-32 h-16 font-semibold text-white shadow-md bg-gray-700 rounded-md hover:bg-gray-600'/>
					</form>
				</section>
			</section>
			<section className='hidden md:mr-20 md:flex md:gap-16 md:items-center'>
				<Image src={g1} alt="" className='w-32 h-32'/>
				<div className='flex flex-col gap-8'>
					<Image src={g2} alt="" className='w-32 h-32'/>
					<Image src={g3} alt="" className='w-32 h-32'/>
				</div>
			</section>
    	</header>
		<section className='py-10 px-2 bg-stone-100 mx-auto'>
			{ data &&
				<>
				<div className='text-3xl text-gray-800 py-5'>
					REPORT
				</div>
				<ul className='text-xl tracking-wider flex flex-col gap-2'>
					<li>Target : {data[0].data.target}</li>
					<li>Status Code : {data[0].status_code}</li>
					<li>Status Message : {data[0].status_message}</li>
					<li>Result Count : {data[0].result_count}</li>
					<li>Time : {data[0].time}</li>
					<li>Cost : {data[0].cost}</li>
					<li>ID : {data[0].id}</li>
				</ul>
				</>
			}
		</section>
		</>
  	)
}

export default Home
