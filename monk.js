import Personnage from "./personnage.js";


class Monk extends Personnage {
  constructor(name) {
    super(name, 8, 200, 2);
  }

  specialAttack() {
    if (this.mana >= 25) {
      this.mana -= 25;
      let healAmount = 8;
      if (this.hp + healAmount > this.maxHp) {
        healAmount = this.maxHp - this.hp;
      }
      this.hp += healAmount;
      console.log(
        `${this.name} utilise Heal, et se soigne de ${healAmount} points de vie.`,
      );

    } else {
      console.log(`${this.name} n'as pas la mana pour lancer Heal.`);
    }
  }
}

export default Monk;