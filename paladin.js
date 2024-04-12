import Personnage from "./personnage.js";



class Paladin extends Personnage {
  constructor(name) {
    super(name, 16, 160, 3);
  }

  specialAttack(target) {
    if (this.mana >= 40) {
      this.mana -= 40;
      target.takeDamage(4);
      let healAmount = 5;
      if (this.hp + healAmount > this.maxHp) {
        healAmount = this.maxHp - this.hp;
      }
      this.hp += healAmount;
      console.log(
        `${this.name} utilise Healing-Lightning, se soigne de ${healAmount} points de vie et inflige 4 dégâts à ${target.name}.`,
      );

    } else {
      console.log(
        `${this.name} n'as pas la mana pour lancer Healing-Lightning.`,
      );

    }
  }
}

export default Paladin;