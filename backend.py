from flask import Flask, jsonify, request
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return "Mood Trip Backend Running"

ai_places = {

    "壓力山大": {

        "indoor":[
            {"name":"水族館","reason":"安靜環境有助放鬆情緒"},
            {"name":"植物園","reason":"綠意能舒緩壓力"},
            {"name":"貓咪咖啡廳","reason":"與動物互動能帶來療癒感"},
            {"name":"書店","reason":"安靜閱讀能讓思緒沉澱"},
            {"name":"溫泉會館","reason":"泡湯有助紓解壓力"},
            {"name":"手作教室","reason":"專注創作能暫時忘記煩惱"}
        ],

        "outdoor":[
            {"name":"河濱公園","reason":"散步有助整理思緒"},
            {"name":"海邊","reason":"開闊視野能減輕壓力"},
            {"name":"森林步道","reason":"接觸自然能舒緩緊張感"},
            {"name":"觀景平台","reason":"遠眺風景能放鬆心情"},
            {"name":"大草原公園","reason":"適合放空與深呼吸"},
            {"name":"湖畔步道","reason":"平靜景色有助舒壓"}
        ]
    },

    "難受想哭": {

        "indoor":[
            {"name":"動物咖啡廳","reason":"被陪伴的感覺能帶來安慰"},
            {"name":"甜點店","reason":"甜食有助提升心情"},
            {"name":"書店","reason":"安靜空間能讓情緒沉澱"},
            {"name":"電影院","reason":"透過電影轉移情緒"},
            {"name":"手作教室","reason":"創作能幫助整理心情"},
            {"name":"療癒系展覽","reason":"舒適氛圍能放鬆情緒"}
        ],

        "outdoor":[
            {"name":"河岸公園","reason":"適合放空與整理情緒"},
            {"name":"花園","reason":"自然景色能帶來平靜感"},
            {"name":"夕陽景點","reason":"有助舒緩低落心情"},
            {"name":"海邊步道","reason":"海浪聲能安撫情緒"},
            {"name":"草地公園","reason":"適合發呆放空"},
            {"name":"湖邊散步區","reason":"安靜環境能沉澱思緒"}
        ]
    },

    "氣氣氣": {

        "indoor":[
            {"name":"拳擊館","reason":"透過運動釋放情緒"},
            {"name":"飛鏢館","reason":"有助轉移注意力"},
            {"name":"保齡球館","reason":"發洩壓力又有趣"},
            {"name":"攀岩館","reason":"透過挑戰消耗能量"},
            {"name":"密室逃脫","reason":"專注解謎能忘記煩惱"},
            {"name":"電玩遊樂場","reason":"讓情緒有出口"}
        ],

        "outdoor":[
            {"name":"籃球場","reason":"運動能消耗情緒能量"},
            {"name":"跑步步道","reason":"流汗能幫助冷靜"},
            {"name":"卡丁車場","reason":"刺激活動可轉移怒氣"},
            {"name":"自行車道","reason":"透過運動舒緩壓力"},
            {"name":"足球場","reason":"大量活動能釋放情緒"},
            {"name":"登山步道","reason":"運動後更容易冷靜"}
        ]
    },

    "孤單寂寞": {

        "indoor":[
            {"name":"桌遊店","reason":"容易認識新朋友"},
            {"name":"Live House","reason":"感受人群與音樂陪伴"},
            {"name":"共享工作空間","reason":"避免獨自待在家"},
            {"name":"語言交換活動","reason":"增加與人互動機會"},
            {"name":"咖啡廳","reason":"感受人群帶來的陪伴感"},
            {"name":"手作課程","reason":"有機會結識新朋友"}
        ],

        "outdoor":[
            {"name":"創意市集","reason":"有機會接觸不同的人"},
            {"name":"熱鬧商圈","reason":"感受城市活力"},
            {"name":"老街散步","reason":"增加與外界連結感"},
            {"name":"夜市","reason":"感受熱鬧生活氣息"},
            {"name":"戶外音樂會","reason":"感受群體活動氛圍"},
            {"name":"路跑活動","reason":"增加交流機會"}
        ]
    },

    "開心亢奮": {

        "indoor":[
            {"name":"主題餐廳","reason":"延續今天的好心情"},
            {"name":"KTV","reason":"盡情釋放活力"},
            {"name":"遊戲中心","reason":"增加歡樂感"},
            {"name":"保齡球館","reason":"和朋友一起更有趣"},
            {"name":"密室逃脫","reason":"挑戰感增加樂趣"},
            {"name":"舞蹈教室","reason":"釋放滿滿活力"}
        ],

        "outdoor":[
            {"name":"遊樂園","reason":"適合高能量的一天"},
            {"name":"衝浪體驗","reason":"享受刺激與挑戰"},
            {"name":"花海景點","reason":"把快樂收藏起來"},
            {"name":"露營區","reason":"與朋友共享回憶"},
            {"name":"夜景觀景台","reason":"紀錄美好時刻"},
            {"name":"海邊活動區","reason":"享受自由與快樂"}
        ]
    },

    "普普通通沒特別": {

        "indoor":[
            {"name":"漫畫店","reason":"輕鬆消磨時間"},
            {"name":"夾娃娃機店","reason":"增添一點小樂趣"},
            {"name":"購物中心","reason":"隨意走走也能找到驚喜"},
            {"name":"咖啡廳","reason":"適合放空發呆"},
            {"name":"電影院","reason":"給自己一點娛樂"},
            {"name":"室內高爾夫","reason":"體驗不同活動"}
        ],

        "outdoor":[
            {"name":"特色街區","reason":"探索平常沒注意的地方"},
            {"name":"腳踏車道","reason":"換個節奏看看風景"},
            {"name":"公園野餐區","reason":"簡單放鬆一下"},
            {"name":"河濱步道","reason":"適合散步發呆"},
            {"name":"觀光夜市","reason":"增加生活新鮮感"},
            {"name":"城市探索路線","reason":"發現新的有趣角落"}
        ]
    },

    "愜意": {

        "indoor":[
            {"name":"文創小店","reason":"享受慢步調時光"},
            {"name":"品茶空間","reason":"細細感受生活"},
            {"name":"藝文展覽","reason":"沉浸在美感氛圍中"},
            {"name":"獨立書店","reason":"享受閱讀時光"},
            {"name":"下午茶餐廳","reason":"放慢生活步調"},
            {"name":"博物館","reason":"靜靜欣賞文化與藝術"}
        ],

        "outdoor":[
            {"name":"小鎮散步","reason":"體驗悠閒生活節奏"},
            {"name":"露天電影院","reason":"享受舒服夜晚"},
            {"name":"湖畔步道","reason":"感受寧靜與自然"},
            {"name":"森林步道","reason":"放慢腳步感受自然"},
            {"name":"巷弄探索","reason":"發現日常中的小美好"},
            {"name":"海邊散步","reason":"享受海風與放鬆感"}
        ]
    }
}

