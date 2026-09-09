/* ============================================================
   Sample data (fictional creators for demo)
   - 実在の人物・団体とは関係のないサンプルデータです
   - images/creator-XX.jpg を置くと写真表示、なければ頭文字プレースホルダー
   - affiliateUrl をあなたのアフィリエイトリンクに書き換えて運用
   ============================================================ */
const AFFILIATE_DEFAULT = "https://example.com/affiliate";

const CREATORS = [
  {
    id: "hoshino-hina", rank: 1, delta: 1,
    name: "星野ひな", kana: "ほしの ひな",
    genres: ["女優", "グラビア"], tags: ["人気"],
    followers: 532000, favs: 48320, growth: "+12%",
    catch: "透明感あふれる唯一無二の存在。",
    profile: "透明感のあるルックスと、やさしい雰囲気で多くのファンを魅了する星野ひなさん。かわいらしさの中にある芯の強さで、見る人を惹きつけます。",
    birth: "4月2日", birthplace: "東京都", debut: "2018年", hobby: "カフェ巡り・映画鑑賞・旅行",
    message: "いつも応援してくれてありがとうございます！写真や動画で、みんなに癒しを届けられたら嬉しいです。これからもよろしくお願いします！",
    points: [
      { icon: "💗", title: "透明感のあるルックス", text: "清楚でかわいらしい唯一無二の魅力" },
      { icon: "😊", title: "やさしい雰囲気", text: "見ているだけで癒されるナチュラルな表情" },
      { icon: "🎬", title: "幅広い作風ジャンル", text: "ラブストーリーから大人の作品まで楽しめる" },
      { icon: "👥", title: "多くのファンに支持", text: "SNSでも話題の人気クリエイター" },
    ],
    works: [
      { title: "はじめてのふたり旅", genre: "癒し", likes: "2.4万" },
      { title: "やさしい時間", genre: "ラブストーリー", likes: "1.8万" },
      { title: "休日の過ごし方", genre: "ナチュラル", likes: "3.1万" },
      { title: "君と見る景色", genre: "清楚系", likes: "2.0万" },
    ],
    faqs: [
      { q: "星野ひなさんの作品はどこで見られますか？", a: "「公式ページを見る」ボタンから、DMM FANZAの公式ページへ移動してご覧いただけます。" },
      { q: "ファンになるにはどうすればいいですか？", a: "お気に入り登録やフォローで、最新情報をチェックできます。" },
      { q: "無料で見られるコンテンツはありますか？", a: "公式ページではサンプルや無料コンテンツが公開されている場合があります。" },
      { q: "他におすすめのクリエイターはいますか？", a: "関連クリエイターや人気ランキングから、気になる方を探してみてください。" },
    ],
    isNew: false,
  },
  {
    id: "amane-mio", rank: 2, delta: 1,
    name: "天音みお", kana: "あまね みお",
    genres: ["女優"], tags: ["話題"],
    followers: 498000, favs: 41200, growth: "+8%",
    catch: "ずっと応援したくなる、愛されるクリエイター。",
    profile: "可愛らしさと大人の魅力をあわせ持ち、幅広い層から支持される天音みおさん。自然体の笑顔が魅力です。",
    birth: "9月14日", birthplace: "大阪府", debut: "2019年", hobby: "料理・ドライブ",
    message: "これからもよろしくお願いします♡ みなさんに癒しをお届けできるよう頑張ります♡",
    points: [
      { icon: "💗", title: "愛される笑顔", text: "見る人を元気にする明るい魅力" },
      { icon: "😊", title: "親しみやすさ", text: "SNSでの発信も人気の理由" },
      { icon: "🎬", title: "多彩な作品", text: "さまざまなジャンルに挑戦" },
      { icon: "👥", title: "安定した人気", text: "長くランキング上位をキープ" },
    ],
    works: [
      { title: "笑顔のレシピ", genre: "癒し", likes: "1.9万" },
      { title: "週末デート", genre: "デート", likes: "1.5万" },
      { title: "ひだまり", genre: "ナチュラル", likes: "2.2万" },
      { title: "星空の下で", genre: "ロマンチック", likes: "1.7万" },
    ],
    faqs: [
      { q: "天音みおさんの作品はどこで見られますか？", a: "「公式ページを見る」ボタンから公式ページへ移動できます。" },
      { q: "SNSはやっていますか？", a: "プロフィール欄のSNSリンクからチェックしてみてください。" },
    ],
    isNew: false,
  },
  {
    id: "shiratori-reina", rank: 3, delta: -1,
    name: "白鳥れいな", kana: "しらとり れいな",
    genres: ["コスプレ"], tags: ["人気"],
    followers: 457000, favs: 39800, growth: "+15%",
    catch: "コスプレでつながる新しいカタチ。",
    profile: "圧倒的な表現力で世界中にファンを持つコスプレイヤー。衣装の再現度と世界観づくりに定評があります。",
    birth: "1月22日", birthplace: "愛知県", debut: "2020年", hobby: "衣装制作・ゲーム",
    message: "コスプレでみんなを笑顔に！今週も注目してもらえて嬉しいです。コスプレで世界をもっと楽しく！",
    points: [
      { icon: "👗", title: "高い再現度", text: "細部までこだわった衣装とメイク" },
      { icon: "📸", title: "世界観のある写真", text: "ストーリーを感じる作品づくり" },
      { icon: "🎮", title: "ゲーム・アニメ好き", text: "ファンとの共通言語が多い" },
      { icon: "👥", title: "世界中にファン", text: "海外イベントにも出演" },
    ],
    works: [
      { title: "秘密の放課後", genre: "コスプレ", likes: "3.1万" },
      { title: "魔法少女コレクション", genre: "コスプレ", likes: "2.8万" },
      { title: "和風ファンタジー", genre: "コスプレ", likes: "2.5万" },
    ],
    faqs: [
      { q: "コスプレ写真はどこで見られますか？", a: "公式ページで作品や写真集をチェックできます。" },
      { q: "イベント出演はありますか？", a: "SNSで告知されるのでフォローがおすすめです。" },
    ],
    isNew: false,
  },
  {
    id: "natsume-umi", rank: 4, delta: 1,
    name: "夏目うみ", kana: "なつめ うみ",
    genres: ["グラビア"], tags: ["注目"],
    followers: 412000, favs: 33400, growth: "+6%",
    catch: "ナチュラルな魅力で多くのファンを惹きつける。",
    profile: "うみと一緒に楽しい時間を。ナチュラルな魅力と健康的な笑顔で注目を集めるグラビアクリエイター。",
    birth: "7月8日", birthplace: "神奈川県", debut: "2021年", hobby: "サーフィン・写真",
    message: "いつも見てくれてありがとう♡ これからも素敵な写真を届けます！",
    points: [
      { icon: "🌊", title: "健康的で明るい魅力", text: "アウトドアも似合う親しみやすさ" },
      { icon: "📷", title: "写真映えする表情", text: "プロの現場でも評価が高い" },
      { icon: "😊", title: "ナチュラルな人柄", text: "飾らない発信が人気" },
      { icon: "📈", title: "急上昇中", text: "ランキングを駆け上がり中" },
    ],
    works: [
      { title: "夏の思い出", genre: "グラビア", likes: "2.0万" },
      { title: "海辺の午後", genre: "グラビア", likes: "1.6万" },
      { title: "ひまわり畑", genre: "グラビア", likes: "1.4万" },
    ],
    faqs: [
      { q: "写真集はどこで買えますか？", a: "公式ページから購入ページへ移動できます。" },
    ],
    isNew: false,
  },
  {
    id: "fujiwara-aya", rank: 5, delta: 1,
    name: "藤原あや", kana: "ふじわら あや",
    genres: ["女優"], tags: ["人気"],
    followers: 398000, favs: 31200, growth: "-2%",
    catch: "やさしいまなざしに癒やされる。",
    profile: "もっと好きになってもらえますように。やさしいまなざしと可憐なルックスが人気のクリエイター。",
    birth: "11月30日", birthplace: "福岡県", debut: "2020年", hobby: "読書・紅茶",
    message: "見つけてくれてありがとう♡ ゆっくりしていってくださいね。",
    points: [
      { icon: "💗", title: "癒しのまなざし", text: "穏やかな時間が流れる作品" },
      { icon: "📚", title: "知的な一面", text: "読書好きの落ち着いた人柄" },
      { icon: "🎬", title: "丁寧な演技", text: "ストーリー性のある作品が得意" },
      { icon: "👥", title: "根強いファン", text: "長く愛される存在" },
    ],
    works: [
      { title: "午後の紅茶", genre: "癒し", likes: "1.3万" },
      { title: "図書室の午後", genre: "清楚系", likes: "1.1万" },
    ],
    faqs: [
      { q: "藤原あやさんの作品はどこで見られますか？", a: "「公式ページを見る」ボタンから公式ページへどうぞ。" },
    ],
    isNew: false,
  },
  {
    id: "momose-momo", rank: 6, delta: 1,
    name: "桃瀬もも", kana: "ももせ もも",
    genres: ["コスプレ"], tags: ["話題"],
    followers: 356000, favs: 28900, growth: "+10%",
    catch: "ゲームもコスプレもみんなと一緒に！",
    profile: "ゲーム好きのコスプレイヤー。配信での明るいトークと再現度の高いコスプレで人気急上昇中。",
    birth: "3月3日", birthplace: "千葉県", debut: "2022年", hobby: "ゲーム実況・お菓子作り",
    message: "ゲームもコスプレもみんなと一緒に楽しみたい！応援よろしくね♡",
    points: [
      { icon: "🎮", title: "ゲーム好き", text: "配信での共演も楽しい" },
      { icon: "👗", title: "再現度の高い衣装", text: "自作衣装も多数" },
      { icon: "💬", title: "明るいトーク", text: "配信の雰囲気が最高" },
      { icon: "📈", title: "急上昇中", text: "今もっとも注目される新人勢" },
    ],
    works: [
      { title: "勇者の休日", genre: "コスプレ", likes: "1.8万" },
      { title: "メイド喫茶の一日", genre: "コスプレ", likes: "1.5万" },
    ],
    faqs: [
      { q: "配信はどこで見られますか？", a: "SNSリンクから配信情報をチェックしてください。" },
    ],
    isNew: false,
  },
  {
    id: "yukino-yuki", rank: 7, delta: 1,
    name: "雪乃ゆき", kana: "ゆきの ゆき",
    genres: ["グラビア"], tags: ["人気"],
    followers: 321000, favs: 26500, growth: "+5%",
    catch: "うみと一緒に楽しい時間を。",
    profile: "清楚で上品な雰囲気が魅力のグラビアクリエイター。季節感のある作品づくりに定評があります。",
    birth: "12月12日", birthplace: "北海道", debut: "2021年", hobby: "スキー・カフェ巡り",
    message: "応援ありがとうございます♡ 冬生まれだけど心はほかほかに！",
    points: [
      { icon: "❄️", title: "清楚で上品", text: "透明感のあるビジュアル" },
      { icon: "📸", title: "季節感のある作品", text: "四季を感じる写真集" },
      { icon: "😊", title: "丁寧なファン対応", text: "コメント返しもマメ" },
      { icon: "👥", title: "安定人気", text: "着実にファンを増やし中" },
    ],
    works: [
      { title: "雪景色", genre: "グラビア", likes: "1.2万" },
      { title: "白い吐息", genre: "グラビア", likes: "1.0万" },
    ],
    faqs: [
      { q: "写真集はどこで買えますか？", a: "公式ページから購入できます。" },
    ],
    isNew: false,
  },
  {
    id: "nanami-coco", rank: 8, delta: 2,
    name: "七海ここ", kana: "ななみ ここ",
    genres: ["コスプレ"], tags: ["注目"],
    followers: 287000, favs: 24100, growth: "+18%",
    catch: "好きなことで、みんなを幸せに。",
    profile: "好きなことで、みんなを幸せに。急上昇ランキング1位の注目コスプレイヤー。",
    birth: "5月5日", birthplace: "沖縄県", debut: "2023年", hobby: "ダンス・イラスト",
    message: "急上昇1位ありがとう！これからも好きを届けます♡",
    points: [
      { icon: "📈", title: "急上昇No.1", text: "成長率+18%の注目株" },
      { icon: "💃", title: "ダンスも得意", text: "動画コンテンツも人気" },
      { icon: "🎨", title: "イラストも描く", text: "多才なクリエイター" },
      { icon: "😊", title: "明るい人柄", text: "元気をもらえる存在" },
    ],
    works: [
      { title: "南国の休日", genre: "コスプレ", likes: "1.6万" },
      { title: "踊ってみた特集", genre: "動画", likes: "1.4万" },
    ],
    faqs: [
      { q: "七海ここさんの動画はどこで見られますか？", a: "公式ページでチェックできます。" },
    ],
    isNew: true,
  },
  {
    id: "himekawa-emi", rank: 9, delta: 1,
    name: "姫川えみ", kana: "ひめかわ えみ",
    genres: ["配信者"], tags: ["人気"],
    followers: 264000, favs: 21800, growth: "+7%",
    catch: "いつも配信で待ってます♡",
    profile: "いつも配信で待ってます。親しみやすいトークと企画力で人気の配信クリエイター。",
    birth: "8月18日", birthplace: "兵庫県", debut: "2022年", hobby: "トーク・企画",
    message: "配信に遊びにきてね！コメント全部読みます♡",
    points: [
      { icon: "🎙️", title: "楽しいトーク", text: "初めてでも入りやすい配信" },
      { icon: "🎉", title: "企画力", text: "毎週の企画が楽しみ" },
      { icon: "💬", title: "コメント率高め", text: "ファンとの距離が近い" },
      { icon: "👥", title: "常連多数", text: "あたたかいコミュニティ" },
    ],
    works: [
      { title: "24時間企画ダイジェスト", genre: "配信", likes: "9千" },
      { title: "質問コーナーまとめ", genre: "配信", likes: "7千" },
    ],
    faqs: [
      { q: "配信スケジュールはどこで確認できますか？", a: "SNSで告知しています。フォローがおすすめです。" },
    ],
    isNew: false,
  },
  {
    id: "ayase-rio", rank: 10, delta: 1,
    name: "綾瀬りお", kana: "あやせ りお",
    genres: ["女優"], tags: ["話題"],
    followers: 251000, favs: 20400, growth: "+4%",
    catch: "これからもよろしくね♡",
    profile: "これからもよろしくね。ナチュラルな演技と親しみやすさで話題のクリエイター。",
    birth: "6月25日", birthplace: "宮城県", debut: "2023年", hobby: "映画・散歩",
    message: "見つけてくれてありがとう！これからたくさん思い出作ろうね♡",
    points: [
      { icon: "🌱", title: "フレッシュな魅力", text: "デビュー間もない注目株" },
      { icon: "🎬", title: "ナチュラルな演技", text: "等身大の魅力が共感を呼ぶ" },
      { icon: "😊", title: "親しみやすさ", text: "友達のような距離感" },
      { icon: "📈", title: "着実に上昇", text: "トップ10入りを果たした実力" },
    ],
    works: [
      { title: "はじまりの朝", genre: "ドラマ", likes: "8千" },
      { title: "放課後散歩", genre: "ナチュラル", likes: "6千" },
    ],
    faqs: [
      { q: "綾瀬りおさんの作品はどこで見られますか？", a: "「公式ページを見る」ボタンからどうぞ。" },
    ],
    isNew: true,
  },
  {
    id: "koharu-akari", rank: 11, delta: 0,
    name: "小春あかり", kana: "こはる あかり",
    genres: ["配信者", "グラビア"], tags: ["新人"],
    followers: 189000, favs: 15200, growth: "+22%",
    catch: "新人の底力、見せます！",
    profile: "デビューしたての新人配信者。初配信から話題となり、注目の新人にランクイン。",
    birth: "2月10日", birthplace: "静岡県", debut: "2024年", hobby: "歌・雑談",
    message: "新人の小春あかりです！見つけてくれてありがとう♡",
    points: [
      { icon: "🌱", title: "期待の新人", text: "成長率+22%で急成長中" },
      { icon: "🎤", title: "歌が得意", text: "歌枠配信が人気" },
      { icon: "💬", title: "雑談が楽しい", text: "深夜の雑談枠が癒し" },
      { icon: "😊", title: "素直な人柄", text: "応援したくなる存在" },
    ],
    works: [
      { title: "初配信ダイジェスト", genre: "配信", likes: "5千" },
    ],
    faqs: [
      { q: "配信はいつやっていますか？", a: "SNSでスケジュールを告知しています。" },
    ],
    isNew: true,
  },
  {
    id: "mochizuki-runa", rank: 12, delta: 3,
    name: "望月るな", kana: "もちづき るな",
    genres: ["アイドル", "グラビア"], tags: ["新人", "注目"],
    followers: 176000, favs: 14100, growth: "+19%",
    catch: "歌って踊れる癒し系アイドル。",
    profile: "歌って踊れる癒し系アイドルクリエイター。ライブ動画とオフショットが人気。",
    birth: "10月7日", birthplace: "京都府", debut: "2024年", hobby: "ダンス・作詞",
    message: "るなと一緒に楽しい時間を作ろうね♡ ライブで会えたら嬉しいな！",
    points: [
      { icon: "🎤", title: "歌とダンス", text: "ステージ映えするパフォーマンス" },
      { icon: "💗", title: "癒し系の笑顔", text: "見ているだけで元気に" },
      { icon: "📸", title: "オフショット", text: "素顔もかわいいと話題" },
      { icon: "📈", title: "急上昇中", text: "成長率+19%" },
    ],
    works: [
      { title: "初ステージ密着", genre: "アイドル", likes: "7千" },
      { title: "オフの日の過ごし方", genre: "ナチュラル", likes: "5千" },
    ],
    faqs: [
      { q: "ライブ情報はどこで確認できますか？", a: "SNSと公式ページで告知しています。" },
    ],
    isNew: true,
  },
];

const GENRES = ["総合", "女性", "女優", "コスプレ", "AV女優", "配信者", "グラビア", "アイドル", "新人"];
const POPULAR_KEYWORDS = ["女優", "コスプレ", "AV女優", "配信者", "新人", "グラビア"];

/* 画像ファイル名の対応表（images/ に配置。なければ自動でプレースホルダー表示） */
function creatorImage(id, rank) {
  return `images/creator-${String(rank).padStart(2, "0")}.jpg`;
}
function fmtFollowers(n) {
  if (n >= 10000) return (n / 10000).toFixed(1) + "万人";
  return n.toLocaleString() + "人";
}
