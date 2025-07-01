const dropdowns = document.querySelectorAll("#dropdown select");
const btn = document.querySelector("form button");
let fromcurr = document.querySelector("#from select");
let tocurr = document.querySelector("#to select");
let message = document.querySelector("#msg");
for (let select of dropdowns) {
    for (let currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name == "from" && currCode == "USD") newOption.selected = "selected";
        else if (select.name == 'to' && currCode == "INR") newOption.selected = "selected";
        select.append(newOption);
        select.addEventListener("change", (evt) => {
            updateFlag(evt.target);
        });
    }
};
const calculateRate = async (evt)=>{
    evt.preventDefault();
    let amount = document.querySelector("form #cur1");
    if (amount.value == "" || amount.value < "1") {
        amount.value = "1";
    }
    let url = `https://api.frankfurter.app/latest?amount=${amount.value}&from=${fromcurr.value}&to=${tocurr.value}`;
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
    let rate = data.rates[tocurr.value];
    message.innerText = `${amount.value} ${fromcurr.value} = ${rate} ${tocurr.value}`;
}
const updateFlag = (element) => {
    let currCode = element.value;
    let countrycode = countryList[currCode];
    let source = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let image = element.parentElement.querySelector("img");
    image.src = source;

};

btn.addEventListener("click", (evt) => {
    calculateRate(evt);
});
addEventListener("load",(evt)=>{
    calculateRate(evt);
});