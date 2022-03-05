const ssc = new SSC('https://api.hive-engine.com/rpc/');

var DECIMAL = 1000;
var rewardSplitPercentage = 25;
var feePercentage = 0.001;
var rewardPercentage = 0.00075;

window.onload = async function() {    
    loadRewardPercentages();
    hiveAccDetails(); 
    swapHiveAccDetails();
    hideSwapButtons();        
};

async function loadRewardPercentages() {
    try
    {
        document.getElementById("rewardSplitId").innerHTML = rewardSplitPercentage;
        var setRewardPercentage = rewardPercentage * 100;
        document.getElementById("rewardPercentageId").innerHTML = setRewardPercentage;
    }
    catch (error)
    {
        console.log("Error at loadRewardPercentages() : ", error);
    }
}

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
        await setTextRefreshing();
        await hiveAccDetails();
        await swapHiveAccDetails();
        await setTextRefreshBalance();
    } 
    catch (error) 
    {
        console.log("Error at refreshBalances() : ", error);
    }
}

async function setTextRefreshing () {
    try
    {
        document.getElementById("refreshBalanceId").innerHTML = "Refreshing..."; 
    }
    catch (error)
    {
        console.log("Error at setTextRefreshing() : ", error);
    }
}

async function setTextRefreshBalance () {
    try
    {
        document.getElementById("refreshBalanceId").innerHTML = "Refresh"; 
    }
    catch (error)
    {
        console.log("Error at setTextRefreshBalance() : ", error);
    }
}

function awaitFunction () 
{
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve();
        }, 1000);
    });
};
  
const intervalBalances = async function () 
{
    const _await = await awaitFunction();    
    await intervalRefreshBalances();
    setTimeout(intervalBalances, 1000 * 60);
};  

async function intervalRefreshBalances()
{
    try 
    {
        hiveAccDetails();
        swapHiveAccDetails();
    } 
    catch (error) 
    {
        console.log("Error at intervalRefreshBalances() : ", error);
    }
}

intervalBalances();

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

