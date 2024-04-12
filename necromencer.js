import Personnage from "./personnage.js";

class Necromencer extends Personnage {
  constructor(name) {
    super(name, 8, 120, 2);
    this.damageReductionTurns = 10;
  }

  specialAttack() {
    if (this.mana >= 30) {
      this.mana -= 30;
      target.takeDamage(5);
      let manaAmount = 20;
      if (this.mana + manaAmount > this.maxMana) {
        manaAmount = this.maxMana - this.mana;
      }
      this.mana += manaAmount;
      console.log(
        `${this.name} utilise Arise pour 5 dégâts sur ${target.name} et regagne 20 points de mana. Il lui reste ${target.hp}PV`,
      );

    } else {
      console.log(`${this.name} n'as pas la mana pour lancer Defense.`);

    }
  }
}
export default Necromencer;