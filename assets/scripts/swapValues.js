var DECIMAL = 1000;
var prevHiveValue = "";
var prevSwapHiveValue = "";
var prevVaultValue = "";

// Hive Swap Data
async function hiveSwapChange () {
    try
    {
        var changeValue = document.getElementById("goHive").value;
        validateHivePattern(changeValue);        
    }
    catch (error)
    {
        console.log("Error at hiveSwapChange() : ", error);
    }
}

async function validateHivePattern(price) {     
    var patt = /^(\d*)([.]\d{0,3})?$/;  
    var matchedString = price.match(patt);
    if (matchedString) 
    {        
        prevHiveValue = matchedString[1] + (matchedString[2] ? matchedString[2].replace(",", ".") : "");
        hiveSwapFee(prevHiveValue);
        enableHiveButton();       
    }
    else
    {
        document.getElementById("goHive").value = prevHiveValue;
        hiveSwapFee(prevHiveValue);
        enableHiveButton();
    }
}

async function onClickHive() {
    try 
    {
        var hiveBalance = document.getElementById("checkHiveDetails").innerHTML;
        if(hiveBalance != "NaN")
        {            
            document.getElementById("goHive").value = hiveBalance;
            prevHiveValue = hiveBalance;
            hiveSwapFee(prevHiveValue);
            enableHiveButton();
        }
    } 
    catch (error) 
    {
        console.log("Error at onClickHive() : ", error);
    }
}

async function hiveSwapFee(swapAmount) {
    try 
    {
        var feePercentage = 0.001;
        swapAmount = parseFloat(swapAmount) || 0.0;
        var totalFee = Math.floor((swapAmount * feePercentage) * DECIMAL) / DECIMAL;
        var totalReceived = Math.floor((swapAmount - totalFee) * DECIMAL) / DECIMAL;
        document.getElementById("hiveReceived").innerHTML = totalReceived;
        document.getElementById("hiveFee").innerHTML = totalFee;
    } 
    catch (error) 
    {
        console.log("Error at hiveSwapFee() : ", error);
    }
}

async function enableHiveButton() {
    try
    {
        var hiveBalance = document.getElementById("checkHiveDetails").innerHTML;
        hiveBalance = parseFloat(hiveBalance) || 0.0;
        
        var swapAmount = document.getElementById("goHive").value;
        swapAmount = parseFloat(swapAmount) || 0.0;
        document.getElementById("hiveTransferMsg").innerHTML = "";

        if(swapAmount >= 1.0 && hiveBalance >= swapAmount)
        {
            document.getElementById("hiveSwapProcess").disabled = false;
        }
        else
        {
            document.getElementById("hiveSwapProcess").disabled = true;
        }
    } 
    catch (error) 
    {
        console.log("Error at enableHiveButton() : ", error);
    }
}

//Swap.Hive Swap Data
async function swaphiveSwapChange () {
    try
    {
        var changeValue = document.getElementById("goSwapHive").value;
        validateSwapHivePattern(changeValue);        
    }
    catch (error)
    {
        console.log("Error at swaphiveSwapChange() : ", error);
    }
}

async function validateSwapHivePattern(price) {     
    var patt = /^(\d*)([.]\d{0,3})?$/;  
    var matchedString = price.match(patt);
    if (matchedString) 
    {        
        prevSwapHiveValue = matchedString[1] + (matchedString[2] ? matchedString[2].replace(",", ".") : "");
        swaphiveSwapFee(prevSwapHiveValue);
        enableSwapHiveButton();       
    }
    else
    {
        document.getElementById("goSwapHive").value = prevSwapHiveValue;
        swaphiveSwapFee(prevSwapHiveValue);
        enableSwapHiveButton();
    }
}

async function onClickSwapHive() {
    try 
    {
        var hiveBalance = document.getElementById("checkSwapHiveDetails").innerHTML;
        if(hiveBalance != "NaN")
        {            
            document.getElementById("goSwapHive").value = hiveBalance;
            prevSwapHiveValue = hiveBalance;
            swaphiveSwapFee(prevSwapHiveValue);
            enableSwapHiveButton();
        }
    } 
    catch (error) 
    {
        console.log("Error at onClickSwapHive() : ", error);
    }
}

