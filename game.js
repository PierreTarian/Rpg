import Fighter from "./fighter.js";
import Paladin from "./paladin.js";
import Monk from "./monk.js";
import Berzerker from "./berzerker.js";
import Assassin from "./assassin.js";
import Wizard from "./wizard.js";
import Necromencer from "./necromencer.js";


class Game {
    constructor() {
      this.turnLeft = 10;
      this.personnages = this.createPersonnages();
      this.user = this.personnages[0];
      this.isGameOver = false;
      this.startGame();
    }


    createPersonnages() {
        const personnages = [];
        const personnageNames = ["Grace", "Ulder", "Moana", "Draven", "Carl"];
        const personnageClasses = [
          Fighter,
          Paladin,
          Monk,
          Berzerker,
          Assassin,
          Wizard,
          Necromencer,
        ];

    let userName = prompt("Entrer votre pseudo :");
    let userClass = this.chooseClass(personnageClasses);
    let userPersonnage = new userClass(userName);
    personnages.push(userPersonnage);


        for (let i = 1; i < 5; i++) {
            let iaName = personnageNames[i];
            let iaClass =
              personnageClasses[Math.floor(Math.random() * personnageClasses.length)];
            let iaPersonnage = new iaClass(iaName);
            personnages.push(iaPersonnage);
          }
          return personnages;
        }
  
        chooseClass(personnageClasses) {
          console.log("Choisissez votre classe :");
      
          personnageClasses.forEach((persoClass, index) => {
            console.log(`${index + 1}. ${persoClass.name}`);
          });
          let choice = prompt(
            `Mettez votre numéro de classe (1-${personnageClasses.length})`,
          );
          let classIndex = parseInt(choice) - 1;
          if (
            isNaN(classIndex) ||
            classIndex < 0 ||
            classIndex >= personnageClasses.length
          ) {
            console.log("Choix non valide");
            this.chooseClass(personnageClasses);
          }
          return personnageClasses[classIndex];
        }
      
 
        startTurn() {
          console.log(`Nous sommes au tour : ${11 - this.turnLeft}`);
          this.personnages.sort(() => Math.random() - 0.5);
          this.personnages.forEach((char) => {
            if (char.status === "playing") {
              char.reduceDamageReduction();
              if (char === this.user) {
                this.userTurn();
              } else {
                this.iaTurn(char);
              }
            }
          });
          this.skipTurn();
        }
      
        userTurn() {
          console.log(`C'est ton tour, ${this.user.name}.`);
          let choice = prompt(
            "Entrez 1 pour voir les stats, 2 pour effectuer une attaque normal et 3 pour une attaque special",
          );
          if (choice === "1") {
            this.watchStats();
            this.userTurn();
          } else if (choice === "2") {
            let target = this.userTarget(this.user);
            this.user.dealDamage(target);
            this.manaExec(this.user, target);
          } else if (choice === "3") {
            if (
              this.user instanceof Monk ||
              this.user instanceof Berzerker ||
              this.user instanceof Assassin ||
              this.user instanceof Necromencer
            ) {
              this.user.specialAttack();
            } else {
              let target = this.userTarget(this.user);
              this.user.specialAttack(target);
              this.manaExec(this.user, target);
            }
          } else {
            console.log("Choix invalide, veuillez réessayer.");
            this.userTurn();
          }
        }
      
        iaTurn(char) {
          console.log(`C'est au tour de, ${char.name}.`);
          let target = this.getRandomTarget(char);
      
          let executeTarget = this.personnages.find(
            (char) =>
              char.status === "playing" && char !== char && char.hp < char.dmg,
          );
          if (executeTarget) {
            target = executeTarget;
            console.log(`${char.name} a choisi de cibler ${target.name}`);
            char.dealDamage(target);
            this.manaExec(char, target);
          } else {
            if (Math.random() < 0.5) {
              console.log(
                `${char.name} effectue une attaque normale sur ${target.name}.`,
              );

      
              char.dealDamage(target);
              this.manaExec(char, target);
            } else {
              console.log(`${char.name} effectue une attaque spéciale.`);
              if (
                this.user instanceof Monk ||
                this.user instanceof Berzerker ||
                this.user instanceof Assassin ||
                this.user instanceof Necromencer
              ) {
                char.specialAttack();
                this.manaExec(char, target);
              } else {
                if (char.specialAttack(target)) {
                  this.manaExec(char, target);
                }
              }
            }
          }
        }
      