@app.route("/ai-place")
def ai_place():

    emotion = request.args.get("emotion")
    place_type = request.args.get("type")

    all_places = ai_places[emotion][place_type]

    recommendations = random.sample(
        all_places,
        min(3, len(all_places))
    )

    return jsonify({
        "recommendations": recommendations
    })

@app.route("/ai-food")
def ai_food():

    emotion = request.args.get("emotion")

    if emotion == "壓力山大":

        return jsonify({
            "foods":[
                {
                    "name":"熱拿鐵",
                    "reason":"溫熱飲品能帶來放鬆感"
                },
                {
                    "name":"舒芙蕾鬆餅",
                    "reason":"甜點有療癒效果"
                },
                {
                    "name":"日式咖哩飯",
                    "reason":"溫暖又有飽足感"
                }
            ]
        })

    elif emotion == "難受想哭":

        return jsonify({
            "foods":[
                {
                    "name":"拉麵",
                    "reason":"熱湯能帶來安慰感"
                },
                {
                    "name":"深夜食堂料理",
                    "reason":"適合低落時享用"
                },
                {
                    "name":"草莓蛋糕",
                    "reason":"甜食能提升心情"
                }
            ]
        })

    elif emotion == "氣氣氣":

        return jsonify({
            "foods":[
                {
                    "name":"麻辣鍋",
                    "reason":"大口吃能釋放情緒"
                },
                {
                    "name":"炸雞",
                    "reason":"滿足感高"
                },
                {
                    "name":"燒烤",
                    "reason":"適合發洩壓力"
                }
            ]
        })

    else:

        return jsonify({
            "foods":[
                {
                    "name":"早午餐",
                    "reason":"適合輕鬆享受"
                },
                {
                    "name":"義大利麵",
                    "reason":"經典不踩雷"
                },
                {
                    "name":"小火鍋",
                    "reason":"舒服又有飽足感"
                }
            ]
        })
    
@app.route("/ai-message")
def ai_message():

    emotion = request.args.get("emotion")

    if emotion == "壓力山大":

        message = "最近辛苦了，記得給自己一點喘息空間，休息不是偷懶，而是為了走得更遠。"

    elif emotion == "難受想哭":

        message = "你的感受很重要，不需要一直逞強，允許自己難過，也是一種勇敢。"

    elif emotion == "氣氣氣":

        message = "先讓情緒慢慢沉澱，很多事情等心情平靜後，會有不同的答案。"

    elif emotion == "孤單寂寞":

        message = "即使現在是一個人，也別忘了世界上仍有人關心著你。"

    elif emotion == "開心亢奮":

        message = "把今天的快樂好好收藏起來，未來的自己一定會感謝現在的你。"

    elif emotion == "愜意":

        message = "享受當下的美好，有時候慢下來反而能看見更多風景。"

    else:

        message = "希望今天的推薦能為你帶來一點新的靈感與好心情。"

    return jsonify({
        "message": message
    })

if __name__ == "__main__":
    app.run(debug=True, port=8888)