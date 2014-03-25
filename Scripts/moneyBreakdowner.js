var MoneyBreakdowner = function () {

    //types of money, must keep sorted by value, add method inserts automatically
    this.moneyTypes = [{
        name: "Sacagawea",
        value: 100,
    }, {
        name: "Half Dollar",
        value: 50,
    }, {
        name: "Quarter",
        value: 25,
    }, {
        name: "Dime",
        value: 10,
    }, {
        name: "Nickel",
        value: 5,
    }, {
        name: "Penny",
        value: 1,
    }];

    this.baseAnswer = {};

    this.breakThisDown = function (money) {
        for (var i = 0; i < this.moneyTypes.length; i++) {
            this.baseAnswer[this.moneyTypes[i].name] = 0;
        }
        console.log("We will breakdown " + money + " cents into coins:");
        console.log("beginning base answer" + this.baseAnswer);

        var i = 0
        while (i < this.moneyTypes.length) {
            //console.log(this.moneyTypes[i].name);
            var keepGoing = true;
            while (keepGoing) {
                if (money - this.moneyTypes[i].value >= 0) {
                    money= money - this.moneyTypes[i].value;
                    this.baseAnswer[this.moneyTypes[i].name]++;
                } else {
                    keepGoing = false;
                }
            }
            i++;
        }
        this.getAllPossibilities();
        this.printResult();
    };

    this.getAllPossibilities = function() {
        //remove one of the highest coins, re-breakdown
    };

    this.printResult = function () {
        console.log("Here is your coinage breakdown:");
        for (var i = 0; i < this.moneyTypes.length; i++) {

        };
    };

    this.addCoin = function (title, worth) {
        //insert at appropriate value
    };

    this.removeCoin = function (name) {

    };
};

var moneyBreakdowner = new MoneyBreakdowner().breakThisDown(47);