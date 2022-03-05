var MINTOKEN = 1.0;
var TIMEOUT = 15000;
var REFRESHTIMEOUT = 10000;

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
};

async function refreshAccountData() {
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
        console.log("Error at refreshAccountData() : ", error);
    }
}

async function hiveAsyncSwapProcessInitiate()
{
    try
    {       
        $('.hiveSwapProcessClass').addClass('loading');
        setTimeout(function () { 
            $('.hiveSwapProcessClass').removeClass('loading');
        }, REFRESHTIMEOUT);

        var hiveBalance = 0.0;
        var swapTo = "hiveupme";
        var swapSymbol = "HIVE";
        var swapUsername = document.getElementById("getHiveUserName").value.toLowerCase().trim();
        var swapAmount = document.getElementById("goHive").value;
        swapAmount = parseFloat(swapAmount) || 0.0;
        swapAmount = Math.floor(swapAmount * DECIMAL) / DECIMAL; 
        swapAmount = parseFloat(swapAmount) || 0.0;      
        
        var swapMemo = "Swapping To Swap.Hive";

        await timeout(REFRESHTIMEOUT);
        let hiveData = await hive.api.callAsync('condenser_api.get_accounts', [[swapUsername]]);
        if(hiveData.length > 0)
        {        
            hiveBalance = parseFloat(hiveData[0].balance.replace(swapSymbol, "").trim()) || 0.0;
            if(hiveBalance >= swapAmount && swapAmount >= MINTOKEN)
            {
                let swapHiveData = await ssc.findOne('tokens', 'balances', {'account': swapTo, 'symbol': 'SWAP.HIVE'});
                if(swapHiveData != null)
                {        
                    var swapHiveBalance = parseFloat(swapHiveData.balance) || 0.0;
                    swapHiveBalance = Math.floor(swapHiveBalance * DECIMAL) / DECIMAL;
                    swapHiveBalance = parseFloat(swapHiveBalance) || 0.0; 

                    if(swapHiveBalance >= swapAmount)
                    {
                        swapAmount = swapAmount.toFixed(3);
                        var myFuncAsync = (swapUsername, swapTo, swapAmount, swapMemo, swapSymbol) => {
                            return new Promise((resolve, reject) => {
                                hive_keychain.requestTransfer(swapUsername, swapTo, swapAmount, swapMemo, swapSymbol, (result, error) => {                    
                                    if (error) reject(new Error(error))
                                    resolve(result)
                                });
                            });
                        }

                        var asyncData = await myFuncAsync(swapUsername, swapTo, swapAmount, swapMemo, swapSymbol);
                        if(asyncData["success"] == true)
                        {
                            var successString = "You sent : " + swapAmount + " " + swapSymbol + " to : @" + swapTo + " successfully...!!!";                
                            document.getElementById("hiveTransferMsg").innerHTML = successString;                            
                            document.getElementById("hiveSwapProcess").disabled = true;
                            await timeout(TIMEOUT);
                            document.getElementById("goHive").value = "";
  	                        document.getElementById("goHive").placeholder = "Swap Amount...";
                            await refreshAccountData();
                        }
                        else
                        {
                            var failString = "Token swap process failed, please try again...!!!";
                            document.getElementById("hiveTransferMsg").innerHTML = failString;                            
                            document.getElementById("hiveSwapProcess").disabled = true;
                            await timeout(TIMEOUT);
                            await refreshAccountData();
                        }
                    }
                    else
                    {
                        var failString = "Token swap process failed, please try again...!!!";
                        document.getElementById("hiveTransferMsg").innerHTML = failString;                            
                        document.getElementById("hiveSwapProcess").disabled = true;
                        await timeout(TIMEOUT);
                        await refreshAccountData();
                    }
                }
                else
                {
                    var failString = "Token swap process failed, please try again...!!!";
                    document.getElementById("hiveTransferMsg").innerHTML = failString;                            
                    document.getElementById("hiveSwapProcess").disabled = true;
                    await timeout(TIMEOUT);
                    await refreshAccountData();
                }
            }
            else
            {
                var failString = "Token swap process failed, please try again...!!!";
                document.getElementById("hiveTransferMsg").innerHTML = failString;                            
                document.getElementById("hiveSwapProcess").disabled = true;
                await timeout(TIMEOUT);
                await refreshAccountData();
            }            
        }
        else
        {
            var failString = "Token swap process failed, please try again...!!!";
            document.getElementById("hiveTransferMsg").innerHTML = failString;                            
            document.getElementById("hiveSwapProcess").disabled = true;
            await timeout(TIMEOUT);
            await refreshAccountData();
        }
    }
    catch(error)
    {
        console.log("Error at hiveAsyncSwapProcessInitiate() : ", error);
    }
}

