import Personnage from "./personnage.js";


class Wizard extends Personnage {
  constructor(name) {
    super(name, 12, 200, 2);
  }

  specialAttack(target) {
    if (this.mana >= 25) {
      this.mana -= 25;
      target.takeDamage(7);
      console.log(
        `${this.name} utilise FireBall pour 7 dégâts sur ${target.name}. Il lui reste ${target.hp}PV`,
      );

    } else {
      console.log(`${this.name} n'as pas la mana pour lancer FireBall.`);
    }
  }
}

export default Wizard;