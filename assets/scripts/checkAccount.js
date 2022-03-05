var VAULTDECIMAL = 100;

async function checkSwapHiveAccDetails () {
    try
    {
        var swapUserName = document.getElementById("getHiveUserName").value.toLowerCase().trim();
        let swapHiveData = await ssc.findOne('tokens', 'balances', {'account': swapUserName, 'symbol': 'SWAP.HIVE'});
        if(swapHiveData != null)
        {        
            var swapHiveBalance = parseFloat(swapHiveData.balance) || 0.0;
            swapHiveBalance = Math.floor(swapHiveBalance * DECIMAL) / DECIMAL;
            document.getElementById("checkSwapHiveDetails").innerHTML = swapHiveBalance;
        }
        else
        {
            document.getElementById("checkSwapHiveDetails").innerHTML = 0.0;
        }
    }
    catch(error)
    {
        console.log("Error at checkSwapHiveAccDetails() : ", error);
    }
};

async function checkHiveAccDetails () {
    try 
    {
        var swapUserName = document.getElementById("getHiveUserName").value.toLowerCase().trim();
        let hiveData = await hive.api.callAsync('condenser_api.get_accounts', [[swapUserName]]);
        if(hiveData.length > 0)
        {        
            var hiveBalance = parseFloat(hiveData[0].balance.replace("HIVE", "").trim()) || 0.0;
            document.getElementById("checkHiveDetails").innerHTML = hiveBalance;
        }
        else
        {
            document.getElementById("checkHiveDetails").innerHTML = 0.0;
        }
    } 
    catch (error) 
    {
        console.log("Error at checkHiveAccDetails() : ", error);
    }
}

async function checkVaultAccDetails () {
    try
    {
        var swapUserName = document.getElementById("getHiveUserName").value.toLowerCase().trim();
        let swapHiveData = await ssc.findOne('tokens', 'balances', {'account': swapUserName, 'symbol': 'VAULT'});
        if(swapHiveData != null)
        {        
            var swapHiveBalance = parseFloat(swapHiveData.balance) || 0.0;
            swapHiveBalance = Math.floor(swapHiveBalance * VAULTDECIMAL) / VAULTDECIMAL;
            document.getElementById("checkVaultDetails").innerHTML = swapHiveBalance;
        }
        else
        {
            document.getElementById("checkVaultDetails").innerHTML = 0.0;
        }
    }
    catch(error)
    {
        console.log("Error at checkVaultAccDetails() : ", error);
    }
};

async function checkUserNameFieldIsEmpty () {
    try
    {
        await setTextChecking();       
        var getNameValue = document.getElementById("getHiveUserName").value;
        if (getNameValue == "" || getNameValue == null) 
        {
            alert("Please Add Your HIVE Username");            
        }
        else
        {
            await checkSwapHiveAccDetails();
            await checkHiveAccDetails();
            await checkVaultAccDetails();
        }
       await setTextCheckBalance();
    }
    catch (error)
    {
        console.log("Error at checkUserNameFieldIsEmpty() : ", error);
    }
}

async function setTextChecking () {
    try
    {
        document.getElementById("getButtonUserName").innerHTML = "Checking..."; 
    }
    catch (error)
    {
        console.log("Error at setTextChecking() : ", error);
    }
}

async function setTextCheckBalance () {
    try
    {
        document.getElementById("getButtonUserName").innerHTML = "Check Balance"; 
    }
    catch (error)
    {
        console.log("Error at setTextCheckBalance() : ", error);
    }
}

function refreshUserData() {
    try 
    {
        var getNameValue = document.getElementById("getHiveUserName").value;
        if (getNameValue != "" || getNameValue != null) 
        {
            checkSwapHiveAccDetails();
            checkHiveAccDetails();
            checkVaultAccDetails();
        }
    } 
    catch (error) 
    {
        console.log("Error at refreshUserData() : ", error);
    }
}

async function refreshAccountBalances() 
{
    try 
    {
        var getNameValue = document.getElementById("getHiveUserName").value;
        if (getNameValue != "" || getNameValue != null) 
        {
            checkSwapHiveAccDetails();
            checkHiveAccDetails();
            checkVaultAccDetails();
        }
    } 
    catch (error) 
    {
        console.log("Error at refreshAccountBalances() : ", error);
    }    
}

function awaitAccountBalanceFunction () 
{
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve();
        }, 1000);
    });
};
  
const intervalAccountBalances = async function () 
{
    const _await = await awaitAccountBalanceFunction();    
    await refreshAccountBalances();
    setTimeout(intervalAccountBalances, 1000 * 60);
};  

intervalAccountBalances();