async function swaphiveAsyncSwapProcessInitiate()
{
    try
    {
        $('.swaphiveSwapProcessClass').addClass('loading');
        setTimeout(function () { 
            $('.swaphiveSwapProcessClass').removeClass('loading');
        }, REFRESHTIMEOUT);

        var swapHiveBalance = 0.0;
        var swapTo = "hiveupme";
        var swapSymbol = "SWAP.HIVE";
        var swapUsername = document.getElementById("getHiveUserName").value.toLowerCase().trim();
        var swapAmount = document.getElementById("goSwapHive").value;
        swapAmount = parseFloat(swapAmount) || 0.0;
        swapAmount = Math.floor(swapAmount * DECIMAL) / DECIMAL; 
        swapAmount = parseFloat(swapAmount) || 0.0;      
        
        var swapMemo = "Swapping To Hive";

        await timeout(REFRESHTIMEOUT);
        let swapHiveData = await ssc.findOne('tokens', 'balances', {'account': swapUsername, 'symbol': swapSymbol});
        if(swapHiveData != null)
        {        
            swapHiveBalance = parseFloat(swapHiveData.balance) || 0.0;
            swapHiveBalance = Math.floor(swapHiveBalance * DECIMAL) / DECIMAL;
            swapHiveBalance = parseFloat(swapHiveBalance) || 0.0;
            if(swapHiveBalance >= swapAmount && swapAmount >= MINTOKEN)
            {
                let hiveData = await hive.api.callAsync('condenser_api.get_accounts', [[swapTo]]);
                if(hiveData.length > 0)
                {        
                    hiveBalance = parseFloat(hiveData[0].balance.replace("HIVE", "").trim()) || 0.0;
                    if(hiveBalance >= swapAmount)
                    {
                        swapAmount = swapAmount.toFixed(3);
                        var myFuncAsync = (swapUsername, swapTo, swapAmount, swapMemo, swapSymbol) => {
                            return new Promise((resolve, reject) => {
                                hive_keychain.requestCustomJson(swapUsername, "ssc-mainnet-hive", "Active", JSON.stringify({"contractName":"tokens", "contractAction":"transfer", "contractPayload":{"to":swapTo, "symbol":swapSymbol, "quantity":swapAmount, "memo": swapMemo}}), "Send Tokens", (result, error) => {                    
                                    if (error) reject(new Error(error))
                                    resolve(result)
                                });
                            });
                        }

                        var asyncData = await myFuncAsync(swapUsername, swapTo, swapAmount, swapMemo, swapSymbol);
                        if(asyncData["success"] == true)
                        {
                            var successString = "You sent : " + swapAmount + " " + swapSymbol + " to : @" + swapTo + " successfully...!!!";
                            document.getElementById("swaphiveTransferMsg").innerHTML = successString;                           
                            document.getElementById("swaphiveSwapProcess").disabled = true;
                            await timeout(TIMEOUT);
                            document.getElementById("goSwapHive").value = "";
                            document.getElementById("goSwapHive").placeholder = "Swap Amount...";
                            await refreshAccountData();
                        }
                        else
                        {
                            var failString = "Token swap process failed, please try again...!!!";
                            document.getElementById("swaphiveTransferMsg").innerHTML = failString;                            
                            document.getElementById("swaphiveSwapProcess").disabled = true;
                            await timeout(TIMEOUT);
                            await refreshAccountData();
                        }
                    }
                    else
                    {
                        var failString = "Token swap process failed, please try again...!!!";
                        document.getElementById("swaphiveTransferMsg").innerHTML = failString;                            
                        document.getElementById("swaphiveSwapProcess").disabled = true;
                        await timeout(TIMEOUT);
                        await refreshAccountData();
                    }
                }
                else
                {
                    var failString = "Token swap process failed, please try again...!!!";
                    document.getElementById("swaphiveTransferMsg").innerHTML = failString;                            
                    document.getElementById("swaphiveSwapProcess").disabled = true;
                    await timeout(TIMEOUT);
                    await refreshAccountData();
                }
            }
            else
            {
                var failString = "Token swap process failed, please try again...!!!";
                document.getElementById("swaphiveTransferMsg").innerHTML = failString;                            
                document.getElementById("swaphiveSwapProcess").disabled = true;
                await timeout(TIMEOUT);
                await refreshAccountData();
            }            
        }
        else
        {
            var failString = "Token swap process failed, please try again...!!!";
            document.getElementById("swaphiveTransferMsg").innerHTML = failString;                            
            document.getElementById("swaphiveSwapProcess").disabled = true;
            await timeout(TIMEOUT);
            await refreshAccountData();
        }
    }
    catch(error)
    {
        console.log("Error at swaphiveAsyncSwapProcessInitiate() : ", error);
    }
}

