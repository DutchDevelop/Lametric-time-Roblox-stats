const express = require("express");
const fetch = require("@elara-services/fetch");
const app = express();

app.listen("4343",() =>{
    console.log("ServerStarted on 4343");
});

app.get('/Info', Getinfo);

async function Getinfo(req,res){
    let placeid = req.query.placeid || 3168928542
    let upvotes = req.query.upvotes || 1
    let downvotes = req.query.downvotes || 1
    let favs = req.query.favorites || 1
    let likeratio = req.query.ratio || 1

    const r = await fetch(`https://www.roblox.com/places/api-get-details?assetId=${placeid}`)
       .send()
    if (r.statusCode === 200){
        let jsonobject = r.json();
        console.log(jsonobject);
        let content = {
            "frames":[
                {"text":jsonobject.OnlineCount,"icon":37853},
            ]
        }

        if (upvotes == 1){
            content.frames.push({"text":jsonobject.TotalUpVotes,"icon":48253})
        }

        if (downvotes == 1){
            content.frames.push({"text":jsonobject.TotalDownVotes,"icon":48347})
        }

        if (likeratio == 1){
            content.frames.push({"text":Math.floor((jsonobject.TotalUpVotes/(jsonobject.TotalDownVotes + jsonobject.TotalUpVotes))*100) + "%","icon":507})
        }

        if (favs == 1){
            content.frames.push({"text":jsonobject.FavoritedCount,"icon":635})
        }

        res.send(content);
        return;
    }else{
        return res.sendStatus(404);
    }
}
