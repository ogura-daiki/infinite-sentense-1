const kanaHumanName = (syllables) => {
    const kanaFrequencies = [
        { kana: "ア", weight: 5.4 }, { kana: "イ", weight: 3.8 }, { kana: "ウ", weight: 2.6 },
        { kana: "エ", weight: 3.2 }, { kana: "オ", weight: 3.5 }, { kana: "カ", weight: 2.0 },
        { kana: "キ", weight: 1.6 }, { kana: "ク", weight: 3.0 }, { kana: "ケ", weight: 1.3 },
        { kana: "コ", weight: 1.9 }, { kana: "サ", weight: 1.7 }, { kana: "シ", weight: 4.0 },
        { kana: "ス", weight: 4.7 }, { kana: "セ", weight: 1.8 }, { kana: "ソ", weight: 1.5 },
        { kana: "タ", weight: 1.2 }, { kana: "チ", weight: 0.8 }, { kana: "ツ", weight: 0.3 },
        { kana: "テ", weight: 1.1 }, { kana: "ト", weight: 6.7 }, { kana: "ナ", weight: 2.4 },
        { kana: "ニ", weight: 1.0 }, { kana: "ヌ", weight: 0.1 }, { kana: "ネ", weight: 0.5 },
        { kana: "ノ", weight: 0.9 }, { kana: "ハ", weight: 0.7 }, { kana: "ヒ", weight: 0.6 },
        { kana: "フ", weight: 2.8 }, { kana: "ヘ", weight: 0.4 }, { kana: "ホ", weight: 0.6 },
        { kana: "マ", weight: 4.5 }, { kana: "ミ", weight: 4.2 }, { kana: "ム", weight: 0.4 },
        { kana: "メ", weight: 0.5 }, { kana: "モ", weight: 0.4 }, { kana: "ヤ", weight: 0.3 },
        { kana: "ユ", weight: 0.3 }, { kana: "ヨ", weight: 0.3 }, { kana: "ラ", weight: 4.9 },
        { kana: "リ", weight: 6.2 }, { kana: "ル", weight: 5.9 }, { kana: "レ", weight: 5.2 },
        { kana: "ロ", weight: 0.3 }, { kana: "ワ", weight: 0.2 }, { kana: "ン", weight: 10.5 },
        { kana: "ー", weight: 9.8 },
        { kana: "キャ", weight: 1.5 }, { kana: "キュ", weight: 1.2 }, { kana: "キョ", weight: 1.2 },
        { kana: "シャ", weight: 1.5 }, { kana: "シュ", weight: 1.2 }, { kana: "ショ", weight: 1.2 },
        { kana: "チャ", weight: 1.5 }, { kana: "チュ", weight: 1.2 }, { kana: "チョ", weight: 1.0 },
        { kana: "ニャ", weight: 0.8 }, { kana: "ニュ", weight: 0.7 }, { kana: "ニョ", weight: 0.7 },
        { kana: "ヒャ", weight: 0.8 }, { kana: "ヒュ", weight: 0.7 }, { kana: "ヒョ", weight: 0.7 },
        { kana: "ミャ", weight: 0.8 }, { kana: "ミュ", weight: 0.7 }, { kana: "ミョ", weight: 0.7 },
        { kana: "リャ", weight: 0.8 }, { kana: "リュ", weight: 0.7 }, { kana: "リョ", weight: 0.7 }
    ];

    const weightedRandomChoice = (exclude, allowLongVowel) => {
        let filteredKana = kanaFrequencies.filter(item => !exclude.includes(item.kana));
        if (!allowLongVowel) {
            filteredKana = filteredKana.filter(item => item.kana !== "ー");
        }
        const totalWeight = filteredKana.reduce((sum, item) => sum + item.weight, 0);
        let random = Math.random() * totalWeight;
        for (const item of filteredKana) {
            if (random < item.weight) return item.kana;
            random -= item.weight;
        }
    }

    let name = "";
    let lastChar = "";
    for (let i = 0; i < syllables; i++) {
        let exclude = [];
        let allowLongVowel = lastChar.match(/[アイウエオー]/) !== null;
        if (lastChar === "ー") exclude.push("ー");
        let newChar = weightedRandomChoice(exclude, allowLongVowel);
        name += newChar;
        lastChar = newChar;

        // 途中に区切り記号を挿入
        if (i > 0 && i < syllables - 1 && Math.random() < 0.3) {
            name += Math.random() < 0.5 ? "・" : "＝";
        }
    }
    return name;
}


export { kanaHumanName };