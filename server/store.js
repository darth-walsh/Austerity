const cards = require("./cards");

class Store {
  constructor() {
    this.default = [
      cards.Copper, cards.Silver, cards.Gold,
      cards.Curse, cards.Estate, cards.Duchy, cards.Province,
    ];
  }

  optional() {
    return Object.keys(cards).filter(n => !this.default.includes(cards[n]))
      // @ts-ignore
      .sort((a, b) => cards[a].compareTo(cards[b]));
  }

  init(included, playerCount) {
    const propertyCount = playerCount <= 2 ? 8 : 12;
    const curseCount = 10 * Math.max(playerCount - 1, 1);
    const treasureCount = 30;
    const actionCount = 10;

    this.counts = this.default.reduce((o, c) => {
      // @ts-ignore
      o[c.name] = c.ofKind("property") ? propertyCount : (c.ofKind("curse") ? curseCount : treasureCount);
      return o;
    }, {});

    this.included = included;

    this.counts = this.included.reduce((o, c) => {
      o[c.name] = c.ofKind("property") ? propertyCount : actionCount;
      return o;
    }, this.counts);
  }

  /**
   * @return {any[]} widen type to avoid ts type complaints
   */
  getAllCards() {
    // @ts-ignore
    return this.default.concat(this.included).sort((a, b) => a.compareTo(b));
  }

  getAvailable(price) {
    return this.getAllCards().filter(c => c.cost <= price && this.counts[c.name]);
  }

  bought(card) {
    if (typeof(card.name) !== "string") {
      throw new Error("Invalid argument, not a card");
    }
    if (--this.counts[card.name] < 0) {
      throw new Error("Already out of card!");
    }
  }

  gameOver() {
    if (!this.counts.Province) {
      return true;
    }
    return this.getAllCards()
      .filter(c => this.counts[c.name] === 0).length >= 3;
  }
}

module.exports.Store = Store;
