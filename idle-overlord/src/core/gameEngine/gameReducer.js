// src/core/gameEngine/gameReducer.js
import GeneratorsData from "../../GeneratorsData";
import { tutorialMissions, cristalMissions } from "../data/missions";

// Conversion initiale des générateurs
const initialGenerators = GeneratorsData.reduce(
  (acc, gen) => ({
    ...acc,
    [gen.id]: {
      name: gen.name,
      baseCost: gen.baseCost,
      rate: gen.baseInspirationPerSecond,
      count: gen.quantity || 0,
      unlocked: gen.unlocked || false
    }
  }),
  {}
);

export const initialState = {
  inspiration: 0,
  autoIdeaUnlocked: false,
  tutorialStep: -1,
  cristalStep: 0,
  code: "",
  generators: initialGenerators,
  missions: tutorialMissions.map((m) => ({ ...m })),
  cristalMissions: cristalMissions.map((m) => ({ ...m })),
  inspirationPerSecond: 0,
  cristalMode: false,
  hideOverlord: false
};

export function gameReducer(state, action) {
  switch (action.type) {
    // Mise à jour du code éditeur
    case "UPDATE_CODE":
      return { ...state, code: action.payload };

    // Avancement tutoriel
    case "ADVANCE_TUTORIAL": {
      const newStep = state.tutorialStep + 1;
      const updatedMissions = state.missions.map((mission, index) =>
        index === newStep - 1 ? { ...mission, validated: true } : mission
      );

      return {
        ...state,
        tutorialStep: newStep,
        missions: updatedMissions,
        code: ""
      };
    }

    // Achat générateur
    case "BUY_GENERATOR": {
      const { generatorId } = action.payload;
      const gen = state.generators[generatorId];
      const cost = Math.floor(gen.baseCost * Math.pow(1.15, gen.count));

      if (state.inspiration < cost) return state;

      return {
        ...state,
        inspiration: state.inspiration - cost,
        generators: {
          ...state.generators,
          [generatorId]: {
            ...gen,
            count: gen.count + 1
          }
        }
      };
    }

    // Déverrouillage auto-idée
    case "UNLOCK_AUTO_IDEA":
      return {
        ...state,
        autoIdeaUnlocked: true,
        tutorialStep: Math.min(state.tutorialStep + 1, 6)
      };

    // Mode Cristal
    case "ADVANCE_CRISTAL_STEP": {
      const newStep = state.cristalStep + 1;
      const updatedMissions = state.cristalMissions.map((mission, index) =>
        index === state.cristalStep ? { ...mission, validated: true } : mission
      );

      return {
        ...state,
        cristalStep: newStep,
        cristalMissions: updatedMissions,
        code: "",
        hideOverlord: newStep >= 5,
        cristalMode: newStep >= 5 ? false : state.cristalMode
      };
    }

    // Mise à jour inspiration
    case "UPDATE_INSPIRATION": {
      const totalRate = Object.values(state.generators).reduce(
        (acc, gen) => acc + gen.rate * gen.count,
        0
      );

      return {
        ...state,
        inspiration: state.inspiration + action.payload.delta,
        inspirationPerSecond: totalRate
      };
    }

    // Basculer en mode Cristal
    case "ENABLE_CRISTAL_MODE":
      return {
        ...state,
        cristalMode: true,
        cristalStep: 0,
        cristalMissions: cristalMissions.map((m) => ({
          ...m,
          validated: false
        }))
      };

    default:
      return state;
  }
}
