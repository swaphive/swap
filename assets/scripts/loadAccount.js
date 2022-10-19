const ssc = new SSC('https://ha.herpc.dtools.dev');

var DECIMAL = 1000;
var rewardSplitPercentage = 15;
var feePercentage = 0.001;
var rewardPercentage = 0.00075;

var rpc_nodes = [
    "https://api.deathwing.me",
    "https://hive.roelandp.nl",
    "https://api.openhive.network",
    "https://rpc.ausbit.dev",
    "https://hived.emre.sh",
    "https://hive-api.arcange.eu",
    "https://api.hive.blog",
    "https://api.c0ff33a.uk",
    "https://rpc.ecency.com",
    "https://anyx.io",
    "https://techcoderx.com",
    "https://hived.privex.io",
    "https://api.followbtcnews.com/",
    "https://api.hive.blue"
];

window.onload = async function() {
    hive.api.setOptions({ url: 'https://anyx.io' });
    hive.config.set('alternative_api_endpoints', rpc_nodes);
    
    loadAccountName();   
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
        let swapHiveData = await ssc.findOne('tokens', 'balances', {'account': 'uswap', 'symbol': 'SWAP.HIVE'});
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
        let hiveData = await hive.api.callAsync('condenser_api.get_accounts', [['uswap']]);
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
        document.getElementById("vaultHiveSwapProcess").disabled = true;
        document.getElementById("vaultSwapHiveSwapProcess").disabled = true;
    } 
    catch (error) 
    {
        console.log("Error at hideSwapButtons() : ", error);
    }
}

// Trying To Keep HIVE Username After Page Refresh
async function loadAccountName()
{
    try
    {
        document.getElementById("getHiveUserName").value = await getSavedUserName("getHiveUserName");
    }
    catch(error)
    {
        console.log("Error at loadAccountName() : ", error);
    }
}

async function saveUserName(e)
{
    try 
    {
        var id = e.id;  // get the sender's id to save it . 
        var val = e.value; // get the value.
        localStorage.setItem(id, val);// Every time user writing something, the localStorage's value will override .
    } 
    catch (error) 
    {
        console.log("Error at saveUserName() : ", error);
    }
}

async function getSavedUserName(v)
{
    try 
    {
        if (!localStorage.getItem(v)) 
        {
            return "";
        }
        return localStorage.getItem(v);
    } 
    catch (error) 
    {
        console.log("Error at getSavedUserName() : ", error);
    }    
}
