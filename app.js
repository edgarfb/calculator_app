let bottons = document.querySelectorAll('.calc__btn');
let display = document.querySelector('#display');
let radios = document.querySelectorAll('input[type="radio"]');

let theme01 = {
    
    mainBackground: 'hsl(222, 26%, 31%)',
    keypadBackground: 'hsl(223, 31%, 20%)',
    screenBackground: 'hsl(224, 36%, 15%)',
    resetAndDel: 'hsl(225, 21%, 49%)',
    resetAndDelShadow: 'hsl(224, 28%, 35%)',

    equalBtn: 'hsl(6, 63%, 50%)',
    equalBtnShadow: 'hsl(6, 70%, 34%)',

    btnBackground: 'hsl(45, 7%, 89%',
    btnShadow: 'hsl(35, 11%, 61%)',
    primary: '#fff',
    secondary: 'hsl(221, 14%, 31%)'
    
}
let theme02 = {
    
    mainBackground: 'hsl(0, 0%, 90%)',
    keypadBackground: 'hsl(0, 5%, 81%)',
    screenBackground: 'hsl(0, 0%, 93%)',
    resetAndDel: 'hsl(185, 42%, 37%)',
    resetAndDelShadow: 'hsl(185, 58%, 25%)',

    equalBtn: 'hsl(25, 98%, 40%)',
    equalBtnShadow: 'hsl(25, 99%, 27%)',

    btnBackground: 'hsl(45, 7%, 89%)',
    btnShadow: 'hsl(35, 11%, 61%)',
    primary: 'hsl(60, 10%, 19%)',
    secondary: 'hsl(60, 10%, 19%)'
    
}
let theme03 = {
    mainBackground: 'hsl(268, 75%, 9%)',
    keypadBackground: 'hsl(268, 71%, 12%)',
    screenBackground: 'hsl(268, 71%, 12%)', 

    
    resetAndDel: 'hsl(281, 89%, 26%)',
    resetAndDelShadow: 'hsl(285, 91%, 52%)',

    
    equalBtn: 'hsl(176, 100%, 44%)',
    equalBtnShadow: 'hsl(177, 92%, 70%)',

    btnBackground: 'hsl(268, 47%, 21%)',
    btnShadow: 'hsl(290, 70%, 36%)',

    primary: 'hsl(52, 100%, 62%)',
    secondary: 'hsl(52, 100%, 62%)',
}


let properties = [
    '--mainBackground',
    '--keypadBackground',
    '--screenBackground',
    '--resetAndDel',
    '--resetAndDelShadow',
    '--equalBtn',
    '--equalBtnShadow',
    '--btnBackground',
    '--btnShadow',
    '--primary',
    '--secondary'
];


radios.forEach(radio => {
    radio.addEventListener('click', (e) => {
        let target = e.target.id;
        let check = e.target.checked;
        switch (target) {
            case 'theme-1':
                setTheme(theme01);
                break;
            case 'theme-2':
                setTheme(theme02);
                break;
            case 'theme-3':
                setTheme(theme03);
                break;
        
            default:
                break;
        }
        
        
    })
    

    
})


function setTheme(theme) {
    let styleTarget = document.documentElement.style;
    
    properties.forEach(prop => {
        let withOutDash = prop.slice(2);
        styleTarget.setProperty(prop, theme[`${withOutDash}`]);
    })
}

// it follow the clicked numbers before any operrator was presed
let buffer = '0'; 
let previosOperator = null;
let total = 0;
let tracker = 0;

function handleClickBtn(value) {
    
    if(isNaN(+value)) {
        handleOperators(value);
        previosOperator = value;
    }
    else {
        handleNumber(value);
    }
    display.innerHTML = buffer != '0' ? buffer : tracker;
}

function handleOperators(symbol) {
    if(symbol === 'RESET') {
        buffer = '0';
        tracker = 0;
    }
    else if(symbol === 'DEL') {
        buffer = buffer.substring(0, buffer.length - 1);
    }
    else if(symbol === '+' || symbol === '=') {
        handleMaths(previosOperator);
    }
    else if(symbol === '×') {
        handleMaths(previosOperator);
    }
    else if(symbol === '/') {
        handleMaths(previosOperator);
    }
}
function handleNumber(numberSrt) {
    
    if(buffer === '0') {
        buffer = numberSrt;
    }
    else {
        buffer += numberSrt;
    }
    
}


function handleMaths(symbol) {
    let integerBuffer = +buffer;
    if(buffer === '0') {
        return;
    }
    
    if (tracker === 0) {
        tracker = integerBuffer;
        
    } 
    
    else {
        flushOperations(integerBuffer);
    }

    buffer = '0';
}

function flushOperations(int) {
    if(previosOperator === '+') {
        tracker += int;
    }
    else if(previosOperator === '-') {
        tracker -= int;
    }   
    else if(previosOperator === '×') {
        tracker *= int;
    }   
    else if(previosOperator === '/') {
        tracker /= int;
    }   
    
}

function main(value) {
    handleClickBtn(value);
    
}

bottons.forEach(btn => {
    btn.addEventListener('click', function (e) {
        let t = e.target.innerHTML;
        main(t);
    })
});

