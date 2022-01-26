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
        
        hive_keychain.requestTransfer(swapUsername, swapTo, swapAmount, "Swapping To Swap.Hive", swapSymbol, function(response) 
        {
            if (response["success"] == true) 
            {
                var successString = "You Sent : " + swapAmount + " " + swapSymbol + " To : @" + swapTo + " Successfully...!!!";                
                document.getElementById("hiveTransferMsg").innerHTML = successString;
                refreshUserData();
            } 
            else 
            {
                var failString = "Token Swap Process Failed, Please Try Again...!!!";
                document.getElementById("swapKeyChainError").innerHTML = failString;
                refreshUserData();               
            }
        }, false);
    }
    catch(error)
    {
        console.log("Error Here at hiveSwapProcessInitiate() : ", error);
    }
}