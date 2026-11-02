let num1 = "";
let op = "";
let num2 = "";
let c = 0;

const dictNum = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

const dictOps = ["/", "*", "-", "+", "%"];

const Clear = "C";

const Equal = "=";

const operations = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => a / b,
    "%": (a, b) => a % b,
};

function valore(num) {
    if (dictNum.includes(num) && c == 0) {
        num1 += num;
        return num1;
    }

    if (dictNum.includes(num) && c == 1) {
        num2 += num;
        return num2;
    }

    if (dictOps.includes(num)) {
        if (num1 === "") {
            return "";
        }

        op = num;

        if (c === 0) {
            num1 = Number(num1);
        }

        c = 1;

        return op;
    }

    if (num === Clear) {
        num1 = "";
        op = "";
        num2 = "";
        c = 0;
        return "";
    }

    if (num === Equal) {
        if (num1 === "" || op === "" || num2 === "") {
            return "";
        }

        num2 = Number(num2);

        if (op === "/" && num2 === 0) {
            return "Error";
        }

        const result = operations[op](num1, num2);

        num1 = String(result);
        num2 = "";
        op = "";
        c = 0;

        return num1;
    }

    return "";
}

function esegui(tasto) {
    const r = valore(tasto);

    document.getElementById("result").value = r;
}
