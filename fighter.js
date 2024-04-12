import Personnage from "./personnage.js";


class Fighter extends Personnage {
  constructor(name) {
    super(name, 12, 40, 4);
  }

  specialAttack(target) {
    if (this.mana >= 20) {
      this.mana -= 20;
      target.takeDamage(5);
      console.log(
        `${this.name} utilise Dark-Vision sur ${target.name}, et inflige 5 dégâts.`,
      );

      this.applyDamageReduction(1, 2);
      console.log(
        `${this.name} prendra 2 points de dégâts en moins lors des attaques du prochain tour.`,
      );

    } else {
      console.log(`${this.name} n'as pas la mana pour lancer Dark-Vision.`);

    }
  }
}

export default Fighter;