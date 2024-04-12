class Personnage {
    constructor(name, hp, mana, dmg) {
      this.name = name;
      this.hp = hp;
      this.mana = mana;
      this.dmg = dmg;
      this.status = "playing";
      this.maxHp = hp;
      this.maxMana = mana;
      this.damageReduction = 0;
      this.damageReductionTurns = 0;
    }

    takeDamage(damage) {
      let finalDmg = damage - this.getDamageReduction();
      finalDmg = finalDmg < 0 ? 0 : finalDmg;
      this.hp -= finalDmg;
      if (this.hp <= 0) {
        this.status = "loser";
      }
    }
  
    dealDamage(target) {
      target.takeDamage(this.dmg);
      console.log(
        `${this.name} attaque ${target.name} et lui inflige ${this.dmg} points dégâts. ${target.name} lui reste ${target.hp} points de vie.`,
      );

    }
  
    applyDamageReduction(turns, amount) {
      this.damageReduction += amount;
      this.damageReductionTurns += turns;
    }
  
    reduceDamageReduction() {
      if (this.damageReductionTurns > 0) {
        this.damageReductionTurns--;
      }
    }
    getDamageReduction() {
      return this.damageReductionTurns > 0 ? this.damageReduction : 0;
    }
  }
  
  export default Personnage;