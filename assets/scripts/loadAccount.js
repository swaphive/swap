const ssc = new SSC('https://api.hive-engine.com/rpc/');

var DECIMAL = 1000;

window.onload = async function() {
    hiveAccDetails(); 
    swapHiveAccDetails();
    hideSwapButtons();        
};

async function swapHiveAccDetails () {
    try
    {
        let swapHiveData = await ssc.findOne('tokens', 'balances', {'account': 'hiveupme', 'symbol': 'SWAP.HIVE'});
        if(swapHiveData != null)
        {        
            var swapHiveBalance = parseFloat(swapHiveData.balance) || 0.0;
            swapHiveBalance = Math.floor(swapHiveBalance * DECIMAL) / DECIMAL;
            document.getElementById("swaphiveDetails").innerHTML = swapHiveBalance;
        }
        else
        {
            document.getElementById("swaphiveDetails").innerHTML = 0.0;
        }
    }
    catch(error)
    {
        console.log("Error at swapHiveAccDetails() : ", error);
    }
};

async function hiveAccDetails () {
    try 
    {
        let hiveData = await hive.api.callAsync('condenser_api.get_accounts', [['hiveupme']]);
        if(hiveData.length > 0)
        {        
            var hiveBalance = parseFloat(hiveData[0].balance.replace("HIVE", "").trim()) || 0.0;
            document.getElementById("hiveDetails").innerHTML = hiveBalance;
        }
        else
        {
            document.getElementById("hiveDetails").innerHTML = 0.0;
        }
    } 
    catch (error) 
    {
        console.log("Error at hiveAccDetails() : ", error);
    }
}

async function refreshBalances()
{
    try 
    {
        hiveAccDetails();
        swapHiveAccDetails();
    } 
    catch (error) 
    {
        console.log("Error at refreshBalances() : ", error);
    }
}

async function hideSwapButtons() 
{
    try 
    {
        document.getElementById("hiveSwapProcess").disabled = true;
        document.getElementById("swaphiveSwapProcess").disabled = true;
        document.getElementById("vaultSwapProcess").disabled = true;
    } 
    catch (error) 
    {
        console.log("Error at hideSwapButtons() : ", error);
    }
}

