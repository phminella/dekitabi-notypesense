import { STutorialButtonsStyles } from "./styles/STutorialButtonsStyles";
const STutorialButtons = ({ setTutorialSteps, tutorialSteps, t }) => {
  return (
    <STutorialButtonsStyles>
      {tutorialSteps < 2 && (
        <button onClick={() => setTutorialSteps(-1)} className="skip-button">
          {t("skipTutorial")}
        </button>
      )}
      {tutorialSteps > 0 && (
        <button
          onClick={() => setTutorialSteps(tutorialSteps - 1)}
          className="normal-button"
        >
          {t("back")}
        </button>
      )}
      {tutorialSteps < 2 && (
        <button
          onClick={() => setTutorialSteps(tutorialSteps + 1)}
          className="normal-button"
        >
          {t("next")}
        </button>
      )}
      {tutorialSteps === 2 && (
        <button onClick={() => setTutorialSteps(-1)} className="normal-button">
          {t("finish")}
        </button>
      )}
    </STutorialButtonsStyles>
  );
};
export default STutorialButtons;
