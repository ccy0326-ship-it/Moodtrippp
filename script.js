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
    ]
};

const placeData = {

    "難受想哭": {

        "想被安慰": {

            indoor: [
                "動物咖啡廳",
                "療癒系甜點店"
            ],

            outdoor: [
                "朋友出遊",
                "寵物友善公園"
            ]

        }

    }

};

const app = document.getElementById("app");

showEmotionPage();

function showEmotionPage(){

    app.innerHTML = `
        <h2>今天的你是？</h2>
    `;

    Object.keys(emotions).forEach(emotion => {

        const btn = document.createElement("button");

        btn.textContent = emotion;

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

function showPlaceResult(
    emotion,
    subEmotion,
    type
){

    const places =
        placeData[emotion][subEmotion][type];

    app.innerHTML = `

        <h2>推薦地點</h2>

        ${places
            .map(place =>
                `<p>${place}</p>`
            )
            .join("")
        }

    `;

}