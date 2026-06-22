const emotions = {

    "壓力山大": [
        "想讓自己喘口氣",
        "什麼都不想想",
        "想暫時消失一下"
    ],

    "難受想哭": [
        "想把情緒通通倒出來",
        "想被安慰",
        "想讓腦袋放空一下"
    ],

    "氣氣氣": [
        "想用力發洩一頓",
        "想找點事讓自己分心",
        "氣頭上需要緩一緩"
    ],

    "孤單寂寞": [
        "不想一個人待著",
        "想遇到有趣的人",
        "出去透透氣"
    ],

    "開心亢奮": [
        "今天就是要找個大的樂子",
        "今天狀態超好能量超滿",
        "想去美美的地方把今天的快樂存起來"
    ],

    "普普通通沒特別": [
        "想找點事做但又懶",
        "腦袋空空的",
        "想來點新刺激"
    ],

    "愜意": [
        "想對自己好一次",
        "想放慢腳步感受一下",
        "想去發現一些平常沒注意到的美"
    ]
};

const placeData = {

    "壓力山大": {

        "想讓自己喘口氣": {
            indoor: ["SPA", "按摩", "溫泉"],
            outdoor: ["海邊散步", "公園散步", "踏青"]
        },

        "什麼都不想想": {
            indoor: ["瑜珈", "冥想", "手作"],
            outdoor: ["公園放空", "植物園晃晃"]
        },

        "想暫時消失一下": {
            indoor: ["電影院", "書店"],
            outdoor: ["看夜景", "兜風"]
        }
    },

    "難受想哭": {

        "想把情緒通通倒出來": {
            indoor: ["KTV", "保齡球"],
            outdoor: ["大聲唱歌", "海邊大喊"]
        },

        "想被安慰": {
            indoor: ["動物咖啡廳", "療癒系甜點店"],
            outdoor: ["朋友出遊", "寵物友善公園"]
        },

        "想讓腦袋放空一下": {
            indoor: ["水族館", "天文館"],
            outdoor: ["河邊發呆", "公園躺草皮", "看星星", "看夕陽"]
        }
    },

    "氣氣氣": {

        "想用力發洩一頓": {
            indoor: ["拳擊館", "飛鏢"],
            outdoor: ["跑步", "打球"]
        },

        "想找點事讓自己分心": {
            indoor: ["遊樂場", "密室逃脫"],
            outdoor: ["卡丁車", "攀岩"]
        },

        "氣頭上需要緩一緩": {
            indoor: ["茶館", "圖書館"],
            outdoor: ["山上散步", "寺廟走走"]
        }
    },

    "孤單寂寞": {

        "不想一個人待著": {
            indoor: ["共享空間", "Live House"],
            outdoor: ["市集散步", "熱鬧老街"]
        },

        "想遇到有趣的人": {
            indoor: ["桌遊店", "語言交換活動"],
            outdoor: ["路跑活動", "二手市集"]
        },

        "出去透透氣": {
            indoor: ["展覽", "美術館"],
            outdoor: ["街道散步", "騎腳踏車"]
        }
    },

    "開心亢奮": {

        "今天就是要找個大的樂子": {
            indoor: ["派對", "酒吧"],
            outdoor: ["遊樂園", "衝浪體驗"]
        },

        "今天狀態超好能量超滿": {
            indoor: ["夜店舞池", "跳舞課"],
            outdoor: ["踢足球", "爬山"]
        },

        "想去美美的地方把今天的快樂存起來": {
            indoor: ["網美咖啡廳", "主題餐廳"],
            outdoor: ["網美景點", "花海"]
        }
    },

    "普普通通沒特別": {

        "想找點事做但又懶": {
            indoor: ["找朋友玩Switch", "室內高爾夫", "逛街"],
            outdoor: ["曬太陽", "野餐"]
        },

        "腦袋空空的": {
            indoor: ["漫畫店", "夾娃娃機"],
            outdoor: ["跑地圖特別路線", "隨便上一台公車"]
        },

        "想來點新刺激": {
            indoor: ["煮沒煮過的菜", "插花體驗"],
            outdoor: ["街頭藝人表演", "探訪喜歡藝人的拍攝地"]
        }
    },

    "愜意": {

        "想對自己好一次": {
            indoor: ["高級下午茶", "米其林餐廳", "逛百貨"],
            outdoor: ["搭高鐵去一直想去的地方", "露天電影院"]
        },

        "想放慢腳步感受一下": {
            indoor: ["品茶體驗", "文創小店"],
            outdoor: ["Color Walk", "小鎮散步"]
        },

        "想去發現一些平常沒注意到的美": {
            indoor: ["小型藝廊", "博物館"],
            outdoor: ["巷弄探索", "寫生"]
        }
    }
};

const app = document.getElementById("app");

let favorites =
    JSON.parse(
        localStorage.getItem("favorites")
    ) || [];

showEmotionPage();