        manaExec(char, target) {
          if (target.status === "loser") {
            if (char instanceof Necromencer) {
              let healAmount = 5;
              if (char.hp + healAmount > char.maxHp) {
                healAmount = char.maxHp - char.hp;
              }
              char.hp += healAmount;
            } else {
              let manaRegen = 20;
              if (char.mana + manaRegen > char.maxMana) {
                manaRegen = char.maxMana - char.mana;
              }
              char.mana += manaRegen;
              console.log(
                `${char.name} a gagné ${manaRegen} points de mana pour avoir tué ${target.name}`,
              );
            }
          }
        }
      
        skipTurn() {
          this.turnLeft--;
          if (this.turnLeft === 0 || this.checkWinner()) {
            this.endGame();
          }
        }

        getRandomTarget(personnage) {
          let targets = this.personnages.filter(
            (char) => char.status === "playing" && char !== personnage,
          );
          return targets[Math.floor(Math.random() * targets.length)];
        }

        userTarget(personnage) {
          let targets = this.personnages.filter(
            (char) => char.status === "playing" && char !== personnage,
          );
          console.log("Choisissez votre cible :");
          targets.forEach((char, index) => {
            console.log(`${index + 1}. ${char.name}, PV = ${char.hp}/${char.maxHp}`);
          });
          let choice = prompt(`Mettez votre numéro de cible (1-${targets.length})`);
          let targetIndex = parseInt(choice) - 1;
          if (
            isNaN(targetIndex) ||
            targetIndex < 0 ||
            targetIndex >= targets.length
          ) {
            console.log("Choix invalide");
            this.userTarget(character);
          }
          return targets[targetIndex];
        }

        endGame() {
          this.isGameOver = true;
          console.log("Fin du Jeu");
          let playAgain = prompt("Voulez-vous relancer une partie ? (oui/non)");
          if (playAgain.toLowerCase() === "oui") {
            new Game();
          } else {
            console.log("Merci d'avoir joué !");
          }
        }
      
        checkWinner() {
          let playingPersonnages = this.personnages.filter(
            (char) => char.status === "playing",
          );
          if (playingPersonnages.length === 1) {
            console.log(`${playingPersonnages[0].name} est le grand gagnant`);
            return true;
          }
          return false;
        }
      
        watchStats() {
          this.personnages.forEach((char, index) => {
            if (char.status === "playing") {
              let charClass;
              if (char instanceof Fighter) {
                charClass = "Fighter";
              } else if (char instanceof Paladin) {
                charClass = "Paladin";
              } else if (char instanceof Monk) {
                charClass = "Monk";
              } else if (char instanceof Berzerker) {
                charClass = "Berzerker";
              } else if (char instanceof Assassin) {
                charClass = "Assassin";
              } else if (char instanceof Wizard) {
                charClass = "Wizard";
              } else if (char instanceof Necromencer) {
                charClass = "Necromencer";
              } else {
                charClass = "Inconnu";
              }
              console.log(
                `${index + 1}. ${char.name} (${charClass}) : PV = ${char.hp}/${
                  char.maxHp
                }, Mana = ${char.mana}/${char.maxMana}, Dmg = ${char.dmg}, Def = ${char.damageReduction}`,
              );
            } else {
              console.log(`${char.name} : Mort`);
            }
          });
        }
        startGame() {
          while (this.turnLeft > 0 && !this.isGameOver) {
            this.startTurn();
          }
        }
      }
      
      new Game();
      