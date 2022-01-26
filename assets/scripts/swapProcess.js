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
        console.log("Error Here at hiveSwapProcessInitiate() : ", error);
    }
}