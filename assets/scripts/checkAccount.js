var DECIMAL = 1000;
var VAULTDECIMAL = 100;

async function checkSwapHiveAccDetails () {
    try
    {
        var swapUserName = document.getElementById("getHiveUserName").value;
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
        var swapUserName = document.getElementById("getHiveUserName").value;
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
        var swapUserName = document.getElementById("getHiveUserName").value;
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
        var getNameValue = document.getElementById("getHiveUserName").value;
        if (getNameValue == "" || getNameValue == null) 
        {
            alert("Name must be filled out");            
        }
        else
        {
            checkSwapHiveAccDetails();
            checkHiveAccDetails();
            checkVaultAccDetails();
        }
    }
    catch (error)
    {
        console.log("Error at checkUserNameFieldIsEmpty() : ", error);
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