async function vaultAsyncSwapProcessInitiate()
{
    try
    {
        $('.vaultSwapProcessClass').addClass('loading');
        setTimeout(function () { 
            $('.vaultSwapProcessClass').removeClass('loading');
        }, REFRESHTIMEOUT);

        var ratio = 10;
        var swapHiveBalance = 0.0;
        var swapTo = "hiveupme";
        var swapSymbol = "VAULT";
        var swapUsername = document.getElementById("getHiveUserName").value.toLowerCase().trim();
        var swapAmount = document.getElementById("goVault").value;
        swapAmount = parseFloat(swapAmount) || 0.0;
        swapAmount = Math.floor(swapAmount * DECIMAL) / DECIMAL; 
        swapAmount = parseFloat(swapAmount) || 0.0;      
        
        var swapMemo = "Swapping To Hive";
        
        await timeout(REFRESHTIMEOUT);
        let swapHiveData = await ssc.findOne('tokens', 'balances', {'account': swapUsername, 'symbol': swapSymbol});
        if(swapHiveData != null)
        {        
            swapHiveBalance = parseFloat(swapHiveData.balance) || 0.0;
            swapHiveBalance = Math.floor(swapHiveBalance * DECIMAL) / DECIMAL;
            swapHiveBalance = parseFloat(swapHiveBalance) || 0.0;
            if(swapHiveBalance >= swapAmount && swapAmount >= MINTOKEN)
            {
                let hiveData = await hive.api.callAsync('condenser_api.get_accounts', [[swapTo]]);
                if(hiveData.length > 0)
                {        
                    hiveBalance = parseFloat(hiveData[0].balance.replace("HIVE", "").trim()) || 0.0;
                    hiveBalance = hiveBalance * ratio;
                    if(hiveBalance >= swapAmount)
                    {
                        swapAmount = swapAmount.toFixed(3);
                        var myFuncAsync = (swapUsername, swapTo, swapAmount, swapMemo, swapSymbol) => {
                            return new Promise((resolve, reject) => {
                                hive_keychain.requestCustomJson(swapUsername, "ssc-mainnet-hive", "Active", JSON.stringify({"contractName":"tokens", "contractAction":"transfer", "contractPayload":{"to":swapTo, "symbol":swapSymbol, "quantity":swapAmount, "memo": swapMemo}}), "Send Tokens", (result, error) => {                    
                                    if (error) reject(new Error(error))
                                    resolve(result)
                                });
                            });
                        }

                        var asyncData = await myFuncAsync(swapUsername, swapTo, swapAmount, swapMemo, swapSymbol);
                        if(asyncData["success"] == true)
                        {
                            var successString = "You sent : " + swapAmount + " " + swapSymbol + " to : @" + swapTo + " successfully...!!!";
                            document.getElementById("vaultTransferMsg").innerHTML = successString;                           
                            document.getElementById("vaultSwapProcess").disabled = true;
                            await timeout(TIMEOUT);
                            document.getElementById("goVault").value = "";
                            document.getElementById("goVault").placeholder = "Swap Amount...";
                            await refreshAccountData();
                        }
                        else
                        {
                            var failString = "Token swap process failed, please try again...!!!";
                            document.getElementById("vaultTransferMsg").innerHTML = failString;                            
                            document.getElementById("vaultSwapProcess").disabled = true;
                            await timeout(TIMEOUT);
                            await refreshAccountData();
                        }
                    }
                    else
                    {
                        var failString = "Token swap process failed, please try again...!!!";
                        document.getElementById("vaultTransferMsg").innerHTML = failString;                            
                        document.getElementById("vaultSwapProcess").disabled = true;
                        await timeout(TIMEOUT);
                        await refreshAccountData();
                    }
                }
                else
                {
                    var failString = "Token swap process failed, please try again...!!!";
                    document.getElementById("vaultTransferMsg").innerHTML = failString;                            
                    document.getElementById("vaultSwapProcess").disabled = true;
                    await timeout(TIMEOUT);
                    await refreshAccountData();
                }
            }
            else
            {
                var failString = "Token swap process failed, please try again...!!!";
                document.getElementById("vaultTransferMsg").innerHTML = failString;                            
                document.getElementById("vaultSwapProcess").disabled = true;
                await timeout(TIMEOUT);
                await refreshAccountData();
            }            
        }
        else
        {
            var failString = "Token swap process failed, please try again...!!!";
            document.getElementById("vaultTransferMsg").innerHTML = failString;                            
            document.getElementById("vaultSwapProcess").disabled = true;
            await timeout(TIMEOUT);
            await refreshAccountData();
        }
    }
    catch(error)
    {
        console.log("Error at vaultAsyncSwapProcessInitiate() : ", error);
    }
}