function showEmotionPage(){

   app.innerHTML = `
    <h2>今天的你是？</h2>
`;

    Object.keys(emotions).forEach(emotion => {

        const btn = document.createElement("button");

        btn.textContent = emotion;

        btn.classList.add(emotion);

        btn.onclick = () => {
            showSubEmotionPage(emotion);
        };

        app.appendChild(btn);

    });

}

function showSubEmotionPage(emotion){

    app.innerHTML = `
        <h2>${emotion}</h2>
        <p>你現在比較像？</p>
    `;

    emotions[emotion].forEach(subEmotion => {

        const btn = document.createElement("button");

        btn.textContent = subEmotion;

        btn.onclick = () => {

            showTypePage(
                emotion,
                subEmotion
            );

        };

        app.appendChild(btn);

    });

}

function showTypePage(
    emotion,
    subEmotion
){

    app.innerHTML = `

        <h2>${emotion}</h2>

        <h3>${subEmotion}</h3>

        <p>你想找什麼？</p>

        <button id="placeBtn">
            地點推薦
        </button>

        <button id="foodBtn">
            食物推薦
        </button>

    `;

    document
        .getElementById("placeBtn")
        .onclick = () => {

            showIndoorOutdoorPage(
                emotion,
                subEmotion
            );

        };
    
    document
    .getElementById("foodBtn")
    .onclick = () => {

        showFoodResult(
            emotion
        );

    };

}

function showIndoorOutdoorPage(
    emotion,
    subEmotion
){

    app.innerHTML = `

        <h2>${emotion}</h2>

        <h3>${subEmotion}</h3>

        <p>想去哪種地方？</p>

        <button id="indoorBtn">
            室內
        </button>

        <button id="outdoorBtn">
            室外
        </button>

    `;

    document
        .getElementById("indoorBtn")
        .onclick = () => {

            showPlaceResult(
                emotion,
                subEmotion,
                "indoor"
            );

        };

    document
        .getElementById("outdoorBtn")
        .onclick = () => {

            showPlaceResult(
                emotion,
                subEmotion,
                "outdoor"
            );

        };

}

async function showPlaceResult(
    emotion,
    subEmotion,
    type
){

    const places =
        placeData[emotion][subEmotion][type];

    let html = `
        <h2>推薦地點</h2>

        <h3>📍 Mood Trip推薦</h3>

        ${places.map(place =>
            `<p>${place}</p>`
        ).join("")}
    `;

    try {

        const response =
            await fetch(
                `http://127.0.0.1:8888/ai-place?emotion=${emotion}&subEmotion=${subEmotion}&type=${type}`
            );

        const data =
            await response.json();

        html += `
            <hr>

            <h3>🤖 AI額外推薦</h3>

            <button
                onclick="
                    showPlaceResult(
                        '${emotion}',
                        '${subEmotion}',
                        '${type}'
                    )
                "
            >
            🔄 換一個推薦
        </button>
    `;
        data.recommendations.forEach(item => {

    html += `
        <div class="result-card">

            <h4>${item.name}</h4>

            <p>${item.reason}</p>

            <button
                onclick="addFavorite(
                    '${item.name}',
                    '${item.reason}'
                )"
            >
                ❤️ 收藏
            </button>

        </div>
    `;

});

    const messageResponse =
    await fetch(
        `http://127.0.0.1:8888/ai-message?emotion=${emotion}`
    );

    const messageData =
        await messageResponse.json();

    html += `
    <hr>

    <h3>💬 AI心情小語</h3>

    <p>${messageData.message}</p>
    `;

    } catch(error){

        console.log(error);

    }

    app.innerHTML = html;

}

async function showFoodResult(emotion){

    let html = `
        <h2>🍜 AI食物推薦</h2>
    `;

    try{

        const response =
            await fetch(
                `http://127.0.0.1:8888/ai-food?emotion=${emotion}`
            );

        const data =
            await response.json();

        data.foods.forEach(food => {

            html += `
    <div>

        <h3>${food.name}</h3>

        <p>${food.reason}</p>

        <button
            onclick="addFavorite(
                '${food.name}',
                '${food.reason}'
            )"
        >
            ❤️ 收藏
        </button>

    </div>
`;

        });

    const messageResponse =
    await fetch(
        `http://127.0.0.1:8888/ai-message?emotion=${emotion}`
    );

    const messageData =
        await messageResponse.json();

    html += `
    <hr>

    <h3>💬 AI心情小語</h3>

    <p>${messageData.message}</p>
    `;

    }
    catch(error){

        console.log(error);

    }

    app.innerHTML = html;

}

function addFavorite(
    name,
    reason
){

    favorites.push({
        name,
        reason
    });

    localStorage.setItem(
        "favorites",
        JSON.stringify(favorites)
    );

    alert("已加入收藏 ❤️");
}

function showFavorites(){

    app.innerHTML = `

        <button
            id="backBtn"
            onclick="showEmotionPage()"
        >
            ←
        </button>

        <h2>💗 我的收藏</h2>

    `;

    favorites.forEach(item => {

        app.innerHTML += `
            <div class="result-card">
                <h3>${item.name}</h3>
                <p>${item.reason}</p>
            </div>
        `;

    });

}