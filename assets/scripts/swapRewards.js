var DECIMAL = 1000;
var rewardPercentage = 0.00075;
var rewardSplit = 30;

const calcHiveAmount = async () => {
    var hiveBalance = 0.0;
    try
    {
        let hiveData = await hive.api.callAsync('condenser_api.get_accounts', [['hiveupme']]);
        if(hiveData.length > 0)
        {        
            hiveBalance = parseFloat(hiveData[0].balance.replace("HIVE", "").trim()) || 0.0;
        }
        return hiveBalance;
    }
    catch(error)
    {
        console.log("Error at calcHiveAmount() : ", error);
        return hiveBalance;
    }
}

const calclSwapHiveAmount = async () => {
    var swapHiveBalance = 0.0;
    try
    {
        let swapHiveData = await ssc.findOne('tokens', 'balances', {'account': 'hiveupme', 'symbol': 'SWAP.HIVE'});
        if(swapHiveData != null)
        {        
            swapHiveBalance = parseFloat(swapHiveData.balance) || 0.0;
            swapHiveBalance = Math.floor(swapHiveBalance * DECIMAL) / DECIMAL;
            swapHiveBalance = parseFloat(swapHiveData.balance) || 0.0;            
        }
        return swapHiveBalance;
    }
    catch(error)
    {
        console.log("Error at swapHiveAccDetails() : ", error);
        return swapHiveBalance;
    }
}

const totalDiscountedBridge = async () => {
    var totalAmount = 0.0;
    try 
    {
        var hiveAmount = await calcHiveAmount();
        var swapHiveAmount = await calclSwapHiveAmount();

        totalAmount = Math.floor((hiveAmount + swapHiveAmount) * DECIMAL) / DECIMAL;
        totalAmount = parseFloat(totalAmount) || 0.0; 
        return totalAmount;
    } 
    catch (error) 
    {
        console.log("Error at totalDiscountedBridge() : ", error);
        return totalAmount;
    }
}

const splitDiscountedBridge = async () => {
    var splitAmount = 0.0;
    try 
    {
        var totalAmount = await totalDiscountedBridge();
        splitAmount = Math.floor((totalAmount * rewardSplit / 100) * DECIMAL) / DECIMAL;
        splitAmount = parseFloat(splitAmount) || 0.0; 
        return splitAmount;
    } 
    catch (error) 
    {
        console.log("Error at splitDiscountedBridge() : ", error);
        return splitAmount;
    }
}

async function setDiscountedBridge() 
{
    try
    {
        var discountedBridgeSplit = await splitDiscountedBridge();
        var hiveBalance = await calcHiveAmount();
        var swaphiveBalance = await calclSwapHiveAmount();

        if(discountedBridgeSplit > hiveBalance)
        {
            var calcHive = Math.floor((discountedBridgeSplit - hiveBalance) * DECIMAL) / DECIMAL;
            calcHive = parseFloat(calcHive) || 0.0; 

            document.getElementById("rewardHive").innerHTML = calcHive;
        }
        else
        {
            document.getElementById("rewardHive").innerHTML = 0.0; 
        }

        if(discountedBridgeSplit > swaphiveBalance)
        {
            var calcSwapHive = Math.floor((discountedBridgeSplit - swaphiveBalance) * DECIMAL) / DECIMAL;
            calcSwapHive = parseFloat(calcSwapHive) || 0.0; 

            document.getElementById("rewardSwapHive").innerHTML = calcSwapHive;
        }
        else
        {
            document.getElementById("rewardSwapHive").innerHTML = 0.0; 
        }
    }
    catch (error)
    {
        console.log("Error at setDiscountedBridge() : ", error);
    }
}

async function onClickRewardHive() 
{
    try
    {
        var hiveRewardBalance = document.getElementById("rewardHive").innerHTML;
        if(hiveRewardBalance != "NaN")
        {
            document.getElementById("goHive").value = hiveRewardBalance;
            hiveRewardBalance = parseFloat(hiveRewardBalance) || 0.0;
            var rewardHiveBalance = Math.floor((hiveRewardBalance * rewardPercentage) * DECIMAL) / DECIMAL;
            var hiveReceiveBalance = Math.floor((hiveRewardBalance + rewardHiveBalance) * DECIMAL) / DECIMAL;
            document.getElementById("hiveReceived").innerHTML = hiveReceiveBalance;
            document.getElementById("hiveFee").innerHTML = 0.00;
        }
    }
    catch (error)
    {
        console.log("Error at onClickRewardHive() : ", error);
    }
}

async function onClickRewardSwapHive() 
{
    try
    {
        var swaphiveRewardBalance = document.getElementById("rewardSwapHive").innerHTML;
        if(swaphiveRewardBalance != "NaN")
        {
            document.getElementById("goSwapHive").value = swaphiveRewardBalance;
            swaphiveRewardBalance = parseFloat(swaphiveRewardBalance) || 0.0;
            var rewardSwapHiveBalance = Math.floor((swaphiveRewardBalance * rewardPercentage) * DECIMAL) / DECIMAL;
            var swaphiveReceiveBalance = Math.floor((swaphiveRewardBalance + rewardSwapHiveBalance) * DECIMAL) / DECIMAL;
            document.getElementById("swaphiveReceived").innerHTML = swaphiveReceiveBalance;
            document.getElementById("swaphiveFee").innerHTML = 0.00;
        }
    }
    catch (error)
    {
        console.log("Error at onClickRewardSwapHive() : ", error);
    }
}

function awaitRewardFunction () 
{
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve();
        }, 1000);
    });
};
  
const intervalRewardBalances = async function () 
{
    const _await = await awaitRewardFunction();    
    await setDiscountedBridge();
    setTimeout(intervalRewardBalances, 1000 * 60);
};  

intervalRewardBalances();