$('.btn').on('click', function() {
    var $this = $(this);
  $this.button('loading');
    setTimeout(function() {
       $this.button('reset');
   }, 8000);
});


/*
function hiveSwapProcessInitiate()
{
    try
    {
        var swapTo = "hiveupme";
        var swapSymbol = "HIVE";
        var swapUsername = document.getElementById("getHiveUserName").value.toLowerCase();
        var swapAmount = document.getElementById("goHive").value;
        swapAmount = parseFloat(swapAmount) || 0.0;
        swapAmount = Math.floor(swapAmount * DECIMAL) / DECIMAL;        
        swapAmount = swapAmount.toFixed(3);
        var swapMemo = "Swapping To Swap.Hive";
        
        hive_keychain.requestTransfer(swapUsername, swapTo, swapAmount, swapMemo, swapSymbol, function(response) 
        {
            if (response["success"] == true) 
            {
                var successString = "You sent : " + swapAmount + " " + swapSymbol + " to : @" + swapTo + " successfully...!!!";                
                document.getElementById("hiveTransferMsg").innerHTML = successString;
                
                document.getElementById("hiveSwapProcess").disabled = true;
            } 
            else 
            {
                var failString = "Token swap process failed, please try again...!!!";
                document.getElementById("hiveTransferMsg").innerHTML = failString;
                refreshUserData();
                document.getElementById("hiveSwapProcess").disabled = true;               
            }
        }, false);
    }
    catch(error)
    {
        console.log("Error at hiveSwapProcessInitiate() : ", error);
    }
}

function swaphiveSwapProcessInitiate()
{
    try
    {
        var swapTo = "hiveupme";
        var tokenSymbol = "SWAP.HIVE";
        var swapUsername = document.getElementById("getHiveUserName").value.toLowerCase();
        var swapAmount = document.getElementById("goSwapHive").value;
        swapAmount = parseFloat(swapAmount) || 0.0;
        swapAmount = Math.floor(swapAmount * DECIMAL) / DECIMAL;        
        swapAmount = swapAmount.toFixed(3);
        var swapMemo = "Swapping To Hive";

        hive_keychain.requestCustomJson(swapUsername, "ssc-mainnet-hive", "Active", JSON.stringify({"contractName":"tokens", "contractAction":"transfer", "contractPayload":{"to":swapTo, "symbol":tokenSymbol, "quantity":swapAmount, "memo": swapMemo}}), "Send Tokens", function(response) 
        {
            if (response["success"] == true) 
            {
                var successString = "You sent : " + swapAmount + " " + tokenSymbol + " to : @" + swapTo + " successfully...!!!";
                document.getElementById("swaphiveTransferMsg").innerHTML = successString;
                refreshUserData();
                document.getElementById("swaphiveSwapProcess").disabled = true;
            } 
            else 
            {
                var failString = "Token swap process failed, please try again...!!!";
                document.getElementById("hiveTransferMsg").innerHTML = failString;
                refreshUserData();
                document.getElementById("swaphiveSwapProcess").disabled = true;   
            }
        }, false);
    }
    catch(error)
    {
        console.log("Error at swaphiveSwapProcessInitiate() : ", error);
    }
}

function vaultSwapProcessInitiate()
{
    try
    {
        var swapTo = "hiveupme";
        var tokenSymbol = "VAULT";
        var swapUsername = document.getElementById("getHiveUserName").value.toLowerCase();
        var swapAmount = document.getElementById("goVault").value;
        swapAmount = parseFloat(swapAmount) || 0.0;
        swapAmount = Math.floor(swapAmount * DECIMAL) / DECIMAL;        
        swapAmount = swapAmount.toFixed(3);
        var swapMemo = "Swapping To Hive";

        hive_keychain.requestCustomJson(swapUsername, "ssc-mainnet-hive", "Active", JSON.stringify({"contractName":"tokens", "contractAction":"transfer", "contractPayload":{"to":swapTo, "symbol":tokenSymbol, "quantity":swapAmount, "memo": swapMemo}}), "Send Tokens", function(response) 
        {
            if (response["success"] == true) 
            {
                var successString = "You sent : " + swapAmount + " " + tokenSymbol + " to : @" + swapTo + " successfully...!!!";
                document.getElementById("vaultTransferMsg").innerHTML = successString;
                refreshUserData();
                document.getElementById("vaultSwapProcess").disabled = true;                            
            } 
            else 
            {
                var failString = "Token swap process failed, please try again...!!!";
                document.getElementById("vaultTransferMsg").innerHTML = failString;  
                refreshUserData();             
                document.getElementById("vaultSwapProcess").disabled = true;                     
            }
        }, false);
    }
    catch(error)
    {
        console.log("Error at vaultSwapProcessInitiate() : ", error);
    }
}
*/
