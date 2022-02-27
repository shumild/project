new Vue({
    el:'#app',
    data: {
        equation: '0',
        isDecimalAdded: false,
        isOperatorAdded: false,
        isStarted: false,
        isEnter: false,
    },
    methods: {
        //判断 character 是否加减乘除
        isOperator(character){
            return ['+','-','×','÷'].indexOf(character) > -1;
        },
        //点击加、减、乘、除、数字或小数点时
        append(character){
            if(this.equation === '0' && !this.isOperator(character)){
                if(character === '.'){
                    this.equation += '' + character;
                    this.isDecimalAdded = true;
                }else {
                    this.equation = '' + character;
                    this.isEnter = true;
                }
                this.isStarted = true;
                return
            }
            //输入数字
            if(!this.isOperator(character)){
                //限制只能输入一个小数点
                if(character === '.' && this.isDecimalAdded){
                    return
                }
                if(character === '.'){
                    this.isDecimalAdded = true;
                    this.isOperatorAdded = true;
                }else{
                    this.isOperatorAdded = false;
                }
                if(!this.isEnter){
                    this.isEnter = true;
                    this.equation = '' + character;
                    return;
                }
                this.equation += '' + character;
            }
            //输入运算符
            if(this.isOperator(character) && !this.isOperatorAdded){
                this.equation += '' + character;
                //能再次输入小数点
                this.isDecimalAdded = false;
                this.isOperatorAdded = true;
                this.isEnter = true;
            }

        },
        //点击等号
        calculate(){
            let result = this.equation.replace(new RegExp('×','g'),'*')
                                      .replace(new RegExp('÷','g'),'/');

            let ans = eval(result);
            this.equation = (ans < 1.0e9 ? parseFloat(ans.toFixed(9)):ans.toExponential(3)).toString();
            this.isDecimalAdded = false;
            this.isOperatorAdded = false;
            this.isEnter = false;
        },
        //点击正负号
        calculateToggle(){
            if(this.isOperatorAdded || !this.isStarted){
                return
            }
            this.equation = this.equation + '* -1';
            this.calculate();
        },
        //点击百分比符号
        calculatePercentage(){
            if(this.isOperatorAdded || !this.isStarted){
                return;
            }
            this.equation = this.equation + '* 0.01';
            this.calculate();
        },
        //点击AC符号
        clear(){
            this.equation = '0'
            this.isDecimalAdded = false;
            this.isOperatorAdded = false;
            this.isStarted = false;
            this.isEnter = false;
        }
    }
})