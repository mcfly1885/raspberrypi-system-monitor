async function getData(url){
    try{
        const response = await fetch(url);
        if(!response.ok){
            throw new Error("an error occurred: " + response.status);
        }
        const data = await response.json();
        document.getElementById("error").style.display = 'none';
        document.getElementById("uptime").innerText=data.uptime;
        document.getElementById("uptimesince").innerText=data.uptimesince;
        //---------------CPU---------------------------------------------//
        document.getElementById("temp").innerText=data.temp+"°C";
        document.getElementById("freq").innerText=data.freq+"Mhz";
        document.getElementById("cputemp").setAttribute('value', data.temp);
        document.getElementById("cpuclock").setAttribute('value', data.freq);
        //---------------MEMORY------------------------------------------//
        document.getElementById("ram").setAttribute('value', data.used);
        document.getElementById("ram").setAttribute('max', data.memtotal);
        document.getElementById("memused").innerText=data.used+"Mb";
        document.getElementById("memfree").innerText=data.free+"Mb";
        document.getElementById("memtot").innerText=data.memtotal+"Mb";
        //Swap--//
        document.getElementById("swapmeter").setAttribute('value', data.swapused);
        document.getElementById("swapmeter").setAttribute('max', data.swap);
        document.getElementById("swapused").innerText=data.swapused+"Mb";
        document.getElementById("swap").innerText=data.swap+"Mb";
        //-------------------SD-----------------------------------------//
        document.getElementById("sdmeter").setAttribute('value', data.sdused);
        document.getElementById("sdmeter").setAttribute('max', data.sd);
        document.getElementById("sdused").innerText=data.sdused+"Gb";
        document.getElementById("sd").innerText=data.sd+"Gb";
    }
    catch(error){
        console.error(error);
        document.getElementById("error").style.display = 'flex';
        document.getElementById("error").innerText="ERROR: server unreachable ⚠️";
    }
}

const URL = "getData.php";

getData(URL);
setInterval(() => {getData(URL)}, 2000);


//init cards
document.getElementById("mem-card").style.display = 'none';
document.getElementById("stat-card").style.display = 'none';

//button event listeners
//CPU-TAB--------------------------------------------------------------------/
document.getElementById("cpu-btn").addEventListener('click', ()=>{
    document.getElementById("mem-card").style.display = 'none';
    document.getElementById("stat-card").style.display = 'none';
    document.getElementById("cpu-card").style.display = 'flex';

    document.getElementById("mem-btn").classList.remove("btn-active");
    document.getElementById("cpu-btn").classList.add("btn-active");
    document.getElementById("stat-btn").classList.remove("btn-active");

});


//MEMROY-TAB----------------------------------------------------------------/
document.getElementById("mem-btn").addEventListener('click', ()=>{
    document.getElementById("mem-card").style.display = 'flex';
    document.getElementById("stat-card").style.display = 'none';
    document.getElementById("cpu-card").style.display = 'none';

    document.getElementById("mem-btn").classList.add("btn-active");
    document.getElementById("cpu-btn").classList.remove("btn-active");
    document.getElementById("stat-btn").classList.remove("btn-active");

});
//STATISTICS--TAB-------------------------------------------------------------/
document.getElementById("stat-btn").addEventListener('click', ()=>{
    document.getElementById("mem-card").style.display = 'none';
    document.getElementById("stat-card").style.display = 'flex';
    document.getElementById("cpu-card").style.display = 'none';

    document.getElementById("mem-btn").classList.remove("btn-active");
    document.getElementById("cpu-btn").classList.remove("btn-active");
    document.getElementById("stat-btn").classList.add("btn-active");

});

