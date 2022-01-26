var DECIMAL = 1000;

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
                refreshUserData();
            } 
            else 
            {
                var failString = "Token swap process failed, please try again...!!!";
                document.getElementById("hiveTransferMsg").innerHTML = failString;
                refreshUserData();               
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
            } 
            else 
            {
                var failString = "Token swap process failed, please try again...!!!";
                document.getElementById("hiveTransferMsg").innerHTML = failString;
                refreshUserData();   
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
        console.log("swapAmount : ", swapAmount);
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
            } 
            else 
            {
                var failString = "Token swap process failed, please try again...!!!";
                document.getElementById("vaultTransferMsg").innerHTML = failString;
                refreshUserData();   
            }
        }, false);
    }
    catch(error)
    {
        console.log("Error at vaultSwapProcessInitiate() : ", error);
    }
}
