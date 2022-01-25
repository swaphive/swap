hive.api.setOptions({url: "https://api.hive.blog"});
hive.config.set('alternative_api_endpoints', [
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
]);

const ssc = new SSC('https://api.hive-engine.com/rpc/');

window.onload = function() {
    getAccDetails();         
};

function getAccDetails (callback) {
    try
    {
        hive.api.getAccounts(['hiveupme'], function(err, result) {
            if(!err) {
                if(result.length > 0)
                {
                    console.log("Result : ", result[0].balance);
                    document.getElementById("accDetails").innerHTML = result[0].balance;
                }
            }
        });
    }
    catch(error)
    {
        console.log("Error : ", error);
    }
};
