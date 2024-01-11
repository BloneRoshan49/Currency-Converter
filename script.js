const fromCurrencySelect = document.getElementById("fromCurrency");
const toCurrencySelect = document.getElementById("toCurrency");
const amount = document.getElementById("amount");
let resultBox = document.getElementById("result");




fetch("https://open.er-api.com/v6/latest")
.then((response)=>
response.json()
).then((data)=>{
    let currencies = Object.keys(data.rates);

    currencies.forEach((currency)=>{
        const option1 = document.createElement("option");
        const option2 = document.createElement("option");

        option1.value = currency;
        option1.text = currency;

        option2.value = currency;
        option2.text = currency;


        fromCurrencySelect.add(option1)
        toCurrencySelect.add(option2)
    })
    
}).catch((err)=>{
    console.log(err);
});


function convertCurrency(){

const fromCurrency = document.getElementById("fromCurrency").value;
const toCurrency = document.getElementById("toCurrency").value;


    fetch("https://open.er-api.com/v6/latest")
    .then(response => response.json()).then((data)=>{
        const exchangeRate = data.rates[toCurrency] / data.rates[fromCurrency]
        const convertAmount = (amount.value * exchangeRate).toFixed(2);

        if (amount.value == "") {
            resultBox.value = ""
        }else{
            resultBox.value = `${amount.value} ${fromCurrency} : ${convertAmount} ${toCurrency}`;
        }

    }).catch((err)=>{
        console.log(err);
    })
}


convertCurrency();

fromCurrencySelect.addEventListener("change", function(){
    convertCurrency();
});
toCurrencySelect.addEventListener("change", function(){
    convertCurrency();
});

amount.addEventListener('input', ()=>{
    convertCurrency();
})