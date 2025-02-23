//これをコンソールに貼り付けて実行するとwikiの 行政区域 という見出しの内容がコピーできる

(() => {
    const title = "行政区域";
    const headId = "temporary";
    const headId2 = "temporaryNext";

    const h2 = [...document.querySelectorAll("h2,h1")];

    const targetIdx = h2.findIndex((e) => e.textContent.includes(title));
    const target = h2[targetIdx];
    target.id = headId;
    const nextHeading = h2[targetIdx + 1];
    nextHeading.id = headId2;
    let parent = target;
    do {
        parent = parent.parentElement;
    } while (!parent.querySelector(`#${headId2}`));
    const list = [];
    start = false;
    for (child of parent.children) {
        if (!start) {
            if (child == target || child.querySelector(`#${headId}`)) {
                start = true;
            }
        }
        if (start) {
            list.push(child);
            if (child == nextHeading || child.querySelector(`#${headId2}`)) {
                break;
            }
        }
    }
    target.id = "";
    nextHeading.id = "";

    const result = ((all) => {
        let temp = all.replaceAll(/[^ァ-ヴー=＝・\-－ァィゥェォヵㇰヶㇱㇲッㇳㇴㇵㇶㇷㇸㇹㇷ゚ㇺャュョㇻㇼㇽㇾㇿヮ]+/g, " ");
        console.log(temp);
        const list = temp.replaceAll(/\s+[ー=＝・\-－]/g, "").split(/\s+/).filter(v => v);
        let content = "";
        let count = 0;
        for (let data of new Set(list).keys()) {
            content += `"${data}", `;
            count = (count + 1) % 5;
            if (count === 4) {
                content += "\n";
            }
        }

        return `
        //${location.href}
        ${content}
        `;

    })(list.map(e => e.textContent).join("\n"));

    let input_text = document.createElement("textarea");
    document.body.appendChild(input_text);
    input_text.value = result;
    input_text.select();
    document.execCommand('copy');

    input_text.remove()
})()

    //表をコピー
    (() => {
        const list = [...new Set(
            [...document.querySelectorAll("table.wikitable tbody tr")]
                .map(e => e.textContent).join("\n")
                .split(/[\t\s\n 　		、]+/)
                .filter(e => e.replaceAll(/\d+,?.?/g, ""))
        ).keys()];
        let result = JSON.stringify(list);
        let input_text = document.createElement("textarea");
        document.body.appendChild(input_text);
        input_text.value = result;
        input_text.select();
        document.execCommand('copy');

        input_text.remove()
    })();