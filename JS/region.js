import {fetchJson} from "./fetch.js";

const render = Symbol("render");
class Region {
	constructor(opts){
		if(!opts.container){
			throw "container is not exist";
		}
		if(!opts.name){
			throw "name is not exist";
		}else{
			this[render](opts);
		}
	}

	async [render](opts){
		let regionData = await fetchJson(url,{});
		regionData = regionData.data;

		const tpl = `<div class="wrapper">
						<select id="province"></select>
						<select id="city"></select>
						<select id="area"></select>
						<input id='result' type="hidden" name="${opts.name}"
							valid="${opts.present ? 'present' : ''}">
					</div>`
		opts.container.innerHTML = tpl;

		const $provinceSelect = $("province");
		const $citySelect  = $("city");
		const $areaSelect = $("area");
		const $result = $("result");

		let provinceSelect;
		let citySelect;
		let areaSelect;

		let provinceOptions = '<option></option>'

		for (let item of regionData){
			provinceOptions +=`<option value ="${item.id}">${item.name}</option>`;
		}
		$provinceSelect.innerHTML=provinceOptions;

		const provinceChange = () => {
			const i = parseInt($provinceSelect.value);
			const citys = regionData[i-1].city;
			let cityOptions = "";
			provinceSelect = i;
			for (let item of citys){
				cityOptions +=`<option value ="${item.id}">${item.name}</option>`;
			}
			$citySelect.innerhTML = cityOptions;

		}

		const provinceChange = () => {
			let areas = regionData[provinceSelect -1].city.
			filter((item) => {
				return item.id == parseInt($citySelect.value);				
			})[0].district;

			let areaOptions = "";
			citySelect = parseInt($citySelect.value);
			for (let item of areas){
				areaOptions +=`<option value ="${item.id}">${item.name}</option>`;
			}
			$areaSelect.innerhTML = areaOptions;
		}

		const areaChange = () => {
			areaSelect = parseInt($areaSelect.value);
			$result.value = provinceSelect +"," + citySelect +","+
			areaSelect;
		}
	}
}

export default Region;