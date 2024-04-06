import { forceAnimationRestart } from "../utils/animation.js";

// static class
export class Score {
    static element = document.getElementById("score");
    static changeElement = document.getElementById("score-change");
    static currentScore = 0;
    static addScore(scoreChange) {
        Score.currentScore += scoreChange;

        this.element.innerHTML = Score.currentScore;
        forceAnimationRestart(this.element);

        this.changeElement.innerHTML = `+${scoreChange}`;
        forceAnimationRestart(this.changeElement);
    }
}