async function swaphiveSwapFee(swapAmount) {
    try 
    {
        var feePercentage = 0.001;
        swapAmount = parseFloat(swapAmount) || 0.0;
        var totalFee = Math.floor((swapAmount * feePercentage) * DECIMAL) / DECIMAL;
        var totalReceived = Math.floor((swapAmount - totalFee) * DECIMAL) / DECIMAL;
        document.getElementById("swaphiveReceived").innerHTML = totalReceived;
        document.getElementById("swaphiveFee").innerHTML = totalFee;
    } 
    catch (error) 
    {
        console.log("Error at swaphiveSwapFee() : ", error);
    }
}

async function enableSwapHiveButton() {
    try
    {
        var hiveBalance = document.getElementById("checkSwapHiveDetails").innerHTML;
        hiveBalance = parseFloat(hiveBalance) || 0.0;
        
        var swapAmount = document.getElementById("goSwapHive").value;
        swapAmount = parseFloat(swapAmount) || 0.0;

        if(swapAmount >= 1.0 && hiveBalance >= swapAmount)
        {
            document.getElementById("swaphiveSwapProcess").disabled = false;
        }
        else
        {
            document.getElementById("swaphiveSwapProcess").disabled = true;
        }
    } 
    catch (error) 
    {
        console.log("Error at enableSwapHiveButton() : ", error);
    }
}

// VAULT Swap Data
async function vaultSwapChange () {
    try
    {
        var changeValue = document.getElementById("goVault").value; 
        validateVaultPattern(changeValue);        
    }
    catch (error)
    {
        console.log("Error at swaphiveSwapChange() : ", error);
    }
}

async function validateVaultPattern(price) {     
    var patt = /^(\d*)([.]\d{0,2})?$/;  
    var matchedString = price.match(patt);
    if (matchedString) 
    {        
        prevVaultValue = matchedString[1] + (matchedString[2] ? matchedString[2].replace(",", ".") : "");
        vaultSwapFee(prevVaultValue);
        enableVaultButton();        
    }
    else
    {
        document.getElementById("goVault").value = prevVaultValue;
        vaultSwapFee(prevVaultValue);
        enableVaultButton();
    }
}

async function onClickVault() {
    try 
    {
        var hiveBalance = document.getElementById("checkVaultDetails").innerHTML;
        if(hiveBalance != "NaN")
        {            
            document.getElementById("goVault").value = hiveBalance;
            prevVaultValue = hiveBalance;
            vaultSwapFee(prevVaultValue);
            enableVaultButton();
        }
    } 
    catch (error) 
    {
        console.log("Error at onClickVault() : ", error);
    }
}

async function vaultSwapFee(swapAmount) {
    try 
    {
        var feePercentage = 0.000;
        var swapRatio = 10;
        swapAmount = parseFloat(swapAmount) || 0.0;
        swapAmount = swapAmount / swapRatio;
        var totalFee = Math.floor((swapAmount * feePercentage) * DECIMAL) / DECIMAL;
        var totalReceived = Math.floor((swapAmount - totalFee) * DECIMAL) / DECIMAL;
        document.getElementById("vaultReceived").innerHTML = totalReceived;
        document.getElementById("vaultFee").innerHTML = totalFee;
    } 
    catch (error) 
    {
        console.log("Error at vaultSwapFee() : ", error);
    }
}

async function enableVaultButton() {
    try
    {
        var hiveBalance = document.getElementById("checkVaultDetails").innerHTML;
        hiveBalance = parseFloat(hiveBalance) || 0.0;
        
        var swapAmount = document.getElementById("goVault").value;
        swapAmount = parseFloat(swapAmount) || 0.0;

        if(swapAmount >= 1.0 && hiveBalance >= swapAmount)
        {
            document.getElementById("vaultSwapProcess").disabled = false;
        }
        else
        {
            document.getElementById("vaultSwapProcess").disabled = true;
        }
    } 
    catch (error) 
    {
        console.log("Error at enableVaultButton() : ", error);
    }
}

